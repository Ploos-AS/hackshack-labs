---
title: "Mini PC eGPU Compatibility Matrix: What Is Actually Verified?"
description: "A source-linked compatibility matrix separating documented eGPU tests, port specifications and unverified configurations for mini PCs."
category: reference
lang: en
date: 2026-10-15
tags: [mini-pc, egpu, thunderbolt, usb4, compatibility, intel-nuc, asus, linux]
series: "Used Hardware & Homelab"
translationKey: mini-pc-egpu-compatibility-matrix
draft: false
tested: false
---

> **Editorial status — 15 October 2026:** Documentation-based research, **not a HackShack Labs hardware test**. A manufacturer listing a port does not establish that every GPU, dock, operating system or firmware version will work. No affiliate links.

## Quick answer

**There is no universal mini PC eGPU compatibility list.** A credible result must identify the **exact host**, **connection**, **dock/enclosure**, **GPU**, **firmware**, **operating system** and **driver**. Our initial matrix distinguishes vendor validation from mere interface availability.

## Evidence levels

- **Vendor-tested configuration:** A manufacturer reports testing a GPU in an eGPU chassis. This is stronger than a port specification, but is **not** an independent HackShack Labs test and may omit dock/driver details.
- **Vendor-documented eGPU capability:** The manufacturer explicitly discusses eGPU use for the product family, without validating the precise proposed combination.
- **Interface documented only:** A Thunderbolt/USB4 port is listed, but no particular eGPU configuration is established.
- **Not verified:** No sufficient evidence for the proposed combination. This does **not** mean incompatible.
- **HackShack hardware-verified:** Reserved for our own reproducible physical testing; **none of the rows below qualify yet**.

## Initial compatibility matrix

| Mini PC / family | Connection | Evidence | What is established | What remains unknown |
| --- | --- | --- | --- | --- |
| **ASUS NUC 14 Pro / Pro+** | eGPU chassis; exact interface/dock not identified in QVL | **Vendor-tested GPU-in-chassis entries** | ASUS's QVL reports multiple graphics cards “Validated in eGPU chassis”, including EVGA RTX 3080 XC3 Ultra, MSI RTX 3050 Ventus 2X and Gigabyte RX 6800 Gaming OC | Exact dock, BIOS, OS, driver, negotiated PCIe link and Linux compute support |
| **Intel/ASUS NUCs with Thunderbolt** | Thunderbolt | **Vendor-documented eGPU capability** | ASUS publishes an NUC-specific eGPU troubleshooting guide, explicitly discussing Thunderbolt-connected eGPUs | Compatibility of any particular NUC revision, enclosure and GPU; reported freezes and boot/display issues |
| **ASUS ROG NUC (2024 family)** | Thunderbolt 4 Type-C | **Interface documented only** | ASUS lists one Thunderbolt 4 port | A specific external GPU, enclosure and Linux configuration are **not validated by that port listing** |

