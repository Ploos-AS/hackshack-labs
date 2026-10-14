---
title: "Welcome to the Radio Shack: Amateur Radio Meets Open Source"
description: "From shortwave listening and software-defined radio to packet networks, ADS-B and AIS: a radio lab taking shape."
category: guides
lang: en
date: 2026-10-14
tags: [ham-radio, sdr, linux, packet-radio, ads-b, ais]
series: ham-radio-sdr
translationKey: welcome-to-the-radio-shack
draft: false
tested: false
---

> **Editorial status (14 October 2026):** An introduction and project roadmap, not a hands-on equipment test. Specific builds will be documented and marked verified only after real hardware testing.

## Why a radio shack belongs in a hacker lab

A *shack* is the traditional workspace of a radio amateur: radios, cables, antennas, test equipment, and plenty of experiments. A modern shack can also be a Linux machine, a small single-board computer (SBC), a software-defined radio (SDR) receiver and a browser.

At HackShack Labs, we are interested in what happens where **radio meets open-source software, electronics, networking and retro computing**. We want to explain the concepts, build affordable projects and publish reproducible results—including failures and limitations.

## What we will explore

### SDR: a receiver you can program

An RTL-SDR USB receiver is an accessible starting point for exploring signals using software. Linux tools such as SDR++, GNU Radio and OpenWebRX provide different ways to receive, visualize and understand radio traffic. A receiver, suitable antenna and appropriate software are enough to start experimenting with reception where permitted by applicable law; check the rules for the signals and services involved.

### Amateur radio and digital modes

For Norwegian readers, the [Norwegian Communications Authority (Nkom)](https://nkom.no/frekvenser-og-elektronisk-utstyr/radioamator) is the starting point for current licensing, callsigns and regulations; [NRRL](https://www.nrrl.no/) is Norway's national amateur-radio association. Norway introduced revised amateur-radio regulations in March 2026, so older guides may be outdated. Amateur radio offers a path from listening to licensed two-way communication. We plan to cover station fundamentals, antennas, digital modes and the practical differences between receiving and transmitting. Transmitting on amateur allocations requires the appropriate authorization and observance of local rules.

### Packet radio, APRS and BBS

Packet radio connects two of our favorite subjects: radio and old-school computer networking. AX.25, APRS, Direwolf and packet-radio BBS systems show how data can travel over radio links. We will distinguish historical protocols, currently maintained software and projects that still require testing.

### Aircraft tracking with ADS-B

An SBC, a suitable 1090 MHz receiver and antenna, and software such as readsb and tar1090 can form a local aircraft-tracking station. It receives broadcasts from compatible aircraft; **it is not an active radar** and cannot see every aircraft. Reception depends on terrain, antenna placement and the transmissions available.

### Vessel tracking with AIS

AIS broadcasts from equipped vessels can be received using a suitable VHF receiver and software such as AIS-catcher. AIS uses maritime VHF channels around 162 MHz. Like ADS-B, it is a **passive tracking receiver**, not radar, and cannot provide complete traffic coverage.

### A combined SBC monitoring station

One Linux SBC can potentially host two separate SDR dongles—one for ADS-B at 1090 MHz and one for AIS near 162 MHz—with frequency-appropriate antennas and, where useful, dedicated filters or low-noise amplifiers. It can host a local dashboard and optional data storage. Our planned comparison will examine CPU load, USB reliability, power draw, thermals, antennas and network isolation before recommending a particular SBC.

## How we publish experiments

We will label articles as documentation-based, lab-tested or hardware-verified as appropriate. Every tested build should identify hardware revisions, OS and software versions, antenna setup, commands and measured results. We prefer **local-first systems**: the reader should be able to use a receiver without signing up for an external tracking service. Any data sharing should be optional and explained.

Antenna installations also need a safety plan: safe mounting and work at height, lightning protection and grounding, and RF exposure assessment for future transmitters. We will cover this in a dedicated guide. Radio regulations differ by country. We will distinguish passive reception from transmissions, check applicable rules before publishing transmit instructions, and be mindful of privacy and location data.

## Start here

Our [Ham Radio & SDR series](/series/ham-radio-sdr/) will collect the articles. **Next planned guide (not yet published): Building an ADS-B Aircraft Tracker with an SBC and RTL-SDR.** The first practical build is planned as **Building an ADS-B Aircraft Tracker with an SBC and RTL-SDR**, followed by an AIS receiver and then a combined station. Until those builds are physically tested, they remain planned experiments rather than verified tutorials.
