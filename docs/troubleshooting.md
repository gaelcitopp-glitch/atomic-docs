# Troubleshooting

Quick fixes for the issues people actually run into.

## "Inject config before running the script"

Your config table is not populated yet. Open the menu, let it save your settings, then run Atomic again. Atomic needs the config to exist first.

## A setting is not doing anything

- Give it about a second. Atomic re-reads the config on an interval, so it is not instant.
- Confirm the feature's `Enabled` flag is on.
- If it is a combat feature, make sure a target is inside its FOV, which is the activation gate.
- If it uses a key, confirm the keybind is set and you are using the right Activation (`Toggle` or `Hold`).

## A combat feature locks onto one person and will not switch

You are probably in **Select** mode, which is meant to be sticky. Switch the Mode to **Auto** if you want it to pick and re-target automatically. See [Modes](configuration.md#modes-select-vs-auto).

## "I have to press a key in Auto mode"

You should not. Auto is always armed unless its Activation is set to **Hold**. If it is `Auto` with `Toggle`, the key is intentionally ignored. Just move your crosshair and it works.

## It is slow to load or freezes on startup

- Atomic supports lighter executors, but **Skin Changer** and **Unlock All** are heavy. They only load when enabled, so if startup is rough, avoid enabling them unless you need them.
- Try a fresh inject after fully rejoining the game.

## Getting hit through Anti Future

- Increase `Studs` a little for a larger gap.
- Try `Blink` mode for a harder, harder to predict desync at speed.

## Shots not registering

- Check your **Hit Location**. Aiming at an obstructed part can whiff.
- Make sure any **Wall Check** or **Visible** condition is not filtering out targets you expect to hit.
- Confirm you are on a supported game for that feature.

!!! question "Still stuck?"
    Re-read [Configuration](configuration.md). Most "it is not working" reports turn out to be a Mode, Activation, or FOV mismatch. If you are still stuck, ask in the Atomic Discord at [discord.gg/beatomicc](https://discord.gg/beatomicc).
