# Editorial conventions

- English articles: `src/content/articles/en/<slug>.md`; Norwegian Bokmål: `nb/<slug>.md`.
- Use a shared `translationKey` for translated pairs; do not imply a translation exists unless published.
- Exactly one primary category from the 11 supported categories; multiple tags permitted.
- Mark `tested: true` only after documented real-hardware validation.
- Use `draft: true` until technical claims and licensing have been reviewed.
- Date, firmware, hardware revision, commands, source links and test environment should be reproducible.
- Affiliate relationships must be disclosed adjacent to relevant links; reviews and tests remain editorially independent.
- Never redistribute third-party firmware or copyrighted files without checking licensing.

## Guide vs How-To vs Mini How-To

- **Guide**: a complete end-to-end workflow, including prerequisites, background, compatibility decisions, installation, validation, troubleshooting, and recovery. Typical reading time 15–45+ minutes.
- **How-To**: one clearly bounded task with a reproducible outcome. Typical reading time 5–15 minutes. Link to the parent Guide where appropriate.
- **Mini How-To**: one quick operation or check with minimal background. Typical reading time 1–5 minutes.

Classify by reader outcome and scope, **not word count alone**. Guides may link to separate How-Tos and Mini How-Tos without duplicating instructions.

## Legacy firmware and security

- State the exact hardware revision, flash/RAM capacity, firmware version, and source URL for every tested procedure.
- Distinguish historical instructions, unverified research, emulated results, and real-hardware validation.
- Do not describe obsolete OpenWrt/PirateBox firmware as safe for Internet-facing use. Recommend isolated, offline lab networks with no WAN uplink.
- Flashing has a brick risk; publish a tested recovery procedure before recommending risky modifications.
- Never label an article `tested: true` based only on historical documentation or an unverified command sequence.

## First technical guide

**Installing PirateBox on the TP-Link TL-WR703N in 2026** is a **Guide**, part of the **Offline Networking** series. Supporting articles may include a How-To for recovery and a Mini How-To for identifying the hardware revision.
