# Progression review — 2 November 2026

This is an editorial revision against the existing game-data snapshots and publicly readable source material. It is not an in-game benchmark or an independent verification of every extracted mechanic.

## Sources used

- Official updates: https://relink-ragnarok.granbluefantasy.com/en/updates/ — the public feed checked in this conversation listed 2.0.6 as newest.
- Master Trait system and character tables: https://www.rpgsite.net/guide/20796-granblue-fantasy-relink-endless-ragnarok-all-characters-master-traits — re-read for the 3/6/6 perk thresholds and 10/10/10/20 budgets. This secondary reference does not establish optimal selections.
- Existing `research/pl*.json`, `levels.json`, `display.json`, `skill-catalog-0.json` and relink-logs pool snapshots — node IDs, trait descriptions, skill ownership and item/pairing checks. Fresh requests to the extracted character-table origin returned 403 for all 28 characters; see `sources.json`.
- Boodendorf, Vaseraga guide: https://relink.cleista.cc/en/guides/24 — re-read for charge-slot economy, Poise/Cascade and low-HP trade-offs. Its weapon-switching recommendation is not adopted because this handbook keeps Defender progression.
- Inaba, Eustace guide: https://relink.cleista.cc/en/guides/33 — re-read for the distinction between ordinary charged ammunition and unchargeable heavy ammunition, skill cooldown and charge investment.
- Rets, Vane guide: https://relink.cleista.cc/en/guides/27 — re-read for blocking, Beatdown and the finisher/cooldown loop.
- Cagliostro specialist analysis: https://relink.cleista.cc/en/guides/22 — re-read for Mehen and debuff-driven recovery; the proposed Tyranny/low-HP weapon setup is not copied into Defender.
- Zeta specialist analysis: https://relink.cleista.cc/en/guides/28 — re-read for the optional shortened-loop trade-off; its reported reset exploit is not a promised mechanic.
- Siegfried specialist analysis: https://relink.cleista.cc/en/guides/21 — re-read for defensive commitment and practical timing limits.
- Lancelot specialist analysis: https://relink.cleista.cc/en/guides/18 — re-read for guard-based protection and the difference between the repeated mastery attack and ordinary dodges.

Other character-specific guidance uses the already collected sources linked by the site, plus the saved trait and perk descriptions. It is not described as fresh independent testing. Characters without a linked specialist article retain direct table-based recommendations and explicit encounter/trigger checks rather than invented benchmark evidence.

## Concrete changes

- All 28 characters have a foundation skill set and attack loop, three initial equipment priorities, a named unique-equipment transition and a training checkpoint. All 84 styles have explicit trait emphasis. Early equipment is selected from these character priorities rather than the same four-cap-first template.
- Early skill cards and text exports no longer present future mastery rotations as the active foundation. Rank 1/2/3 milestones display the actual perk descriptions and their unlock stage.
- `master-selections.json` stores all selected node IDs and rationales explicitly. Rebuilding only validates/assembles them; it no longer scores and chooses nodes.
- `node-changes.json` records individual node replacements. Important changes preserve HP healing in Captain/Katalina/Cagliostro support, add Mehen recovery for Cagliostro Insight and favor resource/uptime effects for Rackam, Yodarha, Eustace and Seofon. Maglielle Insight no longer assumes a shield from an unequipped skill.
- Ghandagoza Essence uses the HP-conversion gear route only at Rank 3. Low-HP expansion gear explicitly requires Nyx's current-HP condition and explains Ventus's ally-healing restriction.
- Vaseraga avoids automatically adding a second Quick Charge source and keeps Poise/Cascade support. Eustace's Insight/Crux allocation does not automatically target Quick Charge 30.
- Primary-category layout was reconciled with node selections: ordinary high-HP late boards retain five Basic Stats and five Defense/Support primaries when the category-cap node is active. Low-HP boards retain at least four Defense/Support primaries while using Ventus. Zero-contribution Attack-category nodes were replaced; one necessary Rank-3 unlock-only choice is labelled as zero, and three EX boards reserve a material instead of spending it on a zero-effect node.
- Lancelot Essence uses Improved Guard in its late repeated-finisher plan; no normal-dodge benefit is assumed for the mastery-specific repeated attack.

## Verification boundaries

The automated checks inspect all character/style/stage/accounting views, node budgets/dependencies, legal names and pairing pools, foundation skills, export consistency and sharing. They cannot establish move-specific damage, boss hit reliability, resource proc frequency, clear speed or survivability. The printed checkpoints identify what a player would need to measure before calling a recommendation optimal.
