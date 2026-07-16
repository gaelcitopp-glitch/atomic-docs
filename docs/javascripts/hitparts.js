// Interactive 3D hit-location model for the Atomic docs.
// A faithful R15 Roblox avatar rendered in 3D. Body colors and the R15 body
// type are taken from Roblox's public avatar API (userId 1). The neon dot
// follows your MOUSE and lands on the model surface, mirroring how aim tracks
// the cursor in game.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('hp-canvas');
if (canvas && window.WebGLRenderingContext) {
  const stage   = document.getElementById('hp-stage');
  const readout = document.getElementById('hp-readout');
  const hint    = document.getElementById('hp-hint');
  const ACCENT  = 0xa855f7;
  const accentCol = new THREE.Color(ACCENT);

  // Real body colors for userId 1 from avatar.roblox.com (BrickColor -> RGB):
  // head/arms 194 Medium stone grey, torso 23 Bright blue, legs 102 Medium blue.
  const C_HEAD = 0xa3a2a5, C_ARM = 0xa3a2a5, C_TORSO = 0x0d69ac, C_LEG = 0x6e99ca;

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

  // R15 rig laid out around the origin (studs, Y up). Every entry is both a
  // visible body part and a pickable hit region, so highlighting is exact.
  const REGIONS = [
    { name: 'Head',            x: 0,    y: 2.35,  z: 0,    w: 1.15, h: 1.15, d: 1.15, color: C_HEAD },
    { name: 'UpperTorso',      x: 0,    y: 1.0,   z: 0,    w: 1.95, h: 1.3,  d: 0.95, color: C_TORSO },
    { name: 'LowerTorso',      x: 0,    y: 0.05,  z: 0,    w: 1.85, h: 0.85, d: 0.9,  color: C_TORSO },
    { name: 'HumanoidRootPart',x: 0,    y: 0.55,  z: 0,    w: 1.55, h: 1.6,  d: 0.78, core: true },
    { name: 'LeftUpperArm',    x: -1.3, y: 1.15,  z: 0,    w: 0.6,  h: 1.2,  d: 0.7,  color: C_ARM },
    { name: 'LeftLowerArm',    x: -1.3, y: 0.1,   z: 0,    w: 0.55, h: 0.95, d: 0.62, color: C_ARM },
    { name: 'LeftHand',        x: -1.3, y: -0.55, z: 0,    w: 0.55, h: 0.42, d: 0.6,  color: C_ARM },
    { name: 'RightUpperArm',   x: 1.3,  y: 1.15,  z: 0,    w: 0.6,  h: 1.2,  d: 0.7,  color: C_ARM },
    { name: 'RightLowerArm',   x: 1.3,  y: 0.1,   z: 0,    w: 0.55, h: 0.95, d: 0.62, color: C_ARM },
    { name: 'RightHand',       x: 1.3,  y: -0.55, z: 0,    w: 0.55, h: 0.42, d: 0.6,  color: C_ARM },
    { name: 'LeftUpperLeg',    x: -0.5, y: -1.2,  z: 0,    w: 0.72, h: 1.3,  d: 0.75, color: C_LEG },
    { name: 'LeftLowerLeg',    x: -0.5, y: -2.35, z: 0,    w: 0.62, h: 1.1,  d: 0.66, color: C_LEG },
    { name: 'LeftFoot',        x: -0.5, y: -2.95, z: 0.1,  w: 0.72, h: 0.42, d: 0.95, color: C_LEG },
    { name: 'RightUpperLeg',   x: 0.5,  y: -1.2,  z: 0,    w: 0.72, h: 1.3,  d: 0.75, color: C_LEG },
    { name: 'RightLowerLeg',   x: 0.5,  y: -2.35, z: 0,    w: 0.62, h: 1.1,  d: 0.66, color: C_LEG },
    { name: 'RightFoot',       x: 0.5,  y: -2.95, z: 0.1,  w: 0.72, h: 0.42, d: 0.95, color: C_LEG },
  ];

  const avatar = new THREE.Group();
  scene.add(avatar);
  const parts = {};
  for (const r of REGIONS) {
    let material;
    if (r.core) {
      material = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0, depthWrite: false });
    } else {
      material = new THREE.MeshStandardMaterial({ color: r.color, roughness: 0.55, metalness: 0.04 });
    }
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(r.w, r.h, r.d), material);
    mesh.position.set(r.x, r.y, r.z);
    mesh.name = r.name;
    mesh.userData.core = !!r.core;
    if (!r.core) mesh.userData.base = new THREE.Color(r.color);
    avatar.add(mesh);
    parts[r.name] = mesh;
  }
  const bodyParts = Object.values(parts).filter(p => !p.userData.core);

  // Classic Roblox smile so the head reads as a real avatar.
  const faceMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1f });
  for (const sx of [-0.26, 0.26]) {
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.2, 0.05), faceMat);
    eye.position.set(sx, 2.46, 0.61);
    avatar.add(eye);
  }
  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.045, 10, 24, Math.PI), faceMat);
  smile.rotation.z = Math.PI;
  smile.position.set(0, 2.18, 0.61);
  avatar.add(smile);

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

  function clearHighlights() {
    for (const name in parts) {
      const p = parts[name];
      p.material.emissive && p.material.emissive.setHex(0x000000);
      if (p.userData.core) p.material.opacity = 0;
      else p.material.color.copy(p.userData.base);
    }
  }
  function highlight(mesh) {
    if (!mesh) return;
    if (mesh.userData.core) {
      mesh.material.opacity = 0.5;
    } else {
      mesh.material.emissive.copy(accentCol);
      mesh.material.emissiveIntensity = 0.5;
      mesh.material.color.copy(mesh.userData.base).lerp(accentCol, 0.3);
    }
  }

  function update() {
    clearHighlights();
    marker.visible = false;
    raycaster.setFromCamera(mouse, camera);

    if (mode === 'ClosestPart' || mode === 'ClosestPoint') {
      if (!hasMouse) {
        readout.textContent = (mode === 'ClosestPoint' ? 'Closest Point' : 'Closest Part') + ' \u2192 move your mouse over the body';
        return;
      }
      const hits = raycaster.intersectObjects(bodyParts, false);
      if (hits.length) {
        highlight(hits[0].object);
        if (mode === 'ClosestPoint') {
          marker.position.copy(hits[0].point);
          marker.visible = true;
          readout.textContent = 'Closest Point \u2192 ' + hits[0].object.name;
        } else {
          marker.position.copy(hits[0].object.position);
          marker.visible = true;
          readout.textContent = 'Closest Part \u2192 ' + hits[0].object.name;
        }
      } else {
        readout.textContent = (mode === 'ClosestPoint' ? 'Closest Point' : 'Closest Part') + ' \u2192 aim at the body';
      }
    } else {
      const mesh = parts[mode];
      highlight(mesh);
      marker.position.copy(mesh.position);
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
