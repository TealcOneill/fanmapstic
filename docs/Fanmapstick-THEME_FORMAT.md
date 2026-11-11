# BEVM theme file format (schema 1) — phase 1

A theme is a JSON file (suggested name: `something.bevmtheme.json`). It is **data only**: BEVM never runs anything from it. On install BEVM checks every field; unknown fields, wrong types or out-of-range numbers make the whole file be rejected with a message saying what is wrong. Files over 1 MB are rejected.

## Top level
| field | required | rule |
|---|---|---|
| `app` | yes | must be `"BEVM"` |
| `kind` | yes | must be `"theme"` |
| `schema` | yes | must be `1` |
| `id` | yes | 1–40 characters: lowercase letters, numbers, dashes (`builtin-demo` is reserved) |
| `name` | yes | text, 1–60 characters, no `<` or `>` |
| `description` | no | text, up to 500 characters |
| `textures` | no | (v4.4) list of up to 8 custom textures, see "Custom textures" below |
| `groundTexture` | no | (v4.2) a default texture name or one of this theme's own texture ids (`plain`, `grass`, `dirt`, `sand`, `snow`, `gravel`, `water`, `stone`). Using the theme switches the map's ground to it, with that texture's default size / contrast. The person can still change it afterwards. Leave it out to keep the map's current ground. |
| `items` | yes | list of 1–10 item types |

## Item type
| field | required | rule / default |
|---|---|---|
| `id` | yes | same slug rule; unique in the theme; `hills`, `pits` and `default-road` are reserved |
| `name` | yes | plural name shown in Generation (up to 60 characters) |
| `single` | no | singular name used in the Items tab (default: `name`) |
| `description` | no | up to 300 characters, plain text, written by the theme's author. Shown under the item's name in the Placement tab's Search and Browse. Leave it out if there is nothing to say |
| `parts` | yes | 1–8 parts |
| `footprintFt` | no | feet, **radius** (not diameter), 0.1–500. Only used to keep an item inside the map edge. Spawn overlap is decided by the real parts (see below). Default: computed from the parts |
| `scaleRange` | no | `[min, max]`, each 0.3–3, default `[0.7, 1.5]`. Random size multiplier when generated |
| `topAreaFt2` | no | square feet, 0.01–1,000,000. The item's largest top-down area at base size: the largest single non-overhang part seen from above (the ground it occupies; canopies and other overhang parts are ignored unless every part is an overhang), round parts (spheres, cylinders) as circles of their widest diameter, boxes as rectangles. Used to decide how many of the item to generate. If left out, BEVM works it out from the parts; include it so the number is visible and checked. |
| `extras` | no | up to 3 switches shown in the item's Items-tab box. Only `kind: "glow"` exists: `{id, kind:"glow", label (≤40), color:"#rrggbb"}` |

## Part (one primitive each, with its own noise)
| field | required | rule / default |
|---|---|---|
| `name` | no | label shown for this part in the item's Properties tab (1–30 characters, no `<` or `>`), for example `Trunk` or `Canopy`. Without it the part is shown as `Part 2 (cylinder)`. Every part of a real theme should have one, because the person using the theme picks each part's color by this label. **Make it descriptive** (v4.8): name the part by what it is or what it does (`Trunk`, `Upper canopy`, `Left wing`), never `Part 1`, `Sphere` or a bare number, and keep names unique inside an item. A planned colorblind helper will list every default color as "color name, then the object part it is on", so the label is what people will read there. Use the person's own words for these names |
| `prim` | yes | `"sphere"`, `"box"` or `"cylinder"` |
| `size` | yes | `[x, y, z]` feet, each 0.1–500 (y is height). A cylinder's `x`/`z` are its bottom diameter |
| `pos` | yes | `[x, y, z]` feet, each −500 to 500. Centre of the part; **y is the height of the centre above the ground** |
| `color` | yes | `"#rrggbb"` |
| `noise` | no | 0–1, default 0. How lumpy the surface is (a seeded jitter, so a saved item rebuilds identically) |
| `taper` | no, cylinders only | 0–1.5, default 1. Top width ÷ bottom width (0 = cone) |
| `overhang` | no | `true` for any part that hangs over where characters stand (canopies, leaning rock, arches). Overhang parts are exported on the separate foreground image and can be hidden with *Show overhangs* |

