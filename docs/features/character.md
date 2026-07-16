# Character

Defensive and movement stuff. Lives in the `Character` section (and keys in `Keybinds`).

## Anti Future :material-star:{ title="Flagship defensive feature" }

The headline defensive feature. It stops enemies from **"futuring"** you — that's when their aim leads your shots by your velocity (`serverPos + yourVelocity × factor`) to hit where you're *about* to be.

**How it works (short version)**

- It's **hookless** — no metamethod hooks, just clean position work.
- While you move, it desyncs the position the **server** sees, aimed **perpendicular** to your velocity. Since their prediction leads *along* your velocity, a sideways error can't cancel out — they miss no matter how much lead they use.
- Locally it feels **exactly like it's off**: your movement, camera, and animations stay at your real position. No fling.
- A neon-white **"server" ball** shows where the server thinks you are, plus the stud gap between you and it.

**Anti-Resolver (built in)**

Simple jitter is easy to beat — an enemy "resolver" just averages your positions to find the real one. Atomic's desync uses a **biased, time-correlated** offset (a side-bias that swings slowly with a randomized rate, plus fresh per-tick noise) so averaging lands *off* your real spot and can't lock on.

**Config**

```lua
Character = {
    ['Anti Future'] = {
        Enabled = true,
        Studs = 4,            -- max desync in studs (scales 0 → this by movement)
        AntiResolver = true,  -- optional, default true
    },
},
Keybinds = {
    ['Anti Future'] = 'V',    -- toggle key (leave unset to run while enabled)
},
```

| Option | Meaning |
| --- | --- |
| `Enabled` | Master on/off for the feature. |
| `Studs` | Biggest allowed desync. It scales from **0 (standing still)** up to this value as you move faster. |
| `AntiResolver` | Keep `true`. Set `false` to fall back to plain jitter (not recommended). |

!!! tip "Why standing still = 0 studs"
    When you're not moving there's no velocity to lead, so there's nothing to defend against — the desync drops to 0 and the ball sits right on you. You get full comfort and only pay the desync when it actually matters.

## Anti Aim

Feeds enemies a **bad velocity** so velocity-based prediction whiffs. Toggle it with its keybind.

!!! warning
    Anti Aim can make your character feel floaty/janky because it messes with your replicated velocity. If you want defense **without** that feeling, use **Anti Future** instead — it never touches your velocity.

## Movement

| Setting | What it does |
| --- | --- |
| `WalkSpeed` | Override your walk speed. Has its own `Activation` (e.g. Always / keybind). |
| `JumpPower` | Override your jump power. |
| `Anti Fling` | Resists common fling exploits. |

These are straightforward toggles/values — flip them in the menu and they apply live.

!!! note
    God Mode and some other defensive tricks are game-specific (they show up where they're supported). If you see one that's not listed here, it still follows the same "toggle + optional keybind" pattern.
