# Editing a Fanmapstick theme by hand

A guide for people. It shows you how to open a theme file, change it safely, check it, and put it back into BEVM (the map maker inside Fanmapstick) without needing to know how to code. It explains how the file works; every choice about what goes in your theme stays yours.

The exact list of every field and its limits is in `Fanmapstick-THEME_FORMAT.md`. This guide is the friendly walk-through; that file is the rulebook. When the two seem to disagree, the rulebook wins.

---

## 1. What a theme file is

A **theme** (a *map theme*, to be exact) is a small text file that tells BEVM what kinds of things it can scatter on a map: trees, rocks, bushes, roads, rivers, hills and so on. Each kind of thing is an **item type**, and each object is built out of one to eight simple shapes called **parts** (spheres, boxes and cylinders).

- The file name ends in `.bevmtheme.json`, for example `my-forest.bevmtheme.json`.
- It is **data only**. Nothing in it can run, so editing one cannot hurt your computer or the app. If you make a mistake, BEVM simply refuses the file and tells you what is wrong.
- A theme does **not** change how the app looks. Dark, Light and Parchment (and fonts and text colors) are separate settings in Control Schema > Accessibility, and a theme file cannot touch them.
- A theme does **not** say how many things appear. That is the Density setting (or an exact count) in the Generation tab.

## 2. What you need

- **A plain text editor.** Notepad, TextEdit (set to plain text), or any code editor will do. Do not use a word processor like Word: it swaps normal quotes for curly "smart quotes", which break the file.
- **A copy of a theme to start from.** Easiest is the Themes tab in BEVM: press **Export** on an installed theme and save the file. Or start from one of the files in the repo's `themes/` folder, or from the tiny starter in section 4.
- **BEVM open in a browser**, so you can check your work.

## 3. The safe way to work

1. **Make a copy first.** Keep the original untouched. Name your copy something new.
2. **Change the copy's `id` and `name`** (see section 6) so the copy and the original are easy to tell apart in the Themes tab.
3. **Make one small change at a time.** Save.
4. **Press "Check Theme File…"** in the Themes tab, on the **Install** sub-tab, and pick your file. It checks the file without installing it and tells you what is wrong, or lists what is inside. This takes a second and never changes anything.
5. When it says the file is fine, press **"Install Theme File…"** (same sub-tab), then choose the theme in Generation > Theme (or press **Use** in the Themes tab) and Generate a map to see it.
6. Repeat from step 3.

Two things to remember:

- **Installed themes live inside your browser.** Clearing the site data for the page deletes them. Keep your `.bevmtheme.json` file as the real copy, and use **Export** to save anything you only have inside the app.
- **A map keeps its own copy of the theme it was made with.** If you edit a theme and re-install it, a map you made earlier may still show the old version. Look at the change on a fresh map.

If you work outside the app, there is also a command-line checker, the theme validator (`Fanmapstick-theme-validator-vX.Y.js`). It needs Node.js and is run like this:

```
node Fanmapstick-theme-validator-v6.1.js my-forest.bevmtheme.json
```

It runs the same checks as the app and prints `VALID` with a summary, or `INVALID` and the first problem. You do not need it if you use the app's Check Theme File button.

## 4. JSON in five minutes

A theme file is written in a format called JSON. It has only a few rules, and almost every mistake comes from breaking one of them.

| Rule | Example |
|---|---|
| Text goes in straight double quotes. | `"name": "Posts"` |
| Numbers have no quotes. | `"noise": 0.1` |
| Colors are text, so they have quotes, and are written `#` followed by six letters or digits. | `"color": "#808080"` |
| `true` and `false` are lowercase and have no quotes. | `"overhang": true` |
| A list uses square brackets, with commas between the items. | `"size": [2, 6, 2]` |
| A thing with named fields uses curly braces. Fields are `"name": value`, separated by commas. | `{ "id": "post", "name": "Posts" }` |
| **A comma goes between things, never after the last one.** | see below |
| **No comments.** You cannot leave notes inside the file. | |

Spaces, tabs and line breaks do not matter; they only make the file easier to read.

Here is the smallest theme BEVM will accept. It is a single post made of one gray cylinder. Every word and number in it is a placeholder for you to replace.

