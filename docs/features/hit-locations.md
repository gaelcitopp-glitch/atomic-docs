# Hit Locations

Every combat feature aims at a **Hit Location**, a body part on your target. The model below is interactive so you can see exactly what each option resolves to on Roblox's official Classic avatar model.

Drag to orbit the model. Move your mouse over the body to drive **Closest Part** and **Closest Point**, the same way your cursor drives aim in game. The neon dot is the resolved aim position.

<div class="hp-wrap">
  <div class="hp-stage" id="hp-stage">
    <canvas id="hp-canvas"></canvas>
    <div class="hp-readout" id="hp-readout">Hit Location &rarr; Head</div>
    <div class="hp-hint" id="hp-hint">drag to orbit &middot; move mouse to aim</div>
  </div>
  <div class="hp-buttons" id="hp-buttons">
    <button type="button" data-mode="Head" class="hp-btn is-active">Head</button>
    <button type="button" data-mode="UpperTorso" class="hp-btn">Upper Torso</button>
    <button type="button" data-mode="LowerTorso" class="hp-btn">Lower Torso</button>
    <button type="button" data-mode="HumanoidRootPart" class="hp-btn">HumanoidRootPart</button>
    <button type="button" data-mode="ClosestPart" class="hp-btn">Closest Part</button>
    <button type="button" data-mode="ClosestPoint" class="hp-btn">Closest Point</button>
  </div>
</div>

<script type="importmap">{ "imports": { "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js", "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/" } }</script>
<script type="module" src="../../javascripts/hitparts.js"></script>

## What each option targets

| Option | Resolves to | Best for |
| --- | --- | --- |
| **Head** | The head part, centered. | Maximum damage per shot. |
| **Upper / Lower Torso** | The chest or stomach part. | A larger, more forgiving target. |
| **HumanoidRootPart** | The core part inside the torso that the character is built around. | The most reliable registration, since it is always present and never animates away. |
| **Closest Part** | Whichever named part is nearest your cursor at that moment. | Following wherever you point without committing to one part. |
| **Closest Point** | The exact point on the surface of that part nearest your cursor, shown by the neon dot. | The most precise option, hugging the geometry instead of a part center. |

!!! tip "Closest Part vs Closest Point"
    Closest Part selects a whole part and aims at its center. Closest Point goes one step finer and aims at the nearest spot on that part's surface. Select **Closest Point** and move your mouse across the model to watch the dot slide along the geometry.

!!! note "Where to set this"
    In your config it lives under each feature as `Hit Location`. It behaves identically for **Silent Aim**, **Trigger Bot**, and **Aim Assist**. See [Configuration](../configuration.md) and [Combat](combat.md).
