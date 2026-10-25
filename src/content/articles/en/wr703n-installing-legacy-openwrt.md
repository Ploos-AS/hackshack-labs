---
title: "Installing Legacy OpenWrt on the TP-Link TL-WR703N"
description: "Prepare a TP-Link TL-WR703N for legacy OpenWrt: identify firmware, verify images, plan serial recovery, and avoid common flashing mistakes."
category: how-tos
lang: en
date: 2026-10-11
tags: [openwrt, tp-link, wr703n, firmware, recovery]
series: "WR703N Labs"
translationKey: wr703n-install-legacy-openwrt
draft: true
tested: false
evidence: documentation
---

> **Work in progress — do not follow this as a flashing procedure yet.** Firmware availability, checksums, installation routes and recovery steps have not been verified on our own hardware.

This is Part 2 of [WR703N Labs](/series/wr703n-labs/). Part 1 introduces the [TL-WR703N and its limitations](/articles/wr703n-second-life/).

**Current upstream support status (checked 25 October 2026):** OpenWrt's TL-WR703N v1 technical-data page states that support for the original 4 MB flash / 32 MB RAM hardware ended in 2022 and that **19.07.10 was the last official build for 4/32 devices**. The LEDE 17.01.7 images analyzed below are *older archival examples*, not the last OpenWrt build and not a current security-maintained firmware recommendation. See the [device technical data](https://openwrt.org/toh/hwdata/tp-link/tp-link_tl-wr703n_v1) and [OpenWrt 4/32 warning](https://openwrt.org/supported_devices/432_warning). **No firmware compatibility or recovery testing on our unit is implied.**

## Evidence boundaries and publication gate

| Evidence | Status | What it establishes |
| --- | --- | --- |
| Archived LEDE image hashes | Verified in GitHub Actions | Downloaded bytes match the cited checksums; **not** device compatibility |
| Header fields and image size comparison | Automated **file-level** analysis | Properties of archived binary files; **not** measured router flash addresses |
| Exact physical router revision and flash layout | **Not verified on hardware** | Must be documented before choosing an install image |
| OEM installation, serial console and TFTP recovery | **Not tested on hardware** | Must be demonstrated on the confirmed revision before this draft becomes instructions |

**Publication gate:** Keep `draft: true` until the exact unit, firmware origin, recovery procedure, read-only serial boot log and a repeatable installation or recovery test are documented. Archived firmware is unsupported and is appropriate only for a deliberately isolated lab, never an Internet-facing security gateway.

## What this guide will verify

We will document the exact WR703N hardware revision, firmware image filenames and checksums, the supported installation route for each starting firmware, and a recovery procedure. The WR703N's original 4 MB flash and 32 MB RAM make it a legacy OpenWrt target; unsupported firmware should be used only on isolated lab networks.

## Step 1: Identify the hardware

Record the model and revision from the underside label. Do not assume that an image for another TP-Link router or another hardware revision is interchangeable.

If OpenWrt is already running and SSH works, capture:

```sh
cat /etc/openwrt_release
cat /proc/cpuinfo
cat /proc/mtd
```

If original TP-Link firmware is installed, record its version using the manufacturer's interface. Do not attempt the commands above on stock firmware.

## Step 2: Locate and verify firmware