```json
{
  "app": "BEVM",
  "kind": "theme",
  "schema": 1,
  "id": "my-first-theme",
  "name": "My First Theme",
  "description": "Replace this with your own words.",
  "items": [
    {
      "id": "post",
      "name": "Posts",
      "single": "Post",
      "parts": [
        {
          "name": "Post body",
          "prim": "cylinder",
          "size": [2, 6, 2],
          "pos": [0, 3, 0],
          "color": "#808080"
        }
      ]
    }
  ]
}
```

The first three lines (`app`, `kind`, `schema`) must be exactly as shown. They are how BEVM knows the file is one of its themes.

### The mistakes everyone makes

| What happened | What you see | The fix |
|---|---|---|
| A comma after the last thing in a list or block (`"color": "#808080",` with nothing after it) | "the file is not valid JSON" | Delete the last comma |
| A missing comma between two things | "the file is not valid JSON" | Add the comma |
| A missing closing `}` or `]`, or one too many | "the file is not valid JSON" | Count them: every `{` needs a `}` and every `[` needs a `]`. A code editor highlights the matching one when you click next to a bracket |
| Curly "smart" quotes from a word processor | "the file is not valid JSON" | Use a plain text editor and retype the quotes |
| A color written without the `#`, or as a word (`gray`) | "color must be a color like #8a8a8a" | Use `#` and six characters |
| A field BEVM does not know (for example `"density": 5`) | "has an unknown field" | Delete it. See section 10 |
| An id with capital letters or spaces | "id must be 1-40 characters: lowercase letters, numbers and dashes" | `my-theme`, not `My Theme` |
| A number outside its allowed range | for example "size[1] must be a number from 0.1 to 500" | Use a number inside the range |
| A number written in quotes (`"6"`) | a message such as "size[0] must be a number from 0.1 to 500" | Remove the quotes |

BEVM reports the **first** problem it finds. Fix it, check again, and the next one (if any) appears. You can paste the whole file into an online "JSON validator" too, but the app's Check Theme File is better because it also knows BEVM's own rules.

## 5. How an object is built, with a real example

Everything is measured in **feet**. By default one tile on the map is 3 feet, but you never have to convert: BEVM does that when it generates items.

Each part has:

| field | meaning |
|---|---|
| `name` | a label shown in the item's Properties tab. Make it describe what the part is (`Trunk`, `Left wing`), never `Part 1` or `Sphere`, and keep names unique inside one item. People who use your theme choose each part's color by this label |
| `prim` | the shape: `"sphere"`, `"box"` or `"cylinder"` |
| `size` | `[x, y, z]` in feet: width, **height**, depth. A cylinder's `x` and `z` are its bottom diameter |
| `pos` | `[x, y, z]` in feet: where the part's **center** is. `x` and `z` are measured from the item's middle; **`y` is the height of the part's center above the ground** |
| `color` | `"#rrggbb"` |
| `noise` | optional, 0 to 1: how lumpy the surface is. 0 is smooth |
| `taper` | optional, cylinders only, 0 to 1.5: top width divided by bottom width. 1 is straight, 0 is a cone |
| `overhang` | optional, `true` for anything that hangs over where characters could stand (canopies, leaning rock, arches) |

### The one formula that matters

> **`pos` y = the part's bottom + half of its height**

A part's center is not its bottom. If you want a part to sit on the ground, its center must be half its height up. Here is the conifer from the built-in Squat Forest theme, worked out:

| Part | height (`size` y) | `pos` y | bottom | top |
|---|---|---|---|---|
| Flared base | 7.5 | 3.75 | 0 (on the ground) | 7.5 |
| Trunk | 63.75 | 35.625 | 3.75 | 67.5 |
| Canopy | 60 | 45 | 15 | 75 |

Look at how the parts connect: the trunk starts at 3.75, inside the base (which reaches up to 7.5), and the canopy starts at 15, inside the trunk (which reaches up to 67.5). **Parts that join must overlap a little.** Every part has its own lumpiness, so two parts that only just touch can open a small gap. Start the narrower part inside the wider one.

Other things worth knowing:

- **Floating parts.** Check that each part's bottom touches the ground (bottom = 0) or overlaps another part. A part whose bottom is above everything else floats.
- **Sinking something into the ground** (for example a rock). Put its center at a fraction of its own height, such as 0.3 times its height, never a fixed number of feet. A fixed number buries small ones completely when the item is scaled down.
- **Overhang** matters for the export. Overhang parts go on a separate foreground image and can be hidden with *Show overhangs*. They are also allowed to overlap each other, and other items can stand under them.
- **Two items collide** only if a part of one overlaps a part of the other both sideways and in height. So a small item can sit under a tree canopy but not inside the trunk.

