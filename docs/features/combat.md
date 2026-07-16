# Combat

The three main combat tools. They all share the targeting model from [Configuration](../configuration.md): Mode, Activation, FOV, Distance, Hit Location, and Keybind. This page covers what each one does and how to set it up.

!!! tip "See where you are aiming"
    Not sure what `Head`, `Closest Part`, and `Closest Point` resolve to? Explore the interactive 3D model on the [Hit Locations](hit-locations.md) page.

## Silent Aim

Bends your shots toward the target using the game's own shooting logic, so hits register like legitimate shots with no visible crosshair snapping.

**Set it up**

- **Mode:** `Select` to lock who you hit, `Auto` to let it choose and switch.
- **FOV:** keep it on. This is what keeps it controllable rather than locking onto everyone.
- **Hit Location:** `Head` for damage, or a larger part for more forgiving registration.

!!! tip
    Silent Aim is the most popular starting point. `Select` with `Hold` and a medium FOV feels the most natural.

## Trigger Bot

Fires for you the moment a valid target is inside the FOV. Pair it with your gun and let it click.

**Set it up**

- **Mode:** `Auto` is the natural fit. No key, it simply fires when someone is in the box.
- **FOV:** smaller is better here, since it decides when the trigger is pulled.
- Works well alongside Silent Aim, where Silent Aim handles aiming and Trigger Bot handles firing.

## Aim Assist

A softer aim helper that nudges toward the target instead of hard locking. Good for a more subtle, legitimate feel.

**Set it up**

- **Mode:** `Select` or `Auto`, your preference.
- **FOV:** controls how close the target must be before assist engages.
- **Hit Location:** usually `Head` or `HumanoidRootPart`.

## Which one should I use?

<div class="grid cards" markdown>

-   :material-crosshairs: **Just want to hit shots**

    ---

    **Silent Aim**, `Select`, `Hold`, medium FOV.

-   :material-flash: **Want it fully automatic**

    ---

    **Silent Aim** in Auto plus **Trigger Bot** in Auto. Point in the general direction and it does the rest.

-   :material-feather: **Want to stay subtle**

    ---

    **Aim Assist** with a small FOV and no hard locks.

</div>

!!! note "They stack"
    You can run more than one at once. Each has its own Mode, FOV, and key, and each manages its own target, so they will not fight each other.
