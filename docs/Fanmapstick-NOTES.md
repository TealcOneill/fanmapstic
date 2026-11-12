# BEVM – Notes and planned ideas

Not built yet. Written down so they are not lost.

## Theme list from GitHub (v6.1 follow-ups)
- Built in v6.1: the list comes from the GitHub contents API (about 60 requests per hour per IP). If that limit becomes a problem, replace it with a single `themes/index.json` manifest fetched from raw.githubusercontent.com (also lets the list show author, license and a preview image).
- Not built: theme author / license fields in the theme format; preview thumbnails.

## Colorblind helper (from Benjamin's earlier note)
- A list of all default colors in the installed themes, with a tint selector per color, the color's name, a separator, and the part name.
- Notes only for now.

## Colorblind helper: export option (added v4.12)
- When colorblind assistance is switched on, the export-image dialog gets a new three-way toggle: export **without** the colorblind cover tints, **with** them, or **one of each**.
- Not built.

## Direction glyphs
- v4.12 draws N / E / S / W outside the map edges (N at the top edge in the default view and in exported views). Options to change or edit the directions come later.

## Profiling tool
- v5.9: built as a dev-only package (Fanmapstick-profiler-v5.9.js, driven from a test browser). It is not in the app and never touches a user's computer. First findings: draw calls and geometries grow one-to-one with item count (no instancing or merging); see Fanmapstick-profiling-report-v5.9.md.
- For the developer's own testing only. It must never ship in the app file (Fanmapstick-vX.Y.html) or collect data on a user's computer.

## Color picker: replace with a custom one (noted v5.6)
- The browser's built-in color picker behaves differently in every browser (Cancel is reported in different ways or not at all, live updates differ, some have no Cancel button). It should be replaced with a better custom picker made for Fanmapstick: one look everywhere, live preview, a real Cancel / OK that always restores the old color and any linked strength slider, keyboard and menu-crosshair friendly, and a place for the custom colors list. Until then the app restores the old color on every sign of a cancel it can detect (see the changelog for v5.3 to v5.5).
- Not built.

## v6.0 (done) and what is still open
- Done in v6.0: UI scale moved next to Font size; home page, page button and "Don't open this page again." built in; Dark / Light / Parchment applied to the whole app; Theme and Built-in font added to the Control Schema and its export / import; the home page text controls now share the Control Schema's settings (text size = Font size, Double the interface size = UI Scale, text color = Text tint).
- Still open: Parchment font (Eagle Lake) and paper textures are bundled in the app file. Later they become an optional download from the project's GitHub (a button next to the Parchment choice) so the app stays small. The Parchment look must keep working with the plain default font if the download is missing.
- Colorblind menu and the other upcoming items are listed on the home page under Upcoming Changes.
- Home page notes: the chart numbers are estimates (AI 0.086 to 4.08 Wh per 1024x1024 image from arXiv 2506.17016, scaled by pixels; Fanmapstick about 0.4 Wh per 8000x8000 export; 30-minute session about 7.5 Wh; 240 Wh to build the app is an estimate from chat tokens). Update them when better data exists.
