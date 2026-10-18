# HackShack Labs — instrument purchase candidates and affiliate links

> **Status:** Planning register, not a list of purchased or hands-on tested equipment. Affiliate commissions do not influence editorial recommendations. See [editorial policy](../EDITORIAL-POLICY.md).

| Instrument | Model | Region | Status | AliExpress affiliate link |
| --- | --- | --- | --- | --- |
| Plug-in energy meter | UNI-T UT230B-EU | EU / 230 V | Planned; not tested | [AliExpress EU](https://s.click.aliexpress.com/e/_c3WjGYlx) |
| Plug-in energy meter | UNI-T UT230B-US (seller listing title; specifications unverified) | US; electrical specifications unverified | Planned; verify voltage, plug type and certification before publishing as US-compatible | [AliExpress US](https://s.click.aliexpress.com/e/_c3fhwf2v) |
| Digital multimeter | UNI-T UT61E+ (listing variant unverified) | Not yet verified | Planned; not tested | [AliExpress](https://s.click.aliexpress.com/e/_c4nRJVnb) |

| Infrared thermometer | UNI-T UT306C (-50 to 500 °C per seller title; specifications unverified) | General | Planned; not tested | [AliExpress](https://s.click.aliexpress.com/e/_c3Cf19av) |

| Temperature and humidity meter | UNI-T UT333BT | General | Planned; not tested; Bluetooth via iENV, CSV export through mobile app; direct Linux/Python support unverified | [AliExpress](https://s.click.aliexpress.com/e/_c4CALRLT) |

| Sound level meter | UNI-T UT353BT (30–130 dBA) | General | Planned; not tested; Bluetooth to iENV app; direct Linux/Python support unverified | [AliExpress](https://s.click.aliexpress.com/e/_c328j5jx) |

| USB power tester | UNI-T UT658 series / UT658B (exact selected listing variant unverified) | General | Planned; not tested; USB-A/USB-C compatibility and data export require verification | [AliExpress](https://s.click.aliexpress.com/e/_c2JpaFtJ) |

| Plug-in energy meter | Brennenstuhl Primera-Line PM 231 E | EU / 230 V (verify exact plug and ratings) | Planned; not purchased or tested; affiliate link not registered | — |

## Editorial usage

- English original and Norwegian Bokmål translation must disclose affiliate links clearly and near the links.
- Link directly without loading AliExpress image pixels, tracking scripts or third-party embeds.
- For external links use `rel="sponsored noopener noreferrer"`.
- Do not imply purchases, hands-on tests, verified calibration, safety certification, Linux compatibility or model equivalence before checking.
- Verify the destination listing, electrical rating, plug type and suitability for the reader's region before publication.
- Proposed article: *How to Measure the Power Consumption of Mini PCs, SBCs and Home Servers*; Norwegian: *Slik måler du strømforbruket til mini-PC-er, SBC-er og hjemmeservere*.

## Existing equipment (not purchase candidates)

| Equipment | Quantity | Status | Affiliate link |
| --- | ---: | --- | --- |
| Hagibis HDMI video capture with loop-out (MS2131 per seller listing) | 3 | User reports owned; Linux V4L2/UVC, OBS, input/output resolution and audio capabilities not yet independently tested | [AliExpress (affiliate)](https://s.click.aliexpress.com/e/_c3HEV9Qp) |

Use for future HackShack Labs video capture and tutorials. Clearly distinguish the seller's advertised 4K input/loop-through from verified recording resolution; do not claim tested compatibility before testing.

### Mini-PCs available for testing

| Equipment | Quantity | Status | Affiliate link |
| --- | ---: | --- | --- |
| Generic Intel N150 mini-PC (AliExpress listing; exact brand/model unverified), 32 GB RAM / 2 TB SSD variant | 2 | User reports owned and awaiting hands-on tests; advertised Windows 11 Pro, Wi-Fi 6 and Bluetooth 5.2 unverified; intended Debian Linux tests | [AliExpress (affiliate)](https://s.click.aliexpress.com/e/_c3bv6Et3) |

### Industrial mini-PC available for testing

| Equipment | Quantity | Status | Affiliate link |
| --- | ---: | --- | --- |
| Fanless industrial mini-PC, selected Core i7-5500U / 8 GB RAM / 256 GB SSD / Wi-Fi / 6 × RS-232 variant (seller listing covers multiple configurations) | 1 | User reports owned, pending hands-on testing; dual LAN and exact port capabilities require verification | [AliExpress (affiliate)](https://s.click.aliexpress.com/e/_c4BEwkst) |

### GMKtec mini-PC available for testing

| Equipment | Quantity | Status | Affiliate link |
| --- | ---: | --- | --- |
| GMKtec G3 mini-PC, Intel N100, 16 GB RAM / 512 GB SSD | 1 | User reports owned; pending hands-on tests; exact revision, interfaces and components to verify | None registered |

## Planned YouTube production

### Testing a Cheap HDMI Capture Card on Linux — Hagibis MS2131

- **Status:** Planned; no test results or video published yet.
- **Equipment:** Three user-owned Hagibis HDMI capture cards with loop-out, advertised as MS2131-based.
- **Language:** English video; accompanying English article and Norwegian Bokmål translation.
- **Test setup:** Ubuntu Linux, V4L2 tools and OBS Studio; document kernel, device IDs and tested hardware.
- **Test plan:** Identify USB/V4L2/UVC device; enumerate actual capture modes and frame rates; verify advertised 4K input/loop-out versus recorded output; test HDMI audio, latency, frame drops, stability, simultaneous use of up to three units, and compatibility with available HDMI sources.
- **Evidence:** Publish reproducible commands, screenshots or logs, settings and any limitations; avoid unverified compatibility claims.
- **Editorial:** Clearly disclose the [AliExpress affiliate link](https://s.click.aliexpress.com/e/_c3HEV9Qp) with sponsored link attributes; purchasing source and commission must not affect conclusions.
- **Deliverables:** YouTube video, English hands-on review, Norwegian translation, and link between the video and articles.

## Linux/sigrok multimeter candidates

| Model | Priority | Status | Notes |
| --- | --- | --- | --- |
| **UNI-T UT61E (original, not UT61E+)** | Low / used-only opportunity | Discontinued 2020-11-30; not purchased or tested | sigrok supports the original model, but it is discontinued. Consider only if a reasonably priced used unit with suitable data cable becomes available. No affiliate link registered. |

### UT61E+ Linux/Python follow-up

UNI-T officially discontinued the original UT61E in 2020, replacing it with UT61E+. Prioritize **UT61E+** for new purchase subject to exact listing, cable, electrical safety and independent verification. sigrok's original UT61E driver does **not** support UT61E+, but the community Python project [ljakob/unit_ut61eplus](https://github.com/ljakob/unit_ut61eplus) reports Linux access via a CP2110 USB connection and includes plotting/MQTT examples. Treat this as community-supported and unverified in our lab, not official sigrok support. The original UT61E remains a low-priority used-only opportunity.

## Planned article: UNI-T UT61E+ on Linux

**Working title:** *UNI-T UT61E+ on Linux: USB Data Logging with Python and MQTT*  
**Status:** Planned; hardware not yet purchased or tested.  
**Languages:** English original and Norwegian Bokmål translation.

Scope: identify the exact USB interface and required cable; reproduce Linux detection; evaluate the community [unit_ut61eplus](https://github.com/ljakob/unit_ut61eplus) Python implementation; record measurements to CSV; demonstrate optional MQTT publishing and Home Assistant integration; document reproducible setup, limitations, measurement safety, and the difference between original UT61E sigrok support and UT61E+ community support. No compatibility or performance claims before hands-on verification. Include clearly marked affiliate links only where applicable.

## Automotive multimeter candidate

| Model | Priority | Status | Linux/data interface | Affiliate link |
| --- | --- | --- | --- | --- |
| **UNI-T UT107+** | Medium | Planned purchase; not purchased or tested | No USB/Bluetooth/data-export interface documented in manufacturer specifications; Linux/sigrok support not established. Automotive functions include RPM, dwell, pulse width, 12V battery test; True RMS, 6000 counts. Verify exact listing, CAT rating and accessories before purchase. | [AliExpress (affiliate)](https://s.click.aliexpress.com/e/_c4sBATAh) |

## Bluetooth multimeter candidate

| Model | Priority | Status | Linux/data interface | Affiliate link |
| --- | --- | --- | --- | --- |
| **UNI-T UT60BT** | High | Planned purchase; not purchased or tested | Bluetooth LE; third-party UT60BT hardware-verified support reported by [QtDMM](https://qtdmm.de/) and [libreble/multimeter](https://github.com/libreble/multimeter). Verify exact device revision and Linux logging in our lab. UNI-T specifies 9999 counts and CAT III 600 V / CAT II 1000 V; independently check safety documentation before mains use. | [AliExpress (affiliate)](https://s.click.aliexpress.com/e/_c4dqIMPP) |

**Proposed article:** *UNI-T UT60BT on Linux: Bluetooth Multimeter Logging Without the Vendor App* (English original, Norwegian Bokmål translation). Test BlueZ/BLE discovery, QtDMM and open protocol tooling, CSV export, Python/MQTT integration, reconnection and range handling. Do not present this as a hands-on test before purchase and verification.

## Contact thermometry candidate

| Model | Priority | Status | Interface and scope | Affiliate link |
| --- | --- | --- | --- | --- |
| **UNI-T UT325** | High | Planned purchase; not purchased or tested; seller availability and exact bundle unverified | Dual thermocouple inputs; types K/J/T/E/R/S/N; USB interface and 100-reading storage per UNI-T. Temperature range depends on thermocouple type and probe. Manufacturer provides PC software, but native Linux/sigrok/Python support has not been verified. UNI-T official product page currently marks this model unavailable; verify seller stock and potential newer alternatives. | [AliExpress (affiliate)](https://s.click.aliexpress.com/e/_c3WU2fSZ) |

**Proposed article:** *UNI-T UT325 on Linux: Dual-Channel Thermocouple Logging and USB Compatibility*. Compare against UT306C infrared readings where meaningful, document probe selection and calibration/reference limitations, identify USB chipset/protocol, and attempt Linux/Python logging without promising support in advance.

## Planned review: two Intel N150 mini-PCs (32 GB / 2 TB)

**Status:** Two units reportedly owned; hands-on review pending. Exact OEM, hardware revision and shipped components unverified. **Editorial:** English original, Norwegian Bokmål translation, clear affiliate disclosure.

**Test plan:** Photograph and identify chassis/ports and BIOS; verify CPU, installed RAM capacity/configuration and SSD identity/capacity; inspect network/Wi-Fi/Bluetooth controllers; install and test Debian Linux (kernel, graphics, audio, suspend, networking, thermals); measure idle/load power consumption with a suitable external meter; benchmark CPU, storage and network; record fan noise, temperature and stability; compare both units for manufacturing variation. Check Windows license claims without publishing keys or identifiers. Distinguish listing claims from verified findings, and document any safety concerns.

**Proposed article/video:** *Two Cheap Intel N150 Mini PCs from AliExpress — Debian Linux, Power Consumption and Performance*. Do not publish test results before measurement.

## Planned review: fanless industrial Core i7-5500U mini-PC with six serial ports

**Status:** One unit reportedly owned; not yet hands-on tested. Listing specifies 8 GB RAM, 256 GB SSD, Wi-Fi and six RS-232 ports in the selected variant; confirm all actual components and electrical port standards.

**Test plan:** Identify CPU, RAM, storage, NIC chipsets, UARTs and BIOS/UEFI; install Debian Linux and evaluate FreeBSD where practical; enumerate all six serial ports, test loopback and simultaneous traffic, verify RS-232 voltage levels and distinguish RS-485 only if documented and safely verified; test dual Ethernet routing/firewall use, Wi-Fi, idle/load power, thermal throttling and stability. Use proper serial adapters and never connect TTL UART directly to RS-232.

**Proposed article/video:** *A Fanless Industrial Mini PC with Six Serial Ports — Linux, FreeBSD and Retro Computing*. English original and Norwegian Bokmål translation; disclose affiliate link and do not claim unverified results.

## Planned review: GMKtec G3 N100 (16 GB / 512 GB)

**Status:** One unit owned; not yet tested. **Working title:** *GMKtec G3 N100 on Debian — A Budget Mini PC for Homelab?*

Test Debian Linux compatibility; identify actual RAM/SSD/network/Wi-Fi hardware and firmware; measure idle/load power, CPU/storage/network performance, cooling and noise; evaluate Docker and lightweight server workloads. Compare against the two owned Intel N150 mini-PCs using consistent configurations and reproducible benchmarks. English original with Norwegian Bokmål translation. No affiliate link registered; do not imply a hands-on verdict before tests.

## Owned retro-video test equipment: RetroScaler GBS Control Pro

| Equipment | Quantity | Status | Affiliate link |
| --- | ---: | --- | --- |
| **RetroScaler GBS Control Pro (GBSC) video converter / scaler** | **1** | User reports owned; awaiting tests. Seller advertises RGBS, VGA, SCART, YPbPr, composite and S-Video inputs and HDMI output; actual connectors, supported modes, firmware and signal handling must be inspected and verified. | [AliExpress (affiliate)](https://s.click.aliexpress.com/e/_c3SvS10d) |

**Proposed review:** *RetroScaler GBS Control Pro Tested: Amiga, Atari, SCART and HDMI Capture on Linux* (English original, Norwegian Bokmål translation).

**Test plan:** Photograph and document actual input/output ports and board revision; identify firmware and configuration options; test PAL 15 kHz RGB from Amiga where safely available, Atari ST video modes as supported, RGB SCART, VGA, component and composite/S-Video only if the particular unit really supports them; assess 50/60 Hz behavior, aspect ratio, deinterlacing, scaling, scrolling artifacts, audio if present, and latency with documented methodology. Test HDMI output with the owned Hagibis MS2131 capture devices and OBS on Linux; distinguish device compatibility from any capture-card limitation. Do not assume all advertised interfaces or features are supported without verification. Include affiliate disclosure; no hands-on conclusions before testing.

## Retro-video test series: RetroScaler GBS-C + Hagibis MS2131

**Status:** Approved as a planned test series; equipment owned (one RetroScaler GBS Control Pro and three Hagibis HDMI capture cards). No test recordings or findings yet. **Publication:** English original, Norwegian Bokmål translation; articles and YouTube videos, with conspicuous affiliate disclosures.

### Episode / article 1 — Hardware and signal chain

- Photograph actual GBSC connectors, board revision, firmware version, power supply and menu options; confirm whether composite and S-Video are truly supported on this variant.
- Document reproducible wiring: retro source → GBSC → HDMI splitter or loop-out as applicable → Hagibis → OBS on Debian/Ubuntu Linux → monitor.
- Document safe power-up, audio routing, video standards, capture formats and expected limitations. Never assume a listed signal is supported until verified.

### Episode / article 2 — Amiga PAL RGB to HDMI

- Test real Amiga 15 kHz PAL RGB if hardware/cables are available; record sync stability, 50 Hz, aspect ratio, scanlines, scaling, interlace/deinterlace, scrolling and output latency.
- Keep native screen output and recorded capture separate when assessing picture quality.

### Episode / article 3 — Atari and other retro video sources

- Test supported Atari ST modes and other available RGB/SCART/VGA/YPbPr sources. Note ST high-resolution mono and other modes may need separate support or adapters; do not promise compatibility.

### Episode / article 4 — Hagibis HDMI capture on Linux

- Enumerate each of the three units via `lsusb`, `v4l2-ctl --list-devices`, `v4l2-ctl --list-formats-ext`; capture with OBS/FFmpeg; check frame cadence, dropped frames, latency, audio synchronization, 50/60 Hz behavior and differences between units.
- Clearly distinguish issues introduced by the GBSC from capture card or OBS limitations.

### Episode / article 5 — Practical guide and comparison

- Publish recommended settings for confirmed hardware combinations, repeatable sample clips, troubleshooting and a summary of what was verified vs unverified.
- Do not publish untested compatibility claims or product ratings. No test video is scheduled until the user is ready.

**Suggested series name:** *Retro Video on Linux: From RGB and SCART to HDMI and OBS*.

## USB-to-TTL serial adapter candidate

| Model | Priority | Status | Linux and electrical considerations | Affiliate link |
| --- | --- | --- | --- | --- |
| **CH343G USB-to-TTL UART module (USB-A/USB-C options in listing)** | **High** | Planned purchase; not ordered or tested. Exact USB connector variant, breakout pins and included accessories unverified. | Candidate for Linux serial console/debugging with kernel USB-serial support to be verified on the exact unit. Check advertised 3.3 V / 5 V logic level, actual TX/RX voltage, VCC supply selection and pinout before connection. **TTL UART is not RS-232 or RS-485**: use a proper level shifter/transceiver for those interfaces. Avoid connecting target VCC unless intentionally powering it within the adapter's rated limits. | [AliExpress (affiliate)](https://s.click.aliexpress.com/e/_c3HfSMkp) |

**Suggested use and article:** *CH343G USB-to-TTL Serial Adapter on Linux: UART Debugging and Compatibility*. Verify USB ID and Linux driver, `dmesg`, `lsusb`, `/dev/ttyUSB*` or `/dev/ttyACM*`, loopback, common baud rates, stability and 3.3 V/5 V signaling. Test with development boards and router serial consoles using correct electrical levels. Record the exact product variant; do not infer support from the chipset name alone.

## Industrial USB-to-TTL serial adapters — two variants, one each

| Model / seller variant | Quantity | Priority | Status and verification | Affiliate link |
| --- | ---: | --- | --- | --- |
| **Industrial USB-to-TTL converter — FT232RL variant** | **1** | High | Planned purchase; not ordered/tested. Verify genuine FTDI chip (counterfeit/clone risk), connector, TTL voltage selection, ESD/protection circuitry and pinout. Confirm Linux `ftdi_sio` operation and stable loopback. | [AliExpress (affiliate)](https://s.click.aliexpress.com/e/_c2Ql9dhf) |
| **Industrial USB-to-TTL converter — CH343G variant** | **1** | High | Planned purchase; not ordered/tested. Verify actual chipset, USB IDs, kernel driver binding, TTL voltage levels, protection and pinout. Compare with the separate CH343G adapter already listed. | [AliExpress (affiliate)](https://s.click.aliexpress.com/e/_c2Ql9dhf) |

**Planned comparison:** *FT232RL vs CH343G on Linux: Industrial USB-to-TTL Serial Adapters Tested*. Evaluate enumeration, serial console compatibility, 3.3 V/5 V electrical behavior, baud rates, long-run transfers, disconnect/reconnect behavior and advertised protection (only where safe and feasible to test). **TTL UART is not RS-232/RS-485**; do not connect directly to the industrial PC's RS-232 ports. Seller's “original”, “multi protection” and “stable transmission” claims remain unverified until tested. The CH343G industrial version is a distinct listing/physical candidate from the previously registered basic CH343G module; do not mistake this for an accidental duplicate.

## Label printing and lab inventory candidates

| Product | Quantity | Priority | Status and rationale | Purchase link |
| --- | ---: | --- | --- | --- |
| **Brother QL-800** direct thermal USB label printer | **1** | High | Planned purchase; not ordered. For HackShack Labs sample IDs, test fixtures, cable/storage labeling, inventory and Ploos AS packing. USB connection; confirm Debian/Linux/CUPS or open-source printing workflows on actual device before asserting support. | [Brother Norway product page](https://store.brother.no/devices/label-printer/ql/ql800) (not affiliate) |
| **Brother DK-22205** continuous-length adhesive paper labels, black on white, **62 mm × 30.48 m** | **1 roll (initial)** | High | Planned consumable; confirmed compatible with QL-800 in Brother's official consumables list. Direct-thermal black print only on this roll; QL-800 red+black requires DK-22251 instead. | [Brother Norway product page](https://store.brother.no/devices/label-printer/ql/ql800) (not affiliate) |

**Proposed article:** *Brother QL-800 on Linux: Lab Inventory Labels, QR Codes and DK-22205*. Test Debian/Ubuntu USB discovery, CUPS and community printing options, batch labels from CSV/JSON, QR/barcodes, text sharpness, cutter operation and practical durability. Verify workflow before publishing compatibility claims. Prefer non-sensitive stable internal asset IDs, not MAC addresses or serial numbers on public examples. Compare original and compatible rolls only after hands-on testing.
