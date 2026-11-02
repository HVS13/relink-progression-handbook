# Character description consistency review

Checked 2 November 2026 against the handbook's game-2.0.6 target. This pass covers the 27 characters other than Io; her reaction correction is recorded separately in `progression-review/README.md`.

Scope: compared every character's three style perks, their modifier nodes, selected unique-trait effects, four-skill plans and written rotations. Used the existing 28 October extracted snapshots, the official 2.0.2–2.0.6 review, and original specialist material where available. A matching tooltip and wiki copy are not independent proof of behavior. This is not 27 new combat tests or a new damage ranking.

Primary evidence: the character-specific `pl*.json` snapshots and `levels.json` in this directory; [official update articles](https://relink-ragnarok.granbluefantasy.com/en/updates/); [Rets' Vane guide](https://relink.cleista.cc/en/guides/27); [Boodendorf's Vaseraga guide](https://relink.cleista.cc/en/guides/24); [Inaba's Eustace guide](https://relink.cleista.cc/en/guides/33); [Arti/contributors' Tweyen handbook](https://docs.google.com/document/d/1YrZZ0qLgZPH2WyDKdD7AJR8EQ0v6ysX8K_0pItlVmME/edit) and its [author-approved port](https://relink.cleista.cc/en/guides/17); [sno/contributors' Maglielle handbook](https://docs.google.com/document/d/1itELHTI3TLv-NwEBTLaM-JrNvHfReNRyx-VxQ4TWxJU/edit). The two original Docs were freshly read through connected Drive. Original Chinese character-guide entries were also consulted; their performance rankings and immunity claims were not accepted as measured facts.

## Per-character findings

“No further correction” means no sufficiently evidenced discrepancy was found in this comparison. It does not establish that the game text is flawless.

| Character | Comparison and outcome |
| --- | --- |
| Captain | Checked Arts/Power Raise, healing-skill Combat Healer, and Substitute-only Charisma triggers. Official dodge/charge correction already present; no further correction. |
| Katalina | Checked Ares duration, Ares Surge consumption and Blade Blue skill triggers. Pactstrike dodge correction already present; no further correction. |
| Rackam | Checked Heat scaling, skill-hit Super Bull's Eye trigger and Duration-only escape at Crux Rank 2. No unsupported dodge escape or guaranteed random reset is recommended; no further correction. |
| Eugen | Clarified that Shell Shock requires three-grenade chains at Essence Rank 2, while two-grenade chains qualify at Rank 3. Three-grenade damage bonuses remain distinct. Melee/charged-shot unique-Sigil applicability remains qualified. |
| Rosetta | Corrected the rotation's unconditional three-rose requirement: selected node `6fb6680c` reduces the required number by one once unlocked. Restored the three missing Crux buff names in `f803a804` from parent perk `b1c4758e`. Flagged conflicting modifier `82120bef`; see below. |
| Charlotta | Checked Noble Order hit-loss threshold, Diamond Cutter parry trigger, and Invincible/Divine Justice handoff. No further correction; duration is not presented as unconditional invulnerability. |
| Ghandagoza | Checked Ultrafist consumption, Essence Rank-3 HP-to-Shield/potion conversion, and Crux damage-skill gauge gain. Low-HP equipment remains gated to Rank 3; no further correction. |
| Ferry | Checked pet-stay chances, departing-pet Loving Trust, and Spiritbond ally triggers. Pet retention and departure are kept as different routes; no further correction. |
| Narmaya | Checked stance enhancements, maximum-butterfly skill gate and Kaleidoscope removal. Clarified that stance-shift combos establish the buffs before same-stance repetition; flagged the absent input symbol instead of inventing a button. Consumption-based cooldown behavior during Kaleidoscope remains qualified. |
| Lancelot | Restored the omitted Enhanced Damage Skills name in reset-condition node `a5292e0b`, using its own preceding sentence. Kept Flight over Fight excluded as an Essence stack trigger; no invented reset probability. |
| Vane | Clarified non-Beatdown unique-attack blocking gauge gains and Crux blocking stacks as once per attack instance, per Rets' original guide. Added the documented XXYY finisher-hit/Hero's Will interaction without promising damage or cooldown performance. Ordinary guard remains a different trigger. |
| Percival | Checked Stoked Charge, Molten Edge consumption and Flame Wolf parry/link triggers. Did not adopt the reported Roter Wirbel/Zerreissen bug as required behavior; no further correction. |
| Siegfried | Checked Dragonsbane Pulse timing failure, Dark Zeal Rank-3 retention and Daybreak counters. Official Mirage/Warpath corrections already present; no further correction. |
| Cagliostro | Checked Truth debuff triggers, Super Collapse chance-based instant charging, and healing/shield conversion. Existing infinite-cooldown exploit exclusion retained; no further correction. |
| Yodarha | Restored the missing normal-attack category in Insight Rank-2 perk `77424206`, corroborated by the original [Yodarha practitioner guide](https://relink.cleista.cc/en/guides/23). Clarified Rank-3 follow-up finishers consume one mark and grant none; Art's preservation remains a chance. |
| Zeta | Clarified the Insight Rank-2 high-jump input as normal attack [X], per the original [practitioner guide](https://relink.cleista.cc/en/guides/28), and distinguished it from the Crux Heavy Hammer condition. The reported reset-chance exploit and numerical shortened-loop penalty remain unverified and are not promoted to guaranteed effects. |
| Vaseraga | Checked Grynoth Unleashed expiry, Ebony Glint missed-charge loss, and Blood-Drinking Blade parry/link triggers against Boodendorf. No infinite survival guarantee; no further correction. |
| Beatrix | Checked Delta Clock effects, Embrasque Unleashed and the prescribed replacement-slot combo. The source concatenates clock icons; did not infer a new any/all-buff requirement from typography alone. No further verified mechanics correction. |
| Eustace | Checked effective range, reload stack loss and Heaven/Flamek marks. Inaba reports the extra-mark node can place two marks on one target, unlike the terse “marked foes +1” wording. Retain the node but do not promise a universal 80% cooldown return or exact tick requirement without reproducing it. |
| Id | Checked Heliotrope Aura, Essence's sealed Godmight and Fourfold Vengeance reset-on-hit/interrupt behavior. Existing max-HP-penalty exclusion retained; no further correction. |
| Sandalphon | Checked Limitless Light/Zohar refund, ten distinct buffs at activation, and Bell of War target stacks. The buff-count requirement is not assumed from gear; no further correction. |
| Seofon | Checked Samudaya loss on avatar dismissal, Infinito gauge consumption and alternating Combo-D Tag Team stacks. No additional guaranteed uptime; no further correction. |
| Tweyen | Restored Dawnray/Dull Point in the incomplete Rank-2 removal sentence. Clarified Rank-3 Mirror Image and ally buffs last 30 seconds, while the other self buffs are permanent. The original Doc's older claim that Strife extends enemy buffs is superseded by official 2.0.2 notes, already reflected in the guide. |
| Fraux | Checked delayed kicks versus full gauges, Strength Gains free-skill conditions and Crux Rank-3 loss of skill-driven gauge gain. No further correction. |
| Fediel | Checked five-stack official correction, bonus AoE trigger and interrupted-Hand Malice loss. The old ten-stack source is already overridden; no further correction. |
| Gallanza | Checked perfect Turbine/Deathmatch entry, Ultimatum during Deathmatch and Wild Showman-to-Flashpoint conversion. Official full-SBA-gauge requirement already present; no further correction. |
| Maglielle | Checked two-weapon limit, Blade Dance refund cue, Arts Superiór and damage-caused Shield loss against the original handbook. Kept Defender and its HP trade-off; no further correction. |

## Rosetta: unresolved target, resolved selection problem

`2a1e9175` says Lost Love grants Spiral Rose Bloomed, which strengthens Spiral Rose. `82120bef` instead names Lost Love as the target of its extra damage. This could be a modifier description error or a separate effect; no independent test found here settles it. The displayed raw node remains unchanged, and its skip reason explains the conflict.

All three presets replace this node with an unambiguous choice. Insight and Essence use `8ddafdfb` (ATK +20%); Crux uses `a733025f` (DMG Cap +20%). Insight retains six Insight selections. Essence/Crux do not equip Lost Love and cannot obtain the named Spiral Rose Bloomed trigger in the first place. The replacements preserve rank budgets and the selected specialization. No unmeasured damage increase is claimed; ATK can be redundant once an attack is capped.

## Boundaries

Raw source snapshots remain unchanged. Restored prose identifies omitted names rather than inventing undocumented values. Captain/Katalina/Rackam live guide requests were unavailable in the web reader, so existing original snapshots were used. Specialist reports are attributed, not relabelled as testing done here. No character gear target, Defender weapon, HP condition or maximum legal roll was downgraded. Narmaya's missing input, Rosetta's modifier target, Beatrix's icon-only condition and Eustace's mark multiplicity remain explicit limits on what this pass establishes.
