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