Consult the [OpenWrt WR703N device page](https://openwrt.org/toh/tp-link/tl-wr703n), [device-specific hardware data](https://openwrt.org/toh/hwdata/tp-link/tp-link_tl-wr703n_v1), and [release archive](https://archive.openwrt.org/releases/).

**Archive filename discrepancy discovered:** the OpenWrt device database uses the prefix `openwrt-17.01.7-`, but the official 17.01.7 release index lists the WR703N v1 images with the prefix `lede-17.01.7-`. The release index lists both files and their SHA-256 checksums:

| Image | Filename | Size | SHA-256 |
| --- | --- | --- | --- |
| Factory | `lede-17.01.7-ar71xx-generic-tl-wr703n-v1-squashfs-factory.bin` | 3840 KiB | `25ca8f0291a0c968eccab8014f07caf7396aaf426a93971fdc78e9b277caade9` |
| Sysupgrade | `lede-17.01.7-ar71xx-generic-tl-wr703n-v1-squashfs-sysupgrade.bin` | 3520 KiB | `d2da675ed456743c674b2190de859954fb1606be7dbd9e59056ec10fc878e44f` |

Source: [Official LEDE 17.01.7 ar71xx/generic release index](https://downloads.openwrt.org/releases/17.01.7/targets/ar71xx/generic/). Both binaries have since been downloaded and SHA-256 verified by GitHub Actions; they are **not** hardware-qualified firmware. The incorrect old `openwrt-` URLs should not be used.

Before publishing instructions we will record the file's source, HTTP availability, exact filename, cryptographic checksum from a trustworthy release manifest, and the intended installation path. A factory image and a sysupgrade image are not interchangeable.

## Newer official release check (11 Oct 2026)

The official `sha256sums` manifests were searched for WR703N-specific filenames:

- **LEDE 17.01.7, ar71xx/generic:** both WR703N v1 images are present.
- **OpenWrt 18.06.9, ar71xx/generic:** no WR703N entry was found.
- **OpenWrt 19.07.10, ath79/tiny:** no WR703N entry was found.

This makes **17.01.7 the latest device-specific stable release identified so far**, not proof that no other historical, snapshot, or community builds exist. The statement that 19.07.10 was the last release for the broader 4/32 device class must not be interpreted as confirmation of a WR703N image.

Sources: [17.01.7 SHA-256 manifest](https://downloads.openwrt.org/releases/17.01.7/targets/ar71xx/generic/sha256sums), [18.06.9 SHA-256 manifest](https://downloads.openwrt.org/releases/18.06.9/targets/ar71xx/generic/sha256sums), [19.07.10 ath79/tiny SHA-256 manifest](https://downloads.openwrt.org/releases/19.07.10/targets/ath79/tiny/sha256sums).

**Independent binary verification:** both archived images were successfully downloaded and SHA-256 verified in [GitHub Actions run #1](https://github.com/Ploos-AS/hackshack-labs/actions/runs/38355522292) on 13 Oct 2026. The resulting JSON artifact records a PASS for each image. Integrity verification does **not** establish hardware compatibility or a safe flashing procedure.

## Reproduce the firmware integrity check

The repository includes a [download and SHA-256 verification script](https://github.com/Ploos-AS/hackshack-labs/blob/main/scripts/verify-wr703n-firmware.sh). On a Linux workstation with `curl` and `sha256sum`, run it from a checked-out copy of the repository:

```sh
bash scripts/verify-wr703n-firmware.sh
```

The script downloads both images and exits unsuccessfully if either download or checksum validation fails. It does **not** flash the router, check the hardware revision, or qualify a firmware image for installation. Retain the terminal output and actual SHA-256 results as evidence before changing the verification record.

## Read-only image structure analysis

After downloading and verifying the images, run the repository's [read-only analyzer](https://github.com/Ploos-AS/hackshack-labs/blob/main/scripts/analyze-wr703n-images.py) on a Linux workstation:

```sh
python3 scripts/analyze-wr703n-images.py \
  wr703n-firmware/lede-17.01.7-ar71xx-generic-tl-wr703n-v1-squashfs-factory.bin \
  wr703n-firmware/lede-17.01.7-ar71xx-generic-tl-wr703n-v1-squashfs-sysupgrade.bin \
  --output wr703n-firmware/analysis.json
```

The JSON report includes sizes, computed and expected hashes, the first 32 bytes and offsets of possible uImage/SquashFS signatures. Signature scans are **heuristic** and do not validate partition boundaries, bootloader compatibility or flash safety. The analyzer returns a nonzero exit code unless every supplied file has a known filename and matching SHA-256.

**Analysis results (13 Oct 2026):** [GitHub Actions run #1](https://github.com/Ploos-AS/hackshack-labs/actions/runs/38355522292) produced a JSON report from the actual downloaded binaries:

| Field | Factory | Sysupgrade |
| --- | ---: | ---: |
| Bytes | 3,932,160 | 3,604,484 |
| SHA-256 comparison | PASS | PASS |
| SquashFS little-endian signature offset | 1,276,820 | 1,276,820 |
| uImage signature | Not found | Not found |

The second automated run on [13 Oct 2026](https://github.com/Ploos-AS/hackshack-labs/actions/runs/38356130125) decoded the SquashFS v4 superblock in both images:

| SquashFS property | Both images |
| --- | ---: |
| Version | 4.0 |
| Compression ID | 4 (XZ) |
| Block size | 262,144 bytes |
| Inodes | 1,127 |
| Fragments | 18 |
| Bytes used | 2,303,654 |
| Start offset | 1,276,820 |
| End offset (exclusive) | 3,580,474 |
| Superblock sanity check | PASS |

The SquashFS fields match across the two image variants, and the declared filesystem extents fit inside both files. This does not validate every compressed block or establish the router's flash partition boundaries.

Both files begin with the same OpenWrt-related header bytes. The scan is heuristic; an absent uImage signature is not evidence of invalid firmware, and the offset is **not** an established flash partition boundary. These findings do not constitute hardware testing.

## Factory versus sysupgrade: differences measured in archived files

The read-only analyzer now compares the two verified images byte for byte and records their identical prefix and suffix lengths, first differing offset, file-size difference, and first 64 bytes. This comparison runs automatically as part of the firmware analysis workflow.

**Measured in [GitHub Actions run #3](https://github.com/Ploos-AS/hackshack-labs/actions/runs/38400344910), 13 Oct 2026:** the factory image is **327,676 bytes larger** than sysupgrade; they share an **identical 76-byte prefix**, differ first at **offset 76**, and have no identical suffix. Both start with the ASCII string `OpenWrt` and the identifier `r4030-6028f00df0` within their first 64 bytes. Both image SHA-256 checks passed. These byte-level measurements do not, by themselves, establish an OEM header length, padding policy, bootloader region, or safe flash offsets. Use the **factory** image only for a verified OEM installation route, and **sysupgrade** only for a compatible OpenWrt upgrade route.

## TP-Link v1 header: file-level observations

The [13 Oct 2026 automated run](https://github.com/Ploos-AS/hackshack-labs/actions/runs/38466400856) inspected candidate TP-Link v1 header fields in both SHA-256-verified images. The layout corresponds to the field definitions in [OpenWrt's mktplinkfw source](https://lxr.openwrt.org/source/firmware-utils/src/mktplinkfw.c).

| Header field | Factory | Sysupgrade |
| --- | --- | --- |
| Header version (big-endian) | `0x01000000` | `0x01000000` |
| Vendor | `OpenWrt` | `OpenWrt` |
| Firmware revision | `r4030-6028f00df0` | Same |
| Hardware ID | `0x07030101` | Same |
| Hardware revision | `1` | `1` |
| Declared firmware length | 3,932,160 bytes | 3,932,160 bytes |
| Kernel offset field | `0x200` | `0x200` |
| Kernel length field | 1,276,308 bytes | 1,276,308 bytes |
| Rootfs offset field | `0x100000` | `0x100000` |
| Rootfs length field | 2,303,654 bytes | 2,303,654 bytes |
| Primary checksum bytes | Different | Different |

The **rootfs offset header field** must not be confused with the **observed SquashFS magic offset** at byte 1,276,820; they describe different aspects of the image and are not interchangeable flash-write addresses. The shorter sysupgrade file retains the same declared total length in its header. This is consistent with different output padding, but padding content and checksum rules still require explicit verification. No flash offsets or installation commands are inferred from this report.

## Step 3: Prepare recovery first

The device documentation describes a 3.3V UART serial console at **115200 8N1**. Verify the exact board revision and UART pinout before connecting a 3.3V USB-to-UART adapter. Never attach a conventional RS-232 port directly. We will add annotated photographs of the board and document the bootloader and TFTP recovery process after testing.

## Step 4: Choose the correct installation route

### A. Original TP-Link firmware: v1.6 and earlier

The [WR703N device documentation](https://openwrt.org/toh/tp-link/tl-wr703n) describes a factory-image upload through the OEM web interface (historically at `192.168.1.1`, with `admin/admin` credentials on some stock firmware). Some OEM interfaces reject long filenames with error **23002**; the documented workaround is to rename the *verified factory image file* to `openwrt.bin`. Renaming does not alter or validate its contents.

**Do not perform this procedure yet:** first confirm the exact hardware revision, starting firmware, correct factory image, independent SHA-256 result, and recovery readiness. OEM interfaces and credentials may differ.

### B. Original TP-Link firmware: v1.7 exception

The same device page specifically reports that **v1.7 running 3.17.1 Build 140120 Rel.56593n** rejects OpenWrt installation via the OEM web interface. It directs users to a TFTP method instead. We will not invent TFTP addresses, filenames, flash offsets, or bootloader commands. These must be taken from revision-specific documentation and checked against an actual serial boot log before writing an executable procedure.

### C. Already running OpenWrt

Use a device-matched **sysupgrade** image, not a factory image. The [official sysupgrade guide](https://openwrt.org/docs/guide-user/installation/generic.sysupgrade) documents both LuCI and command-line upgrade paths. Before choosing one, collect the installed release, target platform, package list, configuration backup and image hash. Upgrades can erase installed packages and unpreserved files.

The [OpenWrt settings guidance](https://openwrt.org/docs/guide-quick-start/admingui_sysupgrade_keepsettings) advises against retaining old configuration across major version changes. For this legacy lab, a clean configuration is the default *planning assumption*, subject to confirmation of the specific upgrade path. **No flash command is provided here until the route is qualified.**

### D. Non-booting device: recovery only

The device's documented recovery option is **U-Boot TFTP plus serial access**. This is not interchangeable with a normal web upgrade. Recovery is not guaranteed if the bootloader or flash itself is damaged. Capture the serial boot log and identify the actual bootloader before deciding on any recovery commands.

## Recovery decision tree: start with the least invasive option

**Case 1 — OpenWrt boots but configuration or access is broken.** Try OpenWrt **failsafe** first. This is not the same as bootloader recovery or a factory reset. The [official failsafe guide](https://openwrt.org/docs/guide-user/troubleshooting/failsafe_and_factory_reset) explains that the mode starts with wireless and DHCP disabled and normally uses `192.168.1.1`. Connect a workstation directly over Ethernet and set a compatible static address (for example `192.168.1.10/24`). Historical WR703N instructions differ on *when* to press Reset: follow the observed LED pattern rather than assuming a universal delay. Failsafe cannot repair a missing kernel or broken bootloader.

**Case 2 — OpenWrt starts and is reachable.** Back up configuration and inspect firmware details before considering any upgrade. Do not invoke TFTP or erase flash merely to recover from a settings issue.

**Case 3 — Kernel does not boot, but U-Boot still runs.** The [WR703N hardware page](https://openwrt.org/toh/tp-link/tl-wr703n) documents U-Boot serial/TFTP recovery. First collect a read-only serial boot log at **115200 8N1** and inspect the actual bootloader environment. Its historical examples include destructive `erase` and `cp.b` commands; **do not copy them without independently verifying the memory map, exact image layout, and revision**. U-Boot/TFTP is a separate recovery path, not OpenWrt failsafe.

**Case 4 — No serial bootloader output.** Check power and electrical connections before assuming flash corruption. A damaged bootloader or hardware fault may require specialist SPI-flash recovery; this article does not provide unverified flash programming instructions.

### Safe serial observation checklist

Use a USB-to-UART interface with **3.3V logic** and identify `TP_OUT`, `TP_IN`, and ground from board-specific documentation. For initial read-only observation, connect **router TX → adapter RX** and **ground → ground**, power the router normally through its micro-USB input, and capture the boot log. Do not connect adapter VCC or attach a conventional RS-232 port. Only connect router RX after verifying the wiring and deciding that interactive recovery is required. Avoid mechanical strain on fragile test pads.

A Linux workstation can capture a serial session using `picocom -b 115200 /dev/ttyUSB0` after confirming the actual serial device name. This is a workstation command, **not** a router flashing command.

Record: board revision, USB-UART adapter model, serial port, bootloader version, detected flash size, LED behavior, network behavior, and full console output. Do not publish MAC addresses or other device identifiers from logs without redaction.

## Verification record

| Check | Status |
| --- | --- |
| WR703N hardware revision photographed | Pending |
| Official archive lists exact filenames and SHA-256 | Confirmed from index |
| Binary downloaded and independently hashed | PASS in GitHub Actions run #1, 13 Oct 2026 |
| 18.06.9 ar71xx/generic manifest searched | No WR703N image found |
| 19.07.10 ath79/tiny manifest searched | No WR703N image found |
| Stock-firmware v1.6-and-earlier OEM route documented | Source reviewed; not hardware tested |
| v1.7 OEM rejection / TFTP exception documented | Source reviewed; not hardware tested |
| Stock-firmware installation tested | Pending |
| Existing OpenWrt upgrade tested | Pending |
| Serial pinout and boot output recorded | Pending |
| Recovery tested | Pending |

**Publication gate:** keep this article in draft until the steps have been verified and any unresolved risks are clearly documented.
