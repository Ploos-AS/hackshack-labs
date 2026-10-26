---
title: "ANENG SZ308: Can an Ultra-Cheap Multimeter Be Useful?"
description: "A documentation-based preview of the ANENG SZ308, with a low-voltage lab test plan and safety questions to resolve."
category: reviews
lang: en
date: 2026-10-19
tags: [aneng, sz308, multimeter, electronics, budget-tools]
series: "Budget Test Equipment"
translationKey: aneng-sz308-review
draft: true
tested: false
evidence: documentation
---

**Short answer:** We have ordered an ANENG SZ308 for HackShack Labs, but it has not arrived. We cannot yet recommend it or judge its accuracy, build quality or electrical safety.

## What is it?

The supplied **SZ308 Smart Digital Multimeter Operator's Instruction Manual** describes a handheld, manually selected digital multimeter. It documents DC and AC voltage, DC current, resistance, continuity, diode and transistor testing. The manual includes measurement tables, operating instructions and safety warnings. These are **manual claims, not our measurements**.

## Who might consider it?

An inexpensive spare meter may be useful for basic **low-voltage** electronics tasks such as checking batteries and continuity. Reusing a multimeter you already own is cheaper than buying another. For mains work, do not choose a meter merely on price or printed maximum-voltage claims.

## What we know before testing

| Item | Status |
| --- | --- |
| Product | ANENG SZ308 |
| Source | Supplied SZ308 operator's manual (five manual pages arranged on one PDF sheet) |
| Display | Manual specifies a 1999-count display |
| Measurements | DC/AC voltage, DC current, resistance, continuity, diode and transistor tests |
| USB/data export | Not documented in the supplied manual |
| Linux connectivity | Not documented; no data interface established |
| Independent safety certification | Not established from the supplied manual |
| Physical testing | Not started; instrument ordered |

We will transcribe exact ranges and accuracy figures only after checking the original manual tables carefully against the received instrument. A stated voltage range is **not** proof of safe operation at that voltage.

## Safety comes first

The manual includes warnings about electric shock, correct test-lead placement and disconnecting the leads before changing functions or opening the case. These warnings do not establish compliance with a particular safety standard.

**Our initial evaluation will use only isolated, low-voltage sources. No mains measurements, live-panel testing or hazardous-energy current measurements are planned.** We will inspect the markings, leads, fuse/protection arrangement and PCB before considering any broader claims. We will not infer CAT ratings or third-party certification from appearance.

## Planned tests — not yet performed

1. **Unboxing and identification:** Record seller listing, purchase price, tax/shipping, packaging, model markings, supplied accessories and photographs.
2. **Visual inspection:** Check case, terminals, leads, selector and visible safety markings. If safe to open, photograph the PCB and document fuses/protection without treating appearance as certification.
3. **DC voltage:** Compare several isolated low-voltage sources against a known reference meter; log reference, SZ308 reading, range, repeatability and deviation.
4. **Resistance:** Measure known resistors across practical ranges, noting component tolerance and lead resistance.
5. **Continuity and diode:** Test response, threshold and usability using unpowered circuits.
6. **Battery and ergonomics:** Record power requirements, display readability, controls and practical bench use.

We will publish the reference equipment, environmental conditions, raw readings and limitations alongside our conclusions.

## Assessment

**Pending testing.** The supplied manual shows a broad set of basic functions, but it does not tell us whether this particular unit performs them accurately or safely. We will update the review after receipt and reproducible low-voltage tests.

## Purchase and disclosure

[ANENG SZ308 on AliExpress — affiliate link](https://s.click.aliexpress.com/e/_c2x2Ouk1)

*Affiliate disclosure: HackShack Labs / Ploos AS may earn a commission if you buy through this link. The product was ordered for independent testing; affiliate participation does not determine our conclusions.*

## Sources

- ANENG SZ308, *Smart Digital Multimeter — Operator's Instruction Manual*, PDF supplied to HackShack Labs. Manufacturer documentation; specifications and warnings have **not** been independently verified.

*HackShack Labs / Ploos AS · Draft preview · Not hardware-tested.*
