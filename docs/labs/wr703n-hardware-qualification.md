# TL-WR703N hardware qualification protocol (M7)

**Status: planned; no physical qualification performed.** This document is a laboratory worksheet, not a firmware installation guide. Use it alongside the EN/NB draft articles and issue #47. Record observations, not expected outcomes.

## Test identification

| Field | Record |
| --- | --- |
| Test ID / date (UTC) | Pending |
| Operator | Pending |
| Device model and label revision | Pending |
| PCB revision / photographs | Pending |
| Factory firmware or installed OpenWrt version | Pending |
| Power supply rating / measured voltage | Pending |
| USB-UART adapter, logic voltage | Pending |
| Test workstation OS and serial device | Pending |
| Network topology / isolation verification | Pending |
| ProbeOS version, configuration and exported report ID (if used) | Pending |
| Raw evidence directory / commit or artifact reference | Pending |

Do not treat ProbeOS as proof of flashing or electrical safety: only include its actual measurements and supported checks.

## Stage A: non-destructive intake

1. Photograph enclosure label, ports and board revision; redact unique identifiers before publication.
2. Inspect for damage and verify power requirements against the device label and reliable hardware documentation.
3. Use a separate lab network with **no route to production networks or the public internet**. Record topology and verify isolation; do not assume a separate SSID alone provides isolation.
4. Record the currently installed firmware using its normal interface. Do not change settings or upload firmware during intake.
5. If OpenWrt already runs, collect read-only `/etc/openwrt_release`, `/proc/cpuinfo`, and `/proc/mtd` where available. Preserve complete output with timestamps.
6. Log current access paths and LED behavior. Stop if the model or revision is ambiguous.

**Gate A:** Exact device/revision identified, baseline recorded, isolated test environment confirmed.

## Stage B: firmware provenance and integrity (workstation only)

1. Record authoritative OpenWrt device documentation and release manifest URLs, retrieval dates, and any redirects.
2. Re-run `bash scripts/verify-wr703n-firmware.sh` on the workstation; save stdout, exit status, downloaded filenames, sizes and independent SHA-256 values.
3. Run the read-only image analyzer. Preserve its JSON report and version/commit.
4. Compare the recorded checksums with the official release manifest. Treat discrepancies as a hard stop.
5. Confirm *factory* vs *sysupgrade* semantics for the **specific installed starting firmware and exact hardware revision**; neither image type is interchangeable.
6. Do not use heuristic SquashFS offsets, header fields, or byte comparisons as flash-write addresses.

**Gate B:** Files independently verified, provenance documented, and the intended path independently reviewed. **Passing this gate does not authorize flashing.**

## Stage C: read-only serial observation

1. Confirm the board-specific UART pinout from reliable documentation and visual inspection. Check adapter logic voltage is **3.3 V**, not conventional RS-232.
2. With power disconnected, connect router TX to adapter RX and common ground only; leave adapter VCC and router RX disconnected.
3. Power the router through its normal supply and capture a timestamped boot log at documented 115200 8N1. Confirm the actual host serial device name.
4. Record bootloader identity/version, detected memory/flash, firmware boot messages and any unexpected errors. Do not issue bootloader commands.
5. Remove MAC addresses, credentials and serial numbers from any published log.

**Gate C:** Boot log captured and safely reviewed. If wiring, voltage or bootloader identity is uncertain, stop.

## Stage D: installation and recovery — separate explicit approval

**Not authorized by this protocol.** Before any write to flash, prepare a separate revision-specific procedure reviewed by another person. Require a verified backup strategy, a realistic recovery path, matching firmware provenance, explicit owner approval, and a rollback/stop plan. Test recovery in a controlled session and record outcomes; never infer success from downloaded binaries or CI.

Do not copy historical U-Boot `erase` / `cp.b` commands or guessed TFTP addresses into a runbook. If hardware is already non-booting, diagnose power and read-only serial output before considering specialist recovery.

## Evidence and publication gates

| Claim | Required evidence | Status |
| --- | --- | --- |
| Hardware model/revision confirmed | Label and PCB photos | Pending |
| Firmware file integrity | Official manifest + independent hashes | Previously documented in CI; recheck |
| Lab network isolated | Topology and isolation checks | Pending |
| UART voltage/pinout confirmed | Adapter specs, board-specific references | Pending |
| Bootloader observed | Redacted timestamped serial log | Pending |
| OEM installation works | Approved procedure and device test record | Pending |
| OpenWrt sysupgrade works | Approved procedure and device test record | Pending |
| Recovery works | Tested, documented recovery record | Pending |

The EN/NB installation articles must remain `draft: true`, `tested: false`, `evidence: documentation` until evidence justifies changing them. A verified download or read-only analysis alone is insufficient.

## Report template

- Test ID / operator / date:
- Hardware and starting firmware:
- Isolation and power checks:
- Firmware sources, SHA-256 and tools:
- ProbeOS observations (if used; specify actual capabilities):
- Serial capture reference:
- Deviations, failures and unresolved risks:
- Gate A / B / C outcome (PASS / FAIL / NOT RUN):
- Separate authorization for any future write test:
- Reviewer and review date:

**Default result: NOT RUN.** Do not populate PASS without attached evidence.