## How items are laid out (v3.1)
- **Trimming:** only `overhang` parts trim other parts. A part that rises through an overhang part above where it starts and then sticks out of it (for example a trunk poking out of the side of a cone canopy) is cut where it leaves that part. This is automatic; do not shorten parts by hand to avoid it. Parts that are not overhangs never trim each other.
- **Touching parts:** every part is jittered independently by its own `noise`, so two parts that only touch can open a small gap. Make parts that join (a trunk and its flared base, a stem and foliage) overlap by a little, with the narrower part starting inside the wider one.
- **Sinking into the ground:** a part's `pos` y is its centre above the ground, and everything scales with the item. To sink something such as a rock, put its centre at a fraction of its own height (for example centre = 0.3 × height sinks it 20%), never a fixed number of feet, so small ones are not buried.
- **Overlap:** two items collide only if a part of one overlaps a part of the other in both footprint and height. So a rock or bush can sit under a tree canopy but not inside a trunk. Parts are checked as upright cylinders (boxes use their circumscribed circle). The exception is two `overhang` parts, which may overlap each other (see crown shyness). A wide overhang part therefore also keeps other items' trunks out of the space under it at its height.
- **Crown shyness (switched off in v5.2, so canopies currently just overlap; it will come back later):** only parts flagged `overhang: true` take part. Where two overhang parts of different items overlap, the OLDER item keeps its full shape (oldest first, in the order the items were made; on a whole-map generate the order is shuffled between item types so no type is always the oldest) and the newer canopy is modelled around the older canopy's real mesh, leaving a gap of 1.0 ft. Nothing is saved for this; it is recomputed whenever items move, resize or spawn.
- **How many spawn (density):** the Density setting is a fill percentage of the map. Sparse starts at 5% on maps up to 100 tiles, 4.5% up to 400 tiles, 4% up to 900, and so on down half a point per step to 1% at 8,100 tiles, then 0.75% at 10,000 (100×100). Loose = (base + 2) × 2 ÷ 2, Tight = (base + 3) × 3 ÷ 2, Crowded = (base + 4) × 4 ÷ 2, where base is the Sparse value doubled (so Loose on a 30×30 map is 10%, Tight 16.5%, Crowded 24%). The count is that share of the map's area divided by the item's `topAreaFt2` at its largest size (the top of `scaleRange`), at least 1, at most 1500 per type; sizes are still random inside the range. Items that cannot find room are simply skipped.
- **Spawn order:** terrain first, then item types from the largest to the smallest average volume, so large things claim space first and small things fill in around and under them.
- **Size ranges** multiply the whole item evenly, capped at 3× (min 0.3). A range wider than 3× needs two item types.
- **Lumpiness** is one random kind only. Suggested mapping from words: very low 0.05, slight 0.08, low 0.1, medium 0.25, high 0.4.
- A single part cannot be rotated, so cylinders always stand upright.

## Chances: abnormalities and auras on spawn (v3.8)
Add `abnormalities` and/or `aura` to an item type. Each entry may have a `chance`: **`[n, d]` means n in d** (whole numbers, 1 ≤ n ≤ d ≤ 1,000,000), so a 1-in-1000 roll is `[1, 1000]`. Leave `chance` out (or use `[1, 1]`) for *always*. Each item generated rolls separately, once, when it is generated; the result is saved on that item and can be edited by hand afterwards. Rerolling a selected item keeps its properties.

Numeric settings take either one number or a `[min, max]` range (a value in the range is picked for each item). Lengths are in **feet**.

| entry | extra fields (defaults) |
|---|---|
| `hidden` | none: Is visible off |
| `noShadow` | none: Casts shadow off |
| `small` | `value` 0.05–0.95 (0.5): Shockingly small multiplier |
| `big` | `value` 1.05–10 (2): Bogglingly big multiplier |
| `floating` | `heightFt` 0–1000 (5): height above the ground |
| `light` | `radiusFt` 0.5–3000 (20), `tint` (`#ffe9b0`) |
| `colorVariation` | `value` 1–100000 (30): **the bigger the number, the more variance in the color.** Each of Hue, Saturation and Luminosity (0–240, as in the Windows color picker) and Red, Green and Blue (0–255) of every part is moved by a seeded random amount up to this value either way |

