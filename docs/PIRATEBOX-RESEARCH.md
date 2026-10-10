# PirateBox TL-WR703N — source and hardware research

Status: research in progress (2026-10-11). **No hardware testing completed.**

## Primary source repositories

- [PirateBox OpenWrt feed](https://github.com/PirateBox-Dev/openwrt-piratebox-feed) — repository confirmed accessible; default branch `master`.
- [PirateBox OpenWrt image build](https://github.com/PirateBox-Dev/openwrt-image-build) — repository confirmed accessible; default branch `master`.
- [PirateBox-Dev](https://github.com/PirateBox-Dev) — historical project organization.
- [OpenWrt hardware documentation](https://openwrt.org/toh/tp-link/tl-wr703n) — check support and hardware revision details before selecting an image.

**Important:** GitHub repository availability or recently changed repository metadata does not establish recent firmware maintenance, secure firmware, or hardware compatibility. Do not infer a tested build from a repository's last-updated date.

## Evidence register

| Question | Evidence required | Status |
| --- | --- | --- |
| Which WR703N hardware revision? | Photo of label and firmware details | Pending |
| Which flash/RAM capacity? | Hardware inspection and boot log | Pending |
| Which original firmware? | Version and verified upstream source | Pending |
| Which OpenWrt release supports this exact unit? | Device/release compatibility documentation | Pending |
| Which PirateBox release is compatible? | Release notes, feed dependencies, build manifest | Pending |
| Are firmware images reproducible? | Source commit, toolchain, build log, hash | Pending |
| Can we recover after a bad flash? | Tested serial/TFTP procedure for this revision | Pending |
| Is the device usable fully offline? | AP, DHCP, HTTP, upload/download tests | Pending |

## Publication gate

Do not publish flashing commands or set `tested: true` until firmware compatibility, recovery and real-device validation have been documented. Keep obsolete builds on isolated networks without WAN access.

## Companion articles

- **Guide:** Installing PirateBox on the TP-Link TL-WR703N in 2026 (draft)
- **Mini How-To:** Identify the TL-WR703N hardware revision (draft)
- **How-To:** Recover a TL-WR703N (planned; needs verified procedure)
