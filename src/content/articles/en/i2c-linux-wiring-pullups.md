---
title: "I²C Explained: Wiring, Pull-ups and Linux Tools"
description: "A practical introduction to I²C buses, voltage levels, pull-up resistors and safe Linux discovery."
category: guides
lang: en
date: 2026-10-23
tags: [i2c, linux, electronics, embedded, sensors]
series: "Electronics Fundamentals"
translationKey: i2c-linux-wiring-pullups
draft: false
tested: false
evidence: documentation
---

I²C is a two-wire, synchronous bus commonly used between controllers, sensors, real-time clocks, EEPROMs and power-management chips. It looks simple—**SDA** for data and **SCL** for clock—but incorrect voltage levels or wiring can damage a device.

*Editorial note: This is a documentation-based guide. HackShack Labs has not yet independently measured the example hardware.*

## What the wires do

Most I²C connections need **SDA, SCL and a common GND**. Power is usually supplied separately to each board, following its datasheet. I²C uses open-drain/open-collector signalling: participants pull a line low, while pull-up resistors bring it high. Never treat the pins like ordinary push-pull UART TX/RX.

| Signal | Purpose | Check before connecting |
| --- | --- | --- |
| SDA | Bidirectional serial data | Voltage domain; shared by all devices |
| SCL | Serial clock | Pull-ups and controller/device capabilities |
| GND | Reference ground | A safe shared reference between compatible boards |
| VCC | Module power, if required | Exact supply rating; **not** automatically the bus logic voltage |

Some breakout boards already include pull-ups. Others include voltage translators or onboard regulators, while some expose the raw chip pins directly. Labels such as “5 V compatible” are not enough: consult the **specific breakout schematic** as well as the IC datasheet.

## Why pull-ups matter

Because bus devices do not normally drive SDA and SCL high, the high level depends on the pull-up supply and resistor values. Too-weak pull-ups yield slow rising edges; too-strong pull-ups require devices to sink more current. Bus capacitance, cable length and speed affect the trade-off.

A common hobby-board example is **4.7 kΩ** pull-ups to **3.3 V**, but this is **not a universal recommendation**. For Standard-mode and Fast-mode, the I²C specification uses approximately **3 mA** as the nominal low-level sink-current design limit and maximum rise times of **1000 ns at 100 kHz** and **300 ns at 400 kHz**, respectively. These values are mode-dependent, not universal device ratings. Select resistance to meet both sink-current and bus RC rise-time limits. Check controller and peripheral ratings and actual capacitance. Many SBCs, including Raspberry Pi boards on their dedicated I²C pins, already have onboard pull-ups; multiple modules can create unintended parallel pull-ups. **Never pull a 3.3 V-only device up to 5 V.** Use a suitable level translator when voltage domains differ.

## Addresses are not always what they seem

An I²C peripheral usually has a **7-bit address**; some environments support 10-bit addressing. Datasheets sometimes show an 8-bit value that already includes the read/write bit. For example, a stated write address of `0xA0` may correspond to the 7-bit address `0x50`—but verify the device documentation instead of blindly shifting values. Address selection pins and board solder jumpers can also change the address. Two devices with the same fixed address may conflict.

## Find the right Linux adapter

Linux exposes supported host controllers through `/dev/i2c-*`. Many single-board computers require you to enable the bus in firmware, a device tree or a board-specific configuration utility first.

On Debian or Ubuntu, use:

```sh
sudo apt update
sudo apt install i2c-tools
i2cdetect -l
ls -l /dev/i2c-*
```

On systems where the `i2c` group grants access to `/dev/i2c-*`, adding your user to that group can avoid `sudo` for permitted operations. Sign out and back in, then verify permissions. This does not make unsafe probing safe.

**A listed adapter is not proof that your external pins are wired correctly.** Identify the mapping in your board's documentation. Linux adapter numbers can change; do not hard-code `i2c-1` without verifying the platform.

### Scan carefully—or do not scan

You may see examples such as:

```sh
sudo i2cdetect -y 1
```

**Do not use this blindly.** Address probing can disturb some devices or have unwanted side effects, especially on buses shared with regulators, controllers or EEPROMs. The `i2cdetect` manual explicitly warns that it can confuse the bus and cause problems. Use it only on an identified, electrically compatible bus when the connected hardware documentation indicates probing is safe.

Likewise, `i2cget` and `i2cset` are not harmless diagnostic toys: reads can have side effects and writes may change device configuration or persistent memory. For many peripherals a kernel driver is safer than raw register access.

## Troubleshooting checklist

| Symptom | Possible explanation |
| --- | --- |
| Nothing responds | Disabled controller, wrong pins, missing ground, incorrect voltage or absent pull-ups |
| Intermittent responses | Loose wires, capacitance, excessive clock rate or bad pull-up values |
| Addresses appear unexpected | 7-bit versus 8-bit notation, alternative address pins or a multiplexed bus |
| SDA stays low | A stuck peripheral, miswiring or a partially powered device |
| Kernel driver owns the address | The OS has bound a device; avoid competing raw accesses |
| Works on one controller but stalls on another | Clock stretching or controller-driver limitations; verify compatibility |

**Connect and inspect wiring with power removed.** Confirm pinouts and the intended pull-up voltage before applying power. Then power the setup normally and measure the SDA/SCL idle voltage relative to GND with a suitably rated meter; stop if it is outside the devices' permitted logic range. Only after that should you consider a documented, safe bus transaction. A logic analyzer can decode traffic but does not replace voltage verification with a meter or oscilloscope.

## What HackShack Labs will test later

Our planned follow-up will document breakout-board pull-up values, actual bus voltages, Linux kernel visibility and captures at several clock rates. Until those measurements are complete, this article is a wiring and workflow reference—not a review of specific adapters.


**Continue learning:** Follow the [Electronics Fundamentals reading path](/series/electronics-basics/) for the complete sequence from multimeter basics through UART, I²C, SPI flash and logic analysis. Each guide distinguishes documentation from actual lab measurements.

## References

- [Linux kernel: I²C subsystem documentation](https://docs.kernel.org/i2c/index.html)
- [i2cdetect manual page](https://manpages.debian.org/stable/i2c-tools/i2cdetect.8.en.html)
- [NXP: I²C-bus specification and user manual (UM10204)](https://www.nxp.com/docs/en/user-guide/UM10204.pdf)