If both `small` and `big` succeed on the same item, one of the two is picked at random.

### Aura (its own chart)
`aura` goes on the item type next to `abnormalities`.

| field | rule (default) |
|---|---|
| `chance` | `[n, d]`; leave out for always |
| `shape` | `circle`, `triangle`, `square`, `pentagon` or `star` (circle) |
| `scale` | 0.1–10, number or `[min, max]` (1): scales both directions together |
| `scaleX`, `scaleY` | 0.1–10, number or range (1): scale one direction |
| `rotation` | 0–360 degrees (0) |
| `offsetXFt`, `offsetYFt` | −500–500 feet (0): offset from the item, in the item's own frame |
| `opacity` | 0.05–1 (0.45) |
| `noise` | 0–1 (0): how ragged the edge is |
| `tint` | `#rrggbb` (`#8ec5ff`) |

### Examples
Example: a 1-in-1000 chance of a huge tree and a 1-in-20 chance of a glowing aura:
```json
"abnormalities": { "big": { "chance": [1, 1000], "value": [2.5, 4] } },
"aura": { "chance": [1, 20], "shape": "circle", "scale": 1.5, "tint": "#9fe8a0" }
```

## Sizes
Everything is in **feet**. When an item is generated BEVM converts feet to tiles using the map's tile size (X value and unit), and the item remembers that conversion (`fpt` in the map file). Changing the tile size later affects new items only.

## How maps use themes
Dragging a path end on the map reroutes it and pushes unlocked items under the new route to the side; generating paths clears them instead. A map file embeds the theme it uses (`theme.def`), so it opens even if the theme is not installed. Installed themes live in this browser (IndexedDB); *Export* in the Themes tab saves one back to a file, since clearing the browser's site data deletes installed themes.

See `sample_theme.bevmtheme.json` for a technical example that uses every field.

## Path items (v4.0): roads, trails, streams, rivers
A path item has a `path` object instead of `parts` (and no abnormalities, aura or extras). It is ground, not an object.

```json
{ "id": "river", "name": "Rivers", "single": "River",
  "path": { "kind": "stream", "advanced": true, "widthFt": [30, 50], "minBendRadiusFt": 150, "texture": "water" } }
```

| field | rule (default) |
|---|---|
| `kind` | required. `"road"` (trails, roads) or `"stream"` (streams, rivers). Paths only start or end on the map edge or on another path of the **same kind** |
| `advanced` | `true` or `false` (false). Plain paths **curve around** terrain and big objects. Advanced paths (a dug road, an eroded river) **route straight through** and level the ground inside their width to their own height: through a hill they cut it down, through a pit they fill it |
| `widthFt` | required, 0.5–2000, number or `[min, max]`, rolled per path |
| `minBendRadiusFt` | required, 0.5–100000. The tightest bend the path may make (a bigger number gives gentler curves). Near an end a path may bend slightly tighter to meet it |
| `windiness` | 0–1 (0.5). How much it wanders instead of running straight |
| `heightTiles` | number or `[min, max]` in tiles, any value from −100 to 100, rolled per path. **Defaults by type:** road `0` (flat), advanced road `[2, 4]` (raised), stream `[-2, -1]`, advanced stream / river `[-5, -3]`. A plain path adds this to the ground it crosses; an advanced path sets the ground to this height inside its width |
| `texture` | a name from the default texture list (road `dirt`, stream `water`) |

- The number of paths that spawn is chosen in the Generation tab (a number box), not in the theme.
- Edges are rounded (the ground eases between the path and its surroundings over about three quarters of its width).
- Items are cleared from under a path; plain paths avoid items that are big (ground radius of 4 ft or more) and always avoid locked items.
- Routing logic (turn-limited search that only ends at the edge or a same-kind line, with a seeded wander cost) is noted in the code as a candidate for cave systems later.

