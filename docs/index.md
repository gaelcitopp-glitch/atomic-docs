<div class="hero" markdown>

# Atomic

<p class="tagline">A fast, clean combat suite built on 1:1 game emulation. This is a focused setup guide, not a wall of text.</p>

</div>

Welcome. These docs cover how to configure Atomic and what the main features do. They are not an exhaustive list of every toggle. The in game menu evolves continuously, so anything not covered here follows the same patterns you will learn on the [Configuration](configuration.md) page.

!!! tip "Read this first"
    If you read one page, make it [Configuration](configuration.md). Once *Modes*, *Activation*, *FOV*, and *Keybinds* make sense, every combat feature falls into place.

## What is Atomic?

Atomic is built on **1:1 game emulation**. It replicates the game's own aim, shoot, and spread logic rather than faking it, so shots behave like the real thing. It is engineered to run cleanly with support for every executor you want, from high end down to the lightweight ones. This is the only place these docs get into how the emulation works; everything after this is about using it.

## Jump in

<div class="grid cards" markdown>

-   :material-rocket-launch: **[Getting Started](getting-started.md)**

    ---

    Load the script, confirm your config is injected, and get in game.

-   :material-cog: **[Configuration](configuration.md)**

    ---

    The core concepts: Select vs Auto, Toggle vs Hold, FOV, and Keybinds.

-   :material-target: **[Combat](features/combat.md)**

    ---

    Silent Aim, Trigger Bot, and Aim Assist, the three main combat tools.

-   :material-shield-account: **[Character](features/character.md)**

    ---

    Anti Future, Anti Aim, movement, and more.

</div>

## How the settings work

- Everything is driven by a **config table** the loader injects. The in game UI writes to it.
- Settings are grouped into **sections**: `Combat`, `Character`, `Visuals`, `Keybinds`, `Gun Modifications`, `Misc`, and so on.
- Changes apply **live**. Atomic re-reads the config every second, so there is no need to reinject.
- The three combat features (**Silent Aim**, **Trigger Bot**, **Aim Assist**) share the same targeting model, so learning one teaches you all three.

<span class="pill">Note</span> Feature names and layout can differ slightly between games (Da Hood, Der Hood, and others). The concepts stay the same.

## Community and executors

- **Discord:** join [discord.gg/beatomicc](https://discord.gg/beatomicc) for support, updates, and status.
- **Need an executor?** Use [weao.xyz](https://weao.xyz/) to find official executor pages, pricing, and live uptime, and to confirm your executor is up to date.

!!! warning "Disclaimer"
    Atomic is provided for educational purposes. Using it may violate a game's Terms of Service. You use it at your own risk.
