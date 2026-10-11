#!/usr/bin/env python3
"""Explicit, bounded download of the two historical ImageBuilder candidates.

Run manually on a workstation with >= 2 GB free space:
  python3 fetch_imagebuilders.py --output-dir /path/to/disposable/directory

Never executes or extracts archives. Refuses existing destination files.
The downloaded SHA-256 values are observations, NOT independently verified
publisher checksums. Do not run this on a router.
"""
import argparse
import hashlib
import json
from pathlib import Path
import urllib.request

BASE = "https://github.com/FriedZombie/OpenWrt_Attitude-Adjustment_backports/releases/download/V0.2.1/"
ASSETS = (
    ("OpenWrt-ImageBuilder-ar71xx_generic-for-linux-x86_64.tar.bz2", 371481060),
    ("OpenWrt-ImageBuilder-opkg618-fw2-ar71xx_generic-for-linux-x86_64.tar.bz2", 371446096),
)
CHUNK = 1024 * 1024


def download(directory: Path, filename: str, expected_size: int):
    target = directory / filename
    digest = hashlib.sha256()
    written = 0
    try:
        with urllib.request.urlopen(
            urllib.request.Request(BASE + filename, headers={"User-Agent": "HackShackLabs-ArchiveResearch/1.0"}),
            timeout=45,
        ) as response, target.open("xb") as output:
            while True:
                chunk = response.read(CHUNK)
                if not chunk:
                    break
                written += len(chunk)
                if written > expected_size:
                    raise ValueError("Asset exceeds GitHub release metadata size")
                digest.update(chunk)
                output.write(chunk)
        if written != expected_size:
            raise ValueError(f"Size mismatch: expected {expected_size}, got {written}")
    except Exception:
        target.unlink(missing_ok=True)
        raise
    return {"filename": filename, "bytes": written, "sha256": digest.hexdigest(),
            "verification": "downloaded bytes only; independent publisher hash unavailable"}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-dir", required=True, type=Path)
    args = parser.parse_args()
    directory = args.output_dir.resolve()
    if not directory.is_dir():
        parser.error("--output-dir must already exist")
    if any((directory / name).exists() for name, _ in ASSETS):
        parser.error("Destination archive already exists; refusing overwrite")
    results = []
    for name, size in ASSETS:
        results.append(download(directory, name, size))
    print(json.dumps({"release": "V0.2.1", "assets": results}, indent=2))


if __name__ == "__main__":
    main()
