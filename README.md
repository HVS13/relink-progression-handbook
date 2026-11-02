# Relink Progression Handbook

A browser-based, Defender-first progression guide for all 28 characters in **Granblue Fantasy: Relink – Endless Ragnarok**.

**[Open the handbook](https://hvs13.github.io/relink-progression-handbook/)**

Choose a character, difficulty, Master Style and unlocked Sigil count. Start with **Your build now**, equip Sigils in the numbered priority order, then follow **Add next** and **Progression and upgrades**. Four skills, combat instructions, exact Master Trait allocations, Summons and source references remain available. Progression covers Extreme, Maniac, Proud, Chaos, Chaos+ and Chaos++.

- **Copy build link** preserves the character, difficulty, style, unlocked Sigil count, EX toggle, equipment view and critical-rate replacement toggle. Personal stat inputs are not included in shared links.
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
| `research/official-patch-review.json` | Dated official version check, shared corrections and all 28 character patch notes |
| `equipment-evidence.json` | Named Summon roll values, acquisition routes and versioned source links |
| `prepare-revision.js` | Validates fixed selections against source snapshots and assembles the data |
| `revised-runtime.js` | Rendering, equipment targets, totals, links and exports |
| `handbook-template.html` | Page structure |
| `handbook.css` | Responsive layout, focus states and print styling |
| `assemble-revision.js` | Generates hosted and standalone editions |
| `research/` | Source snapshots required to reproduce and verify the build |

Pushes to `main` build and test the handbook before deploying `dist/` to GitHub Pages. Pull requests run the same checks without deploying. In repository **Settings → Pages**, the publishing source must be **GitHub Actions**.

## Evidence and limitations

The game-data review targets **game version 2.0.6 (released 17 September 2026), confirmed against the live official update list on 2 November 2026**. All five listed update articles (2.0.2 - 2.0.6) were read. Each character has a sourced patch-compatibility note; fixed-level Sigils target level 15, Fediel retains the five-stack correction, and Master Trait limits remain enforced. This patch-note review does not establish an all-character damage ranking. Character pages link their official documentation, extracted tables and community references. Extracted relink-logs sources are pinned to the recorded commit in `research/logs-source-revision.json`.

The **2 November 2026 progression revision** adds character-specific early equipment/skills, six-stage decisions and explicit node selections. It preserves actual HP healing in support presets, separates low-current-HP gear from high-current-HP gear, and removes several resource-loop mismatches. Source status and concrete changes are recorded in `research/progression-review/README.md`. Live extracted-table requests returned HTTP 403 during this review; those files remain the existing snapshots, not newly fetched data.

The checks cover 1,008 simulated character/style/stage/equipment views, node budgets, skill ownership, item names, selected pairing rules, export consistency and shared-link restoration. They are software and source-consistency checks, not in-game combat benchmarks. Recommendations are analytical starting points and can depend on encounter, execution and equipment conditions.

The equipment follow-up uses Crowthorne’s farming guide, Nenkai’s base/ER quest tables and named Summon pools, and Cleista’s disqualified-equipment examples. Every character/style now includes acquisition restrictions and maximum legal equipment targets, also included in build exports. Single-trait V items are explicitly excluded as synthesis donors; character rolls remain separate from ordinary synthesis. Summon pool checks use actual discrete values, with distinct damage/healing and Astral/tier-III ceilings. The older quest tables (1.3.x / 2.0.2) establish historical routes, not current exact-roll probabilities. Endgame recommendations retain the maximum legal rolls independently of personal save preferences. No save file is edited by the handbook.

The specialist research follow-up corrects Io's missing Warpath, eight bonuses for unequipped skills in Fediel/Vaseraga presets, and adds exact conditional Aqua/Ventus comparisons without altering primary categories or core trait levels. It cross-checks Maygi's handbook and bounded calculator data, Inaba's Eustace guide, and original community discussions. The Io reaction-label follow-up corrects the displayed summary using Maygi’s original demonstration and matching individual duration nodes; raw snapshots and source-access limits remain explicit in the review record; this is source and build consistency work, not a measured all-character DPS ranking.

This is an unofficial community project. Game names and related material belong to their respective owners. The referenced source data retains its original ownership and terms.

The [27-character description review](research/description-review.md) compares the other characters’ perks, modifier nodes, unique effects and rotations. It corrects Rosetta’s rose requirement and three node selections, Eugen’s rank-gated Shell Shock threshold, Vane’s blocking-resource explanation, and several omitted status/input descriptions. Rosetta’s conflicting modifier target is excluded rather than guessed. Defender equipment targets are retained; unresolved observations remain attributed.

The player-facing layout follows patterns reviewed in [KQM quick guides](https://keqingmains.com/q/venti-quickguide/), [Icy Veins progression guides](https://www.icy-veins.com/d4/guides/blizzard-sorcerer-leveling-build/), [MetaBattle builds](https://metabattle.com/wiki/Build:Guardian_-_Core_Power_Guardian), [Snow Crows beginner guidance](https://snowcrows.com/guides/new-player-guides/beginners-guide-to-doing-more-dps/) and [NN/g progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/): immediate equipment and play instructions first, explicit upgrade order, then expandable variants, mechanics and evidence. These are presentation references, not sources for Relink mechanics.

The unlocked-slot selector supports 1–12 slots. Numbered priorities are suggested progression choices, not in-game slot numbers or a benchmarked optimal ordering. They retain character items before later duplicate stats and preserve the low-HP setup's required ally-healing restriction. The complete 12-item target is unchanged. Totals, category contributions and exports count only the selected equipped targets; upcoming targets are listed separately. Reduced-slot setups can miss full-build stat thresholds, so the site calls out that limitation rather than counting unavailable gear. Phone layouts show the same Sigil data as stacked cards.
