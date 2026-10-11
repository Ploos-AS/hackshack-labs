# WR703N Labs — hardware qualification checklist

This checklist is for **TL-WR703N v1** experiments. Do not treat a completed firmware hash check as permission to flash a device.

## 1. Inventory (no modifications)

- [ ] Photograph underside label showing hardware revision (redact personal identifiers if present).
- [ ] Record current firmware name/version and whether web UI or SSH is accessible.
- [ ] Record power supply rating and observed boot LED behavior.
- [ ] Confirm the test network is isolated from production/internet-facing systems.
- [ ] Record whether a known-good Ethernet connection is available.

## 2. Image provenance and integrity (on Linux workstation)

- [ ] Run `bash scripts/verify-wr703n-firmware.sh` from the repository root.
- [ ] Preserve terminal output showing **both** SHA-256 checks return `OK`.
- [ ] Preserve exact image filenames, sizes and source URLs.
- [ ] Record any HTTP errors or hash mismatches. **Stop if any verification fails.**
- [ ] Confirm the selected image type matches the existing firmware and exact hardware revision.

## 3. Recovery preparation (before flashing)

- [ ] Photograph both sides of the PCB; identify revision and UART test points using authoritative documentation.
- [ ] Verify USB-UART adapter uses **3.3V logic**, not RS-232 voltage levels.
- [ ] Establish serial read-only access at 115200 8N1; capture a normal boot log.
- [ ] Record the actual bootloader version and supported recovery commands.
- [ ] Establish a documented, device-specific recovery route and validate it non-destructively where possible.
- [ ] Never connect the adapter's VCC pin to the board without a verified electrical reason.
- [ ] Do not guess UART pinout, TFTP addresses, recovery filenames or flash offsets.

## 4. Installation test (only after sections 1–3 pass)

- [ ] Record the exact starting firmware and installation route (stock factory vs compatible OpenWrt sysupgrade).
- [ ] Use only a verified image and documented procedure for the observed device revision.
- [ ] Record command/UI steps, output, LED behavior and elapsed time.
- [ ] Confirm boot, wired access, wireless operation and persistent configuration.
- [ ] Capture resulting firmware version and `/proc/mtd`.
- [ ] Document failures and whether recovery was actually performed.

## Evidence / publication gate

Test date (ISO 8601): **PENDING**

Hardware revision: **PENDING**

Tested firmware and SHA-256: **PENDING**

Serial boot log: **PENDING**

Recovery tested: **NO**

Result: **NOT HARDWARE VERIFIED**

Do not publish Part 2 as a proven flashing tutorial until the installation path has been tested and limitations are accurately described.
