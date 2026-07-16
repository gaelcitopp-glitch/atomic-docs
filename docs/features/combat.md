# Combat

The three main combat tools. They **all** share the targeting model from [Configuration](../configuration.md) — Mode, Activation, FOV, Distance, Hit Location, Keybind. This page just covers what each one *does* and how to set it up.

!!! tip "See where you're aiming"
    Not sure what `Head` vs `Closest Part` vs `Closest Point` actually targets? Check the interactive 3D model on the [Hit Locations](hit-locations.md) page.

## Silent Aim

Bends your shots toward the target using the game's own shooting logic (1:1 emulation), so hits register like legit shots. No visible crosshair snapping.

**Set it up**

- **Mode** — `Select` to lock who you hit, `Auto` to let it choose and switch.
- **FOV** — keep it on. This is what makes it feel controllable instead of "aimbot on everyone".
- **Hit Location** — `Head` for damage, or a bigger part if you want more forgiving registration.

!!! tip
    Silent Aim is the most popular starting point. `Select` + `Hold` + a medium FOV feels the most human.

## Trigger Bot

Fires **for you** the moment a valid target is inside the FOV. Pair it with your gun and let it click.

**Set it up**

- **Mode** — `Auto` is the natural fit (no key, it just fires when someone's in the box).
- **FOV** — smaller is better here; it decides *when* it pulls the trigger.
- Works great alongside Silent Aim (Silent aims, Trigger fires).

## Aim Assist

A softer aim helper — nudges toward the target instead of hard-locking. Good for a more subtle, legit-looking feel.

**Set it up**

- **Mode** — `Select` or `Auto`, your call.
- **FOV** — controls how close the target has to be before assist kicks in.
- **Hit Location** — usually `Head` or `HumanoidRootPart`.

---

## Which one do I use?

<div class="grid cards" markdown>

-   :material-crosshairs: **Just want to hit shots**

    ---

    **Silent Aim**, `Select`, `Hold`, medium FOV.

-   :material-flash: **Want it fully automatic**

    ---

    **Silent Aim** *(Auto)* + **Trigger Bot** *(Auto)*. Point in the general direction, it does the rest.

-   :material-feather: **Want to stay subtle**

    ---

    **Aim Assist** with a small FOV. No hard locks.

</div>

!!! note "They stack"
    You can run more than one at once. Each has its **own** Mode, FOV, and key, and each manages its **own** target — they won't fight each other.