**Source detail:** The [ASUS NUC 14 Pro / Pro+ QVL report (PDF)](https://dlcdnets.asus.com/pub/ASUS/NUC/QVL/ASUS_NUC_14_Pro_ProPlus_QVL_Report_20241212.pdf?model=NUC14RVH) identifies GPU models tested in eGPU chassis, but does not establish a complete reproducible host–dock–GPU combination. One QVL row appears to contain inconsistent product/model text; do not treat that row as reliable without confirmation.

For the broader NUC family, see [ASUS's NUC eGPU troubleshooting guidance](https://rog.asus.com/support/faq/1052635/). For ROG NUC port information, see [ASUS ROG NUC specifications](https://rog.asus.com/no/desktops/mini-pc/rog-nuc/spec/). The country-specific URL is only a manufacturer specification source; the article and recommendations are international.

## Dock and GPU pairing matrix: deliberately unconfirmed

A dock is not “compatible with a mini PC” merely because both claim Thunderbolt, USB4 or OCuLink. Until an exact combination is documented, the responsible answer is **not verified**.

| Host interface | Dock/interface to investigate | Pairing status | Critical checks |
| --- | --- | --- | --- |
| Thunderbolt 3/4 | Thunderbolt PCIe eGPU enclosure | **Not verified for a specific pair** | Host firmware, cable, dock controller, GPU PSU, PCIe link, OS |
| USB4 with PCIe tunnelling | USB4 eGPU dock | **Not verified for a specific pair** | PCIe tunnelling on the **host**, dock firmware, GPU enumeration |
| OCuLink | OCuLink PCIe dock | **Not verified for a specific pair** | Lane count, PCIe generation, power sequencing, cable, hot-plug restrictions |
| M.2 NVMe PCIe | M.2-to-PCIe riser | **Experimental, not verified** | Keying, available lanes, storage trade-off, cooling, mechanical safety |

## What a reproducible test must record

1. **Host:** manufacturer, exact SKU, motherboard revision, BIOS/UEFI version and settings (including Above 4G Decoding and Resizable BAR where present).
2. **Connection:** Thunderbolt/USB4/OCuLink/M.2 port, controller, cable model and length.
3. **Dock:** manufacturer, exact model/revision, controller/firmware and PSU model.
4. **GPU:** exact board-partner model, VRAM, auxiliary power connectors and GPU firmware where available.
5. **Software:** operating system, kernel, GPU driver, container runtime and workload version.
6. **Results:** cold boot, warm boot, GPU enumeration, `LnkCap` and `LnkSta` where exposed, GPU compute smoke test, sustained load, recovery and any errors.
7. **Evidence:** original logs, photographs and repeatable instructions, with personally identifying details removed.

### Linux inspection commands

```sh
lspci -nn | grep -Ei 'vga|3d|display|nvidia|amd'
lspci -tv
# Replace 01:00.0 with the actual PCI address:
sudo lspci -vv -s 01:00.0 | grep -E 'LnkCap:|LnkSta:'
# On Thunderbolt systems with bolt installed:
boltctl list
```

These commands inspect devices; they do not prove that CUDA, ROCm or a virtual-machine passthrough configuration works.

## Important boundaries

**Apple Silicon Macs running macOS are not supported eGPU hosts**; [Apple's eGPU documentation](https://support.apple.com/en-gb/102363) specifies Intel-based Macs. Do not generalize Intel Mac compatibility to M-series hardware.

**A USB4 or Thunderbolt port is evidence of an interface, not evidence of a working GPU.** Likewise, manufacturer QVL results are useful but do not guarantee success after BIOS, dock, driver or operating-system changes. ASUS [explicitly cautions about the limits of peripheral validation](https://rog.asus.com/support/faq/1052501/).

## Manufacturer-specific expansion: MINISFORUM, GEEKOM, Beelink and GMKtec

The following entries are **not HackShack hardware tests**. Evidence is restricted to the exact claims supported by the linked manufacturer pages. A vendor-supported host/dock family does not validate a particular GPU under Linux.

| Host model | Connection / dock | Evidence level | Documented claim | Still to verify |
| --- | --- | --- | --- | --- |
| **MINISFORUM UM890 Pro** | PCIe 4.0 ×4 OCuLink; **DEG1** dock | **Vendor-demonstrated host + dock** | MINISFORUM publishes a [UM890 Pro + DEG1 eGPU build video](https://www.youtube.com/watch?v=bAZGI6LaPFc) and specifies the [host's OCuLink interface](https://store.minisforum.com/products/minisforum-um890pro-mini-pc) | Exact GPU SKU in the demonstration, BIOS, Linux driver and negotiated link |
| **GEEKOM GT1 Mega** | USB4; eGPU dock not specified | **Vendor-documented eGPU capability** | GEEKOM's [GT1 Mega specification](https://www.geekom.co.uk/product/geekom-gt1-mega-mini-pc) explicitly lists eGPUs among USB4 external devices | Dock, GPU, firmware, Linux test and actual PCIe tunnel rate |
| **Beelink GTi14 Ultra** | Dedicated bottom connector + **EX Pro Dock** | **Vendor-documented host + dock pairing** | Beelink's [GTi14 product page](https://www.bee-link.com/products/beelink-gti14-ultra-ai-pc-intel-core-uitra-9-185h-openclaw-pre-installed) describes GPU expansion through its dock; [EX Pro specifications](https://www.bee-link.com/products/beelink-ex-docking-station) advertise PCIe 5.0 ×8 and a 600 W PSU | Exact GPU/driver/OS validation; do **not** assume standard PCIe pinout or third-party dock support |
| **GMKtec NucBox K8 Plus** | PCIe 4.0 ×4 OCuLink; dock unspecified | **Vendor-documented external PCIe interface only** | [GMKtec specifications](https://www.gmktec.com/products/gmktec-nucbox-k8-plus-mini-pc-amd-ryzen%E2%84%A2-7-8845hs) list OCuLink ×4 and explicitly prohibit hot-plugging | Particular dock + GPU + firmware + OS combination |
| **GMKtec NucBox K11** | PCIe 4.0 ×4 OCuLink; dock unspecified | **Vendor-documented external PCIe interface only** | [GMKtec specifications](https://www.gmktec.com/products/amd-ryzen%E2%84%A2-9-8945hs-nucbox-k11) list OCuLink ×4 and explicitly prohibit hot-plugging | Particular dock + GPU + firmware + OS combination |

### Specific host–dock combinations worth investigating

**MINISFORUM UM890 Pro + DEG1** is the strongest concrete new lead: MINISFORUM itself demonstrates this pairing. The [DEG1 product page](https://www.minisforum.com/products/minisforum-deg1-egpu-dock) documents the dock; the [UM890 Pro listing](https://store.minisforum.com/products/minisforum-um890pro-mini-pc) describes its PCIe 4.0 ×4 OCuLink interface. **Do not extrapolate this to every graphics card or to Linux.** MINISFORUM also notes that its OCuLink arrangement uses an M.2 storage position on some configurations; verify the exact storage layout before purchase.

**Beelink GTi14 Ultra + EX Pro** is another explicit manufacturer pairing, but it is a **proprietary dock connection**, not interchangeable with an OCuLink cable or a generic PCIe riser. Beelink's [support FAQ](https://bbs.bee-link.com/d/3917-faq-for-gti14) distinguishes the dedicated dock from Thunderbolt-based external enclosures. Check dock revision: older EX and newer EX Pro specifications are not necessarily identical.

**GEEKOM GT1 Mega** is a useful USB4 research candidate because the manufacturer explicitly mentions eGPUs. It is **not** a verified host–dock–GPU triple. We need a named dock, a named graphics card and repeatable operating-system evidence before promoting its status.

**GMKtec K8 Plus / K11** have explicitly documented PCIe 4.0 ×4 OCuLink ports, making them reasonable test candidates. The manufacturer's **no hot-plug** warning must be observed. No specific dock + GPU pairing is established by those specification sheets.

## Next verification milestone

We will extend this matrix only when we can attach a source to a **specific configuration**, or publish our own repeatable hardware evidence. The next useful addition is a complete host + dock + GPU + firmware + Linux record—not a longer list of marketing claims.

Read the companion guide: [Can You Add a GPU to a Mini PC?](/articles/mini-pc-external-gpu-guide/).
