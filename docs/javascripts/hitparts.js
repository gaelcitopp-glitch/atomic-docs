// Interactive 3D hit-location model for the Atomic docs.
// Loads a real Roblox avatar (downloaded at build time from the official Roblox
// 3D thumbnail API into assets/avatar/). If those files are unavailable it falls
// back to a built-in blocky rig so the page always works. The neon dot follows
// your MOUSE and lands on the model surface, mirroring how aim tracks the cursor.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

const canvas = document.getElementById('hp-canvas');
if (canvas && window.WebGLRenderingContext) {
  const AV = '../../assets/avatar/';
  const stage   = document.getElementById('hp-stage');
  const readout = document.getElementById('hp-readout');
  const hint    = document.getElementById('hp-hint');
  const ACCENT  = 0xa855f7;
  const accentCol = new THREE.Color(ACCENT);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(2.6, 0.8, 12);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 7;
  controls.maxDistance = 18;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.0;
  controls.target.set(0, -0.1, 0);
  controls.addEventListener('start', () => { if (hint) hint.style.opacity = 0; });

  scene.add(new THREE.HemisphereLight(0xffffff, 0x1a1a26, 1.15));
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.5); keyLight.position.set(5, 9, 7); scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(ACCENT, 0.85);  rimLight.position.set(-6, 2, -5); scene.add(rimLight);

  // Hit regions in a normalized R15 layout (origin at body center, Y up). These
  // stay invisible and act as pick proxies; a translucent accent box is shown
  // over the region that is currently selected or under the cursor.
  const REGIONS = [
    { name: 'Head',            x: 0,    y: 2.35,  z: 0,    w: 1.15, h: 1.15, d: 1.15 },
    { name: 'UpperTorso',      x: 0,    y: 1.0,   z: 0,    w: 1.95, h: 1.3,  d: 0.95 },
    { name: 'LowerTorso',      x: 0,    y: 0.05,  z: 0,    w: 1.85, h: 0.85, d: 0.9  },
    { name: 'HumanoidRootPart',x: 0,    y: 0.55,  z: 0,    w: 1.55, h: 1.6,  d: 0.78, core: true },
    { name: 'LeftUpperArm',    x: -1.3, y: 1.15,  z: 0,    w: 0.6,  h: 1.2,  d: 0.7  },
    { name: 'LeftLowerArm',    x: -1.3, y: 0.1,   z: 0,    w: 0.55, h: 0.95, d: 0.62 },
    { name: 'LeftHand',        x: -1.3, y: -0.55, z: 0,    w: 0.55, h: 0.42, d: 0.6  },
    { name: 'RightUpperArm',   x: 1.3,  y: 1.15,  z: 0,    w: 0.6,  h: 1.2,  d: 0.7  },
    { name: 'RightLowerArm',   x: 1.3,  y: 0.1,   z: 0,    w: 0.55, h: 0.95, d: 0.62 },
    { name: 'RightHand',       x: 1.3,  y: -0.55, z: 0,    w: 0.55, h: 0.42, d: 0.6  },
    { name: 'LeftUpperLeg',    x: -0.5, y: -1.2,  z: 0,    w: 0.72, h: 1.3,  d: 0.75 },
    { name: 'LeftLowerLeg',    x: -0.5, y: -2.35, z: 0,    w: 0.62, h: 1.1,  d: 0.66 },
    { name: 'LeftFoot',        x: -0.5, y: -2.95, z: 0.1,  w: 0.72, h: 0.42, d: 0.95 },
    { name: 'RightUpperLeg',   x: 0.5,  y: -1.2,  z: 0,    w: 0.72, h: 1.3,  d: 0.75 },
    { name: 'RightLowerLeg',   x: 0.5,  y: -2.35, z: 0,    w: 0.62, h: 1.1,  d: 0.66 },
    { name: 'RightFoot',       x: 0.5,  y: -2.95, z: 0.1,  w: 0.72, h: 0.42, d: 0.95 },
  ];

  const regionGroup = new THREE.Group();
  scene.add(regionGroup);
  const regions = {};
  for (const r of REGIONS) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(r.w, r.h, r.d),
      new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0, depthWrite: false })
    );
    mesh.position.set(r.x, r.y, r.z);
    mesh.name = r.name;
    mesh.userData.core = !!r.core;
    regionGroup.add(mesh);
    regions[r.name] = mesh;
  }
  const pickRegions = Object.values(regions).filter(m => !m.userData.core);

  // Visual body (real avatar mesh, or the fallback rig). `bodyMeshes` holds the
  // meshes the Closest Point ray tests against.
  const body = new THREE.Group();
  scene.add(body);
  let bodyMeshes = [];

  function buildFallbackRig() {
    const SKIN = 0xf4d47c, SHIRT = 0x6d28d9, PANTS = 0x24242e;
    const tone = { Head: SKIN, LeftHand: SKIN, RightHand: SKIN,
      LeftUpperLeg: PANTS, LeftLowerLeg: PANTS, LeftFoot: PANTS,
      RightUpperLeg: PANTS, RightLowerLeg: PANTS, RightFoot: PANTS };
    for (const r of REGIONS) {
      if (r.core) continue;
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(r.w, r.h, r.d),
        new THREE.MeshStandardMaterial({ color: tone[r.name] || SHIRT, roughness: 0.5, metalness: 0.04 })
      );
      mesh.position.set(r.x, r.y, r.z);
      body.add(mesh);
      bodyMeshes.push(mesh);
    }
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x15151d });
    for (const sx of [-0.26, 0.26]) {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.22, 0.05), eyeMat);
      eye.position.set(sx, 2.45, 0.61);
      body.add(eye);
    }
  }

  function fitToRig(obj) {
    // Scale + center the downloaded avatar so it matches the normalized rig.
    const box = new THREE.Box3().setFromObject(obj);
    const size = new THREE.Vector3(); box.getSize(size);
    const center = new THREE.Vector3(); box.getCenter(center);
    const scale = size.y > 0 ? (5.8 / size.y) : 1;
    obj.scale.setScalar(scale);
    obj.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    obj.traverse(c => { if (c.isMesh) bodyMeshes.push(c); });
  }

  function loadRealAvatar() {
    const mtl = new MTLLoader();
    mtl.setPath(AV);
    mtl.setResourcePath(AV);
    mtl.load('avatar.mtl', (materials) => {
      materials.preload();
      const obj = new OBJLoader();
      obj.setMaterials(materials);
      obj.setPath(AV);
      obj.load('avatar.obj', (group) => {
        fitToRig(group);
        body.add(group);
      }, undefined, buildFallbackRig);
    }, undefined, buildFallbackRig);
  }

  loadRealAvatar();

  // Neon aim marker.
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0xffffff }));
  marker.visible = false; scene.add(marker);
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.27, 20, 20),
    new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.35 }));
  marker.add(glow);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(0, 0);
  let hasMouse = false;
  canvas.addEventListener('pointermove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    hasMouse = true;
    if (hint) hint.style.opacity = 0;
  });

  let mode = 'Head';

  function clearRegions() {
    for (const name in regions) regions[name].material.opacity = 0;
  }
  function showRegion(name) {
    const m = regions[name];
    if (m) m.material.opacity = m.userData.core ? 0.5 : 0.42;
  }
  function nearestRegionToPoint(p) {
    let best = null, bd = Infinity;
    for (const m of pickRegions) {
      const d = m.position.distanceToSquared(p);
      if (d < bd) { bd = d; best = m; }
    }
    return best;
  }

  function update() {
    clearRegions();
    marker.visible = false;
    raycaster.setFromCamera(mouse, camera);

    if (mode === 'ClosestPart' || mode === 'ClosestPoint') {
      if (!hasMouse) { readout.textContent = (mode === 'ClosestPoint' ? 'Closest Point' : 'Closest Part') + ' \u2192 move your mouse over the body'; return; }
      if (mode === 'ClosestPoint') {
        const hits = bodyMeshes.length ? raycaster.intersectObjects(bodyMeshes, true) : [];
        if (hits.length) {
          marker.position.copy(hits[0].point);
          marker.visible = true;
          const reg = nearestRegionToPoint(hits[0].point);
          if (reg) showRegion(reg.name);
          readout.textContent = 'Closest Point \u2192 ' + (reg ? reg.name : 'surface');
        } else {
          readout.textContent = 'Closest Point \u2192 aim at the body';
        }
      } else {
        const hits = raycaster.intersectObjects(pickRegions, false);
        if (hits.length) {
          showRegion(hits[0].object.name);
          marker.position.copy(hits[0].object.position);
          marker.visible = true;
          readout.textContent = 'Closest Part \u2192 ' + hits[0].object.name;
        } else {
          readout.textContent = 'Closest Part \u2192 aim at the body';
        }
      }
    } else {
      showRegion(mode);
      marker.position.copy(regions[mode].position);
      marker.visible = true;
      readout.textContent = 'Hit Location \u2192 ' + mode;
    }
  }

  const btns = document.querySelectorAll('#hp-buttons .hp-btn');
  btns.forEach(b => b.addEventListener('click', () => {
    btns.forEach(x => x.classList.remove('is-active'));
    b.classList.add('is-active');
    mode = b.dataset.mode;
  }));

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(stage);
  resize();

  let t = 0;
  function loop() {
    requestAnimationFrame(loop);
    t += 0.06;
    glow.scale.setScalar(1 + Math.sin(t) * 0.18);
    controls.update();
    update();
    renderer.render(scene, camera);
  }
  loop();
}
