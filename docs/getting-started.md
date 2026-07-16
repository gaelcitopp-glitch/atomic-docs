# Getting Started

This page takes you from nothing to in game and shooting as quickly as possible.

## What you need

- A Roblox executor. Atomic has support for every executor you want, including the lightweight ones. If you need one or want to verify it is current, check [weao.xyz](https://weao.xyz/) for official pages, pricing, and uptime.
- Your Atomic key or loader (however you normally obtain the script).
- One of the supported games open.

## Loading Atomic

1. Join the game.
2. Run your loader, or paste the script into your executor and execute.
3. Wait a second or two. Atomic boots, reads your config, and goes live.

!!! info "The config must exist before you run"
    Atomic reads its settings from an injected config table that your loader provides. If Atomic prints something like *"inject config before running the script"*, the config has not been provided yet. Make sure your loader defines it, then run again.

## Settings apply live

You do not need to re-execute after changing a setting. Atomic re-reads your config **every second**:

- Toggle a feature on or off in your config and it takes effect within about a second.
- Change a value such as a distance or FOV size and the same applies.

The only things you set once are your **keybinds** (see [Configuration](configuration.md#keybinds)).

## First-time setup checklist

- [x] Pick your **combat feature**. Most people start with Silent Aim.
- [x] Choose a **Mode**. Use `Select` to lock a target manually, or `Auto` to have it pick for you. ([What is the difference?](configuration.md#modes-select-vs-auto))
- [x] Set an **Activation** type (`Toggle` or `Hold`) and bind a key if you are using `Select`.
- [x] Enable an **FOV** so it only engages targets near your crosshair.
- [x] Optionally enable **ESP** and the **Keybinds HUD** so you can see what is active.

That is the essentials. Head to [Configuration](configuration.md) to understand each control.

!!! question "Need help?"
    Join the Atomic Discord at [discord.gg/beatomicc](https://discord.gg/beatomicc).
