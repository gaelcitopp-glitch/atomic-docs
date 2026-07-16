# Configuration

This is the important page. The combat features all share one targeting model, so learn it once here and you are set for the whole suite.

## How settings are organized

Your config is a large table split into sections. The ones you will touch most:

| Section | What lives here |
| --- | --- |
| `Combat` | Silent Aim, Trigger Bot, Aim Assist |
| `Character` | Anti Future, Anti Aim, WalkSpeed, JumpPower, Anti Fling, and more |
| `Visuals` | ESP, target lines, the Keybinds HUD |
| `Gun Modifications` | Spread, fire delay, sound muting, prediction (Future) |
| `Keybinds` | Every key you bind |
| `Misc` | Odds and ends such as Panic Ground and Hitbox Expander |

Anything not documented here follows the same shape and idea. Set it in your config and it behaves like its neighbors.

## Modes: Select vs Auto

Every combat feature has a **Mode**. This decides how it picks a target.

=== "Select"

    You pick the target. Press your key and it locks onto whoever is nearest your crosshair, and stays on them until you release or toggle off, or they die.

    - Best for precise, deliberate play where you choose exactly who to hit.
    - Needs a keybind, which is how you lock.

=== "Auto"

    Atomic picks the target for you automatically, and keeps switching to the best one every frame.

    - Best for fast fights where you do not want to manage targets at all.
    - No key needed. Auto is always armed on its own.

!!! tip "Auto does not need a toggle"
    In **Auto** mode you do not press anything, since the target is automatic. The only time Auto uses a key is if you set its Activation to **Hold**, in which case it is active only while you hold the key. Otherwise it just runs, gated by the FOV.

## Activation: Toggle vs Hold

**Activation** decides how the key behaves.

| Type | Behavior |
| --- | --- |
| `Toggle` | Tap the key once to turn it on, tap again to turn it off. |
| `Hold` | Active only while you hold the key down. |

How Mode and Activation combine:

| Mode | Activation | What happens |
| --- | --- | --- |
| Select | Toggle | Tap the key to lock a target. Tap again to drop it. |
| Select | Hold | Locked only while holding the key. |
| Auto | Toggle or none | Always on. Auto-targets and switches by itself. The key does nothing. |
| Auto | Hold | Active only while holding, and still auto-targets. |

## FOV (Field of View)

The **FOV** is an area around your crosshair. A feature only engages targets inside its FOV.

- `Enabled` turns the FOV gate on.
- `Size` sets how big the area is on X, Y, and Z. Bigger grabs targets further from your crosshair.
- `Visible` draws the FOV on screen so you can see it.

Think of the FOV as the activation gate. Even when a feature is armed, it will not fire unless a valid target is inside the FOV. Move your crosshair off someone and it stops, put it back and it re-engages.

## Distance and Hit Location

- **Distance** is a maximum range cap. Targets past it are ignored.
- **Hit Location** is which body part to aim at, for example `Head`, `HumanoidRootPart`, `Closest Part`, or `Closest Point`. The default is `Head`. See the interactive [Hit Locations](features/hit-locations.md) model to visualize each option.

## Keybinds

Bind keys in the `Keybinds` section. Common ones:

| Bind | Used by |
| --- | --- |
| `Silent Aim`, `Trigger Bot`, `Aim Assist` | Each combat feature's own key |
| `Selection` | Shared fallback key for combat features that do not have their own |
| `Anti Aim`, `Anti Future`, `Speed`, `ESP`, `Panic Ground` | Their matching features |

A few rules that save confusion:

- If a combat feature has no key bound, it is treated as always armed and simply runs.
- A feature with its own key uses that key, otherwise it falls back to the shared `Selection` key.
- Auto with Toggle ignores the key on purpose, since it is already always on.

!!! example "A solid starter setup"
    - Silent Aim with Mode `Select`, Activation `Hold`, key `E`, and FOV on at a medium size.
    - Trigger Bot with Mode `Auto` and FOV on at a small size. No key, since it just works when someone is under your crosshair.
