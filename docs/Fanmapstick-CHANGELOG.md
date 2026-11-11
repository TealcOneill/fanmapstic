# BEVM (Bird's Eye View Map) – Changelog

**Current version: 6.0.1** (shown in the tab title, the panel footer and the User Context page).

Single-file web app (`Fanmapstick-vX.Y.html`, Three.js r152 from jsDelivr). **From v5.5 every file is named Fanmapstick-version** (the app `Fanmapstick-v5.5.html`, the validator `Fanmapstick-theme-validator-v5.5.js`, the documents `Fanmapstick-CHANGELOG.md`, `Fanmapstick-THEME_FORMAT.md`, `Fanmapstick-NOTES.md`); older entries below still say bevm.html / bevm_vX.Y.html, which are the same file under its old name. Entries are summaries written as each change was made, not diffs. Each version keeps its own file (Fanmapstick-vX.Y.html).

Conventions that have held throughout: the theme validator is regenerated from the app file on every version; 1 world unit = 1 tile; heights are in tiles; map is on the X/Z plane, +Y up, north = -Z; elevation is sampled at tile centres in 0.5 steps with the most common level as zero; the higher tile of a pair gets the cover value (lowest value wins when several mark one tile).

## v6.0.1
- The Theme drop-down in the Generation tab (Ground / Theme box) now stretches to the full width of the control panel.
- Fanmapstick-theme-validator-v6.0.1.js regenerated; the v6.0 file is replaced by it.

## v6.0
- **Home page built into the app.** It opens when the app starts (reading order: Accessibility, What and Why, Power and processing use, Upcoming Changes, Page theme, then the two buttons). **"Don't open this page again."** stores `fanmapstick.hideHome` in this browser so the page no longer opens by default; **"Close page for now."** goes to the map maker. A new **page button next to the "?"** (top right of the view) opens it again over the map maker. Esc also closes it. While it is open the map's keys and mouse thumb buttons are ignored and the map maker is inert, so nothing happens behind it.
- **Power and processing section:** size slider (5 to 100 tiles, 100 px per tile), linear / logarithmic button (fixed axes, nothing jumps), "Maps exported" drag-number box (applies to both bars), 30-minute-session checkbox (about 7.5 Wh), chart with the Fanmapstick bar and one two-color AI bar (lowest-power model plus the extra up to the highest-power model), a data table with the same numbers, and the make-up calculator (minimum / average / maximum, twice the estimated 240 Wh used to build the app). Estimates only, not metered.
- **Three themes for the whole app: Dark (default, unchanged), Light and Parchment.** Every color of the map maker UI now comes from CSS variables. Parchment uses the Eagle Lake handwriting font (SIL OFL 1.1) and the Old Paper Pack textures (CC0, Nia Mi), both bundled for now, ink-colored borders and a dark brown line between the control panel and the viewport. Later the font and paper become an optional download from the project's GitHub.
- **Control Schema > Accessibility:** UI Scale moved down beside Font size; new **Theme** and **Built-in font** (theme default, handwritten, sans-serif, serif, monospace) settings; a font you add still takes over while it is chosen. The home page controls use the same settings: text size = Font size, "Double the interface size" = UI Scale (2), text color = Text tint, theme and font as above. **Theme and Built-in font are exported and imported with the Control Schema** and checked on import like the other Accessibility values.
- Guide: new bullets for Theme, UI Scale and the home page (no version-specific text).
- The five wording fixes in the home page text ("to to", "user-adjustable", "its screen reader accessibility", "its own dedicated map maker").
- Fanmapstick-theme-validator-v6.0.js regenerated; the v5.9.1 file is replaced by it.

## v5.9.1
- **Guide page rewritten** in 11 numbered sections (Quick start, Moving the camera, Working with items, Hills and pits, Paths, The side panel, Undo and redo, Exporting and saving, Keys / mouse / accessibility, Good to know, Using this page) with a clickable contents list at the top. All version tags ("v4.9" and the like) and "for now / right now / under development" wording were removed, related facts were grouped together (for example the path rules and the per-tab settings), and the old "Alt does nothing" note was dropped. No feature changed. The page header still shows the app version.
- Homepage idea is only a mockup so far, not in the app (built in v6.0).

## v5.9
- **System Selector** now stretches to the width of the control panel (Settings tab) and the Control Schema's System box lists the same systems.
- **New system: "Distant Worlds (PF2e Homebrew)"**, saved with the map and in the Control Schema. The grayed-out "Pathfinder 2e" placeholder was removed so it does not sit beside the new system and confuse people ("Coming Soon" stays).
- **Cover rules moved out of Generic.** Generic exports the elevation stamp (and the object height label) only. Distant Worlds also gets the cover stamp on tiles, the no-line-of-sight eye, and the cover number after the height on object labels. Older files with an unknown system load as Generic.
- **Profiling package** (dev-only, Fanmapstick-profiler-v5.9.js): runs outside the app in a test browser; it is not in the app file and collects nothing on anyone's computer. First results are in Fanmapstick-profiling-report-v5.9.md.

## v5.8
- **Mouse back thumb button (Mouse4)**: Firefox skips page-history entries that were made before the page got any click or key press, which is why forward worked but back did not. The three history entries are now made on the first click or key press (not Esc). The Keybinds-page note now says the back button may still not bind in some browsers, forward works, and to click the page once first.

## v5.7
- **Keybinds page note**: the mouse thumb buttons (back / forward) are not working right now (known problem), so they cannot be bound or used yet.
- **Left, middle and right mouse buttons are in the Keybinds list** (defaults Mouse0, Mouse1, Mouse2) and **any mouse button can be recorded as a bind** for any action, alone or in a chord. Before, only keys (and the thumb buttons) could be recorded.
- How they behave: on the map the three buttons keep their built-in jobs. A button bound to a different action (or used in a chord) fires that action when pressed on the map and then skips its built-in job (it never fires over the panels, dialogs or the User Context page, so the interface stays clickable). A key bound to a mouse-button action does that button's click at the crosshair (middle = center the view at the pointer). Moving the left or right button's bind to another action swaps the two, like every other bind. While a bind is being recorded, all three buttons are captured (Esc cancels).
- Older keybind files import fine; the three new actions keep their defaults.

## v5.6
- **The menu crosshair drags sliders** (Control Schema and everywhere else in the User Context page / item browser): hold the click key over a slider and move the crosshair with the pan keys; the value follows, and the change is committed when the click key is released.
- **Slow start in the User Context page**: when "slow start all the time" is on, the menu crosshair's pan keys ramp up like the map pan does.
- **Thumb buttons (Mouse4 / Mouse5) in Firefox**: Firefox sends no mouse events for them, only a page-history step. The page now keeps three history entries (back, here, forward); stepping to either neighbor is read as Mouse4 or Mouse5 (press and release 120 ms apart) and the page steps back to the middle entry. This also makes them rebindable in Keybinds. Browsers that send the real events are not double counted. Side effect: the browser's own back / forward (including Alt+Left / Alt+Right) are read the same way.
- **Esc lets go of focus**: with keyboard focus on a button, tab, drop-down, link, tick box or slider, Esc only unfocuses it (a second Esc does what it always did). Not while a dialog, a rebind, a color picker or a carried item is active.
- **The built-in The Squat Forest is the version with descriptions** (your file; replaces the old built-in). `the-squat-forest.bevmtheme.json` is the same file.
- **NOTES.md**: new note to replace the browser color picker with a custom one.

