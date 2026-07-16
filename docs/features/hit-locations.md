# Hit Locations

Every combat feature aims at a **Hit Location** — a body part on your target. Below is a live 3D model so you can *see* exactly what each option targets.

**Drag to rotate.** The crosshair in the middle is *your aim* — the model reacts to it just like the cheat reacts to your cursor in-game.

<div class="hp-wrap">
  <div class="hp-stage" id="hp-stage">
    <canvas id="hp-canvas"></canvas>
    <div class="hp-crosshair" aria-hidden="true"></div>
    <div class="hp-readout" id="hp-readout">Hit Location &rarr; Head</div>
    <div class="hp-hint" id="hp-hint">drag to rotate</div>
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

## What each option does

| Option | What it aims at | Good for |
| --- | --- | --- |
| **Head** | The head part, dead center. | Max damage per shot. |
| **Upper / Lower Torso** | The chest / stomach part. | Bigger, more forgiving target. |
| **HumanoidRootPart** | The invisible core part inside the torso (the "root" the character is built around). | The most reliable registration — it's always there and never animates away. |
| **Closest Part** | Whichever **named part** is nearest your crosshair *right now*. | Follows wherever you point — you don't commit to one body part. |
| **Closest Point** | The exact **point on the surface** of that part nearest your crosshair (the neon dot). | The most precise option — hugs the geometry instead of snapping to a part's center. |

!!! tip "Closest Part vs Closest Point"
    - **Closest Part** picks a whole *part* and aims at it.
    - **Closest Point** goes one step finer and aims at the closest *spot on that part's surface*. Rotate the model with **Closest Point** selected and watch the dot slide across the geometry — that's the difference.

!!! note "Where to set this"
    In your config it's under each feature: `Hit Location → Part`. It works the same for **Silent Aim**, **Trigger Bot**, and **Aim Assist** — see [Configuration](../configuration.md) and [Combat](combat.md).
