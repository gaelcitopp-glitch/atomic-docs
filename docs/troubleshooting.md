# Troubleshooting

Quick fixes for the stuff people actually run into.

## "Inject config before running the script"

Your config table isn't populated yet. Open the menu, let it save your settings, then run Atomic again. Atomic needs the config to exist first.

## A setting isn't doing anything

- Give it **~1 second** — Atomic re-reads the config on an interval, it's not instant.
- Double-check the feature's **`Enabled`** flag is on.
- If it's a combat feature, make sure a target is **inside its FOV** (that's the activation gate).
- If it uses a key, confirm the **keybind** is set and you're using the right Activation (`Toggle` vs `Hold`).

## Combat feature "locks onto one person" and won't switch

You're probably in **Select** mode — that's *supposed* to be sticky. Switch the Mode to **Auto** if you want it to pick and re-target automatically. See [Modes](configuration.md#modes-select-vs-auto).

## "I have to press a key in Auto mode"

You shouldn't. **Auto is always armed** unless its Activation is set to **Hold**. If it's `Auto` + `Toggle`, the key is intentionally ignored — just move your crosshair and it works.

## It's slow to load / freezes on startup

- Atomic is built for weak executors, but **Skin Changer / Unlock All** are heavy. They only load when enabled — if startup is rough, make sure you're not enabling them if you don't need them.
- Try a fresh inject after fully rejoining the game.

## Getting hit through Anti Future

- Remember it scales with movement — **standing still means 0 desync** (by design). If you're static, you're an easy target regardless.
- Bump `Studs` up a little for a bigger gap.
- Make sure `AntiResolver` is `true`.

## Shots not registering

- Check your **Hit Location** — aiming at a part that's obstructed can whiff.
- Make sure any **Wall Check / Visible** condition isn't filtering out targets you expect to hit.
- Confirm you're on a **supported game** for that feature.

---

!!! question "Still stuck?"
    Re-read [Configuration](configuration.md) — 90% of "it's not working" turns out to be a Mode / Activation / FOV mismatch.