## v5.5
- **File names**: every file is now named Fanmapstick-version (see the top of this file). Save-file contents, the `BEVM` marker inside files, the `.bevmtheme.json` theme extension and the in-app name are unchanged.
- **Control Schema general settings are exported and imported** (every switch in the Settings part: Selecting opens Items, Spawn an exact number, the Placement options and the two new name-click options). Files made before v5.5 hold only two of them; those two import as before and the rest stay as they are.
- **Terrain items can be dragged out from any theme**, not just the map's own. Dropping one registers its theme with the map like any other item (counts toward the 8 extra themes); the terrain feature's theme id is saved as `themeId~itemId`. A custom texture that belongs to another theme is not available on this map, so the feature falls back to the ground's own look.
- **Item browser, All themes view**: each theme group has an open / close toggle (header click or the arrow at the right edge); the theme's description sits to the right of its name; "In use" (the map's theme) or "Also in use" (an extra theme already on the map) sits at the right edge next to the toggle.
- **Menu crosshair picks up items**: a click key press on an item in the browser always picks it up (click mode) and links the item to the map crosshair. While linked, the item follows the crosshair, the mouse cursor is hidden and the mouse is ignored until it really moves (2 px or more). The other way round, pressing a pan key while carrying an item hands it to the crosshair.
- **The demo theme is gone.** Its Trees and Rocks are the Unthemed group (id `unthemed`), which is also the theme a new map starts with, so Unthemed items are offered in Search and Browse for every map. Maps saved with the old demo theme still open (the theme is inside the file).
- **Name-click settings (Control Schema)**: *Items tab: clicking a name centers the view on the item* (default off: it opens / closes the box, as before), and *Placement: clicking a name centers the view* (default on; off: it opens / closes the item's controls). Hills, pits and paths center too.
- **Tint Cancel restores the strength slider** for every sign of a cancel: the picker handing the old color back (an input event with the saved color), a change event with the saved color, Esc, the window regaining focus, or clicking away without confirming. Pickers opened from the keyboard are remembered too.
- **Shift (drag-pan) moves a selected hill, pit or terrain item** while you pan with the keys, like it does for selected items.

## v5.4
- **Texture variety**: every time a ground texture is applied (picking one, a new map, a theme change) the noise is shifted by a small random amount, so patterns no longer look alike. Not adjustable. Saved with the map (`settings.ground.sd`, two numbers), so a saved map looks the same when opened; maps saved before v5.4 have no shift and look exactly as they did.
- **Control Schema name box fills on import**: the imported schema's saved name, or else the file's name without its extension.
- **Click key pressed twice while carrying an item cancels the placement**: while carrying, the first press waits 350 ms (`DBL_MS`); a second press inside that time cancels, otherwise the item is dropped. (Before, the first press dropped the item and the second press centered the map.) Only when "Pressing it twice" is set to make a right click.
- **Dragging items is no longer pushed back inside the map** (the footprint is not clamped any more; the item's middle still stays on the map). Spawning keeps its footprint off the border: generation already rejected positions touching the edge, and an item dropped from the browser is still moved in from the edge. Typed positions and resizing still keep the item inside.
- **Terrain items from the map's theme can be drawn out** of Search and Browse: they are carried as a footprint ring and land as locked terrain features (`cu: true` in the save, kept when the map is rerolled, like placed items). Terrain items of other (extra) themes are not offered yet.
- **Reroll with a hill, pit or terrain item selected** rerolls just that one (new size and shape; position, texture, tint and edge noise stay). Locked ones are kept. The button reads "Reroll item".
- **Tint Cancel also puts the strength slider back** (whole-item tint exactly, and any color box with a slider beside it).
- **Tilt handle clears the scalers**: the tilt arc is pushed out by 2.3 handle sizes, so at its top or bottom end it no longer covers a scaler.
- **Item browser starts on "All themes"**: unthemed items first, then every installed theme in alphabetical order, each under its own heading.
- **Shape Noise slider on every part** of a placed item (0 to 1, saved as `sn` in the part data). Only that part is rebuilt (its own seeded jitter); the reset puts back the theme's lumpiness.
- **Rare density**, one step below sparse: half of sparse's fill percentage (`FILL_MOD` rare = [0, .5]) and half of sparse's terrain count (rounded).
- **Hovering a custom item's name highlights the item** (the hover was being cleared because the Items tab was closed).
- **X button on every box in the Items tab** (items, hills, pits, paths); it shares one delete routine with the Placement list. Locked things are kept (a toast says so), like the Delete key. The Placement list's X now follows the same lock rule.
- Spelling: leftover British spellings in the text and comments changed to American (center, gray, neighbor, behavior).
- The Squat Forest theme copy (`the-squat-forest-copy.bevmtheme.json`, id `the-squat-forest-copy`) has a description line on the theme and on every item for you to fill in.

## v5.3
- **Menu crosshair scrolls**: at the top or bottom edge of the screen (within 56 px) it scrolls the page, faster the nearer the edge, in the User Context page and the item browser.
- **Tilt has no maximum**: the base point stays put and the item turns about it (parts may hang over the edge). Dragging or resizing still keeps the untilted footprint inside the map.
- **Outline edges lifted**: the outline hull is raised in world space by about 2.5 pixels (at least .03 tile) so its bottom edge no longer sinks into the ground plane (view and export).
- **Whole-item tint has a strength slider** (0 = none), mixed over the part colors like the ground tints. Saved as `ti` and `tt`.
- **Color pickers keep their live update**; opening one remembers its color in a single shared variable, Esc or closing the picker without confirming puts it back, and anything that confirms it forgets it. (Browsers differ in what they tell the page when a picker is cancelled; Esc and window-focus return are what is detected.)
- **Color row border** now starts just left of the reset button instead of spanning the whole width.
- **Terrain (hills and pits)**: reset buttons for position, scale, rotation and tint; an **Edge noise** slider (0 to 1; makes the edge slightly uneven, saved as `nz`); a **Locked** checkbox.
- **Color boxes are wider** (52 px) everywhere, including the Ground tint and the terrain tint.
- **New maps take the theme's ground texture** (the squat forest showed plain green).
- **Right click cancels carrying** also when the left button is held (drag mode) and through the context-menu event.
- **Export options in the Control Schema**: a new section with every option of Export Top Down View and Export Save File, kept in step with the export drop-downs, saved on the device and in the exported schema (`exportOptions`).
- **Control Schema name box** next to Import; saved in the file (`name`) and used as its file name.
- **File names**: saved maps, top-down images, foreground images and the 3D model are named after the map's name.

## v5.2
- **Reroll button** reads "Reroll item" (or "Reroll items") while something is selected.
- **One-part items** show no parts list in Placement: just the overall controls and the name box.
- **Crown shyness is switched off for now**; canopies simply overlap. The code is still there (`CROWN_OFF` in bevm.html) and the theme-format note says so.
- **Whole-item tint is a real tint**: it is multiplied over the top of every part color and no longer overwrites them. It is applied when the color picker is confirmed (change event), so cancelling leaves the item as it was. Saved as `ti`.
- **Properties text** (`.il` labels such as Position, Scale, Offset) is bigger (11 to 13 px); the reset buttons got their own style (17 px tall, same text size) so they match.
- **Part tabs**: name centred; left chain = physical properties (scale, offset, rotation, tilt), right chain = colors. The part's color row is flipped (reset, box, "Color" at the right edge) with a small border on its left and top. "Tint" is now only used for the overlay and light colors.
- **American spelling** everywhere (Color, not Colour), in the app, THEME_FORMAT.md and NOTES.md.
- **Items stay inside the map**: dragging, arrow-pan moving, typing a position and dropping keep the whole item (every part, tilted or not) inside by moving it. **Tilt never moves the base point any more**: it stops at the largest angle that does not push the item further over the edge than it already was (this replaces the v4.13 behaviour that shifted the item, which caused the jumping).
- **Text selection is blocked** everywhere except the Guide page and text fields.
- **Placement list**: clicking a name centres the view on the item (no select, no open / close); hovering a name highlights the item like in the Items tab; the arrow button opens and closes the panel; the orange lock icon is gone. Clicking a placed item on the map always opens its panel in Placement and scrolls to it (even if "Selecting something opens the Items tab" is off).
- **Locked checkbox** below the Tilt slider in the Placement panel and the Items tab (same as pressing L).
- **Outline edges from above fixed**: the outline hull now uses normals averaged per vertex position, so flat-sided parts keep their outline in top view and in exports.
- **Gizmos have a minimum size** (handles about 1.4% of the view height, rotation ring 4%, tilt arc 4.5%) so they can always be grabbed.
- **Item browser**: thumbnails start in the side view; items are dragged or clicked exactly like the Search list; while you carry one the window fades to 5% and ignores the mouse. Right click (including the double press of the click key), Delete or Esc cancel and bring it straight back. New Control Schema setting "close the item browser after an item is placed" (default on); off keeps it open at full strength.
- **Menu crosshair**: while the User Context page or the item browser is open and the crosshair is on, the pan keys move a crosshair around the page and the click key clicks what is under it (sliders jump to the clicked spot).
- **Control Schema arrow keys**: Up / Down / Page Up / Page Down / Home / End scroll the page; Left / Right change tab unless a slider, number box, list or text box has focus, in which case they change that control.
- **Double Tab** (in those pages) puts keyboard focus on the control under the crosshair, or the one nearest the middle of the page if the crosshair is off.
- **Accessibility**: new "Enable tint name and area selection" under Gizmo Setback (default off). Off: only the color box opens the picker; on: the name and the space beside it open it too.

## v5.1
- **Locked items survive rerolls** (bug): placed items that were dragged from the list or Browse got the lock colour but were removed by Reroll / Generate when their theme's type was switched off. Locked placed items are now kept whatever the type switches say.
- **L locks the item under the pointer** without selecting it. If anything is selected, L (and the lock button) affects only the selection, never what the pointer happens to be over.
- **Rotation gizmo follows Gizmo Scale**: the ring tube, arrowheads and the tilt arc now scale with the setting (before, only some parts did).
- **Placement: one control panel per placed item**, inside the Placement tab (the Items tab shows a note and an Open in Placement button for these items). Layout: Name, Tint (whole item), Position X/Y/Z (same warning and snap-to-ground button as before), Scale X/Y/Z, Rotation, Tilt, then one section per part in tint order with Scale, Offset, Rotation and Tilt sliders and one Tint. Auras and Abnormalities are the ordinary ones. Every trio of boxes has the chain controls; Position, Scale, Rotation and Tilt have reset buttons (back to where it was placed / 1 / placed rotation / 0). The old Advanced Controls pop-up is gone and there is a single tint system (the separate multiply tint is no longer set by anything; old saves that have one still load).
- **Two links per part**: a physical link (scale, offset, rotation, tilt) and a tint link, each joining the part to the one above it in tint order.
- **Per-part rotation and tilt** (saved with the map; theme parts keep their own base rotation).
- **Items from every installed theme**: Search covers all installed themes (theme name shown, searchable); Browse lists any theme in its drop-down. Dropping an item from a theme the map does not use adds that theme to the map as an extra theme (max 8 extra, 28 objects in total). Map files, undo / redo and export carry the extra themes. An "Unthemed" pseudo-theme for objects packaged with the engine exists but is empty until the developer supplies items.
- Fixed: adding an extra theme no longer replaces the ground textures of the map's own theme.

## v4.12 – v5.0 (summary entry, written late)
- **v5.0**: Placement tab (Custom items list, Search, Browse window, Advanced Controls, custom names, position warning); theme items can carry a `description`.
- **v4.14**: Compass points is a map setting next to Grid lines and Show overhangs, and a Default Setting.
- **v4.13**: mouse thumb buttons use the real buttons 4 / 5; tilted items stay inside the map; custom colours list in Control Schema (exported / imported); Compass points checkbox in the export options.
- **v4.12**: keybinds second column, multi-key binds, thumb buttons; crown shyness rewritten around real mesh outlines and creation order; compass; font size slider.

## v4.11
- **Crown shyness reworked**: items are taken in the order they were made. A newer canopy is modelled AROUND every older canopy it overlaps: its surface is pushed out sideways to the older canopy's outline plus the usual small setback (CROWN_GAP_FT, 1 ft), so the older tree keeps its full shape and the newer one wraps around it. No straight cut and no cap any more. The canopy is cut finer (two rounds of splitting each triangle in four) only where it needs to be wrapped, and its normals are smoothed. Nothing is saved; it is recomputed from the items. "Order made" is the order of the items in the map (generation order inside each type; a rerolled item counts as newest). Sun and extra lights got a shadow normal bias of 0.03 so the finer canopy meshes do not show shadow stripes.
- **Intersection knob has two slices** (the middle slice is gone). **Left-drag** a slice pulls just that path off the intersection (it only comes off once you move) and drops it on a path or the map edge, like any other path end. **Right-drag** a slice moves the whole intersection along its path.
- **Undo / redo buttons**: the arrowhead no longer overlaps the shaft (flatter curve, thinner line).
- **Numpad 1-5** open Settings, Themes, Generation, Placement, Items (in the order they appear in the panel). New rebindable actions in Keybinds.
- **Crosshair tint** (Accessibility, with Reset).
- **Keyboard pan** (Accessibility): Base pan speed slider (x0.1 to x3), Slow start while holding an item (default on), Slow start all the time (default off), Lower speed while holding an item (default off) with a Speed while holding % slider (10-100, default 50). "Holding an item" means something is selected, the same rule the slow start already used.
- **Click key pressed twice** (Accessibility > Click key): the first press is a left click; a second press within 350 ms is a right click by default, or a double click (sends a dblclick event after a second left click), or nothing extra.
- **Control Schema export / import**: one file with Settings, Default Settings for new maps and Accessibility, plus the keybinds if "Include keybinds" is ticked next to Export. The font choice and uploaded fonts are not included. **Keybinds export / import** is separate, in the Keybinds tab.
- **Import validation** (both): size limit (200 KB), valid JSON, app / kind / format number, only known keys, right kind of value for each, colours must be #rrggbb, key codes must be real, no key used twice, "Escape" refused. Valid files are shown with a Replace / Cancel confirmation; an invalid file shows a readable message and nothing changes.
- Conventions note: the profiling tool, when it is built, is for the developer's own testing only. It must never ship in bevm.html or collect any data on a user's computer.
- Guide: new Keyboard extras section, intersection text updated. Validator regenerated (theme format unchanged).

## v4.10
- **Path knob fixes**: the middle slice of an intersection knob can now be grabbed (a click picks the slice by where on the sphere you click: left, middle or right, instead of whichever surface the ray met first). The gaps between slices are wider (0.04 to 0.14 of the sphere radius) and an intersection knob is 30% bigger than a free-end knob so the three slices can be told apart.
- The hill / pit rotation ring now hides when the gizmo toggle (button or Ctrl tap) is off.
- **New tints** (Control Schema > Accessibility, each with Reset): **Highlight tint** (the hover outline and glow, default light red), **Text tint** (all text), **Slider tint**, **Panel toggle tint** (tick boxes and switched-on buttons in the side panel), **Viewport toggle tint** (switched-on buttons over the map). Unset = the original look.
- **Fonts**: Control Schema > Accessibility > Font. Add ttf / otf / woff / woff2 files (max 3 MB each, 8 fonts, each checked by the browser before it is accepted) and pick one in the drop-down, or Default font. Fonts are kept in this browser's IndexedDB only; the chosen font is saved with the other accessibility settings. Remove deletes the chosen font.
- **Undo / Redo**: two curved arrow buttons at the top middle of the map (the message toast moved a little lower). Ctrl+Z undoes, Ctrl+Shift+Z redoes; both are listed in Keybinds and can be rebound (the key capture for these two accepts Ctrl / Shift combinations). History holds snapshots of map content only (items, hills, pits, paths), so it can never change settings, lights, themes or other tabs. It records after a mouse release, after a key release, and after changes made inside the Items tab. Generate / Reroll Whole Map, opening a map and switching maps clear it; 40 steps are kept.
- Internal: restore() now calls loadContent() for the content part (also used by Undo / Redo). Guide has a new Undo and Redo section. Validator regenerated (theme format unchanged).

## v4.9
- **Tint reworked**: the old formula is gone. The tint is now a plain mix toward the chosen colour. On the **Plain** texture it is a full-strength solid colour (Plain + tint = a flat ground, hill or path of any colour); on every other texture the slider tops out at 30% of the chosen colour (constant in the shader, same in the .glb export). Where Plain and another texture meet, the two amounts blend.
- Path knobs, width handles and the selected-path outline now use the main Gizmo tint (they were yellow / blue / white).
- **Intersections**: generation is unchanged except that a path that crosses another path of the same kind is broken into two paths, one each side, that both end on the first path at the crossing. A path that runs along another one (instead of crossing) is thrown away and generated again. An intersection knob is a sphere cut into three slices (middle = through path, aligned with it; outer slices = the paths ending there). Dragging any slice moves the whole intersection (v4.8 local rerouting). **Right-click** an outer slice pulls that path away (whole knob); right-click the middle slice pulls the through path away (it bends to where you drop it; the other paths stay joined to each other).
- An intersection joins at most three paths. Dropping a path end on an intersection joins it; a full one refuses with a message.
- Manual routing never creates intersections by itself. **P** (rebindable in Keybinds) or the new **Make intersections** button in a path's Items box breaks the selected path at every place it crosses a path of the same kind.
- **No running over the path you join**: routing to a path (generation, dragging an end, moving a junction) now avoids the target path until it reaches the join, and retries up to six times; if every try crosses it, the move is refused / the attempt is dropped.
- Shader cache key ground6. Validator regenerated (theme format unchanged).

## v4.8
- **Gizmo tints** (Control Schema > Accessibility, each with a Reset): Gizmo tint (item scale box and handles, hill / pit gizmo), Tilt tint, Rotation tint (rotation arcs are now bright green by default, on items and on hills / pits), and **Terrain origin tint** (the origin point, its two move faces F1 / F3 and its three move lines). The origin tint follows the Gizmo tint until it is changed; its Reset makes it follow again. Resetting the Gizmo tint does not touch a separately set origin tint. A locked hill / pit gizmo stays blue.
- **Gizmo Setback** is now a distance in tiles added to every side (0 = on the item), so big items no longer get far-off gizmos. (Replaces the v4.7 multiplier.) Reset buttons on UI Scale, Gizmo Scale and Setback.
- Number boxes are centred. Tint colour pickers are the same plain colour pickers as elsewhere, and the tint now moves the colour toward the chosen colour (chosen colour x (0.6 + 0.8 x the texture's lightness)) instead of recolouring only the light and dark.
- The orange selected-path outline now hides with the other gizmos.
- **Right-click a linked path knob** unlinks it; drag it to any path (including the one it was on) or a map edge.
- **Junction moves only re-route locally**: the host is rerouted only between the neighbouring junctions / ends and the dragged path only up to its next junction; other paths do not move.
- **Paths never push items off the map**: an item pushed to the map edge stays fully on the map and the path is rerouted around it (only between its neighbouring junctions / ends, up to five tries because the router treats obstacles softly).
- **Crown shyness**: the cut between two canopies now goes through the average centre of the overlapped volume (top-down overlap of the two circles at each height, area-weighted), perpendicular to the line between the two centres, instead of the radical line at one height.
- **Export size**: the largest picture side is now limited by what the graphics card / browser reports (never more than 8192), and a failed draw shows a message instead of the console error "Canvas exceeds max size". The file-size estimate ignores a failed draw.
- Theme format guide: part names must be descriptive (preparing the colourblind helper noted for later, which is not built).
- Shader cache key ground5. Validator regenerated (theme format unchanged).

## v4.7
- **Gizmo toggle**: a quick tap of **Ctrl** (no other key, click or drag during the tap, so Ctrl+C / V and Ctrl-drag are untouched) switches all gizmos off and on: item scale box / rotation ring / tilt arc, hill and pit handles, path end knobs and the new width handles. The orange path outline and selection tints stay. New **◈ button** at the bottom right of the view; button and key share one state.
- **Alt bug fixed**: Alt no longer toggles anything; its key-down and key-up are swallowed so the browser menu/toolbar no longer takes focus (which had deselected the viewer and left the gizmo hidden).
- **Path width handles**: two orange handles beside the middle of a selected path; dragging sets the width (live, terrain rebuilt when you pause / release).
- **Junctions move as one**: dragging the end of a path that sits on another path (no Shift) moves the junction freely; the host is routed A -> junction -> B (with the bend near the junction smoothed) and the dragged path is routed to the junction, then everything attached is reconnected. Shift keeps the old detach-and-snap.
- **Tint** for the ground (Generation > Ground), hills, pits, terrain items and paths (their Items boxes): colour + strength, luminance-preserving, kept inside its own area by painting it into a tint map with the same soft edge as the texture. Saved with the map; included in the .glb ground colours. Not in theme files.
- **Texture blend** slider (Generation > Ground, saved with the map, default 1): where a region with a texture lands on a different non-ground texture, its weight is cut by up to half (1 = even mix at full overlap, 0 = top layer wins as before).
- **Accessibility** section in Control Schema (saved on this device): UI Scale (zoom of panel, buttons, dialogs, not the canvas), Gizmo Scale (handle and knob size), Gizmo Setback (how far out the gizmo sits compared with its base size: scale box, rotation ring, tilt arc, hill ring, path outline and width handles).
- **Standards check** (html-validate, ESLint, Terser parse, axe-core, JSON parse; minifier.org needs a real browser and has validators, not profilers): added type="button" to static buttons, aria-labels on the two link buttons, role="main" on the view, fixed a label with two controls. Remaining notes: no h1 heading, some page content outside landmarks, a few ESLint style notes (assignments in conditions, control characters in sanitising regexes), all left as they are.
- Shader cache key bumped to ground4. bevm_theme_validator.js regenerated (theme format unchanged).

## v4.6.1
- **Pin padlock** on every box in Items > Selected (items, hills, pits, paths): a pinned object stays listed there after it is deselected, next to whatever is currently selected. Click the padlock again to unpin. A pin is only a list setting: it is separate from the L lock (which protects items from rerolls), is not saved with the map, and goes away if the object is deleted.

## v4.6
- **Connected paths.** Every path has an id and remembers which path each end sits on (saved with the map). Dragging an end so the path reroutes now also reroutes every path attached to it (and theirs in turn): each attached end moves to the nearest point of the new line, so the network stays connected. If one can't be rerouted it is left ending in open ground and a message says so. An end can't be dropped on a path that hangs off the same path, or on the host of the path's other end.
- **No overlapping generated paths.** Paths are generated one at a time. A new path that would run over a path of the same kind (comes within edge-to-edge touching distance, crossings included, ignoring the stretch next to a deliberate junction) is made again from the same start and ends on that path where they first meet. That end is an ordinary draggable end, so it works as the drag point. If the result would be shorter than about a tile it is dropped and new ends are tried; a path can't start and end on the same host.
- **Clickable paths.** Click a path to select it: a flat orange outline surrounds it (no scale handles; the end balls stay for rerouting), the Items tab opens on Selected, and Delete removes it. The outline is hidden in exports. Deleting a path leaves the paths that ended on it ending in open ground.
- **Paths in Items > Terrain.** Every path has a box (also shown under Selected) with Width in feet (typed or scrubbed; the map reflows and pushes items aside), Texture (including Same as ground), what each end sits on, and Delete. Hovering the name outlines the path in red.
- Saves: paths now store id, ca, cb (older saves get ids and no connections).

## v4.5.1
- Ground shader: the noise function (`gNoise`) now sets its result first and has a single return, after a second pass at the Direct3D "potentially uninitialized variable" warning (one of the two was gone in 4.5). All seven built-in patterns render as before. Still not reproducible on the Linux test machine, so please report if the warning remains.

## v4.5
- **Check Theme File…** button in the Themes tab: runs the install validation on a chosen file, installs nothing, and shows either the problem or a summary (name, id, ground texture, custom textures, each item type and its kind).
- **bevm_theme_validator.js:** standalone Node script (no packages) made from the validator in bevm.html, so a Claude that can run code can check a theme file before handing it over (`node bevm_theme_validator.js theme.json`; exit 0 valid, 1 invalid). It is regenerated from bevm.html each version (the version it was made from is printed). THEME_FORMAT.md tells the theme-making Claude to run it.
- **Shader warning:** the ground shader no longer uses a local array indexed in a loop, and `gOne` has a single return with every variable set first, which should remove the "potentially uninitialized variable" driver warnings (X4000) that appeared with 16 textures in v4.4. This could not be reproduced here (Linux, not Direct3D), so it is untested on your graphics driver.

## v4.4
- **Custom textures in themes:** new optional top-level `textures` list (up to 8): id, name, three colours, a noise pattern borrowed from a built-in texture, and size / contrast / detail / drift. They are added to the ground Texture list and can be used as `groundTexture`, a terrain item's `texture` or a path's `texture`. The ground shader and the texture-weight maps now hold 16 textures (8 built-in + 8 custom); the .glb ground colouring follows. Switching to a theme without the texture puts the ground back to Plain; maps embed the theme, so they reopen with their textures.
- THEME_FORMAT.md: "Custom textures" section; custom textures removed from the not-in-the-theme list.

## v4.3
- **Theme terrain items** (`terrain` object): mesas, cliffs, patches and other ground shapes. Options: Deforms Terrain and Uses Texture (both required), texture, ellipse or rectangle footprint with size and aspect ranges, flat-top fraction, rounded or sheer edge, signed height range for deforming items, solid body height for non-deforming ones, optional chance. They are stored with the hills and pits (same gizmo, lock, copy, save), named after the theme item in the Items tab. Non-deforming items are real 3D bodies that cast shadows; items cannot spawn inside them, and a terrain reroll clears unlocked items that end up inside one.
- **Exact spawn counts:** Control Schema switch "Choose an exact number of items to spawn". Every type (hills, pits, theme terrain, objects) then shows a Count box instead of Density. If the map cannot fit the number, spawning stops and an error says there is not enough room on the map. Counts are saved with the map.
- **Fix:** a saved map whose theme had abnormalities or an aura could not be reopened (the embedded theme failed re-validation). It now round-trips.
- THEME_FORMAT.md: terrain section is no longer a draft; "How many spawn" note; custom textures, part rotation, unlinking, See-Through, spawn areas listed as BEVM features, not theme fields; scale/cover points to the homebrew document. sample_theme.bevmtheme.json gained a mesa, a cliff and a mud patch.

## v4.2
- **Theme ground texture:** new optional top-level theme field `groundTexture` (a name from the default texture list; anything else is rejected). Using a theme applies that ground (with the texture's default size / contrast / detail). The Squat Forest now sets `grass` (file and the bundled copy).
- **Manual path edits displace items:** dragging a path end now pushes unlocked items under the new route to just beside the path edge instead of deleting them (locked items are untouched; clamped to the map). Generating paths still clears items as before.
- THEME_FORMAT.md: `groundTexture` documented and added to Step 1 of the questionnaire.

## v4.1
- **Built-in Road path** (id `default-road`, reserved) next to Hills and Pits, in every theme: `road` kind, not advanced, widthFt 2, minBendRadiusFt 4, plus the standard defaults (windiness 0.5, flat, dirt texture). Count and On switch in Generation like any path type.
- **The Squat Forest is packaged inside bevm.html** as a built-in theme (checked at start-up like an installed one), to test packaging. It appears in the Themes tab marked "bundled with BEVM": it can be used and exported but not uninstalled, and a theme with the same id installed in the browser is ignored in favour of the bundled one. Installing a file whose id matches a built-in theme is refused.
- THEME_FORMAT.md: built-in Road noted; `default-road` reserved.
- **Routing fix:** the search's cost table was single precision, which made it throw away valid steps now and then, so an occasional route failed or cut through a hill. It now uses double precision, the search prefers a route that arrives pointing at the end unless that route is much worse, and the heuristic is slightly weighted for speed. In 300 test routes none failed and plain roads kept clear of a test hill.

## v4.0
- **Paths** (roads, trails, streams, rivers): new theme item kind with a `path` block (`kind` road/stream, `advanced`, `widthFt`, `minBendRadiusFt`, optional `windiness`, `heightTiles`, `texture`). Hills and pits stay built in.
- **Routing:** a turn-limited search (hybrid A*) with steps that can turn no more than step ÷ minimum bend radius, a seeded wander cost, and terrain/big-object costs. Plain paths curve around hills, pits and big objects (ground radius of 4 ft or more; locked items always). Advanced paths ignore terrain and go through. The routing is noted in the code as a candidate for caves later: every line starts and ends on the map edge or on another line of the same kind.
- **Advanced paths level the ground** to their height inside their width (cut hills, fill pits); plain paths add their height. Rounded edges. Default heights: road 0, advanced road +2 to +4, stream −1 to −2, river −3 to −5; any value allowed in the theme.
- **Ends:** every path starts and ends on the map edge or on another path of the same kind. Each end is a ball you can drag; it snaps to the nearest edge point or a same-kind path and the path reroutes on release. Click a ball and press Delete to remove a path.
- **Generation tab:** path types show a Count box instead of a density.
- Path texture painted along the line; items under a path are cleared; later items keep off paths; locked items are routed around. Saved with the map (`paths`, `theme.pcount`).
- THEME_FORMAT.md: real Path section, instructions for the theme-making Claude updated; sample_theme gained a road and a river.

## v3.9
- **Reroll colors:** a button under the Properties colors, shown only while Color variation is on. It picks a new set of random color shifts for that item (kept in map saves as `cvs`); linked parts still vary together.
- **Shift flips drag-by-pan:** holding Shift turns the ✥ toggle off if it is on and on if it is off, restoring it on release (the keybind is now labelled "Flip drag-by-pan while held").
- **the-squat-forest theme:** Bush foliage lowered (centre 1.8 → 1.5 ft) so it overlaps the stem instead of touching it at one point, and the stem's noise raised to 0.8 for a lumpy look.
- THEME_FORMAT.md: the aura has its own chart and the examples sit below both charts; the guide now says hills and pits are built into BEVM and never part of a theme file.
- THEME_FORMAT.md: terrain draft updated: rounded edges, and terrain items stay 3D shapes so they cast shadows (not read by the app yet). The "not in the format yet" paragraph is removed; a standalone Color variation section is removed (it is the `colorVariation` abnormality entry); terrain items now carry shape data (ellipse or rectangle footprint, size and aspect ranges, `flatTop` for hills versus mesas, rounded or sheer edge, height ranges, `bodyHeightFt` for non-deforming items); and a full "Instructions for the theme-making Claude" part covers the questionnaire, interpreting answers and the injection rule. Notes for Claude when helping with themes (refuse and say hacking is a crime if data injection is suspected; no invented creative content), and a DRAFT section for terrain items (Deforms Terrain / Terrain switches, rolled sizes and heights, default texture names). The draft is documentation only; the app does not read it yet.

## v3.8
- **Linked part colors:** the Properties list is sorted by theme color (hue, greys last by lightness) so similar colors sit together. A chain icon on each row (same icon as the tile-size chains) links it to the row above. Linked parts share one color; linking takes the color of the row above; ↺ resets the whole linked group to the row's theme color. Parts with identical theme colors start linked. Linked parts also share the same Color-variation roll so they stay matching. Saved per item (`lk`).
- **Chance rolls in theme files:** an item type can now list `abnormalities` (`hidden`, `noShadow`, `small`, `big`, `floating`, `light`, `colorVariation`) and an `aura`, each with an optional `chance` of `[n, d]` (n in d; leave out for always). Values that are numbers (`value`, `heightFt`, `radiusFt`, aura `scale`, `opacity`...) may be a single number or a `[min, max]` range rolled per item. Rolled when an item is generated (not on selection reroll, which keeps properties) and stored on the item like hand-set values. Size and height from a roll count in the overlap check. If both Shockingly small and Bogglingly big succeed, one is picked at random. Lengths are in feet. See THEME_FORMAT.md.

## v3.7
- **Abnormalities** tab: master switch removed; every control is live as soon as it is changed and all controls (including light radius and tint) stay visible.
- **Aura** tab: keeps its switch (the aura is only drawn while on) but all its controls are always shown.
- **Crown-shyness gap** reduced from 1.5 ft to 1.0 ft (trunk setback inside a canopy is half of it, 0.5 ft).
- **Color variation** has no upper limit (minimum 1). The bigger the number, the more the colors vary. The Properties swatches now show the colors actually drawn while variation is on (picking a swatch still sets the base color).
- THEME_FORMAT.md: crown-shyness gap updated and a note on color variation added.

## v3.6
- **Is visible** no longer removes the shadow: a hidden item is not drawn (no colour, depth or outline; export keeps it hidden) but still casts its shadow. Casts shadow is the only switch for shadows.
- **Ctrl while dragging** can be pressed or released at any moment of a drag: Ctrl lifts up and down, releasing it slides in the plane the item is now in.
- **Trunks stay inside canopies:** a part rising through an overhang part must stay half the crown-shyness gap (0.75 ft) inside it, or it is cut (conifer trunk now ends 0.75 ft inside the cone).
- **Color variation** now moves each of Hue, Saturation, Luminosity (0-240, the Windows colour picker scale; the conifer canopy is about 89) and Red, Green, Blue (0-255) by a seeded random amount within +-value. Colours are reapplied the moment it is switched on or the value changes (it needs the Abnormalities master switch on, which is when the row is visible).
- **Reroll with a selection** (R or the button) rerolls just the selected unlocked items: new shape seed, size and turn; position, height, tilt, colours, aura and abnormalities stay. Esc first for a whole-map reroll.
- **Tilt arc** now runs from just above to just below the gizmo box, as an arc, with the ball at the current tilt.
- **Alt** switches the selected item's gizmo off and on (stays off until pressed again).
- **Aura base size** is fixed when the aura is first built (twice the item's ground radius then) and no longer follows later scaling; the scale sliders still change it.
- **Terrain:** Sparse now gives at least 1 hill / 1 pit (was 0, which switched it off).

## v3.5
- **Aura controls added:** Scale (both) slider (multiplies X and Y together, keeping their ratio), Rotation (the aura's own, 0-359), Offset X / Y (tiles, in the item's own directions, so it turns with the item), and an Opacity slider (5-100%, default 45%).
- **Colour variation (Abnormalities):** switch plus a value of 1-5. Each colour value of each part (hue in degrees, saturation and lightness in percent) moves by a random amount up to that much either way. Seeded per item and part, so an item keeps the same colours when reloaded; the base colour (theme or Properties picker) is untouched.
- **Density halved:** Sparse is 5% up to 100 tiles, 4.5, 4 ... 1% at 8,100 tiles, then 0.75% at 10,000 (0.25 steps below 1%). Loose / Tight / Crowded keep the same formula, halved (30x30: 10 / 16.5 / 24%).
- **Delete key** removes the selected items or the selected hill / pit. Locked things are kept (a message says so). Ignored while typing in a box.
- **Ctrl + drag** moves a selected item up and down instead of across the ground and turns Floating (and Abnormalities) on. Typing a height does the same. From straight above, height is hard to judge, so it uses a minimum screen scale.

## v3.4
- **Tilt:** every item has a Tilt slider (0 = straight up, 180 = straight down). The item tips over its base toward the way it faces. The gizmo gets a blue half-circle with a ball on it: drag the ball to tilt (from straight above the arc is edge-on, so the ball follows the mouse up and down instead). The rotation ring no longer tilts with the item. Tilted items do not take part in crown shyness.
- **Number boxes:** every slider (lights, ground, item sliders, export quality, Control Schema defaults) now has a number box beside it. Click in and type a value (clamped to the slider's range); it moves the slider and fires the same handler.
- **Bug fixed, tile size:** the 1.5 ft canopy gap used the CURRENT tile size, so turning the tile size down made the gap huge and cut canopies away. It is now worked out per pair from the feet-per-tile each item was made with, and the tile size no longer triggers a recompute. Verified: canopy geometry is identical at 3, 0.5 and 30 ft tiles.
- **Bug fixed, number drag:** a number box could end up with its text selected, unfocused and dead. Every end of a drag now resets everything (release, cancel, lost capture, window blur, buttons already up, the next press), native text dragging is blocked, unfocused number boxes do not select text, and a box that already has focus is never scrubbed so its text can be selected and edited.
- **Themes tab is second** (Settings, Themes, Generation, Placement, Items) and has its own section in the User Context guide. Theme descriptions show in the Themes tab and under the Theme list in Generation.
- **Item boxes have three tabs** (items only; hills and pits are unchanged):
  - *Properties*: position, scale, rotation, tilt, and a colour box for every part (native colour picker, same saved custom colours as the lights; ↺ resets to the theme colour). Saved per item.
  - *Auras*: on/off switch, shape (circle, triangle, square, pentagon, six-point star), Scale X and Y, Noise (seeded in/out bumps on the outline), tint. A flat see-through shape draped over the terrain, in the export too. Scale 1 = twice the item's ground radius; opacity is fixed at 45%.
  - *Abnormalities*: on/off switch; Is visible, Casts shadow, Shockingly small (x 0.05-0.95), Bogglingly big (x 1.05-10; the two exclude each other), Floating (same thing as a typed height; the wavy-line button turns it off), Emits light (radius in tiles, tint, up to 8 at once), plus the theme's own extras (glow). While the switch is off nothing is applied. Maps saved before v3.4 with shadows off or a glow on open with the switch on.
- **Theme format:** parts get an optional `name` (1-30 characters) used as the label in Properties. The Squat Forest and sample themes now name their parts.
- Pasted items now refresh their properties.
- Not built yet: See-Through, spawn-area selector, Placement tab, delinking parts.

## v3.3
- **Trimming rule:** only overhang parts trim other parts, so a flared base and its trunk no longer interact.
- **Squat Forest theme:** trunks now start inside their flared bases (independent jitter was opening gaps between them); rocks sink 20% of their height into the ground (centre at 30% of height, so it scales with size); every item carries `topAreaFt2`.
- **Open tab header sticks** just under the BEVM / ??? selector while you scroll inside that tab, so it can always be closed.
- **Density is now a fill percentage.** Sparse: 10% of the map up to 100 tiles, 9% up to 400, 8% up to 900, ... 1% at 10,000 tiles (by total tiles, so 7x25 counts as 175 tiles, 9%). Loose = (base+2)x2, Tight = (base+3)x3, Crowded = (base+4)x4. Items generated = fill share of the map area / (the item's `topAreaFt2` at the top of its scale range), at least 1 and at most 1500 per type (and 4900 items in total, below the 5000-item save limit). Each type in Generation shows its fill % and approximate count. Terrain (hills, pits) keeps its old counts.
- **Theme format:** new optional `topAreaFt2` (largest top-down area at base size; computed when missing).
- **Reroll Whole Map bug fixed:** old items from the previous map could block the new ones (the largest types are placed first); all unlocked items are cleared before placing.
- **topAreaFt2 ignores overhang parts** (ground area only): conifers 276.12 -> 50.27, deciduous 490.87 -> 78.54 in the Squat Forest, so trees spawn more densely. Confirmed: 100-tile map is the 10% band; 1 min / 1500 per type / 4900 total.
- **Copy/paste bug fixed** (introduced in v3.2): pasted items lost their original geometry, which broke canopy cutting on the copies.
- Spawning is faster with many items (existing items are measured once per type).
- Interpretations to confirm: "largest possible area" = the largest part from above, at the largest scale in the item's range; a map of exactly 100 tiles is in the 10% band.

## v3.2
- **Crown shyness.** Overhang parts (canopies) of neighbouring items may now overlap each other. Where they do, each canopy is sliced back with a straight vertical cut through the point where the two outlines meet, set back by half of a 1.5 ft gap (constant `CROWN_GAP_FT`), and the cut is closed with a cap. The cut is recomputed whenever items spawn, move, rotate or resize (not while dragging), is used by exports and the 3D model export, and nothing extra is saved. The original geometry is kept, so moving trees apart restores full canopies.
- Spawn collision now ignores overhang-vs-overhang pairs; all other part pairs still collide (so a canopy still cannot cover another tree's trunk at the same height).
- Selection boxes still use the full canopy size.
- Known limit: the cut is one straight vertical plane, so on a cone it also trims narrow upper parts a little more than a curved cut would.

## v3.1
- **Parts that poke out are trimmed.** A part that rises through a part above where it starts and then sticks out of it (a trunk through the side of a cone canopy) is cut where it leaves that part. Applies to every item; the built-in tree is unchanged.
- **Spawning uses real geometry.** The footprint-circle spacing check is gone: two items collide only when a part of one overlaps a part of the other in both footprint and height, so rocks and bushes can spawn under canopies but not inside trunks. `footprintFt` is now only used to keep an item inside the map edge.
- **Spawn order:** terrain first, then item types from largest to smallest average volume (so hills can spawn, then a tree on one, then a boulder under its canopy).
- **Seam fix:** cones and cylinders sometimes showed a sliver along one edge (the seam vertices were jittered differently because of a "-0.000" vs "0.000" key). Fixed.
- The Squat Forest sample: stump top disc removed (it clipped).
- On hold at your request: unlinking parts for separate scaling; "the thing we're going to change".

## v3.0 (themes, phase 1)
- **Item types are now data.** The built-in tree and rock are defined as parts (sphere / box / cylinder, each with colour, noise, optional taper, optional overhang flag) with sizes in feet. They look the same as before at 3 ft tiles. Format documented in `THEME_FORMAT.md`; `sample_theme.bevmtheme.json` is a shapes-only example of every field.
- **Validation.** `validateTheme()` accepts only known fields inside set ranges (max 10 item types, 8 parts, 1 MB) and rejects anything else with a readable message. No scripts are ever run from a theme.
- **Themes tab (new).** Install Theme File, Use, Export, Uninstall. Installed themes are stored in the browser's IndexedDB; the built-in demo theme cannot be uninstalled. The Theme dropdown in Generation switches themes too (asks first if the map has items; terrain stays).
- **Maps embed their theme** (`theme.def`) and every item remembers feet-per-tile (`fpt`), so a map opens without its theme installed and does not change size when the tile size is changed. Older saves open with the built-in theme.
- New maps keep the theme currently in use.
- Not built yet (recorded in THEME decisions below): terrain items from data, ground textures in themes, auras, floating, See-Through, part options, spawn-area selector, theme-making guide, Placement-tab items from several themes.

### Theme design decisions (agreed, not yet built)
- Themes are data only; max 10 item types, any mix of terrain and other items. Maps embed what they use.
- Neutral terrain (roads, paths): ground level 0 by default, up to 1 tile raised or sunk, defined by its own ground texture; gets the same elevation/cover stamping as other terrain (nothing marked at 0).
- Ground textures: described with the existing inputs (3 colours, fixed noise pattern, size, contrast, detail, drift); format must be future-proof for composable layers. Uploaded textures are a separate path.
- Terrain items default to the ground texture (changeable); terrain items without an overhang deform the terrain; overhang approach for terrain to be chosen for performance.
- See-Through (glass-like, distorts shadow, full cover vs melee not line-of-sight spells, exported, stamped), auras (circle/ellipse, square/rectangle, triangle, hexagon, star; X/Y scale, own rotation, offset, edge noise; tint also on nearby items), floating (slider when ticked), spawn-area selector (edges/sides/corners toggled, edge noise, white outline preview, all on by default). Pulsing is impossible (static images).

## v2.9
- **All tabs start closed.** Settings and Generation no longer open by themselves at start-up (selecting an item still opens the Items tab).
- **Show overhangs toggle** under Grid lines (Settings). Unchecked, overhanging parts (tree canopies, anything flagged overhang) are hidden so you can see what is under them, but they still cast shadows. It only changes the view: exports always include overhangs as before. Saved with the map (`settings.ovh`, additive) and available as a Control Schema default.

### Theme design decisions recorded (not built yet)
- Themes are data only (no scripts); installed themes go in the browser (IndexedDB), with load, validate, store and uninstall; maps embed the item definitions they use; items from any installed theme can be placed; limit 10 items per theme (any mix of terrain and other items).
- Item sizes in themes are stored in feet and shown in the user's chosen unit.
- Terrain items: built like other items, default to the ground texture (changeable), still count for elevation/cover; items without overhang deform terrain like hills and pits.
- See-Through toggle on every item (glass-like, distorts shadow, still exported, still stamped). Auras: shape (circle/ellipse, square/rectangle, triangle, hexagon, star), X/Y scale, own rotation (follows item by default), offset, edge-noise slider, tint also shows on nearby items. Floating: slider appears when checked, shadow cast as usual. Area selector for spawning: big square split into edges, sides and corners, each toggled, noise slider on the edge, white outline preview, all ticked by default.

## v2.8
- **Light 1 can be removed too.** Every light box now has a Remove button. A map can have 0 to 3 lights; with none, only the soft ambient light is left. Removing a light moves the ones below it up a number (removing Light 1 turns Light 2 into Light 1). Add Light brings back a removed Light 1. Saved with the map (`settings.light1`, `settings.lights`).
- **Control Schema defaults:** Light 1 has a Remove Light button there as well, so new maps can start with 0 to 3 lights. In that page the lights are called global illumination sources.
- **Print button hidden.** The print dialog needs real options first (see Not built yet); the code is kept and the button is only hidden.
- Tested: remove / shift / zero-light save and restore / Add Light brings Light 1 back / Control Schema equivalents / new map with no light / reload, earlier tests rerun, no console errors.

## v2.7
- **Remove button on Lights 2 and 3** (Settings). Light 1 has none and cannot be removed. Removing a light renumbers the ones below it (removing Light 2 turns Light 3 into Light 2) and the Add Light button comes back.
- **Control Schema defaults now include the System selector** (Generic is the only choice; the others are greyed out as in Settings). The system is also saved with each map (`settings.sys`).
- **Add Light / Remove Light in the Control Schema defaults**: set how many lights new maps start with (Light 1 plus up to two more, for worlds that usually show several suns), with their own angle, compass, strength and tint sliders. Light 1 always exists. Starter values are unchanged (Light 2: angle 45, compass 135, strength 0.5, white; Light 3: compass 225). Saved in localStorage with the other defaults; open maps are never changed by them.
- **Default Settings for new maps moved above** the other Control Schema settings.
- Tested: remove / renumber / scene lights, Light 1 has no remove, defaults section order, Control Schema add / edit / remove, defaults applied to a new map and kept after reload, earlier tests rerun, no console errors.

## v2.6
- **Light preview cube** only appears before the first Generate. Once the button reads Reroll Whole Map it stays hidden, since the real items show the shadows.
- **Generate with nothing switched on** (button or R key) shows an error popup: "Nothing was selected to be generated."
- **Height (Z) of an item is editable.** Typing or dragging a value in the height box fixes the item at that height and it stops snapping to the ground (it keeps the height through rerolls, moves and saves; saved as `fy`). A new wavy-line-with-a-cross button above the height box snaps it back to the ground (dim while already snapped). Hills and pits still show their ground height read-only.
- **Rotation is a slider** (like the Light sliders) with the degrees beside it; it shows the random rotation the item was generated with. Number boxes in item boxes are now Position X / Y / Z and Scale X / Y / Z only.
- **Default Settings for new maps** (User Context > Control Schema): map size, tile px, tile unit, tile size X / Y / Z with chain links, grid lines, Light 1 (angle, compass, strength, tint), Toon shader and Edges. Saved in localStorage (`bevm.controls`). They are used only when a new map is created (Create New Map, or the very first map when nothing is autosaved). Changing them never changes an open map, and changing the Settings tab never changes them. New maps start with Light 1 only.
- **Add Light** button under Light 1: adds Light 2, moves under it, then adds Light 3 and disappears (three lights maximum). Starter values: angle 45, strength 0.5, white tint, compass 135 (Light 2) and 225 (Light 3). Colours add up. Each light casts shadows; Lights 2 and 3 are saved with the map (`settings.lights`) and restored.
- **Edges** option in Rendering: a heavy dark border around every item's silhouette as seen from the current view, in the live view and in exports (including the separate foreground image). Done with a back-face copy of each item mesh pushed out by a few screen pixels; border width scales with pixels-per-tile so it looks the same at any zoom or export size. Not part of the .glb. Saved with the map.
- Save data gains `settings.edges`, `settings.lights` and item `fy`; format number stays 1.
- Tested: error popup, cube before/after Generate, Z unsnap / reseat / save / re-snap, slider rotation, lights (add, order, save round trip, 3 directional lights), defaults captured, isolated both ways, applied to new maps and kept after reload, edges (outline per mesh, gizmo box unaffected, export, GLB unchanged, paste, toon toggle), earlier v2.4 / v2.5 tests rerun, no console errors.

## v2.5
- **Selecting opens Items > Selected**: clicking an item, hill or pit (or drag-selecting) opens the Items tab on its Selected sub-tab, closing unlocked tabs the way clicking the bar does. The old behaviour of opening Generation (it only showed parked, hidden sliders) is gone.
- **Control Schema settings** (User Context page > Control Schema): a new switch, "Selecting something opens the Items tab on Selected", turns that off. Settings on that page are saved in localStorage (`bevm.controls`) and restored on load; more switches can be added the same way (a `data-cs` checkbox plus a default).
- **Z is now height** in the Items boxes: Scale and Position read X / Y / Z (height), matching the tile size boxes. Box Y is the depth. (The chain buttons still mean Y follows X, Z follows Y.) Nothing changes in saved data.
- **Save files keep 4 decimals** (1/10000 of a tile) for positions, scales and rotations instead of about 14 digits. The difference is far below anything visible, the files are noticeably smaller, and a save re-opened and saved again comes out identical.
- **Drag to change numbers**: press on any number box and drag up to raise the value or down to lower it (4 px per step, using the box's own step, respecting its limits). A plain click still focuses the box for typing. Number boxes show an up/down cursor when they can be dragged.
- **Light preview cube**: hovering the Light 1 box in Settings shows a 1x1x1 tile cube floating two tiles above the middle of the map, shaded and shadowing with the sun, and hides when the pointer leaves. It is not part of exports.
- Tested: selection jump on/off, setting survives a reload, rounding stable, number dragging (settings box and an item's rotation box), plain click still focuses, cube shows/hides, earlier v2.4 tests rerun.

## v2.4
- **New fourth tab, Items**, with sub-tabs **Selected**, **Terrain** and **Other**. Every object gets a box. Selected is empty until something is selected, then shows a box per selected object (items, or the selected hill/pit). Terrain lists every hill and pit (Hill 1, Hill 2, Pit 1 ...). Other lists every non-terrain item (Tree 1, Rock 1 ...). Click a box header to open or close it.
- **Hover highlight**: hovering an object's name in Terrain or Other lights it light red on the map (items glow red with an outline box; hills/pits get a red outline on their footprint). It disappears when the pointer leaves, is never saved and never exported.
- **Open box**: Position X / Y (height, read-only, set by the ground) / Z in tiles; Scale X / Y / Z with the same chain / broken-chain buttons as the tile size boxes; Rotation in degrees. Numbers follow the object when it is dragged on the map, and typing moves, scales or rotates it (terrain edits rebuild the ground once typing pauses).
- **Casts shadows** switch on every item. **Extras**: a THEME entry can list `extras` (for example a glow with a colour picker); they appear in that item type's box and are saved. No theme defines one yet (tested by injecting one).
- **Per-object ground texture**: a hill or pit's box has a Texture list (Same as ground or any ground texture), so a water ground can hold grassy or sandy island hills and a gravel pit. The ground now uses two small weight textures over the map; hill and pit edges blend softly. Saved with the map.
- **Stone** ground preset (bare rock with cracks).
- Vertex colours of the ground are now plain height shading; the .glb export bakes the average colour of the textures under each vertex.
- Save files gain `tex` (hills/pits) and `sh`, `ex` (items); the format number stays 1 and older saves still open.
- Tested: boxes/names, hover on/off, chain behaviour, scale, rotation, position, shadows, texture weights, save round trip, glow, GLB validity, no console errors.

## v2.3.2
- The tab title is now written into the page itself (`BEVM v2.3.2 \u2013 ...`) and the on-screen load-error message includes the version, so you can tell which file is really open even when the script does not run. No other change.

## v2.3.1
- **Fix: blank view in some browsers** (error "The specifier \u201cthree\u201d was a bare specifier, but was not remapped to anything"). v2.2 imported Three.js by the bare name `three` and relied on the import map; some browsers drop an import map that comes after a `modulepreload` link, so the import failed and nothing rendered. Now the import map comes first and the script imports Three.js by its full address, so it works even if a browser ignores the map. Tested in Chromium with the map present, with the map removed (what your browser did), and with a tampered library file (still refused with the on-screen message). Not tested in Firefox.

## v2.3
- **Ground texture** (Generation tab, new Ground box above Theme): the ground colour is computed per pixel from noise in world space by a small shader patch on the ground material, so it is crisp at any zoom and at export size and needs no image files. Presets (first-pass palettes and patterns, all tweakable): Plain (the old flat green, no shader), Grass, Dirt, Sand (stretched ripples), Snow (low contrast), Gravel (cell pebbles), Water (warped flowing noise). Sliders: Noise size, Contrast, Detail (octaves), Color drift (slow hue shift across the map, so changing the noise also shifts colour). Picking a preset resets the sliders to its defaults.
- Height shading still comes from the vertex colours (grey in textured modes); shadows, toon / Lambert switch, export (both passes) and contour lines all work with it.
- Saved in the save file (`settings.ground`); older saves load as Plain. The .glb export keeps flat ground colours (a shader cannot be written into glTF).
- Not done yet: tileable image output, per-theme ground presets, reference-image palettes.

## v2.2
- Console warning fixed: Three.js now loads as an ES module (`three.module.js` through an import map) instead of `build/three.min.js`, which printed "Scripts build/three.js and build/three.min.js are deprecated with r150+, and will be removed with r160". Pinned to r152.2, so the app does not change; this also makes a later move to a newer Three.js possible.
- The integrity hash moved to the module file: current browsers check it through the import map (`integrity` key), and a `modulepreload` link carries it as a second check. If the file is missing or changed the page shows the same on-screen message as before. (A very old browser without import map integrity would load it unchecked.)
- The main script is now a module, so its names are no longer global. The six functions that used to be redefined further down (pick, tint, info, select, moveSel, wasd) are kept as `pick_v06`, `tint_v06`, `info_v06`, `select_v06`, `moveSel_v06`, `wasd_v07`: a module refuses duplicate names, and the old copies were never called anyway.

## v2.1
- Panel width scroller removed: the three tile size boxes shrink to fit (the row was wider than the 320 px panel); the panel no longer scrolls sideways.
- Export Save File, **Export inside labeled file** reworked. Zip off: the browser's folder picker (Chrome / Edge) asks where to put a new folder named after the map, and the JSON and images are written inside it. Browsers without it (Firefox, Safari) or a page that may not use it (e.g. the published artifact) fall back to separate downloads and a message says why. Zip on: the files now sit at the top of the zip and the zip is named after the map, so unzipping gives one folder with the files directly inside (before, there was a folder inside the unzipped folder).
- New option **Include 3D model (.glb)**: ground and every item as a binary glTF (hand-written writer, no library; passes the Khronos glTF validator). Scaled to metres from the Tile size boxes, with vertex colours on the terrain. Export only; import ignores it.
- Subresource Integrity hash on the Three.js script, plus an on-screen message if it fails to load or is refused.

## v2.0
Saving arrives (the "no saved data" rule is relaxed for the downloadable file; restrictions can return if BEVM is ever hosted for people who do not want to download it).
- **Maps popup** (bottom left, first button, shows the current map's name): lists up to 5 open maps (`MAXMAPS`; an option to change it comes later). Click a name to switch (the map you leave is kept, camera included), click the pencil to rename (Enter / click away saves, Esc cancels), **Create New Map** makes a blank map with default settings. With 5 open, a dialog warns that the map **edited longest ago** (viewing or renaming does not count as editing) will be deleted, naming it; **Go Back** cancels, **Proceed Anyway** goes ahead.
- **Autosave**: the map being viewed is written to `localStorage` (`bevm.autosave`, one slot, always overwritten, only when something changed) every 30 s, when the tab is hidden and on page close. It is restored when the page opens (a short message says when it was saved). The other open maps live in page memory only.
- **Export Save File** (split button, same popup style as Export Top Down View): writes the map as `.bevm.json` (settings, theme switches, hills, pits, every item with its position, size, rotation, lock and a shape seed). Options: Export inside labeled file, Export as Zip file, Export with Top Down View, Separate foreground, Format (+ quality). Zip is a built-in writer (no library). "Labeled" = file names start with the map name and, in a zip, sit in a folder of that name; off = `bevm_map...`. The image uses the grid / stamp / label options of Export Top Down View.
- **Import Save File**: pick a `.json`, a `.zip`, or a `.json` together with its images (Ctrl+A in the folder). Images are never imported. More than one save in the selection (or inside a zip) imports nothing and an error dialog lists them; images alone give an error too. Zips with deflate compression and macOS `__MACOSX` junk are handled. An imported map opens as a new map (so the 5-map warning applies).
- Save data is validated before use (`clean()`): wrong app or newer format refused, numbers clamped, unknown item types refused, limits of 500 hills/pits and 5000 items, 20 MB per file, zip entries capped; messages in dialogs are shown as plain text.
- Every item now stores a shape seed (`rng`, seeded `jitter`) so a reloaded tree or rock has exactly the same lumpy shape.
- **Print**: printer button between Export Top Down View and its ▼ arrow; asks to confirm, then prints the image(s) the export would make (1 merged, or 2 with Separate foreground) through a print-only stylesheet.
- `buildExport()` split out of the export code (used by export, print and save).
- Footer note and User Context text updated. Version jumps to 2.0 (not 1.10, which would read like 1.1).

## v1.9
- Space + drag draws a selection box: the box's start corner is a world point (re-projected every frame) and the crosshair is the opposite corner, so panning with W A S D stretches it. Releasing Space selects the items inside, like the mouse.
- New rebindable action "Drag-by-pan while held" (default Shift): turns the drag-by-pan toggle on while held, remembers the state it was in before, and restores it on release (also restored if the window loses focus). Mouse Shift+drag still adds to a selection.
- Esc while rebinding a key now only cancels the rebind (it no longer also closes the User Context page).
- User Context text updated.

## v1.8
- Space can use gizmos like the mouse: Space presses at the crosshair, and while it is held the crosshair acts as the pointer (a synthetic pointer move is sent every frame), so panning the camera with W A S D drags the item or handle you grabbed. Real mouse movement is still ignored while Space is held.
- Scale handles (item gizmo and terrain gizmo) are re-projected to the screen every frame from their world positions, so scaling stays correct while the camera is moving.
- Esc deselects everything (items, or the selected hill/pit). With the User Context page open it still just closes the page; while rebinding it cancels the rebind.
- User Context text updated for both changes.

## v1.7
- Render on demand: frames are drawn only while something is happening (any input, key, pointer, wheel or resize event keeps the loop alive for 0.4 s; held keys keep it alive while down). When idle no frames are requested, so an open tab does no GPU work. Previously the scene redrew about 60 times a second even when nothing moved.
- `wake()` must be called after any scene change made outside an event handler; export does this itself (its canvas resize needs a redraw afterwards).
- Version number added: tab title, panel footer, User Context page, file header; versioned copy `bevm_v1.7.html`.
- SCRIPT MAP comment at the top of the script plus short comments above the main functions.

## v1.6
- Left/right arrow orbit direction flipped.

## v1.5
- Object On switches no longer generate anything; they only take effect on Generate / Reroll Whole Map or a type's Reroll button.
- Arrow keys: up tilts toward top-down, down toward side-on (flipped from the middle-mouse feel).
- Tile size: chain icons between X–Y and Y–Z replace the two checkboxes (linked chain = locked, broken chain = free).
- Space clicks at the crosshair, not at the mouse; real mouse moves are ignored while it is held.
- Crosshair is light red, 2 px, medium opacity.
- With something selected, the pan keys start slow and ramp up like the zoom keys.
- User Context page text updated to match.

## v1.4
- User Context page (was Documentation) with Guide / Keybinds / Control Schema tabs; Left/Right arrows switch pages, Esc or an outside click closes.
- Working rebinding menu on raw key codes (`KeyboardEvent.code`), swap on conflict, saved to localStorage when allowed.
- Keys: 1/2/3 = Top/Iso/Side; arrows orbit; T and quick middle click centre the camera on the pointer; F/V accelerating zoom; Space = click.
- Crosshair and drag-by-pan toggles (bottom right of the view).
- Map starts blank; per-type On switches.
- Tile size X/Y/Z with locks and a unit selector (converts values; feeds height labels and the export note, not the drawn map).
- System Selector (Generic; Pathfinder 2e and Coming Soon greyed out).
- Export popup no longer scrolls sideways.
- Kept on purpose: the disabled legacy keydown handler and the unused `OLD_DOC_V13` string.

## v1.3
- Export button moved to bottom left, renamed "Export Top Down View"; options open as an upward popup.
- "?" box (top right) opens the full-screen documentation; section ids `doc-*` for future per-tab "?" links.
- Rotation arcs meet tip to tip at any radius.

## v1.2
- Terrain gizmo and ring rest on the terrain level under the feature (`baseH`) instead of y = 0.
- Shader toggle no longer swaps gizmo/helper materials; `hAt` never returns NaN (attempted fix for black gizmo faces; reported fixed).

## v1.1
- Pit gizmo no longer flipped (Y vertex scales depth).
- Gizmo picking ranked by depth so a front face always wins.
- Bottom face (F2) easter egg dialog.
- Pits are selected before the hill beneath; Ctrl or quick double-click selects the hill.
- Terrain ring spins with the feature; rotation rings rebuilt at fixed thickness (`ringBuild`).

## v1.0
- Terrain tetrahedron gizmo (O, X, Y, Z; edges; faces F1–F4): move, scale one/two/three axes, rotate ring.
- Elliptical, rotatable footprints via `fd()`; locked items re-seat on terrain after a reroll.

## v0.9
- X does the whole-map reset (home button removed); slider panel parked (hidden, code kept).
- Ctrl+C / Ctrl+V identical copies; R rerolls everything except locked; L locks / unlocks.
- Hills and pits selected and moved like items; Shift+drag forces a selection box.
- Rotation direction fixed; export dropdown closes on outside click; file size estimate.

## v0.8
- Home = top down, no rotation, fit whole map (also Home key); gizmo ring as two arrowed halves; handles sized to the item; light orange 50 % gizmo.
- Export split button with options (grid, foreground split, stamps, height labels, format, quality with lossy warnings).
- Hills/pits movable via a checkbox (terrain rebuilds on release).

## v0.7
- Home button, WASD pan, Z/C tilt steps, X spawn view, 0.25 s grid-return delay.
- Slider jitter fixed (value labels had variable width).
- Item gizmo: box with face/edge/corner scaling and a rotation ring; marquee multi-select (move only).
- Export hides the gizmo and selection tint.

## v0.6
- Grid auto-hides within 5° of side-on (reads the manual toggle, never writes it).
- Items can be selected, dragged, scaled (width/depth together, height separate) and rotated.
- Object cover labels measure real scaled height.

## v0.5
- Two-pass export: background plus a transparent foreground of overhangs (tree canopies) that still cast shadows; files `map_N_background` / `map_N_foreground`.
- Theme questionnaire note: overhanging parts must be flagged `userData.overhang`.

## v0.4
- Tilt arrows step 0.5° / 45° / 89.9°; Q/E rotate in 45° steps; Iso = 45° tilt; view buttons light only on exact angles.
- Accordion tabs: left 75 % opens/closes, right 25 % arrow pins open.

## v0.3
- Contour lines (marching squares, every 0.5 tile); tile stamps halved; thinner cross-out on the eye.

## v0.2
- Export camera enabled all layers (fixed empty export); stamps drawn last; crossed-out eye symbol for no line of sight.
- Middle-drag rotates sideways; arrows snap straight down / side-on; smooth meshes with no gaps; object label height conversion fixed.

## v0.1
- First build: orthographic top-down Three.js map, toon shading, heightfield terrain (hills, pits), placeholder trees and rocks, light controls, camera controls, WebP export with elevation and cover stamps.

## Not built yet
**Print dialog options** (the print button is hidden until then): the popup needs real settings, above all a slicer that splits a large map over several pages so the printed size comes out right (not tested on a real printer yet). Also: undo, round dials, Placement tab and item list, EXIT button, tiled export, theme loading, noise textures, touch and gamepad input, per-tab "?" help links, screen reader and deaf-user aids.
