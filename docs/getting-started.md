# Getting Started

This page gets you from "nothing" to "in-game and shooting" as fast as possible.

## What you need

- A Roblox executor (Atomic is built to run even on the weaker ones).
- Your Atomic key / loader (however you normally get the script).
- One of the supported games open.

## Loading Atomic

1. Join the game.
2. Run your loader / paste the script in your executor and execute.
3. Wait a second or two — Atomic boots, reads your config, and you're live.

!!! info "The config has to exist before you run"
    Atomic reads its settings from an injected config table. Your loader/UI handles this for you. If Atomic prints something like *"inject config before running the script"*, it means the UI hasn't populated your settings yet — open the menu, let it save, then re-run.

## Settings apply live

You don't need to re-execute after changing a setting. Atomic re-reads your config **every second**, so:

- Toggle something in the menu → it takes effect within ~1s.
- Change a value (like a distance or FOV size) → same deal.

The only things you set once are your **keybinds** (see [Configuration](configuration.md#keybinds)).

## First-time setup checklist

- [x] Pick your **combat feature** (most people start with Silent Aim).
- [x] Choose a **Mode** — `Select` if you want to lock a target manually, `Auto` if you want it to pick for you. ([What's the difference?](configuration.md#modes-select-vs-auto))
- [x] Set an **Activation** type (`Toggle` or `Hold`) and bind a key if you're using `Select`.
- [x] Turn on an **FOV** so it only engages targets near your crosshair.
- [x] (Optional) Enable **ESP** and the **Keybinds HUD** so you can see what's active.

That's it. Head to [Configuration](configuration.md) to actually understand those knobs.
