# Configuration

This is the important page. The combat features all share **one targeting model**, so learn it once here and you're set for the whole cheat.

## How settings are organized

Your config is a big table split into sections. The ones you'll touch most:

| Section | What lives here |
| --- | --- |
| `Combat` | Silent Aim, Trigger Bot, Aim Assist |
| `Character` | Anti Future, Anti Aim, WalkSpeed, JumpPower, Anti Fling, etc. |
| `Visuals` | ESP, target lines, the Keybinds HUD |
| `Gun Modifications` | Spread, fire delay, sound muting, prediction ("Future") |
| `Keybinds` | Every key you bind |
| `Misc` | Odds and ends (Panic Ground, Hitbox Expander, ...) |

Anything not documented here follows the same shape and idea — poke it in the menu, it'll behave like its neighbors.

---

## Modes: Select vs Auto

Every combat feature has a **Mode**. This decides *how it picks a target*.

=== "Select"

    **You** pick the target. Press your key and it locks onto whoever's nearest your crosshair, and **stays** on them (sticky) until you release/toggle off or they die.

    - Best for: precise, deliberate play — you choose exactly who to hit.
    - Needs a keybind (that's how you lock).

=== "Auto"

    **Atomic** picks the target for you, automatically, and **keeps switching** to the best one every frame.

    - Best for: fast fights / lazy mode — you don't manage targets at all.
    - **No key needed.** Auto is always armed on its own.

!!! tip "The big one: Auto doesn't need a toggle"
    In **Auto** mode you don't press anything — the target is automatic. The **only** time Auto uses a key is if you set its Activation to **Hold** (then it's active only while you hold the key). Otherwise it just runs, gated by the FOV.

## Activation: Toggle vs Hold

**Activation** decides *how the key behaves*.

| Type | Behavior |
| --- | --- |
| `Toggle` | Tap the key once to turn it on, tap again to turn it off. |
| `Hold` | Active only while you're holding the key down. |

How Mode and Activation combine:

| Mode | Activation | What happens |
| --- | --- | --- |
| Select | Toggle | Tap key → lock target. Tap again → drop it. |
| Select | Hold | Locked only while holding the key. |
| Auto | Toggle *(or none)* | **Always on.** Auto-targets and switches by itself. Key does nothing. |
| Auto | Hold | Active only while holding; still auto-targets. |

## FOV (Field of View)

The **FOV** is a box/area around your crosshair. A feature only engages targets **inside** its FOV.

- `Enabled` — turn the FOV gate on.
- `Size` — how big the box is (X/Y/Z). Bigger = grabs targets further from your crosshair.
- `Visible` — draw the FOV on screen so you can see it.

Think of FOV as the **activation gate**: even when a feature is armed, it won't fire unless a valid target is inside the FOV. Walk your crosshair off someone and it stops; put it back and it re-engages.

## Distance & Hit Location

- **Distance** — a max range cap. Targets past it are ignored.
- **Hit Location → Part** — which body part to aim at (e.g. `Head`, `HumanoidRootPart`, `Closest Part`, `Closest Point`). Default is `Head`. See the interactive [Hit Locations](features/hit-locations.md) model to visualize each option.

## Keybinds

Bind keys in the `Keybinds` section. Common ones:

| Bind | Used by |
| --- | --- |
| `Silent Aim` / `Trigger Bot` / `Aim Assist` | Each combat feature's own key |
| `Selection` | Shared fallback key for combat features that don't have their own |
| `Anti Aim`, `Anti Future`, `Speed`, `ESP`, `Panic Ground` | Their matching features |

A few rules that save confusion:

- If a combat feature has **no key bound**, it's treated as **always armed** (it just runs).
- A feature with its own key uses that; otherwise it falls back to the shared `Selection` key.
- **Auto + Toggle** ignores the key on purpose (it's already always on).

!!! example "A solid starter setup"
    - Silent Aim → Mode `Select`, Activation `Hold`, key `E`, FOV on (medium size).
    - Trigger Bot → Mode `Auto`, FOV on (small size). No key — it just works when someone's under your crosshair.
