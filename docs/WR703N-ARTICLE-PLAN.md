# HackShack Labs — TP-Link TL-WR703N v1 article plan

**Decision (2026-10-13):** Stop active PirateBox and LibraryBox installation/reconstruction work. Historical research is retained as an archive, not a prerequisite for publication. The editorial focus is vanilla OpenWrt, MikroWrt and PocketBox.

## Planned series

| Order | Article (English canonical; Norwegian translation) | Status | Publication gate |
| --- | --- | --- | --- |
| 1 | Installing vanilla OpenWrt on the TP-Link TL-WR703N v1 | Planned | Confirm exact hardware revision, last compatible official release and genuine image; record hash, backup/recovery path and actual hardware test |
| 2 | Installing MikroWrt on the TL-WR703N | Waiting for working firmware | Tested boot, management, package functionality, resource limits and recovery on real hardware |
| 3 | Installing PocketBox on MikroWrt | Waiting for MikroWrt and PocketBox | Tested AP, DHCP, HTTP and Telnet/BBS access, USB storage and offline clients |

**Do not equate the latest OpenWrt release with the latest release that supports this legacy device.** Obsolete OpenWrt is for isolated historical testing, not an exposed internet router. Never publish untested flash commands as validated instructions.

## Editorial requirements

- Canonical English articles on `labs.hackshack.no`, with Norwegian Bokmål counterparts under `/no/`.
- State exact router revision, flash/RAM, source URL, image filename and SHA-256.
- Capture real installation photos/screenshots and serial/boot logs where practical.
- Document backup, recovery, failure cases and repeatable validation steps.
- Set `tested: true` only after real-device validation; keep unfinished articles as drafts.
- Clearly distinguish OpenWrt upstream releases from MikroWrt builds and PocketBox applications.

## Archived historical work

- PirateBox and LibraryBox are discontinued upstream; their installation articles are **cancelled**, not active milestones.
- Preserve `research/piratebox-wr703n/` and `docs/PIRATEBOX-RESEARCH.md` as historical evidence only.
- Do not resume sourcing, rebuilding or flashing their original images unless a new explicit decision is made.
- Any existing PirateBox draft must remain unpublished and be labelled **cancelled / historical research** rather than presented as an upcoming guide.

## Immediate next action

Identify the TL-WR703N hardware revision and select the latest *officially supported* vanilla OpenWrt image for that revision; document the firmware source, integrity and recovery procedure **before** flashing.
