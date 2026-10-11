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
---

> **Work in progress — do not follow this as a flashing procedure yet.** Firmware availability, checksums, installation routes and recovery steps have not been verified on our own hardware.

This is Part 2 of [WR703N Labs](/series/wr703n-labs/). Part 1 introduces the [TL-WR703N and its limitations](/articles/wr703n-second-life/).

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

**Archive filename discrepancy discovered:** the OpenWrt device database uses the prefix `openwrt-17.01.7-`, but the official 17.01.7 release index lists the WR703N v1 images with the prefix `lede-17.01.7-`. The release index lists both files and their SHA-256 checksums:\n\n| Image | Filename | Size | SHA-256 |\n| --- | --- | --- | --- |\n| Factory | `lede-17.01.7-ar71xx-generic-tl-wr703n-v1-squashfs-factory.bin` | 3840 KiB | `25ca8f0291a0c968eccab8014f07caf7396aaf426a93971fdc78e9b277caade9` |\n| Sysupgrade | `lede-17.01.7-ar71xx-generic-tl-wr703n-v1-squashfs-sysupgrade.bin` | 3520 KiB | `d2da675ed456743c674b2190de859954fb1606be7dbd9e59056ec10fc878e44f` |\n\nSource: [Official LEDE 17.01.7 ar71xx/generic release index](https://downloads.openwrt.org/releases/17.01.7/targets/ar71xx/generic/). The index is available, but the binaries have **not** yet been downloaded and independently hashed in this lab; do not treat them as hardware-qualified firmware. The incorrect old `openwrt-` URLs should not be used.

Before publishing instructions we will record the file's source, HTTP availability, exact filename, cryptographic checksum from a trustworthy release manifest, and the intended installation path. A factory image and a sysupgrade image are not interchangeable.

## Newer official release check (11 Oct 2026)

The official `sha256sums` manifests were searched for WR703N-specific filenames:

- **LEDE 17.01.7, ar71xx/generic:** both WR703N v1 images are present.
- **OpenWrt 18.06.9, ar71xx/generic:** no WR703N entry was found.
- **OpenWrt 19.07.10, ath79/tiny:** no WR703N entry was found.

This makes **17.01.7 the latest device-specific stable release identified so far**, not proof that no other historical, snapshot, or community builds exist. The statement that 19.07.10 was the last release for the broader 4/32 device class must not be interpreted as confirmation of a WR703N image.

Sources: [17.01.7 SHA-256 manifest](https://downloads.openwrt.org/releases/17.01.7/targets/ar71xx/generic/sha256sums), [18.06.9 SHA-256 manifest](https://downloads.openwrt.org/releases/18.06.9/targets/ar71xx/generic/sha256sums), [19.07.10 ath79/tiny SHA-256 manifest](https://downloads.openwrt.org/releases/19.07.10/targets/ath79/tiny/sha256sums).

**Independent binary verification:** attempted, but the lab environment could not download the binary files. HTTP availability and locally computed hashes are therefore **not yet confirmed**. Do not flash based on the manifest alone.

## Step 3: Prepare recovery first

The device documentation describes a 3.3V UART serial console at **115200 8N1**. Verify the exact board revision and UART pinout before connecting a 3.3V USB-to-UART adapter. Never attach a conventional RS-232 port directly. We will add annotated photographs of the board and document the bootloader and TFTP recovery process after testing.

## Step 4: Choose the correct installation route

**Original TP-Link firmware:** document the exact supported factory-image procedure only after verifying both the image and the firmware interface.

**Existing OpenWrt:** document the supported sysupgrade route, including whether settings should be preserved, only after confirming compatibility with the installed release.

**Non-booting device:** document serial bootloader access and recovery separately. Recovery is not guaranteed if the bootloader or flash is damaged.

## Verification record

| Check | Status |
| --- | --- |
| WR703N hardware revision photographed | Pending |
| Official archive lists exact filenames and SHA-256 | Confirmed from index |\n| Binary downloaded and independently hashed | Blocked by download environment; pending |\n| 18.06.9 ar71xx/generic manifest searched | No WR703N image found |\n| 19.07.10 ath79/tiny manifest searched | No WR703N image found |
| Stock-firmware installation tested | Pending |
| Existing OpenWrt upgrade tested | Pending |
| Serial pinout and boot output recorded | Pending |
| Recovery tested | Pending |

**Publication gate:** keep this article in draft until the steps have been verified and any unresolved risks are clearly documented.