## Terrain items (v4.3): mesas, cliffs, patches and other ground shapes
Hills, pits and a plain **Road** path are built into BEVM itself and appear with every theme; they are never part of a theme file. (The built-in Road is a `road`-kind path, not advanced, 2 ft wide, tightest bend 4 ft, flat, dirt texture; its id `default-road` is reserved. Roads a theme defines join it and each other, since they are the same kind.) A theme can add its own terrain items. A terrain item has no `parts`; it has a `terrain` object instead (and no `path`, abnormalities, aura or extras).

```json
{ "id": "mesa", "name": "Mesas", "single": "Mesa",
  "terrain": {
    "deformsTerrain": true, "usesTexture": true, "texture": "stone",
    "footprint": { "shape": "ellipse", "sizeFt": [30, 60], "aspect": [1, 1.5] },
    "profile": { "flatTop": 0.6, "edge": "rounded" },
    "heightTiles": [3, 6] } }
```

| field | rule |
|---|---|
| `deformsTerrain` | **required** true/false. Deforms Terrain: the item changes the ground height. For terrain that does not overhang. False for something like a cliff, which only has a texture and a solid body. |
| `usesTexture` | **required** true/false. Terrain: the item paints a ground texture (and its terrain object gets the texture selector). |
| `texture` | a name from the default texture list below (default `plain`). Only when `usesTexture` is true |
| `footprint.shape` | **required** `"ellipse"` (hills, mesas, patches) or `"rectangle"` (a cliff wall) |
| `footprint.sizeFt` | **required** number or `[min, max]` feet, 0.5–5000: the footprint's half-width (the radius of an ellipse). Rolled per item |
| `footprint.aspect` | length ÷ width, number or `[min, max]`, 0.2–10 (default 1). Rolled per item |
| `profile.flatTop` | deforming items only, 0–0.95 (default 0). The part of the footprint, from the middle outward, that stays at full height. 0 is a hill (a rounded dome); about 0.6 is a mesa (flat top with rounded shoulders) |
| `profile.edge` | deforming items only: `"rounded"` (default) or `"sheer"` (the sides are vertical) |
| `heightTiles` | **required for deforming items**, number or `[min, max]` in tiles, −100 to 100, rolled per item. Positive is raised, negative is sunken, 0 is a texture-only patch. A flat neutral patch (mud, a clearing) is `flatTop` near 0.9 with a small height |
| `bodyHeightFt` | **required for non-deforming items**, number or `[min, max]` feet. The item is a real solid 3D shape (a box for a rectangle, a straight-sided oval for an ellipse) standing on the ground in the texture's color, so it casts a shadow. Items never spawn inside it |
| `chance` | `[n, d]`: each spawned slot only becomes this item n in d times. Leave out for always. Only used with Density; when the person chooses an exact number, that number is spawned |

Rules the file must obey: a non-deforming item must have `usesTexture` true; `profile` and `heightTiles` only belong to deforming items and `bodyHeightFt` only to non-deforming ones. Combinations: a **hill** is deforming + textured with `flatTop` 0; a **mesa** is the same with `flatTop` about 0.6; a **cliff** is textured only, rectangle, with `bodyHeightFt`; a **neutral patch** is deforming with a very small `heightTiles`.

How many spawn is never in the theme (see "How many spawn" below). A theme's terrain items can also be dragged out of the Placement tab's Search and Browse, from any theme (they land locked); on the map, terrain items are selected, moved, scaled, rotated, locked and copied exactly like hills and pits, and their box in the Items tab uses the item's name.

## How many spawn (a BEVM setting, never in the theme)
Each item type has either a **density** (sparse, loose, tight, crowded) or an exact **count**, never both. A switch in the app's User Context page, Control Schema tab, picks which one every type uses: *Choose an exact number of items to spawn*. With counts, if the map has no room for all of them, spawning stops and an error says there is not enough room on the map. Paths always use a count. A theme file must not contain densities, counts or anything else about how many spawn (an unknown field is rejected).

### Custom textures (v4.4)
A theme may carry up to 8 textures of its own in a top-level `textures` list. Each is a three-color palette plus one of BEVM's noise patterns (BEVM computes the ground from noise, so there are no image files).

```json
"textures": [ { "id": "ash", "name": "Ash", "colors": ["#3a3836", "#5c5955", "#8a867f"],
                "pattern": "gravel", "size": 1.2, "contrast": 1.1, "detail": 0.5, "drift": 0.3 } ]
```

