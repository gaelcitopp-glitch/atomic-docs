// Interactive 3D hit-location model for the Atomic docs.
// Blocky R15 Roblox-style avatar; the center crosshair drives Closest Part /
// Closest Point exactly like the cursor drives aim in-game.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('hp-canvas');
if (canvas && window.WebGLRenderingContext) {
  const stage   = document.getElementById('hp-stage');
  const readout = document.getElementById('hp-readout');
  const hint    = document.getElementById('hp-hint');
  const ACCENT  = 0xa855f7;
  const accentCol = new THREE.Color(ACCENT);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(2.5, 0.8, 12);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 7;
  controls.maxDistance = 18;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.1;
  controls.target.set(0, -0.2, 0);
  controls.addEventListener('start', () => { if (hint) hint.style.opacity = 0; });

  scene.add(new THREE.HemisphereLight(0xffffff, 0x1a1a26, 1.15));
  const key = new THREE.DirectionalLight(0xffffff, 1.5); key.position.set(5, 9, 7); scene.add(key);
  const rim = new THREE.DirectionalLight(ACCENT, 0.9);  rim.position.set(-6, 2, -5); scene.add(rim);

  const SKIN = 0xf4d47c, SHIRT = 0x6d28d9, PANTS = 0x24242e;
  const avatar = new THREE.Group();
  scene.add(avatar);
  const parts = {};

  function addPart(name, w, h, d, x, y, z, color) {
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.04 });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    mesh.name = name;
    mesh.userData.base = new THREE.Color(color);
    avatar.add(mesh);
    parts[name] = mesh;
    return mesh;
  }

  // Blocky R15 rig (torso near origin).
  addPart('LowerTorso', 1.85, 0.9,  0.9,  0,   -0.05, 0, SHIRT);
  addPart('UpperTorso', 1.95, 1.25, 0.98, 0,    1.05, 0, SHIRT);
  addPart('Head',       1.2,  1.2,  1.2,  0,    2.35, 0, SKIN);
  addPart('LeftUpperArm',  0.62, 1.2,  0.72, -1.3, 1.15, 0, SHIRT);
  addPart('LeftLowerArm',  0.56, 0.95, 0.64, -1.3, 0.1,  0, SHIRT);
  addPart('LeftHand',      0.56, 0.42, 0.6,  -1.3, -0.55,0, SKIN);
  addPart('RightUpperArm', 0.62, 1.2,  0.72,  1.3, 1.15, 0, SHIRT);
  addPart('RightLowerArm', 0.56, 0.95, 0.64,  1.3, 0.1,  0, SHIRT);
  addPart('RightHand',     0.56, 0.42, 0.6,   1.3, -0.55,0, SKIN);
  addPart('LeftUpperLeg',  0.72, 1.3,  0.78, -0.5, -1.2, 0, PANTS);
  addPart('LeftLowerLeg',  0.62, 1.15, 0.68, -0.5, -2.4, 0, PANTS);
  addPart('LeftFoot',      0.72, 0.44, 0.98, -0.5, -3.1, 0.08, PANTS);
  addPart('RightUpperLeg', 0.72, 1.3,  0.78,  0.5, -1.2, 0, PANTS);
  addPart('RightLowerLeg', 0.62, 1.15, 0.68,  0.5, -2.4, 0, PANTS);
  addPart('RightFoot',     0.72, 0.44, 0.98,  0.5, -3.1, 0.08, PANTS);

  // HumanoidRootPart: translucent core inside the torso, only shown when picked.
  const hrp = addPart('HumanoidRootPart', 1.55, 1.6, 0.78, 0, 0.55, 0, ACCENT);
  hrp.material.transparent = true;
  hrp.material.opacity = 0.0;
  hrp.userData.core = true;

  // Simple face so the head reads correctly.
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x15151d });
  for (const sx of [-0.26, 0.26]) {
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.22, 0.05), eyeMat);
    eye.position.set(sx, 2.45, 0.61);
    avatar.add(eye);
  }

  // Neon aim marker.
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0xffffff }));
  marker.visible = false; scene.add(marker);
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.27, 20, 20),
    new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.35 }));
  marker.add(glow);

  const raycaster = new THREE.Raycaster();
  const center = new THREE.Vector2(0, 0);
  const bodyParts = () => Object.values(parts).filter(p => !p.userData.core);
  let mode = 'Head';

  function clearHighlights() {
    for (const name in parts) {
      const p = parts[name];
      p.material.emissive.setHex(0x000000);
      p.material.emissiveIntensity = 1;
      if (p.userData.core) p.material.opacity = 0.0;
      else p.material.color.copy(p.userData.base);
    }
  }

  function highlight(mesh) {
    if (!mesh) return;
    if (mesh.userData.core) {
      mesh.material.opacity = 0.55;
      mesh.material.emissive.copy(accentCol);
      mesh.material.emissiveIntensity = 0.85;
    } else {
      mesh.material.emissive.copy(accentCol);
      mesh.material.emissiveIntensity = 0.55;
      mesh.material.color.copy(mesh.userData.base).lerp(accentCol, 0.28);
    }
  }

  function update() {
    clearHighlights();
    marker.visible = false;
    raycaster.setFromCamera(center, camera);

    if (mode === 'ClosestPart' || mode === 'ClosestPoint') {
      const hits = raycaster.intersectObjects(bodyParts(), false);
      if (hits.length) {
        const hit = hits[0];
        highlight(hit.object);
        if (mode === 'ClosestPoint') {
          marker.position.copy(hit.point);
          marker.visible = true;
          readout.textContent = 'Closest Point \u2192 ' + hit.object.name;
        } else {
          readout.textContent = 'Closest Part \u2192 ' + hit.object.name;
        }
      } else {
        readout.textContent = (mode === 'ClosestPoint' ? 'Closest Point' : 'Closest Part') + ' \u2192 aim at the body';
      }
    } else {
      const mesh = parts[mode];
      highlight(mesh);
      const c = new THREE.Vector3();
      mesh.getWorldPosition(c);
      marker.position.copy(c);
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
