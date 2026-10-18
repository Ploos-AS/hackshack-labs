---
title: "Home Assistant SkyConnect in 2026: Still Worth Using?"
description: "What the original SkyConnect can do, when to keep it, and when a newer radio might make sense."
category: guides
lang: en
date: 2026-10-18
tags: [home-assistant, zigbee, thread, smart-home]
series: "Smart Home Tested"
translationKey: skyconnect-2026
draft: true
tested: false
evidence: documentation
---

> **Evidence:** Documentation-based guide, not a hands-on benchmark. HackShack Labs owns a SkyConnect, but no measured compatibility, range or performance results are presented here. No affiliate links appear in this article.

## Short answer

**If your original Home Assistant SkyConnect is working reliably, keep it.** A newer radio is not automatically a necessary upgrade. SkyConnect was renamed **Home Assistant Connect ZBT-1**; its core purpose remains connecting compatible Zigbee devices to Home Assistant. The right choice depends on your network, firmware, and whether you want Zigbee or Thread.

## What is SkyConnect?

SkyConnect is a USB radio designed for Home Assistant. It is commonly used with **ZHA** or **Zigbee2MQTT** to connect Zigbee devices. Thread use requires the appropriate firmware and software configuration; Thread is a networking technology, while Matter is an application interoperability standard. A Thread radio alone does not guarantee that every Matter product will work.

## Zigbee, Thread and the multiprotocol question

Choose one clear job for the adapter. For an existing Zigbee network, retaining the Zigbee firmware and coordinator role is the conservative option. Simultaneous Zigbee/Thread operation using multiprotocol firmware has had important support and stability limitations; do not plan a new installation around it without checking current Home Assistant guidance.

**Do not flash firmware casually.** Changing radio firmware can disrupt an existing network. Before changing coordinator, back up Home Assistant and any applicable Zigbee network information, read the current migration instructions, and verify recovery options.

## ZHA or Zigbee2MQTT?

Both are valid ways to use a Zigbee coordinator, but they are not interchangeable running simultaneously on the same adapter. ZHA is integrated into Home Assistant. Zigbee2MQTT is a separate service that typically uses MQTT to expose devices. Device-specific features and support can differ; check the precise device model in each project's compatibility information.

For a reproducible lab comparison, use the same device models, firmware versions, physical locations and measurement method. Re-pairing may be required when moving between stacks.

## Should you upgrade?

An upgrade may be worthwhile if you need a feature or reliability improvement demonstrated in your particular environment. But buying a replacement merely because the name or model number changed is not a sound reason. Start by checking USB placement, interference, device routing, firmware and the current documentation.

## Planned HackShack Labs tests

Our future hands-on follow-up will document: Home Assistant version; ZBT-1 firmware; ZHA and Zigbee2MQTT versions; IKEA device model numbers; pairing success; reconnect behavior; network isolation; and repeatable latency/reliability measurements. **These tests have not yet been performed for this article.**

## Sources

- [Home Assistant Connect ZBT-1 official documentation](https://www.home-assistant.io/connectzbt1/)
- [Home Assistant Zigbee Home Automation](https://www.home-assistant.io/integrations/zha/)
- [Zigbee2MQTT documentation](https://www.zigbee2mqtt.io/)
- [Home Assistant Matter integration](https://www.home-assistant.io/integrations/matter/)