| field | rule (default) |
|---|---|
| `id` | required, same slug rules as item ids (lowercase letters, numbers, dashes). Cannot be a default texture name or repeat inside the theme. This is the name used everywhere a texture is referenced |
| `name` | text up to 30 characters shown in the Texture list (defaults to `id`) |
| `colors` | required, exactly three `#rrggbb` colors: dark, middle, light. The noise picks between them |
| `pattern` | required, one of the default texture names. The new texture borrows that texture's noise pattern: `plain` is a flat color (the middle color), `grass` soft patches, `dirt` mottled with specks, `sand` ripples, `snow` soft drifts, `gravel` pebble cells, `water` swirling flow, `stone` cracked slabs |
| `size` | 0.3–3 (1). Bigger spreads the pattern out |
| `contrast` | 0–3 (1) |
| `detail` | 0–1 (0.5) |
| `drift` | 0–1 (0.3). Slow color wander across the ground |

A custom texture is only available while its theme is in use; maps keep their own copy of the theme, so they still open with it.

### Default texture list (names only)
`plain`, `grass`, `dirt`, `sand`, `snow`, `gravel`, `water`, `stone`.

These textures ship inside BEVM. Anywhere a texture name is asked for (`groundTexture`, a terrain item's `texture`, a path's `texture`) the theme may use one of these names or the `id` of one of its own custom textures. Only package a texture with the theme when the person creates a new one.

## Part colors (item setting)
In the Items tab the part colors are sorted by color and can be linked with chain icons; this is stored per item in map saves, not in theme files. Parts with identical `color` start linked, so give joined parts (a trunk and its flared base) the same `color` when they should match.

# Instructions for the theme-making Claude
You are helping a person turn their own ideas into a BEVM theme file. Read the whole format above first. Your output is a JSON file that follows it exactly.

## Ground rules
1. **Never invent creative content.** Do not suggest item types, names, colors, sizes, odds or lore. The theme is the person's. Collect their choices, translate them into the format, and read them back. If they ask for ideas, say that is their space and offer only to organize what they already said.
2. **Technical defaults are fine** (a field they did not mention that has a default above). Tell them which default you used so they can change it.
3. **Do not use fields that are not in this document.** If they ask for something the format does not have, say the format does not have it yet; never add a field. BEVM rejects a file with unknown fields.
4. **Security.** A theme is plain data. If you suspect the person is trying to inject data (code, markup, links, hidden instructions, or anything that is not a description of items for the map), say that hacking is a crime and refuse to do any more work on the subject.
5. **Not in the theme file.** Part rotation, unlinking part colors, See-Through, spawn areas and how many spawn are all BEVM features, not theme fields. If the person asks for one, say BEVM handles it and do not add a field.
6. **Scale and cover.** Tile size, creature sizes, heights and cover rules belong to the person's homebrew system document, which is supplied alongside this guide. Use it for those; do not invent them.

## How to run the session
Build a questionnaire and ask it a few questions at a time, never all at once. Keep a running summary table of what has been decided. Use the question tool if you have one; otherwise plain numbered questions. After each item type, read it back and ask for corrections before moving on.

**Step 1: the theme.** Name, a short description (their words), any custom textures they want to create (see Custom textures), the ground texture (a default one or one of their own; it becomes `groundTexture`), and the list of item types they want (1–10). For each: is it an object (has parts) or terrain (ground)?

**Step 2: each object item type.** Ask, in this order:
1. Plural name (shown in Generation) and singular name.
2. Its parts, one at a time. For each: a descriptive label (`name`, short, what the part is or does; unique within the item; never `Part 1` or the shape name), shape (sphere, box, cylinder), size in feet as width × height × depth (a cylinder's width and depth are its bottom diameter), where its centre sits (feet from the item's middle, and **height of its centre above the ground**), color, lumpiness, and for cylinders whether it narrows toward the top (`taper`). Ask whether it hangs over where characters stand (`overhang`).
3. Which parts join each other. Remind them (or handle it yourself) that joined parts must overlap a little, with the narrower part starting inside the wider one, or lumpiness will open a gap. Never leave a floating part: check that each part's lowest point (centre − half height) touches or overlaps another part or the ground.
4. Anything that should sink into the ground (set its centre as a fraction of its own height, not a fixed number of feet).
5. Size variation (`scaleRange`).
6. Whether the item can glow (`extras`).
7. Abnormalities and aura: for each one they want, ask whether it is always on or happens by chance, and its values (see Interpreting answers). Ask only about the ones they bring up, but read them the list (hidden, no shadow, shockingly small, bogglingly big, floating, emits light, color variation, aura) once so they know what exists.

