# Everything Else

Atomic has more toggles than any document can keep current, and the config grows over time. Rather than list every one, here is the general map so you can find and understand anything on your own.

## The rule of thumb

Almost every option in Atomic is one of these:

- **A toggle:** `Enabled = true` or `false`.
- **A value:** a number or slider such as distance, size, speed, or delay.
- **A toggle plus keybind:** like the combat features, it can be `Toggle` or `Hold` and gated by an FOV.

If you understand [Configuration](../configuration.md), you understand these too.

## Gun Modifications

Adjustments to how your gun behaves:

- **Spread:** reduce or remove weapon spread.
- **Fire delay:** change the delay between shots.
- **Mute Gun Sounds:** silence your own gunfire.
- **Future:** velocity based prediction applied to your targets, the offensive counterpart to Anti Future.

## Conditions

Filters for who combat features are allowed to target, for example skip friends, skip knocked players, or require line of sight (Wall Check or Visible). Set these once and every combat feature respects them.

## Misc

A grab bag of utilities. Common examples:

- **Panic Ground:** instantly drops you to the ground, bound to a key.
- **Hitbox Expander:** enlarges target hitboxes.

## Game-specific features

Some games, including Da Hood and Der Hood, have extras that only appear where they are supported. They follow the same patterns, so treat them like everything above: a toggle, a value, or a toggle plus a key.

!!! tip "When in doubt"
    Change the option in your config and watch what happens in game. Changes apply within about a second, and nothing here is permanent, so experiment freely.
