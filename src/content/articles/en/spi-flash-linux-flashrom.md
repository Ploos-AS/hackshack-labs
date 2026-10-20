---
title: "SPI Flash Programming on Linux: Backups, flashrom and Safety"
description: "A practical, documentation-based introduction to SPI flash reading and CH341A programmer pitfalls."
category: guides
lang: en
date: 2026-10-20
tags: [spi, flashrom, ch341a, linux, firmware, repair]
translationKey: spi-flash-linux-flashrom
draft: false
tested: false
evidence: documentation
---

A small eight-pin SPI NOR flash chip may hold a router's firmware or a computer's BIOS/UEFI image. Reading it before changing anything can be valuable for repair and research. **But a cheap USB programmer is not automatically safe for every chip.**

This guide describes a conservative workflow; **HackShack Labs has not performed these steps on the advertised CH341A/B kit**.

## Know the hardware before connecting

Read the full chip marking and locate its datasheet. Confirm:

- Exact part number, pinout, capacity and supported SPI commands.
- Supply voltage: commonly 3.3 V, but some chips require **1.8 V**.
- The programmer's actual supply **and signal-high voltages**, measured or reliably documented.
- Pin 1 orientation and the correct SOIC8 clip or socket wiring.
- Whether the board can be fully disconnected from external power.

Some older black CH341A programmer boards have been reported to drive 5 V logic into nominally 3.3 V flash devices. Do not assume that an included 1.8 V adapter also translates all signal levels correctly. Verify the exact hardware revision.

## In-circuit clips have limitations

A SOIC8 clip can avoid desoldering, but other components connected to the SPI bus may load the signals, and a programmer may back-power the motherboard through protection diodes. **Disconnect power and batteries where practical; do not connect a programmer to a powered board.** Even an unpowered board can be unsuitable for in-circuit reading. If reads are inconsistent, stop and investigate rather than increasing voltage.

## Install flashrom

On Debian or Ubuntu:

```sh
sudo apt update
sudo apt install flashrom
flashrom --version
```

Check the [flashrom programmer documentation](https://www.flashrom.org/) for your exact adapter and current version. The following examples assume a compatible CH341A SPI programmer, an electrically safe connection and a supported chip.

## Read twice, compare, keep the originals

```sh
sudo flashrom -p ch341a_spi
sudo flashrom -p ch341a_spi -r backup-1.bin
sudo flashrom -p ch341a_spi -r backup-2.bin
sha256sum backup-1.bin backup-2.bin
cmp backup-1.bin backup-2.bin
```

Two identical reads are **necessary evidence of repeatability, not proof that the contents are valid**. Check the reported chip model, expected image size and any platform-specific structure. Store the original image safely, and document the board revision, chip markings, flashrom version and command output.

## Do not start with a write

Writing the wrong image can make a device unbootable. Firmware images may contain device-specific data such as calibration values, MAC addresses, serial numbers or configuration. Do not flash an image merely because it has the correct size. For an initial learning exercise, use a separate, known-compatible spare flash chip rather than an irreplaceable motherboard.

A backup may also contain secrets or identifying data. Store it securely and do not publish raw firmware dumps without checking rights, privacy and licensing.

## Common failure modes

| Symptom | Possible cause |
| --- | --- |
| Chip not detected | Wrong pinout, unsupported chip, voltage mismatch or poor clip contact |
| Different hashes on repeated reads | Unreliable connection, in-circuit interference or unstable supply |
| Read succeeds but device will not boot after write | Incorrect image, missing board-specific data or failed verification |
| Unexpectedly warm chip | **Disconnect immediately**; possible wiring or voltage fault |

## Further reading

- [flashrom project](https://www.flashrom.org/)
- [flashrom manual](https://manpages.debian.org/stable/flashrom/flashrom.8.en.html)
- [flashrom source and documentation](https://github.com/flashrom/flashrom)

*Editorial note: This is a documentation-based guide, not a test of a particular programmer. No product performance or safety certification is claimed.*
