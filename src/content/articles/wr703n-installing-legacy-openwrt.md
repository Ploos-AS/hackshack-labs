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

The database has historically listed LEDE 17.01.7 factory and sysupgrade images. The direct URLs checked on 11 Oct 2026 did not resolve, so **no firmware image is currently approved for download or flashing by this guide**.

Before publishing instructions we will record the file's source, HTTP availability, exact filename, cryptographic checksum from a trustworthy release manifest, and the intended installation path. A factory image and a sysupgrade image are not interchangeable.

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
| Firmware file and checksum verified | Pending |
| Stock-firmware installation tested | Pending |
| Existing OpenWrt upgrade tested | Pending |
| Serial pinout and boot output recorded | Pending |
| Recovery tested | Pending |

**Publication gate:** keep this article in draft until the steps have been verified and any unresolved risks are clearly documented.
