---
title: "The Used Mini PC Price Trap: Are Old Mac Minis and Intel NUCs Really Worth It?"
description: "Used does not automatically mean good value: how to compare old Mac minis and Intel NUCs with newer mini PCs without overlooking shipping, upgrades and power."
category: guides
lang: en
date: 2026-10-14
tags: [mac-mini, intel-nuc, mini-pc, used-hardware, homelab, ebay, norway]
series: "Used Hardware & Homelab"
translationKey: used-mini-pc-price-trap
draft: true
tested: false
---

> **Editorial status — 14 October 2026:** Desk research, not a hardware benchmark. The prices below are examples of *asking prices* observed in accessible listings and retailer pages, not completed sale prices, verified Norwegian delivery quotes or evidence of a market-wide average. Listings change or disappear. No affiliate links are used.

## A used computer is not automatically a bargain

There is something appealing about an old Intel NUC or Mac mini. The footprint is small, the hardware is often well built, and a second life as a Linux server, retro workstation or operating-system test machine is more interesting than a trip to recycling.

But a ten-year-old computer can still have an unreasonable asking price. The question is not whether it was expensive when new. It is **what the machine can do for you today, at the total price you will actually pay**.

## A few price observations—not a price index

Here are examples found during research on 14 October 2026. They are snapshots and should not be interpreted as statistically representative.

| Example | Advertised price | What the listing actually tells us |
| --- | --- | --- |
| Intel NUC D54250WYK, Core i5-4250U, 8 GB RAM, 120 GB SSD, tested, with power adapter | **NOK 1,399**, out of stock | Norwegian refurbisher Rebuild IT's listed price; the item was unavailable when checked |
| Intel NUC 8 with i5-8259U, 8 GB RAM, 128 GB storage | **US $139.99** | Example asking price on eBay; shipping and Norwegian import costs not established |
| Intel NUC 7 i5-7260U barebone, without RAM or SSD | **US $59.50 + US $11.50 listed delivery** | The quoted delivery is not a verified Norway shipping quote; memory, storage and power supply must be checked |
| Mac mini Late 2014, Core i5, 8 GB RAM, 1 TB SSD | **US $220** | Example eBay asking price, seller in the United States |
| Mac mini Late 2014, Core i5, 16 GB RAM, 500 GB SSD | **US $160** | Another eBay asking price: configuration matters enormously |

Sources: [Rebuild IT NUC listing](https://www.rebuildit.no/products/intel-nuc-d54250wyk-i5-4250u-8gb-ram-120gb-ssd), [eBay Intel NUC search](https://www.ebay.com/sch/i.html?_nkw=intel+intel+nuc), and [eBay Mac mini 2014 search](https://www.ebay.com/sch/i.html?_nkw=mac+mini+2014+i7). These are live pages, so later readers may see different items and prices.

FINN also has a substantial selection of Mac mini listings: a search page returned **267 results** during this check, but that count alone says nothing about whether the prices are fair. We have **not** extracted a reproducible sample of individual FINN asking prices yet, so we will not claim a Norwegian market average. [FINN Mac mini search](https://www.finn.no/recommerce/forsale/search?q=mac+mini).

## The real price is the landed, working price

For an overseas purchase, compare:

**Total usable cost = purchase price + shipping + applicable import taxes and fees + missing parts + foreseeable repairs.**

Before buying, check whether the listing includes a working power adapter, RAM, SSD, mounting accessories and a return policy. A cheap barebone is not a cheap finished computer if every component must be sourced separately.

For Norway, determine the actual checkout total and how VAT is collected for that seller and marketplace. Do not simply assume that the displayed US shipping fee applies to Norway or add VAT twice.

## What about a new N100 or N150 mini PC?

A modern low-power mini PC may offer a more sensible always-on server, but **new does not always mean cheap**. Norwegian price listings for N150 systems vary widely depending on memory, storage, manufacturer and seller. For example, a price comparison showed a Zotac ZBOX CI360 nano N150 starting around **NOK 2,874**, while other N150 configurations were much more expensive. This is a price observation, not a like-for-like benchmark against an old NUC. [Prisjakt N150 search](https://www.prisjakt.no/s/n150-mini-pc/).

A comparison must match usable RAM, storage, network interfaces, warranty, supported operating systems and actual workloads. We should measure idle and load power before claiming energy savings for a specific model.

## When an older Mac mini or NUC still makes sense

**Special operating systems and retro compatibility.** A PowerPC Mac mini for MorphOS, or an Intel machine for experimenting with Haiku, BSD, AROS and historical software, may be worth more *to that particular project* than its generic compute performance suggests. Collector value and practical server value are different markets.

**Repairable and reusable equipment.** A tested business-class mini PC with replaceable storage and memory can be a good purchase when priced appropriately.

**Cheap lab nodes.** If you can obtain a group of compatible machines from a company, school or IT asset disposition provider, the economics may be far better than buying one fashionable listing at a time.

**Always-on services.** For Docker, backups, home automation or small network services, prioritize real idle consumption, storage health, supported security updates and reliability over nostalgia.

## Red flags before you click Buy

- “Untested,” “powers on” or “no further testing” is not equivalent to fully functional.
- The model name hides the CPU generation, soldered memory or missing storage.
- The listing has no clear photos of ports, power supply and serial/model label.
- Import and shipping costs make the delivered price substantially higher.
- The machine is too old for the intended supported OS, security posture or virtualization features.
- A newer, warrantied alternative costs only a little more *after all extras are counted*.

## Our buying rule

Do not ask, “Is this old Mac mini or NUC cheap compared with its original price?” Ask:

**“For the same total budget, what is the best machine for my actual task?”**

Sometimes the answer is a used NUC. Sometimes it is a modern N150 mini PC, a refurbished business desktop, or a specialized old Mac for a legacy OS. And sometimes the best deal is simply to wait.

## What we will test next

This article is a pricing framework, not a verdict based on measured hardware. A follow-up will collect a dated, reproducible set of FINN and eBay listings, compare complete delivered prices to Norway, and test representative machines for power, noise, Linux/BSD compatibility and performance. Until then, we will not publish blanket claims that a particular generation is always overpriced.
