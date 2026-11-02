# The AI Compendium review

Reviewed 2 November 2026 through connected Google Drive text extraction. Source: [The AI Compendium](https://docs.google.com/document/d/1y6tGs1WZ3Q6z8ANYH0A_T2oz6xvhS7gV7peULIK6jbU/edit?tab=t.cbbcbgm25isi), credited to Erze (main writing/editing/builds), Rain, Phish3r and Blackmyst (builds/parsers), and QuantizedAnson (builds/proofreading).

Read the introduction, general AI behavior, the linked progression tab and endgame guidance; reviewed behavior and build explanations across all 28 character tabs. The extraction includes tab identifiers, so each companion note links directly to its character discussion. Images, linked parsers and every external reference were not independently inspected. This is a source review, not new in-game AI testing.

## Applied

Replaced the generic companion paragraph with character-specific, attributed notes for all 28 characters, stored in `ai-companion-notes.json`. These discuss candidate styles, missed inputs, animation commitment, skill priority, team SBA timing and encounter limitations. They are considerations for adapting a build, not complete tested AI loadouts. Manual four-skill builds, equipment values, node selections and Defender progression remain unchanged.

Useful distinctions include Io's reported Lightning/Quick Cast behavior; Rackam's excessive Coffinmaker channeling; Yodarha/Zeta's inability to reproduce manual unique-parry plans; Siegfried's normal-attack interruptions; and specialized rather than general Tweyen AI advice. These observations warrant separate companion guidance, not replacing player-controlled rotations.

## Limits and conflicts retained

- Some character text explicitly discusses version 2.0.6, matching our existing review target. This does not date every table or prove all sections were retested for that patch. The Testing & Methodology tab has headings but no substantive test protocol in the extracted text.
- The document distinguishes its own subjective tiers from objective ordering. We do not adopt those tiers or claim its damage/stun rankings are reproduced.
- Percival's reported Roter Wirbel/Zerreissen damage-limit bypass, Io's FPS-dependent Gravity Well behavior and Fraux's reported FPS-dependent SBA are flagged as unverified observations. Bug-dependent output is not accepted as ordinary build performance. The suggestion that choosing an ATK modifier changes AI priority is speculative even in the source.
- Fediel's reported ten-claw AI behavior does not reverse the official five-stack requirement. Our corrected manual mechanic is retained.
- The source's Stout Heart/high-HP Celestial trade-off describes possible AI hit-taking and uptime, not an absolute mechanical incompatibility. It even describes a Seofon setup combining Stout Heart and Lumen. Per-character behavior matters.
- Its generalized claim that other orange damage traits do nothing is not adopted without per-trait evidence. Damage-cap/Sigil-Booster accounting tied to its later weapons is not transplanted into Defender builds.
- Its later weapon switches, reduced-level gear tricks, low-HP damage setups and rushing-progression compromises do not override our guide's Defender-first path or maximum legal targets.
- The compendium does not establish current acquisition probabilities for our complete equipment combinations. Nothing in this review changes the future-save RNG policy, edits a save or establishes a top-1% performance percentile.

Software checks require all 28 companion entries, valid style names, direct source tabs and rendering across the existing character/style/stage views. Those checks establish integration and source attribution, not combat performance.
