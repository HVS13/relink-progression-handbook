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

## Equipment-source follow-up — 2 November 2026

- Crowthorne, *Farming in GBFR:ER*: https://docs.google.com/document/d/1wn8bf2U6CTOHHL3Ax2ejLlexjQXoHqweu5AsGuaAOjk/edit?tab=t.b4omuq2epux3 — read through connected Drive. Used acquisition advice and donor restrictions, not its recommendations as proof of optimal performance. The document includes older patch advice.
- Nenkai base drops: https://nenkai.github.io/relink-modding/resources/quest_drop_rates/ (1.3.x); ER drops: https://nenkai.github.io/relink-modding/resources/quest_drop_rates_er/ (2.0.2). Named Summon routes were checked against the quest sections, including Furycane III at The Tempest Rises. First-clear fixed rewards are distinct from random-roll pools. No combined exact-roll odds are inferred from chest percentages.
- Nenkai Summon pools: https://nenkai.github.io/relink-modding/resources/summon_trait_chances/ — checked the five named targets and stored only their relevant legal values in `equipment-evidence.json`. Tier-III cap bonuses stop at 50%; the three named Astral targets allow damage cap 100% but healing cap only 75%. A 45% tier-III bonus is in the legal pool; the endgame target remains the maximum 50%.
- Cleista: https://relink.cleista.cc/en and https://relink.cleista.cc/en/disqualified — used its legality examples to cross-check why leaderboard speed alone cannot validate equipment. Did not treat different encounters, weapons, party setups or disqualified logs as comparable damage tests for these Defender plans.
- The farming document calls the endgame HP stone Sequestration. The pinned relink-logs item-name table (`src-tauri/lang/en/items.json`, commit `8251151ae4503f649c0e22939871007f75559c56`) instead names item `667ee1d3` Fortification; its existing Transmarvel entry supplies HP 20 and allows Supplementary DMG 15 / Autorevive 10. Retained the guide’s table-backed name and slot layout. Confirm the actual item ID against the installed patch before future save work.

The follow-up adds row-specific acquisition restrictions and character/style-specific equipment constraints across all 28 characters, their six stages and 84 late presets. It clarifies that an unpaired V item must be replaced with a valid V+ target, rather than used as a synthesis donor. Build exports carry these restrictions and legal Summon pool values; all endgame Summon targets retain maximum rolls. The existing character skills and fixed nodes remain recommendations from the previous review; these farming sources do not establish better node allocations or independently benchmark all 28 characters.

Further source exploration checked Nenkai's Over Mastery page (https://nenkai.github.io/relink-modding/resources/re/mechanics/overmasteries/) and Transmute/Transmarvel tables (https://nenkai.github.io/relink-modding/resources/gacha_rates/). The former supports four distinct bonus types at tiers 2/3. Neither per-bonus rank odds nor a table's nested item weight is treated as the probability of a completed endgame item. No current-patch full-build acquisition percentile was established.

Cagliostro's animation-cancel demonstration (https://relink.cleista.cc/en/guides/26, labelled patch 2.0.5) adds a conditional practice note: interleave Collapse and the equipped charge-shortcut skills, but do not cancel before hits register or assume an instant-charge proc. Its optional Mehen sequence is not silently added to the Essence four-skill preset. The source author's Crux label does not change the demonstrated Super Collapse requirement. Narmaya's guide (https://relink.cleista.cc/en/guides/2) was also explored; it explicitly warns of outdated portions, so its broad performance-ranking claims were not promoted to verified handbook facts.

## Verification boundaries

The automated checks inspect all character/style/stage/accounting views, node budgets/dependencies, legal names and pairing pools, foundation skills, export consistency and sharing. They cannot establish move-specific damage, boss hit reliability, resource proc frequency, clear speed or survivability. The printed checkpoints identify what a player would need to measure before calling a recommendation optimal.
