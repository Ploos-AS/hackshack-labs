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

## Verified upstream build-script findings (source inspection, not execution)

Inspected upstream `master` files on 2026-10-11:

- [Image build README](https://github.com/PirateBox-Dev/openwrt-image-build/blob/master/README) says it uses the **OpenWrt ImageBuilder** and installs `pbxopg` from a historical package repository.
- [Image build Makefile](https://github.com/PirateBox-Dev/openwrt-image-build/blob/master/Makefile) defines `VERSION_TAG=\"PBX_Image_2.0.1\"`, references an **ar71xx_generic** ImageBuilder tarball from `downloads.piratebox.de`, and includes the `TLWR703` profile.
- The Makefile's `WR703N` target expects output named `openwrt-ar71xx-generic-tl-wr703n-v1-squashfs-factory.bin`. This is evidence of a historical **v1 factory-image target**, **not** proof that the image exists, is safe, or works.
- The Makefile references package sources over plain **HTTP** and contains no checksum verification for its ImageBuilder download. Do **not** run it blindly or treat the resulting binary as trusted.
- [PirateBox feed README](https://github.com/PirateBox-Dev/openwrt-piratebox-feed/blob/master/README.md) describes a custom OpenWrt feed. Its example uses a legacy `git://` transport; this is historical documentation, not a recommended secure setup.

### Consequences for the guide

1. Focus initial compatibility investigation on the **TL-WR703N v1** target, while verifying the actual hardware revision before any firmware selection.
2. Reconstruct the historical build environment in an isolated container/VM, pin source commits, replace insecure download transport where authenticated mirrors exist, and verify hashes from trusted independent references.
3. Inspect build dependencies and package provenance before attempting reproduction; modern OpenWrt releases cannot be assumed compatible with these historical packages.
4. Document recovery and preserve stock firmware before any real-device flashing.

**Outstanding:** historical archive availability, hashes, package provenance, build reproducibility, exact supported hardware revisions, and physical-device testing.