## 6. Recipes: common edits

Always make the edit, save, and press **Check Theme File**.

### Change a color
Find the part and change its `"color"`. Use any color picker to find a `#rrggbb` code (most image editors and many websites show it). Parts with the same color start out **linked** in the Items tab, so give joined parts (a trunk and its flared base) the same color if they should match.

### Rename the theme or an item
Change `"name"`. The **`id`** is different: it is the item's behind-the-scenes name. It must be lowercase letters, numbers and dashes only, unique inside the theme, and (for the theme itself) up to 40 characters. Give a copy of a theme a new `id` so the two do not get mixed up. A few ids are reserved and cannot be used for your own items: `hills`, `pits` and `default-road` (and `builtin-demo` for a theme).

### Make an item bigger or smaller overall
Two ways:
- Change the item's **`scaleRange`**, for example `[0.7, 1.5]`. Each item that is generated gets a random size multiplier between those two numbers. The allowed range is 0.3 to 3.
- Change the parts' own `size` and `pos` numbers. If you do, change them **together** (multiply every size and every `pos` y by the same number), or parts will stop lining up.

### Add a part
Copy one whole part block (from its `{` to its `}`), paste it after the last part with a comma between, and change its numbers. Remember the bottom-plus-half-height rule. An item can have up to 8 parts.

### Remove a part
Delete its whole block, and remove the comma that is left over.

### Add a new item type
Copy a whole item block (from the `{` that starts it, through its closing `}`), paste it after the last item with a comma between, then change its `id`, `name`, `single` and parts. A theme can have up to 10 item types.

### Delete an item type
Delete its whole block and the leftover comma. A theme needs at least one item.

### Say how an item can vary
- `"scaleRange": [min, max]` for size (above).
- `"noise"` on each part for lumpiness. Suggested words to numbers: very low 0.05, slight 0.08, low 0.1, medium 0.25, high 0.4. You can go up to 1.
- `"extras"` adds up to three switches in the item's box. The only kind is a glow: `{ "id": "glow", "kind": "glow", "label": "Glows", "color": "#ffe9b0" }`.

### Make something rare, huge, glowing and so on
Abnormalities and an aura are rolled once for each item when it is generated. Each can have a `chance`, written **`[n, d]`, meaning n in d**. One in a thousand is `[1, 1000]`. Leave `chance` out for "always".

```json
"abnormalities": { "big": { "chance": [1, 1000], "value": [2.5, 4] } },
"aura": { "chance": [1, 20], "shape": "circle", "scale": 1.5, "tint": "#9fe8a0" }
```

The kinds are `hidden`, `noShadow`, `small`, `big`, `floating`, `light` and `colorVariation`. The format file lists the extra fields each one takes and their ranges. To turn "1 in 50" or "2 percent" into a pair: 1 in 50 is `[1, 50]`, and 2 percent is 2 in 100, which is `[2, 100]`.

### Set the ground
At the top level add `"groundTexture": "grass"` (any of `plain`, `grass`, `dirt`, `sand`, `snow`, `gravel`, `water`, `stone`). Using the theme switches the map's ground to it, and people can still change it afterward. Leave the line out to leave the ground alone.

### Add your own ground texture
A theme can carry up to 8. Each is three colors (dark, middle, light) plus the name of one of the built-in noise patterns to borrow:

```json
"textures": [ { "id": "ash", "name": "Ash", "colors": ["#3a3836", "#5c5955", "#8a867f"],
                "pattern": "gravel", "size": 1.2, "contrast": 1.1, "detail": 0.5, "drift": 0.3 } ]
```

Then use its `id` (`"ash"`) wherever a texture name is asked for: `groundTexture`, a path's `texture`, or a terrain item's `texture`.

### Roads, streams and rivers
These are **path** items. They have a `path` block instead of `parts`:

```json
{ "id": "river", "name": "Rivers", "single": "River",
  "path": { "kind": "stream", "advanced": true, "widthFt": [30, 50], "minBendRadiusFt": 150, "texture": "water" } }
```

`kind` is `"road"` or `"stream"`. `advanced: true` means the path cuts straight through terrain instead of going around it. `widthFt` and `minBendRadiusFt` (the tightest bend, in feet; a smaller number turns sharper) are required. How many paths appear is set in the Generation tab, not in the file.

