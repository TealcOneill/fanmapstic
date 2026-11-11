# BEVM – Notes and planned ideas

Not built yet. Written down so they are not lost.

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
