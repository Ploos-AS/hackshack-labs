# Future article series: low-cost wireless IDS sensors

Status: **concept / editorial backlog only**. No implementation, firmware validation, capture test or Kismet integration has been performed.

This is a **separate future project**. It must not be combined with PirateBox, PocketBox or their firmware/build instructions.

## Candidate hardware

| Device | Strength | Limitation |
| --- | --- | --- |
| GL.iNet GL-MT300N-V2 (Mango) | 128 MB RAM, 16 MB flash, two Ethernet ports; practical OpenWrt candidate | 2.4 GHz-only, one radio; monitor mode, channel hopping and stability must be verified with the selected OpenWrt + mt76 driver |
| TP-Link TL-WR703N v1 | Small historical OpenWrt sensor / educational comparison | 4 MB flash, 32 MB RAM; last confirmed official device-specific image LEDE 17.01.7, obsolete and unsupported |
| Linux host with compatible USB Wi-Fi adapter | Flexible baseline for Kismet comparison | Larger footprint, extra hardware |

Mango is the **preferred research candidate**, not yet a verified WIDS platform. Driver capability is a release-specific test result, not a hardware marketing claim.

## Proposed system architecture

`Wi-Fi frames -> Mango monitor-mode capture -> Ethernet -> Kismet server on modern Linux -> alerting/dashboard`

Do not assume a modern `kismet_cap_linux_wifi` binary fits Mango's flash, CPU, libc or OpenWrt release. Compare a remote capture helper against lightweight alternatives (e.g. packet streaming) based on actual package availability and measured bandwidth. Prefer Ethernet for the sensor uplink; a single radio cannot both monitor all channels continuously and serve as a normal AP without compromises.

## Test gates

1. Identify exact Mango hardware revision, OpenWrt release, kernel, Wi-Fi driver and regulatory domain.
2. Verify monitor interface creation and actual 802.11 management/data-frame capture in a controlled, authorized environment.
3. Measure fixed-channel capture and channel hopping; record missed events and dwell time.
4. Test sustained capture for 24–72 hours: CPU, RAM, packet drops, thermal behavior, reboot recovery.
5. Test compatible Kismet remote capture and secure transport over Ethernet.
6. Compare with a supported USB Wi-Fi adapter on a modern Linux host as baseline.
7. Document legal/privacy handling: observe only owned/authorized networks, minimize payload collection, retention limits and access controls.

## Proposed HackShack Labs articles

1. **Can the GL.iNet Mango Become a Kismet WIDS Sensor?** — feasibility, monitor mode, driver and firmware matrix.
2. **OpenWrt to Kismet: Remote Wi-Fi Capture Over Ethernet** — capture transport, hardening, measurements.
3. **Building a Multi-Sensor WIDS on a Budget** — channel allocation, central analysis and alerting.
4. **Mango vs TL-WR703N vs USB Wi-Fi: Real-World Sensor Tests** — measured comparison, clear support/EOL warnings.

## Publishing rules

Do not mark an article `tested: true` until real hardware testing is recorded. Separate confirmed specifications, upstream documentation, hypotheses and observations. Do not claim the sensor detects all wireless attacks or covers all channels; no single 2.4 GHz radio can do that.

References for subsequent verification:
- https://openwrt.org/toh/gl.inet/gl-mt300n_v2
- https://www.kismetwireless.net/docs/readme/datasources_remote_capture/
- https://www.kismetwireless.net/docs/readme/datasources_wifi/
