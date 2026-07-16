# Everything Else

Atomic has more toggles than any doc could keep up with, and the menu grows over time. Rather than list every one (they'd go stale fast), here's the **general map** so you can find and understand anything on your own.

## The rule of thumb

Almost every option in Atomic is one of these:

- **A toggle** — `Enabled = true/false`.
- **A value** — a number/slider (distance, size, speed, delay...).
- **A toggle + keybind** — same as the combat features: it can be `Toggle`/`Hold` and gated by an FOV.

If you understand [Configuration](../configuration.md), you understand these too.

## Gun Modifications

Tweaks to how your gun behaves, emulated 1:1 with the game:

- **Spread** — reduce/remove weapon spread.
- **Fire delay** — change the delay between shots.
- **Mute Gun Sounds** — silence your own gunfire.
- **Future** — velocity-based prediction applied to *your* targets (the offensive counterpart to Anti Future).

## Conditions

Filters for **who** combat features are allowed to target — e.g. skip friends, skip knocked players, require line of sight ("Wall Check"/"Visible"), etc. Set these once and every combat feature respects them.

## Misc

Grab-bag of utilities. Examples you'll commonly see:

- **Panic Ground** — instantly drops you to the ground (bound to a key).
- **Hitbox Expander** — enlarges target hitboxes.

## Game-specific features

Some games (Da Hood, Der Hood, and others) have their own extras that only appear where they're supported. They still follow the same patterns, so treat them like everything above: toggle, value, or toggle + key.

!!! tip "When in doubt"
    Open the option in the menu, change it, and watch what happens in-game — changes apply within ~1 second. Nothing here is permanent, so experiment freely.
