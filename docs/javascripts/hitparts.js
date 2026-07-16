// Interactive 3D hit-location model for the Atomic docs.
// The body is Roblox's official Classic avatar mannequin (ClassicMannequin.fbx,
// a genuine 1:1 Roblox model) rendered with FBXLoader. If it cannot load, a
// built-in R15 rig is used instead so the page always works. Invisible region
// boxes drive part selection and highlighting; the neon dot follows your MOUSE
// and lands on the model surface, mirroring how aim tracks the cursor in game.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

const canvas = document.getElementById('hp-canvas');
if (canvas && window.WebGLRenderingContext) {
  const AV = '../../assets/avatar/';
  const stage   = document.getElementById('hp-stage');
  const readout = document.getElementById('hp-readout');
  const hint    = document.getElementById('hp-hint');
  const ACCENT  = 0xa855f7;
  const accentCol = new THREE.Color(ACCENT);

  // Real body colors for userId 1 from avatar.roblox.com (BrickColor -> RGB).
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

  scene.add(new THREE.HemisphereLight(0xffffff, 0x1a1a26, 1.2));
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.5); keyLight.position.set(5, 9, 7); scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(ACCENT, 0.85);  rimLight.position.set(-6, 2, -5); scene.add(rimLight);

  // R15 hit regions (studs, Y up). Invisible boxes used for picking + highlight.
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

  // Visual body (real Roblox mannequin, or the fallback rig).
  const body = new THREE.Group();
  scene.add(body);
  let bodyMeshes = [];

  function buildFallbackRig() {
    for (const r of REGIONS) {
      if (r.core) continue;
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(r.w, r.h, r.d),
        new THREE.MeshStandardMaterial({ color: r.color, roughness: 0.55, metalness: 0.04 })
      );
      mesh.position.set(r.x, r.y, r.z);
      body.add(mesh);
      bodyMeshes.push(mesh);
    }
    addFace();
  }

  function addFace() {
    const faceMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1f });
    for (const sx of [-0.26, 0.26]) {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.2, 0.05), faceMat);
      eye.position.set(sx, 2.46, 0.61);
      body.add(eye);
    }
    const smile = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.045, 10, 24, Math.PI), faceMat);
    smile.rotation.z = Math.PI;
    smile.position.set(0, 2.18, 0.61);
    body.add(smile);
  }

  function setupReal(root) {
    // Normalize orientation (some FBX export Z-up) and scale to the rig height.
    let box = new THREE.Box3().setFromObject(root);
    let size = new THREE.Vector3(); box.getSize(size);
    if (size.z > size.y * 1.25) {
      root.rotation.x = -Math.PI / 2;
      root.updateMatrixWorld(true);
      box = new THREE.Box3().setFromObject(root); box.getSize(size);
    }
    const scale = size.y > 0 ? (5.8 / size.y) : 1;
    root.scale.setScalar(scale);
    root.updateMatrixWorld(true);
    box = new THREE.Box3().setFromObject(root);
    const c = new THREE.Vector3(); box.getCenter(c);
    root.position.set(-c.x, -c.y, -c.z);
    root.traverse(o => {
      if (o.isMesh) {
        o.material = new THREE.MeshStandardMaterial({ color: 0xb9bec6, roughness: 0.62, metalness: 0.04 });
        bodyMeshes.push(o);
      }
    });
    body.add(root);
    addFace();
  }

  new FBXLoader().load(AV + 'ClassicMannequin.fbx', setupReal, undefined, buildFallbackRig);

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
      if (!hasMouse) {
        readout.textContent = (mode === 'ClosestPoint' ? 'Closest Point' : 'Closest Part') + ' \u2192 move your mouse over the body';
        return;
      }
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
