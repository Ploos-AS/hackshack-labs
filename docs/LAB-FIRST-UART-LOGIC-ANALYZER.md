# HackShack Labs: first hands-on lab report — UART logic analyzer

**Status:** Proposed procedure; **not performed**. No article may be marked `lab-tested` based on this plan alone.

## Goal

Validate a low-cost USB logic analyzer and the Linux sigrok/PulseView workflow using a **known, electrically compatible 3.3 V UART signal**, then document measured observations, failures, firmware and limitations.

## Equipment checklist

- [ ] Identified logic analyzer: make, revision, USB VID:PID and purchased source
- [ ] Separate verified reference generator: MCU/dev board capable of a known UART message (e.g. ATmega1284P-based lab board), firmware source and revision
- [ ] Confirmed 3.3 V UART reference, wiring diagram and ground; independent power source
- [ ] Multimeter for idle voltage; oscilloscope if available for signal integrity
- [ ] Debian or Ubuntu Linux host, kernel/version, PulseView, libsigrok and sigrok-cli versions
- [ ] Correct firmware and udev permissions, if required by the analyzer revision

**Do not connect** an unknown logic-level port, ±RS-232, mains-connected circuit or device with unknown ground potential.

## Experiment

1. Identify the reference UART TX pin and common ground from a verified schematic. With power removed connect only the analyzer input and reference ground.
2. Power the generator and verify idle voltage and polarity. Note that a fixed analyzer threshold near 1.5 V may be unsuitable for marginal 1.8 V signalling.
3. Record `lsusb`, kernel version, `sigrok-cli --version`, device driver, firmware availability and udev permissions.
4. Generate a **deterministic test pattern**, e.g. repeated ASCII `U` (0x55) with explicit 8N1 framing, at 9600 and 115200 baud.
5. Capture at several supported sample rates (e.g. 1, 4 and 8 MS/s where the hardware permits). Save raw `.sr` captures and exact commands. A sample command is:
   ```sh
   sigrok-cli -d fx2lafw --config samplerate=1m --samples 1M -o cap.sr
   ```
   This driver string applies **only** if the connected analyzer is supported by fx2lafw.
6. Decode the captures with UART settings explicitly recorded. Repeat three independent capture sessions and record errors and observable sample gaps.
7. Attempt one intentionally incorrect decoder setting (without changing the electrical wiring) to illustrate diagnostic failure; return to correct settings.
8. If equipment supports it, repeat with an electrically safe I²C reference using verified pull-ups. **Do not** infer SPI/I²C test coverage from a UART-only run.

## Capture log template

| Field | Recorded value |
| --- | --- |
| Date and test operator | Pending |
| Linux host, kernel, software versions | Pending |
| Analyzer vendor/model/revision/VID:PID | Pending |
| Firmware and udev rules | Pending |
| Reference generator and firmware commit | Pending |
| UART levels and wiring validation | Pending |
| Baud rate / serial format | Pending |
| Sample rates / channels / threshold | Pending |
| Session 1, 2, 3 results | Pending |
| Raw captures and SHA-256 hashes | Pending |
| Deviations, limitations, possible error sources | Pending |

## Publication and acceptance gates

- [ ] At least three repeat runs at each claimed supported setup, with saved source captures.
- [ ] An explicitly stated **pass/fail criterion** for expected UART frames and timing; report failures, not just successes.
- [ ] Publicly share reproducible *non-sensitive* reference firmware and measured captures where legally and technically suitable.
- [ ] Review results separately from vendor specifications.
- [ ] Have a second reviewer check that each claimed result has evidence.
- [ ] Only after running and verifying the experiment, publish the report as `lab-tested` and set `tested: true`, with changelog and exact setup.

This is a protocol, not a promise of measurements or a completed hardware review.
