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
| `themes/` | Theme files (`.bevmtheme.json`). The app's **Themes > Install > Get Themes from GitHub** button lists and installs the ones in this folder. |
| `tools/` | The standalone theme validator (`node Fanmapstick-theme-validator-vX.Y.js my-theme.bevmtheme.json`). |
| `drafts/` | Mockups and ideas that are not part of the app yet. |

Some versions are missing because they were test builds that were never saved.

## Contributing
Thank you for wanting to help. Themes, accessibility fixes and bug reports are the most useful things to send. Open an issue first for anything big, so nobody builds something that cannot be merged.

### Acceptable
- Bug fixes, with the steps that show the bug and the fix.
- Accessibility and inclusivity improvements (see the standards below).
- Performance fixes that keep behavior the same.
- Map themes (see below).
- Documentation, wording and spelling fixes (traditional American spelling).
- New features that fit "Good Clean Fun" and keep everything in this list true.

### Not acceptable
- Anything that collects, stores off the device, or sends data about the people using the app. No analytics, tracking, telemetry, accounts or ads. Profiling or measuring tools are for development only and never go in the app or the repo.
- Network requests the user did not start. The app contacts nothing until a person presses a button that says so.
- Code loaded or run from outside the project (new CDNs, remote scripts, `eval`, `innerHTML` with outside text). Theme files stay data-only.
- Removing or weakening an existing protection: file size and field checks, the theme validator, import checks, the data-only rule for themes.
- Removing or hiding an accessibility feature, or making something work only with a mouse, only with color, or only with sound or motion.
- Generated content that is copied from, or too close to, someone else's work, and code or assets whose license does not fit AGPLv3 (say where any asset came from).
- Changes that break existing save files, themes or Control Schema exports without a way to open the old ones.

### Accessibility and inclusivity standards
Every change should keep these true:
- **Every control works by keyboard** and has a visible focus, a text label (or `aria-label`) and a role. Mouse buttons and keys stay rebindable in the Control Schema.
- **No information by color alone.** Anything shown with color also has a shape, a word or a pattern. Colorblind aids stay available.
- **Text can be resized, recolored and re-fonted** (Font size, UI Scale, Text tint, Built-in font) without losing anything. Contrast should be at least 4.5 to 1 in all three looks (Dark, Light, Parchment).
- **Changes are announced** to screen readers (`role="status"` / `aria-live`) and errors say what went wrong and what to do.
- **Motion and flashing are optional.** Nothing flashes more than three times a second, and animation can be turned off.
- **Plain language.** Short sentences, no jargon without an explanation.
- **Inclusive wording and content.** Examples, themes and text should be welcoming to everyone. No slurs, harassment or content that demeans people.
- Test with the keyboard only, at 200% size, and in all three looks before sending.

### Themes
Add a `.bevmtheme.json` file to the `themes/` folder in a pull request. It must pass `node tools/Fanmapstick-theme-validator-vX.Y.js your-theme.bevmtheme.json`, be your own work (or say where it comes from and its license), and follow the standards above. Themes are reviewed by the maintainer before they appear in the app's **Get Themes from GitHub** list. Format: `docs/Fanmapstick-THEME_FORMAT.md`; hand-editing guide: `docs/Fanmapstick-THEME_EDITING_GUIDE.md`.

### Sending changes
- Make a fork, then a branch, then a pull request that says what changed and why.
- Each version is a single file in `versions/` and has an entry in `docs/Fanmapstick-CHANGELOG.md`. The maintainer assigns version numbers.
- Say if an AI tool helped write it. You remain responsible for what you send.
- By contributing you agree your work is released under the license below.

## License
Fanmapstick and BEVM are free software under the **GNU Affero General Public License, version 3** (19 November 2007), or any later version. The full text is in [`LICENSE`](LICENSE). If you run a changed copy for other people over a network, you must offer them the source of your version. Third-party parts keep their own licenses: Three.js (MIT), the Eagle Lake font (SIL OFL 1.1), and the Old Paper Pack textures by Nia Mi (CC0).

## Contact
fanmapstick@gmail.com, or open an issue here on GitHub. Accessibility problems are especially welcome.
