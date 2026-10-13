#!/usr/bin/env python3
"""Read-only structural report for archived WR703N v1 images.

Not a flashing tool. Known SHA-256 values are from LEDE 17.01.7 ar71xx/generic.
"""
import argparse
import hashlib
import json
from pathlib import Path

EXPECTED = {
    "lede-17.01.7-ar71xx-generic-tl-wr703n-v1-squashfs-factory.bin":
        "25ca8f0291a0c968eccab8014f07caf7396aaf426a93971fdc78e9b277caade9",
    "lede-17.01.7-ar71xx-generic-tl-wr703n-v1-squashfs-sysupgrade.bin":
        "d2da675ed456743c674b2190de859954fb1606be7dbd9e59056ec10fc878e44f",
}
MAGICS = {
    "uImage": bytes.fromhex("27051956"),
    "SquashFS little-endian": b"hsqs",
    "SquashFS big-endian": b"sqsh",
}

def analyze(path: Path) -> dict:
    data = path.read_bytes()
    digest = hashlib.sha256(data).hexdigest()
    expected = EXPECTED.get(path.name)
    signatures = {}
    for name, magic in MAGICS.items():
        offsets = []
        start = 0
        while len(offsets) < 32:
            offset = data.find(magic, start)
            if offset < 0:
                break
            offsets.append(offset)
            start = offset + 1
        signatures[name] = offsets
    return {
        "filename": path.name,
        "bytes": len(data),
        "sha256": digest,
        "expected_sha256": expected,
        "sha256_status": ("PASS" if digest == expected else "FAIL") if expected else "UNKNOWN_FILENAME",
        "first_32_bytes_hex": data[:32].hex(),
        "signature_offsets_decimal": signatures,
        "warning": "Signature scanning is heuristic, not image validation or flash-layout proof.",
    }

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("files", nargs="+", type=Path)
    parser.add_argument("--output", type=Path, help="Write JSON report to this path")
    args = parser.parse_args()
    reports = []
    for path in args.files:
        if not path.is_file():
            parser.error(f"not a regular file: {path}")
        reports.append(analyze(path))
    result = {"format": "wr703n-readonly-report-v1", "reports": reports}
    rendered = json.dumps(result, indent=2) + "\n"
    if args.output:
        args.output.write_text(rendered, encoding="utf-8")
    print(rendered, end="")
    return 0 if all(r["sha256_status"] == "PASS" for r in reports) else 1

if __name__ == "__main__":
    raise SystemExit(main())
