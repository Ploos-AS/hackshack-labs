# Ham Radio & SDR — editorial plan

English is the original language; provide Norwegian Bokmål translations. Keep equipment tests reproducible and do not claim hands-on verification without it.

## Initial articles
1. Welcome to the Radio Shack: Amateur Radio Meets Open Source
2. Getting Started with RTL-SDR on Linux
3. Building Your Own WebSDR with OpenWebRX
4. APRS on Linux with Direwolf
5. Packet Radio Is Not Dead: AX.25 in 2026
6. Running a Packet Radio BBS on Linux
7. Digital Modes: FT8, JS8Call and Beyond
8. Building a Portable SDR Receiving Station

## Editorial checks
- Distinguish reception from transmission; explain licences and national frequency rules where relevant.
- Give hardware revision, firmware, OS and software versions; include test status.
- Differentiate simulations, desk research and hands-on measurements.
- Disclose affiliate relationships without letting them affect technical conclusions.
- Link historical BBS and computing topics to packet radio where appropriate.

## Radio Monitoring & Tracking — SBC receiver series
9. Building an ADS-B Aircraft Tracker with an SBC and RTL-SDR (readsb, tar1090)
10. Building a Local AIS Vessel Tracker with an SBC (AIS-catcher or rtl_ais)
11. One SBC, Two Receivers: Combined ADS-B and AIS Monitoring
12. Choosing Antennas, Filters and SDR Receivers for 1090 MHz ADS-B and VHF AIS
13. Self-Hosting Aircraft and Vessel Maps: Local Storage, APIs and MQTT
14. Comparing Low-Power SBCs for 24/7 Radio Reception (power, USB stability, thermals)

### Technical scope
- ADS-B: passive reception, primarily 1090 MHz; distinguish ADS-B from other Mode S traffic and actual radar.
- AIS: passive VHF reception around 162 MHz; distinguish AIS reports from actual marine radar.
- Prefer a separate SDR and appropriately tuned antenna for each simultaneous service; assess USB throughput and power budgets.
- Treat Raspberry Pi, Orange Pi and Radxa as equal first-class Linux SBC families; benchmark rather than assume compatibility or performance. Candidate boards include Raspberry Pi 4/5, Orange Pi Zero 3/Zero 4/5-series, and Radxa ZERO 3W/ROCK 5-series. Confirm exact board revisions, USB support and available Linux images before recommending hardware.
- Provide local-only operation first, with optional opt-in sharing to external aggregation networks.
- Avoid claims of complete coverage; account for terrain, antenna placement, range, equipment and transmissions.
- Review local rules and responsible handling of location data before publishing feeds.

## Cross-platform receiver milestone — ADS-B M0
- Target Raspberry Pi, Orange Pi and Radxa equally, without Raspberry Pi-specific scripts or hard-coded device paths.
- Prefer ARM64 OCI images and document x86-64 compatibility where practical; pin image versions and verify architecture support.
- Use one configurable deployment with readsb + tar1090 for ADS-B, and a separate optional AIS-catcher service for AIS.
- Expose a local web UI by default; external feeds and telemetry must be explicitly enabled.
- Provide per-board test records: board revision, OS/kernel, SDR model, antenna, USB/power, CPU/RAM, thermal behavior, 24-hour stability and observed reception.
- Keep hardware results marked **not tested** until physical validation is completed on each board.
