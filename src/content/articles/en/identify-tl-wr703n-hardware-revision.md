---
title: "Identify Your TP-Link TL-WR703N Hardware Revision"
description: "Record the exact hardware and firmware identity before considering an OpenWrt installation."
category: mini-how-tos
lang: en
date: 2026-10-11
tags: [tp-link, tl-wr703n, openwrt, hardware-identification]
series: offline-networking
translationKey: identify-wr703n-hardware
draft: true
tested: false
evidence: documentation
---

> **Research draft:** No physical unit has yet been inspected for this article.

## Before you begin

Do not flash anything. Disconnect the router from the Internet and inspect the case label for the model and hardware version (often marked **Ver** or **H/W Ver**). Photograph the label without exposing any private identifiers in published images.

## Record these details

- Exact model as printed on the case
- Hardware revision from the label, if present
- Existing firmware version, if safely accessible through its administration interface
- Any visible modification or evidence of previous reflashing

If the label is missing or ambiguous, **do not guess** the hardware revision from appearance alone. Further identification may require boot logs or hardware inspection.

## Why flash size matters

Check the device's actual flash and RAM configuration against the requirements of the **specific OpenWrt release and image**. Historical support for a model does not establish current release compatibility, and a router with very little flash may not accommodate modern images or a useful set of packages. Do not select firmware from the model name alone.

## Next step

Compare the recorded information with the [OpenWrt TL-WR703N device page](https://openwrt.org/toh/tp-link/tl-wr703n) and the firmware compatibility evidence before choosing an image.

PirateBox and LibraryBox are discontinued historical projects. HackShack Labs now prioritizes documenting compatible OpenWrt and, later, MikroWrt and Ploos PocketBox when ready. No firmware installation on this router has been verified for this article.