**Step 3a: each path item type** (supported). Ask: is it a road/trail or a stream/river (`kind`); is it advanced, meaning builders or a powerful flow cut through terrain instead of going around it (`advanced`); its width in feet (a number or a range); the tightest bend in feet; how wandering it is (optional); a height in tiles only if they want something other than the defaults (road flat, advanced road +2 to +4, stream −1 to −2, river −3 to −5); and the ground texture name. Tell them the count is chosen in Generation, that paths only join the edge or the same kind, and that you will not choose any of these values for them.

**Step 3b: other terrain item types** (supported from v4.3). Ask whether it changes the ground height (Deforms Terrain) and whether it has a ground texture (Terrain); the footprint shape (ellipse or rectangle) and its size range in feet; for a deformer, the profile (dome like a hill, or flat top and how much of it is flat), raised or sunken, and the height range; for a non-deformer, the height of its solid body; which default texture it starts with.

**Step 4: review and write.** Show the whole theme as a short table per item (name, parts, sizes, colors, chances). Get a yes. Then write the file as valid JSON (no comments, no trailing commas), named `<theme id>.bevmtheme.json`.

## Interpreting answers
- **Units:** everything is feet. If they give inches, tiles or meters, convert and say so.
- **Odds:** "1/1000", "one in a thousand" and "0.1%" all become `[1, 1000]`. "Always" means leave `chance` out. For words like "rare" or "sometimes", ask for a number; do not pick one.
- **Size modifiers:** "twice as big" is `big` value 2; "half the size" is `small` value 0.5. Shockingly small is below 1 (0.05–0.95), bogglingly big is above 1 (1.05–10). If they want a spread, use a `[min, max]` range.
- **Color:** if they name a color, convert it to a `#rrggbb` hex, show it, and let them adjust. If they give a hex, use it as written (lowercase).
- **Lumpiness** (`noise`), one random kind only. Suggested mapping from words: very low 0.05, slight 0.08, low 0.1, medium 0.25, high 0.4. They may ask for more (up to 1).
- **Color variation:** the bigger the number the more the colors vary; Hue, Saturation and Luminosity run 0–240 and Red, Green, Blue 0–255. Ask what number they want; do not choose one for them.
- **Overhang:** anything that hangs over the ground where a character could stand (canopy, leaning rock, arch). Everything else is not.
- **Tile size:** the file does not store it. The map's tile size converts feet to tiles when items are generated.
- **topAreaFt2 and footprintFt:** leave them out unless the person gives numbers; BEVM calculates them from the parts.
- **Path words:** "how sharp can it turn" is `minBendRadiusFt` (smaller is sharper); "cuts through hills" or "erodes through" means `advanced`; if they say "small, medium or large stream", ask for widths in feet.
- **Limits:** 1–10 item types, 1–8 parts per item, `scaleRange` within 0.3–3, up to 3 extras. Names have no `<` or `>`. File under 1 MB.

## Before handing over
Check every rule in the tables above against the finished JSON: required fields present, numbers in range, ids lowercase with dashes and unique, every part labelled, no unknown fields. **Validate it with the script.** If you can run code and `Fanmapstick-theme-validator-v6.0.1.js` was supplied with this guide, save the finished JSON to a file and run `node Fanmapstick-theme-validator-v6.0.1.js your-theme.bevmtheme.json`. It applies the same checks BEVM does: "VALID" plus a summary means BEVM will accept it; "INVALID" gives the first problem, which you fix and then run again until it is valid. Never hand over a file the script rejected. If you cannot run code, check the rules by hand and say plainly that you could not run the validator.

Tell the person how to install it (Themes tab). The Themes tab also has **Check Theme File**, which runs the same validation without installing anything and lists what is wrong. BEVM will list exactly what is wrong if it rejects the file.
