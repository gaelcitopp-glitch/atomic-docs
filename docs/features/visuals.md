# Visuals

Everything you *see* — ESP, on-screen info, and skins.

## ESP

Highlights players so you always know where everyone is.

- Toggle with the `ESP` keybind (or its `Enabled` flag).
- Typical options: names, boxes, and a **target line** to whoever you're currently locked onto.
- Colors and what's shown are configurable in the menu.

## Keybinds HUD

A small on-screen panel (the `Display Keybinds` / Visuals option) that shows your enabled features and their state — handy for knowing at a glance whether Silent Aim is armed, who you're tracking, and so on.

## FOV circles

If you enable `Visible` on a feature's FOV, its box/area is drawn on screen. Great while dialing in FOV sizes so you can *see* exactly where each feature engages.

## Skin Changer / Unlock All

Cosmetic changer for weapons/skins.

!!! info "It loads lazily on purpose"
    The skin system is heavy, so Atomic only spins it up **when you actually enable** Skin Changer or Unlock All — this keeps startup fast and avoids freezes on weaker executors. If you don't use it, it costs you nothing.

- Turn it on and pick your skins in the menu.
- Knife skins are handled from a built-in list (no heavy module loading), so they won't crash weak executors.

!!! note
    Skins are client-side visuals. They change how things look for you; they don't affect damage or hit registration.
