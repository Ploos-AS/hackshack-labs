# TL-WR703N v1 — vanilla OpenWrt hardware test checklist

**Status:** Preparation only. No firmware downloaded, hash verified or device flashed as part of this checklist. Companion to [the draft OpenWrt guide](../src/content/articles/wr703n-installing-legacy-openwrt.md) and [article plan](WR703N-ARTICLE-PLAN.md).

## 0. Go/no-go: do not flash before these are complete

- [ ] Read the underside label and photograph exact **TL-WR703N hardware revision**.
- [ ] Determine currently installed firmware (TP-Link stock, OpenWrt, or other) and record version.
- [ ] Confirm flash and RAM from board evidence or boot log; do not assume all revisions are equivalent.
- [ ] Locate the **last officially compatible OpenWrt release** for this exact revision in the [OpenWrt device documentation](https://openwrt.org/toh/tp-link/tl-wr703n) and [official archive](https://archive.openwrt.org/releases/). Do not confuse latest OpenWrt overall with latest supported WR703N image.
- [ ] Identify correct image type for the **current installation route**: factory image for a documented stock-firmware path; sysupgrade only for a supported existing OpenWrt path. Never substitute one for the other.
- [ ] Record official HTTPS download URL, exact filename, file size, SHA-256 and independently documented provenance; save a local copy.
- [ ] Establish a tested, revision-specific recovery route before first flash (serial console/TFTP as applicable); verify UART is **3.3 V**, not RS-232 voltage.
- [ ] Back up current configuration and any legally redistributable stock image where possible. Preserve unique calibration/ART partitions: never overwrite them.

## 1. Hardware and test environment

- [ ] Photograph board, ports and label; redact serial number/MAC in public images if desired.
- [ ] Record stable 5 V supply, cable, Ethernet adapter and USB storage if used.
- [ ] Prepare isolated Ethernet/Wi-Fi test network with no WAN exposure.
- [ ] Capture serial boot output if available, keeping recovery access ready.
- [ ] Save a log of every command and result; never paste speculative flashing commands into a published guide.

## 2. Installation evidence

- [ ] Record image hash before and after copying to the flash workstation.
- [ ] Document starting firmware and exact installation method from official documentation.
- [ ] Record console/GUI output, elapsed time, reboots and any failure.
- [ ] Record post-boot `/etc/openwrt_release`, `/proc/mtd`, `free`, `df -h`, `dmesg` and interface configuration when available.
- [ ] Test Ethernet, Wi-Fi AP, DHCP, local DNS and basic administrative access on the isolated network.
- [ ] Measure available flash/RAM and explain constraints; test package manager only where actually supported.
- [ ] Verify and document recovery method without unnecessarily risking a working device.

## 3. Publication gate

- [ ] Reconcile observations with the existing English draft and Norwegian counterpart.
- [ ] Keep `tested: false` until a physical WR703N installation succeeds and is documented.
- [ ] Explicitly label obsolete OpenWrt **historical/offline only**, not a supported internet security appliance.
- [ ] Publish verified checksums and original archive references, never an unverified third-party image.
- [ ] After OpenWrt article, return to MikroWrt; PocketBox waits for MikroWrt's tested AP/network foundation.

## Evidence log template

| Field | Value |
| --- | --- |
| Test date | Not tested |
| Device revision | Not recorded |
| Existing firmware | Unknown |
| OpenWrt release | Not selected |
| Exact image URL | Not selected |
| SHA-256 | Not calculated |
| Installation route | Not selected |
| Recovery route | Not verified |
| Boot result | Not tested |
| Ethernet / AP / DHCP | Not tested |
| Photo / console log locations | Not recorded |