### Mesas, cliffs and other ground shapes
These are **terrain** items, with a `terrain` block instead of `parts`. Two required yes/no settings do most of the work: `deformsTerrain` (does it change the ground height?) and `usesTexture` (does it paint a ground texture?). Read the "Terrain items" section of the format file before editing these; they have a few rules about which fields belong together, and the check will tell you if you break one.

## 7. Two numbers to update when you change parts

Each item may carry `footprintFt` and `topAreaFt2`:

- `footprintFt` is a **radius** in feet that keeps the item inside the map edge. In the Squat Forest conifer it is 9.375, the radius of the widest part (the 18.75-foot-wide canopy).
- `topAreaFt2` is the item's largest top-down area in square feet, **not counting overhang parts** (canopies and so on). BEVM uses it to decide how many of the item fit at each density. For a round part it is the circle's area: the conifer's widest ground part is the 8-foot base, and 3.14159 × 4 × 4 = 50.27.

Both are optional. **If you change an item's parts and leave old numbers here, BEVM will use the old numbers.** The simplest fix is to delete both lines; BEVM works them out from the parts. If you want them written down, recalculate them.

## 8. Converting units

- **Tiles to feet:** multiply by the tile size. At the default of 3 feet per tile, a 10-tile-wide item is 30 feet wide. The file stores feet only; the map's tile size converts when items are generated.
- **Inches to feet:** divide by 12. **Meters to feet:** multiply by 3.28.
- **Colors:** if you only have a color's name, use a color picker to get its `#rrggbb` code. Lowercase is fine.

## 9. When it does not look right

| What you see | Likely cause |
|---|---|
| Check Theme File shows an error | Read the message. It names the item and part ("Item 1 part 1 ..."): item 1 is the first block in `items`, part 1 is the first in its `parts`. Fix that one, then check again |
| The theme is installed but the map shows nothing new | The theme is not the one in use (choose it in Generation > Theme, or press **Use**), or the map is an old one that keeps its own copy. Try a fresh map |
| A gap or a see-through line between two parts | They only touch. Make the narrower one start inside the wider one |
| A part hovers in the air | Its center is too high. Use bottom plus half-height |
| Something is half buried | Its center is too low, or you used a fixed number for a sunk part instead of a fraction of its height |
| Too many or too few items | That is the Density setting (or an exact count) in the Generation tab, not the theme. An item with a bigger `topAreaFt2` fits fewer |
| A smooth part looks lumpy or a lumpy part looks smooth | `noise` on that part. 0 is smooth |
| You added `extras`, `abnormalities` or an `aura` to a path item and it was refused ("Item 2 is a path, so it has no parts, abnormalities, aura or extras") | Only parts-based items take those. Path and terrain items do not |

## 10. What a theme file cannot do

BEVM rejects any field it does not know, so there is no way to add one. These are things people often ask a theme to do that belong to the app instead:

- how many of an item appear (Density or exact count, in Generation),
- rotating a single part, or unlinking part colors (the Items tab),
- the app's look, font, text size or interface colors (Control Schema > Accessibility),
- cover rules, creature sizes and other rules of your game system. Those belong to your system's rules, not to the theme.

## 11. Checklist before you install

- [ ] The first lines are `app`: `"BEVM"`, `kind`: `"theme"`, `schema`: `1`.
- [ ] Theme `id` and every item `id` are lowercase letters, numbers and dashes, and are unique.
- [ ] 1 to 10 items; 1 to 8 parts in each object item.
- [ ] Every part has a descriptive, unique `name`.
- [ ] Every color is `"#rrggbb"` in quotes.
- [ ] Every part's bottom (center minus half its height) touches the ground or overlaps another part, and joined parts overlap a little.
- [ ] Parts that hang over where characters stand are marked `"overhang": true`.
- [ ] No leftover or missing commas, and the brackets match.
- [ ] Old `footprintFt` and `topAreaFt2` numbers deleted or recalculated if you changed the parts.
- [ ] **Check Theme File** says it is fine.
- [ ] You saved the `.bevmtheme.json` file somewhere safe, since the browser's copy can be wiped.

## 12. Letting an AI helper do the typing

If you would rather not edit the file yourself, you can give an AI assistant `Fanmapstick-THEME_FORMAT.md` (it includes instructions for the assistant) and the validator, and tell it your choices. The format file tells it never to invent anything for you: it only organizes what you decide, tells you any technical default it picked, and runs the validator before handing a file back. You can still use this guide to read and tweak what it makes.
