---
title: "Identify Your TP-Link TL-WR703N Hardware Revision"
description: "Record the exact hardware and firmware identity before attempting an OpenWrt or PirateBox installation."
category: mini-how-tos
lang: en
date: 2026-10-11
tags: [tp-link, tl-wr703n, openwrt, piratebox]
series: offline-networking
translationKey: identify-wr703n-hardware
draft: true
tested: false
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

## Next step

Compare the recorded information with the [OpenWrt TL-WR703N device page](https://openwrt.org/toh/tp-link/tl-wr703n) and the firmware compatibility evidence before choosing an image.
