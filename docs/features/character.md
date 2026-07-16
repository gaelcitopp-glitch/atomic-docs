# Character

Defensive and movement options. These live in the `Character` section, with their keys in `Keybinds`.

## Anti Future :material-star:{ title="Flagship defensive feature" }

The headline defensive feature. It stops enemies from "futuring" you, which is when their aim leads your shots by your velocity (`serverPos + yourVelocity * factor`) to hit where you are about to be.

**How it works**

- It has support for every executor you want. It only adjusts the position your character reports to the server, with no risky internals.
- While you move, it desyncs the position the **server** sees, biased **perpendicular** to your velocity. Because prediction leads along your velocity, a sideways error cannot be cancelled out, so an enemy misses regardless of how much lead they apply.
- Locally it feels exactly like it is off. Your movement, camera, and animations stay at your real position, and there is no fling.
- A neon white **server ball** shows where the server thinks you are, along with the stud gap between you and it.
- It resists resolvers by default. The path uses a perpendicular bias, incommensurate oscillation, and a slowly wandering center, so an enemy that averages your positions still cannot recover your real spot.

**Modes**

| Mode | Behavior |
| --- | --- |
| `Orbit` | A smooth, bounded path that continuously moves your reported position so an attacker's observation is always stale by the time their shot validates. It keeps a protective floor even at rest and grows with your speed. |
| `Blink` | A hard, randomized teleport of the reported position each update, with no continuous path to track or average. Its magnitude scales with your movement speed, so it is strongest exactly when you are hardest to hit. |

**Config**

```lua
['Character'] = {
    ['Anti Future'] = {
        ['Enabled'] = true,
        ['Mode'] = 'Orbit',
        ['Studs'] = 15,
    },
},
['Keybinds'] = {
    ['Anti Future'] = 'V',
},
```

| Option | Meaning |
| --- | --- |
| `Enabled` | Master on and off for the feature. |
| `Mode` | `Orbit` for the smooth bounded path, `Blink` for the hard teleport. |
| `Studs` | The largest allowed desync. It scales up to this value as you move faster. |

!!! tip "Speed scaling"
    Both modes scale with your movement. `Blink` reaches full strength as you pick up speed, while `Orbit` keeps a protective floor even when you are standing still, so you are never fully exposed.

## Anti Aim

Feeds enemies a bad velocity so velocity based prediction whiffs. Toggle it with its keybind.

!!! warning
    Anti Aim can make your character feel floaty because it alters your reported velocity. For defense without that feeling, use **Anti Future** instead, which never touches your velocity.

## Movement

| Setting | What it does |
| --- | --- |
| `WalkSpeed` | Override your walk speed. Has its own `Activation`, for example Always or a keybind. |
| `JumpPower` | Override your jump power. |
| `Anti Fling` | Resists common fling exploits. |

These are straightforward toggles and values. Set them in your config and they apply live.

!!! note
    God Mode and some other defensive options are game specific and appear where they are supported. Any option not listed here still follows the same pattern of a toggle plus an optional keybind.
