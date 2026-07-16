#!/usr/bin/env python3
"""Download a real Roblox 3D avatar (OBJ + MTL + textures) at build time.

Roblox exposes a 3D avatar thumbnail whose payload points to an OBJ mesh, an
MTL material file and its textures on the Roblox CDN. We fetch those once during
the docs build and store them locally under docs/assets/avatar/, so the browser
loads them same-origin (no CORS, no live Roblox call on page view).

This script never fails the build: on any error it prints a warning, clears any
partial output and exits 0. The 3D widget falls back to a built-in rig when the
files are absent.
"""

import json
import os
import re
import sys
import time
import urllib.request
from urllib.parse import urlparse

USER_ID = sys.argv[1] if len(sys.argv) > 1 else "1"
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "docs", "assets", "avatar")
UA = "Mozilla/5.0 (compatible; AtomicDocsBuild/1.0)"
AVATAR_3D = "https://thumbnails.roblox.com/v1/users/avatar-3d?userId=" + USER_ID


def _get(url, binary=False, timeout=30):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = r.read()
    return data if binary else data.decode("utf-8", "replace")


def _resolve(base_host, token):
    # OBJ/MTL/texture references are bare CDN hashes served from the same host.
    if token.startswith("http"):
        return token
    return base_host.rstrip("/") + "/" + token


def main():
    os.makedirs(OUT_DIR, exist_ok=True)

    # 1) The 3D thumbnail may render asynchronously; poll until Completed.
    meta_url = None
    for attempt in range(12):
        try:
            info = json.loads(_get(AVATAR_3D))
        except Exception as e:
            print("[avatar] avatar-3d request failed:", e)
            time.sleep(2)
            continue
        if info.get("state") == "Completed" and info.get("imageUrl"):
            meta_url = info["imageUrl"]
            break
        print("[avatar] state=%s, waiting..." % info.get("state"))
        time.sleep(2)

    if not meta_url:
        print("[avatar] gave up waiting for the 3D thumbnail; using fallback rig.")
        return

    # 2) The imageUrl is actually a JSON payload describing the mesh.
    parsed = urlparse(meta_url)
    base_host = parsed.scheme + "://" + parsed.netloc
    payload = json.loads(_get(meta_url))
    obj_ref = payload["obj"]
    mtl_ref = payload["mtl"]

    # 3) MTL: rewrite every texture map reference to a local .png filename.
    mtl_text = _get(_resolve(base_host, mtl_ref))
    map_keys = ("map_Kd", "map_Ka", "map_Ks", "map_d", "map_Bump", "bump", "map_Ns")
    tex_tokens = set()
    out_lines = []
    for line in mtl_text.splitlines():
        parts = line.split()
        if parts and parts[0] in map_keys:
            token = parts[-1]
            tex_tokens.add(token)
            parts[-1] = token + ".png"
            out_lines.append(" ".join(parts))
        else:
            out_lines.append(line)
    with open(os.path.join(OUT_DIR, "avatar.mtl"), "w", encoding="utf-8") as f:
        f.write("\n".join(out_lines))

    # 4) Textures.
    for token in tex_tokens:
        try:
            data = _get(_resolve(base_host, token), binary=True)
            with open(os.path.join(OUT_DIR, token + ".png"), "wb") as f:
                f.write(data)
        except Exception as e:
            print("[avatar] texture", token, "failed:", e)

    # 5) OBJ: point its mtllib at our local material file.
    obj_text = _get(_resolve(base_host, obj_ref))
    obj_text = re.sub(r"(?m)^\s*mtllib\s+.*$", "mtllib avatar.mtl", obj_text)
    if "mtllib" not in obj_text:
        obj_text = "mtllib avatar.mtl\n" + obj_text
    with open(os.path.join(OUT_DIR, "avatar.obj"), "w", encoding="utf-8") as f:
        f.write(obj_text)

    print("[avatar] downloaded real Roblox avatar for userId %s" % USER_ID)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("[avatar] unexpected error, using fallback rig:", e)
        # Clear partial output so the widget doesn't try to load a half-set.
        try:
            for name in ("avatar.obj", "avatar.mtl"):
                p = os.path.join(OUT_DIR, name)
                if os.path.exists(p):
                    os.remove(p)
        except Exception:
            pass
    sys.exit(0)
