<div class="hero" markdown>

# Atomic

<p class="tagline">The fast, clean, 1:1 emulation cheat. This is the short guide to setting it up — not a wall of text.</p>

</div>

Welcome. These docs cover **how to configure Atomic** and what the **main features** actually do. They do **not** try to document every single toggle — the config menu changes and grows all the time, so anything not covered here follows the same patterns you'll learn on the [Configuration](configuration.md) page.

!!! tip "Read this first"
    If you only read one page, make it **[Configuration](configuration.md)**. Once you get how *Modes*, *Activation*, *FOV*, and *Keybinds* work, every combat feature clicks into place.

## What is Atomic?

Atomic is a feature set built around **1:1 game emulation** — it replicates the game's own aim/shoot/spread logic instead of faking it, so shots behave like the real thing. It's tuned to run well even on weaker executors.

## Jump in

<div class="grid cards" markdown>

-   :material-rocket-launch: **[Getting Started](getting-started.md)**

    ---

    Load the script, make sure your config is injected, and get in-game.

-   :material-cog: **[Configuration](configuration.md)**

    ---

    The core concepts: Select vs Auto, Toggle vs Hold, FOV, and Keybinds.

-   :material-target: **[Combat](features/combat.md)**

    ---

    Silent Aim, Trigger Bot, and Aim Assist — the three main combat tools.

-   :material-shield-account: **[Character](features/character.md)**

    ---

    Anti Future (with the anti-resolver), Anti Aim, movement, and more.

</div>

## How the settings work (30-second version)

- Everything is driven by a **config table** the loader injects (the in-game UI writes to it).
- Settings are grouped into **sections**: `Combat`, `Character`, `Visuals`, `Keybinds`, `Gun Modifications`, `Misc`, and so on.
- Changes apply **live** — Atomic re-reads the config every second, so you don't need to reinject.
- The three combat features (**Silent Aim / Trigger Bot / Aim Assist**) all share the same targeting model, so once you learn one you know all three.

<span class="pill">Note</span> Feature names and layout may differ slightly between games (Da Hood, Der Hood, etc.). The concepts stay the same.

!!! warning "Disclaimer"
    Atomic is provided for educational purposes. Using it may violate a game's Terms of Service. You use it at your own risk.
