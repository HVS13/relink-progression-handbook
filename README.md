# Relink Progression Handbook

A browser-based, Defender-first progression guide for all 28 characters in **Granblue Fantasy: Relink – Endless Ragnarok**.

**[Open the handbook](https://hvs13.github.io/relink-progression-handbook/)**

Choose a character, difficulty and Master Style to see matching equipment targets, four skills, rotations, exact Master Trait allocations, Summons and source references. Progression covers Extreme, Maniac, Proud, Chaos, Chaos+ and Chaos++.

- **Copy build link** preserves the character, difficulty, style, EX toggle, equipment view and critical-rate replacement toggle. Personal stat inputs are not included in shared links.
- **Download this build** saves the selected plan as text.
- **Download offline HTML** saves a standalone edition containing the same data and interface. No server or internet connection is required to browse that file; source links require internet access.
- The guide uses no framework, external fonts, analytics or runtime APIs. Hosted CSS and JavaScript load as separate, cacheable assets.

## Build and preview

Use Node.js 22 or newer. There are no npm dependencies to install.

```sh
npm run build
npm test
npm run preview
```

The preview command needs Python 3. Open `http://127.0.0.1:8765/`. Any static web server can serve `dist/` instead.

The build produces `dist/` for GitHub Pages and `Relink_Defender_Field_Guide_Revised.html` for offline use. All build inputs are in this repository; no Downloads folder or machine-specific path is required.

## Editing

| File | Purpose |
| --- | --- |
| `revision-content.js` | Character playbooks, skills, rotations and recommendations |
| `progression-content.js` | 28 foundation skill plans, progression checkpoints and 84 style-specific trait priorities |
| `master-selections.json` | Explicit node IDs and reasons for all 84 presets; no automatic node scoring |
| `prepare-revision.js` | Validates fixed selections against source snapshots and assembles the data |
| `revised-runtime.js` | Rendering, equipment targets, totals, links and exports |
| `handbook-template.html` | Page structure |
| `handbook.css` | Responsive layout, focus states and print styling |
| `assemble-revision.js` | Generates hosted and standalone editions |
| `research/` | Source snapshots required to reproduce and verify the build |

Pushes to `main` build and test the handbook before deploying `dist/` to GitHub Pages. Pull requests run the same checks without deploying. In repository **Settings → Pages**, the publishing source must be **GitHub Actions**.

## Evidence and limitations

The game-data review targets **game version 2.0.6, checked 28 October 2026**. The interface updates do not imply a new mechanics review. Character pages link their official documentation, extracted tables and community references. Extracted relink-logs sources are pinned to the recorded commit in `research/logs-source-revision.json`.

The **2 November 2026 progression revision** adds character-specific early equipment/skills, six-stage decisions and explicit node selections. It preserves actual HP healing in support presets, separates low-current-HP gear from high-current-HP gear, and removes several resource-loop mismatches. Source status and concrete changes are recorded in `research/progression-review/README.md`. Live extracted-table requests returned HTTP 403 during this review; those files remain the existing snapshots, not newly fetched data.

The checks cover 1,008 simulated character/style/stage/equipment views, node budgets, skill ownership, item names, selected pairing rules, export consistency and shared-link restoration. They are software and source-consistency checks, not in-game combat benchmarks. Recommendations are analytical starting points and can depend on encounter, execution and equipment conditions.

This is an unofficial community project. Game names and related material belong to their respective owners. The referenced source data retains its original ownership and terms.
