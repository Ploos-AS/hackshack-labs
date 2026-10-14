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
- Use Linux-compatible SBCs such as Raspberry Pi and Orange Pi; benchmark rather than assume compatibility or performance.
- Provide local-only operation first, with optional opt-in sharing to external aggregation networks.
- Avoid claims of complete coverage; account for terrain, antenna placement, range, equipment and transmissions.
- Review local rules and responsible handling of location data before publishing feeds.
