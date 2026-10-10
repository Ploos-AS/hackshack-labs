# PirateBox on TL-WR703N — reproducibility workspace

This folder supports the HackShack Labs article, but does **not** contain firmware images or redistribute third-party source.

## Repository strategy

- Keep editorial content in `hackshack-labs`.
- Fetch original PirateBox sources as upstream Git repositories, with pinned commit IDs and recorded licenses.
- Use a separate Ploos-AS build repository **only when** patches, toolchains, tests, or generated build scripts justify it. Proposed name: `PirateBox-703N` (not created).
- Prefer a fork preserving upstream history if modifying upstream code; prefer a new repository if the work is an independent reproducible build harness.
- Do not commit copyrighted firmware, binaries with unclear redistribution rights, or unverified images.

## Initial inspection

Run `python3 research/piratebox-wr703n/inspect_sources.py` from the repo root. It reads the source manifest and prints pinned clone commands, without executing downloads or building firmware.

The two upstream Git repositories are now pinned to immutable commit hashes. Build dependencies, ImageBuilder archives, package repository contents and licenses remain unverified.

## Security gates

1. Confirm actual TL-WR703N revision and bootloader.
2. Confirm historical source and package license/provenance.
3. Pin exact commits, ImageBuilder release and checksums.
4. Rebuild in an isolated container or VM, with no privileged hardware access.
5. Validate image layout and recovery on the actual device before publishing flashing steps.
