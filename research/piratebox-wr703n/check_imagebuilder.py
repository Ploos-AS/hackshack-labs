#!/usr/bin/env python3
"""Read-only manifest validator and optional local archive hash checker."""
import argparse
import hashlib
import json
from pathlib import Path

base = Path(__file__).parent
manifest = json.loads((base / "imagebuilders.json").read_text())
parser = argparse.ArgumentParser()
parser.add_argument("--release", choices=[c["release"] for c in manifest["candidates"]], required=True)
parser.add_argument("--file", type=Path, help="Previously downloaded local archive to check; never downloads")
args = parser.parse_args()
entry = next(c for c in manifest["candidates"] if c["release"] == args.release)
print("Archive:", entry["url"])
print("Published checksum:", entry["checksum_type"], entry["checksum"])
print("Warning: a matching checksum does not prove PirateBox compatibility or firmware safety.")
if args.file:
    digest = hashlib.new(entry["checksum_type"])
    with args.file.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    actual = digest.hexdigest()
    print("Local checksum:", actual)
    if actual != entry["checksum"]:
        raise SystemExit("MISMATCH: do not use this archive")
    print("MATCH: integrity against recorded archive listing only")
