# Fanmapstick

**Fanmapstick** is the project: a free web toy that makes top-down tactical battle maps for tabletop games, built for the Distant Worlds campaign (a homebrew Pathfinder 2e setting). Its tagline is "Good Clean Fun."

**BEVM (Bird's Eye View Map)** is the name of the map maker inside it. It is the engine and the in-app name, and it is also the marker in the file formats: theme files end in `.bevmtheme.json` and say `"app": "BEVM"`. So Fanmapstick is what the project is called, and BEVM is the app you actually open and the format names it uses.

## What BEVM does
- Makes random, editable maps with a lightweight 3D engine (Three.js), shown from above. One tile is one grid square; maps are 5 to 100 tiles each way.
- Generates hills, pits, paths (roads, trails, streams, rivers) and items such as trees and rocks from installable **map themes** (data-only JSON files, checked before they are stored in your browser).
- Lets you drag, scale, rotate, lock and reroll things by hand, with undo and redo.
- Exports a top-down image (with a grid, an elevation stamp, and cover stamps in the Distant Worlds system), save files and 3D models.
- Runs entirely in your browser from a single html file. Nothing is uploaded; your open map autosaves in your browser.
- Has accessibility settings (Control Schema): rebindable keys and mouse buttons, UI scale, font and size, text and tint colors, and Dark, Light and Parchment looks. Settings can be exported and imported.
- Opens with a home page that explains the accessibility situation, why it was made, and an estimate of its power use compared with AI image generation.

## Using it
Open the newest file in `versions/` (the highest version number) in a browser. Needs an internet connection the first time, because Three.js loads from a CDN.

| Folder | What is in it |
|---|---|
| `versions/` | Every kept release as `Fanmapstick-vX.Y.html`, oldest to newest. The newest is the one to use. |
| `docs/` | Changelog (an entry for every version), theme file format guide, development notes. |
| `themes/` | Theme files (`.bevmtheme.json`). |
| `tools/` | The standalone theme validator (`node Fanmapstick-theme-validator-vX.Y.js my-theme.bevmtheme.json`). |
| `drafts/` | Mockups and ideas that are not part of the app yet. |

Some versions are missing because they were test builds that were never saved.

## Contact
fanmapstick@gmail.com, or open an issue here on GitHub. Accessibility problems are especially welcome.
