---
title: "Logic Analyzers on Linux: Getting Started with sigrok and PulseView"
description: "Understand sampling, voltage limits, protocol decoding and a reproducible Linux logic-analyzer workflow."
category: guides
lang: en
date: 2026-10-23
tags: [logic-analyzer, linux, sigrok, pulseview, uart, spi, i2c]
series: "Electronics Fundamentals"
translationKey: logic-analyzer-linux-sigrok-pulseview
draft: false
tested: false
evidence: documentation
---

A USB logic analyzer can capture changing digital signals and help explain what an embedded system is doing. On Linux, the open-source **sigrok** ecosystem and **PulseView** graphical interface provide acquisition and protocol decoding for supported hardware.

This is a **documentation-based beginner guide, not a hardware review**. HackShack Labs has not yet tested its planned low-cost analyzer.

## Logic analyzer versus oscilloscope

A logic analyzer generally samples whether a signal is interpreted as *low* or *high*. It is excellent for timing relationships and decoding UART, I²C and SPI, but it cannot tell you the actual waveform shape, overshoot, voltage margin or analog noise. A multimeter and oscilloscope remain important when electrical behaviour is uncertain.

**Check the analyzer's documented input-voltage range before connecting it.** A USB logic analyzer rated for 3.3 V/5 V logic is not automatically safe for RS-232 voltage swings, mains voltage, high-energy circuits or unknown interfaces. Never connect equipment without a safe common reference.

## Three numbers that matter

- **Channels:** how many signals you can capture at once. UART needs one or two; SPI may need clock, data in, data out and chip select; I²C generally needs SDA and SCL.
- **Sampling rate:** how many measurements per second each channel receives. More samples per shortest pulse improves timing resolution; the advertised maximum may depend on active channels and USB bandwidth.
- **Capture depth:** how much data can be stored. Higher sampling rates may shorten the capture time unless buffering and streaming can keep up.

For illustration, sampling at **24 MS/s** gives a nominal sample interval of about **41.7 ns**. That does **not** mean the analyzer can faithfully measure arbitrary 24 MHz signals. As a **rough starting point**, sample at least **4× the bit rate or fastest event rate** you want to distinguish, and aim for **10× or more** for useful timing detail. Very short glitches need substantially higher rates; these multipliers do not guarantee detection, and an edge does not have a single frequency. Verify per-channel limits, threshold behaviour and protocol-decoder requirements.

## Install on Debian or Ubuntu

Install the front end and, where available, sigrok command-line tools:

```sh
sudo apt update
sudo apt install pulseview sigrok-cli
# For compatible Cypress FX2/FX2LP analyzers on Debian:
sudo apt install sigrok-firmware-fx2lafw
sigrok-cli --version
sigrok-cli --scan
```

The available package names, device drivers, firmware-loading behaviour and permission rules vary by distribution and analyzer. A device appearing in `lsusb` does **not** guarantee compatibility with sigrok. Check the [sigrok supported-hardware list](https://sigrok.org/wiki/Supported_hardware) for the **exact hardware revision**, not just a similar-looking enclosure.

Many low-cost 8-channel analyzers use Cypress FX2/FX2LP controllers that load **fx2lafw** firmware when connected. The Debian `sigrok-firmware-fx2lafw` package supplies it for compatible devices. Other hardware needs other drivers or firmware. If scanning finds nothing, examine USB IDs and firmware messages.

For access errors, check whether suitable libsigrok **udev rules** are installed (some distributions need additional setup). Reload with `sudo udevadm control --reload`, then unplug and reconnect the device; verify active-session or group access. Do not run the GUI as root as a workaround.

Example capture for an **identified compatible FX2 analyzer** on a safely connected digital signal:

```sh
sigrok-cli -d fx2lafw --config samplerate=1m --samples 1M -o cap.sr
```

This example saves a sigrok capture file; check your device's supported rates and adjust the rate to the signal. **No HackShack Labs measurement is claimed.**

## A safe first capture

1. Identify the target signal type, voltage, idle state and expected rate from documentation.
2. With the target off, connect analyzer **GND to an appropriate target ground** and connect an input only to a signal within the analyzer's electrical rating.
3. Power the target, select the correct input driver in PulseView and choose a conservative sampling rate with enough margin above the signal bandwidth.
4. Start with a short capture, then adjust trigger, duration and channels.
5. Add the appropriate **protocol decoder**, specifying UART baud rate and polarity, SPI mode and chip-select configuration, or I²C SDA/SCL mappings.
6. Save both the capture and settings. Record hardware revisions and tool versions so results can be reproduced.

**Do not drive the circuit through analyzer inputs.** A typical analyzer is intended to observe, not power or control your target. Avoid attaching its ground to points of unknown potential.

## Decoding common buses

| Bus | Signals to capture | Typical decoder settings |
| --- | --- | --- |
| UART | TX, optionally RX, plus reference ground | Baud rate, data bits, parity, stop bits, polarity |
| I²C | SDA + SCL | Assign the correct channels; inspect START, address, ACK and STOP |
| SPI | CLK, MOSI, MISO, CS | SPI mode (CPOL/CPHA), bit order, CS polarity |

For I²C captures, SDA and SCL need working pull-ups to the correct logic supply; without valid rising edges the analyzer cannot decode reliably.

Decoders can produce plausible but **wrong** output when configured incorrectly. Cross-check against documentation and the underlying timing trace.

## What can go wrong?

A missing capture can be caused by missing **fx2lafw firmware** on an FX2 clone, the wrong USB driver, inadequate permissions, a defective connection or an incorrect trigger. Some budget analyzers have fixed logic thresholds around **1.4–1.6 V**, but thresholds vary by model. **1.8 V signals may have insufficient noise margin**; verify the actual input threshold and voltage rating. A nonsensical decode may mean sampling too slowly, swapped channels or wrong protocol settings. If the captured signal looks permanently high or low, stop and check voltage levels and reference ground before trying more aggressive settings.

Some low-cost “8-channel 24 MHz” devices are clones or revisions with differing capabilities. Do not infer identical support from a listing title. The advertised 24 MHz may describe a capture clock, not a guaranteed bus frequency or measurement accuracy.

## Planned HackShack Labs qualification

Our forthcoming hands-on report will record the analyzer chipset and revision, firmware/driver requirements, working sample rates, channel limits, captures of a known UART/I²C/SPI reference, reliability across repeated sessions and Linux permissions. **No such measurement results are claimed here.**


**Continue learning:** Follow the [Electronics Fundamentals reading path](/series/electronics-basics/) for the complete sequence from multimeter basics through UART, I²C, SPI flash and logic analysis. Each guide distinguishes documentation from actual lab measurements.

## References

- [sigrok project](https://sigrok.org/wiki/Main_Page)
- [sigrok supported hardware](https://sigrok.org/wiki/Supported_hardware)
- [PulseView documentation](https://sigrok.org/wiki/PulseView)
- [sigrok-cli documentation](https://sigrok.org/wiki/Sigrok-cli)

- [fx2lafw firmware and udev setup](https://sigrok.org/wiki/Fx2lafw)
- [Debian FX2 firmware package](https://packages.debian.org/stable/sigrok-firmware-fx2lafw)
