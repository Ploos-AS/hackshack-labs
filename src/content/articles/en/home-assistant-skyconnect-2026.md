---
title: "Home Assistant SkyConnect in 2026: Still Worth Using?"
description: "What the original SkyConnect can do, when to keep it, and when a newer radio might make sense."
category: guides
lang: en
date: 2026-10-18
tags: [home-assistant, zigbee, thread, smart-home]
series: "Smart Home"
translationKey: skyconnect-2026
draft: false
tested: false
evidence: documentation
---

> **Evidence:** Documentation-based guide, not a hands-on benchmark. HackShack Labs owns a SkyConnect, but no measured compatibility, range or performance results are presented here. No affiliate links appear in this article.

## Short answer

**If your original Home Assistant SkyConnect is working reliably, keep it.** A newer radio is not automatically a necessary upgrade. SkyConnect was renamed **Home Assistant Connect ZBT-1**; its core purpose remains connecting compatible Zigbee devices to Home Assistant. The right choice depends on your network, firmware, and whether you want Zigbee or Thread.

**Documentation checked:** 18 October 2026. This is a documentation snapshot, not a test against a specific Home Assistant Core release; no Core version is claimed.

## What is SkyConnect?

SkyConnect is a USB radio designed for Home Assistant. It is commonly used with **ZHA** or **Zigbee2MQTT** to connect Zigbee devices. Thread use requires the appropriate firmware and software configuration; Thread is a networking technology, while Matter is an application interoperability standard. A Thread radio alone does not guarantee that every Matter product will work.

## Zigbee, Thread and the multiprotocol question

Choose one clear job for the adapter. For an existing Zigbee network, retaining the Zigbee firmware and coordinator role is the conservative option. Home Assistant explicitly classifies its multiprotocol firmware as **experimental and not recommended**. For a new installation, use dedicated Zigbee or Thread firmware instead.

**Do not flash firmware casually.** Changing radio firmware can disrupt an existing network. Before changing coordinator, back up Home Assistant and any applicable Zigbee network information, read the current migration instructions, and verify recovery options.

## ZHA or Zigbee2MQTT?

Both are valid ways to use a Zigbee coordinator, but you can only run one of them against the same adapter at a time. ZHA is integrated into Home Assistant. Zigbee2MQTT is a separate service that typically uses MQTT to expose devices. Device-specific features and support can differ; check the precise device model in each project's compatibility information.

For a reproducible lab comparison, use the same device models, firmware versions, physical locations and measurement method. Re-pairing may be required when moving between stacks.

## ZBT-2: what actually changed?

**Home Assistant Connect ZBT-2** is the official replacement for ZBT-1. Home Assistant lists a Silicon Labs **MG24** radio rather than MG21, an optimized external antenna/base instead of the small internal antenna, and a faster adapter baud rate (**460800 versus 115200**). These are hardware and interface changes, **not a promise of four times the Zigbee range or application speed**. ZBT-2 still requires choosing **Zigbee or Thread**, not both at once. See the [official ZBT-2 comparison](https://www.home-assistant.io/connect/zbt-2/).

## Should you upgrade?

An upgrade may be worthwhile if you need a feature or reliability improvement demonstrated in your particular environment. But buying a replacement merely because the name or model number changed is not a sound reason. Before spending money, try these steps:

1. Move the coordinator away from USB 3 ports, external SSDs and the host using a USB extension cable; Home Assistant specifically warns about 2.4 GHz interference from USB 3.
2. Inspect nearby 2.4 GHz Wi-Fi channels and the Zigbee channel before changing anything. Plan channel changes carefully: they can require devices to reconnect or be re-paired.
3. Improve the mesh with compatible **mains-powered Zigbee routers** in useful locations, rather than expecting distant battery sensors to relay traffic.
4. In Home Assistant, inspect the ZHA integration, connected adapter and available firmware information; record the current version before considering an update. For Zigbee2MQTT, check its adapter and firmware documentation instead.
5. Back up the coordinator/network before migration. Follow the current migration guide for **your stack**; a firmware flash alone is not a migration.

## A Home Assistant backup is not always a coordinator migration

Before replacing a Zigbee coordinator, distinguish a Home Assistant configuration backup from a **supported radio/network migration**. Depending on the stack and adapter, restoring the application may not transfer the coordinator's network identity, security keys or device relationships to a different radio. Check the current ZHA or Zigbee2MQTT migration procedure for both source and destination hardware, retain the old adapter until the new network is verified, and plan for devices that may need re-pairing. Keep any exported network keys private; they are security-sensitive credentials, not ordinary troubleshooting attachments.

## What we have not tested

HackShack Labs owns a SkyConnect and IKEA Zigbee devices, which could form a repeatable future test set. **We have not verified their firmware versions, stability, migration behavior or measured performance for this article.**

## Sources

- [Home Assistant Connect ZBT-2 specifications and migration FAQ](https://www.home-assistant.io/connect/zbt-2/)
- [ZBT-1 firmware options and multiprotocol guidance](https://www.home-assistant.io/connectzbt1/)
- [Home Assistant Connect ZBT-1 official documentation](https://www.home-assistant.io/connectzbt1/)
- [Home Assistant Zigbee Home Automation](https://www.home-assistant.io/integrations/zha/)
- [Zigbee2MQTT documentation](https://www.zigbee2mqtt.io/)
- [Home Assistant Matter integration](https://www.home-assistant.io/integrations/matter/)
