---
title: "USB-to-UART Explained: TTL, RS-232 and RS-485"
description: "Understand serial voltage levels, wiring, adapters and safe first connections to embedded boards."
category: guides
lang: en
date: 2026-10-20
tags: [uart, ttl, rs232, rs485, linux, electronics]
translationKey: usb-uart-ttl-rs232-rs485
draft: false
tested: false
evidence: documentation
---

A USB connector does not tell you which electrical serial interface an adapter uses. **TTL-level UART, RS-232 and RS-485 are not interchangeable.** Connecting the wrong one to an embedded board can damage it.

## Three different electrical interfaces

| Interface | Typical use | Electrical characteristics |
| --- | --- | --- |
| Logic-level UART ("TTL serial") | Router consoles, microcontrollers | Single-ended logic, commonly 3.3 V or 5 V; check the actual board |
| RS-232 | Legacy PCs, instruments | Inverted signaling and positive/negative voltages; not directly compatible with MCU UART pins |
| RS-485 | Industrial multidrop links | Differential A/B pair; requires an RS-485 transceiver |

"TTL" is often used loosely in adapter listings. A **3.3 V UART is not necessarily 5 V tolerant**. Never infer safe levels from the USB plug, connector shape or chip family alone.

## TX, RX and GND

For a known-compatible logic-level UART, connect **adapter TX → target RX**, **adapter RX → target TX**, and **GND → GND**. The target normally has its own power supply; do **not** connect the adapter's 3.3 V or 5 V power output without a verified reason.

For an unfamiliar router, a safer first inspection is **target TX → adapter RX plus common GND**, with the target powered separately. This allows passive reception of boot messages without driving the router's RX pin. First verify the pinout and voltage levels; a pin header is not proof of a UART console.

## Identify your USB adapter on Linux

```sh
lsusb
dmesg --follow
ls -l /dev/serial/by-id/ /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

Plug the adapter in while observing kernel messages. Device names vary by chipset, driver and existing peripherals. Avoid assuming that `/dev/ttyUSB0` always refers to the same device.

To open a console, install a serial terminal such as `picocom` and select the documented baud rate:

```sh
sudo apt install picocom
picocom -b 115200 /dev/ttyUSB0
```

**115200 8N1 is common, not universal.** Check the target documentation. Close the terminal before disconnecting. Depending on distribution, serial-device access may require membership in an appropriate group.

## Common mistakes

- Connecting RS-232 voltages directly to a 3.3 V UART header.
- Assuming a 3.3 V/5 V switch controls **signal levels** rather than only a power pin.
- Connecting two outputs together instead of crossing TX and RX.
- Powering a board simultaneously from USB–UART VCC and its normal supply.
- Forgetting a common ground for single-ended UART.
- Assuming RS-485 A/B labeling is consistent across vendors; consult each transceiver's documentation.

## What about our budget adapters?

HackShack Labs has ordered FT232RL, CH340N and CH343G logic-level UART adapters, plus a separate CH343G RS-232/RS-485 converter. **None has been independently tested by us yet.** We will measure their actual levels and Linux behavior before recommending them for sensitive hardware.

## Further reading

- [Linux kernel USB serial documentation](https://docs.kernel.org/usb/usb-serial.html)
- [pySerial documentation](https://pyserial.readthedocs.io/en/latest/)
- [Texas Instruments: RS-485 design resources](https://www.ti.com/interface/rs-485-rs-422/overview.html)

*Editorial note: This is a technical explainer, not a hands-on review. Any future product links must be clearly disclosed if affiliate links are used.*
