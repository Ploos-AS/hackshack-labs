#!/usr/bin/env python3
"""Read-only structural report for archived WR703N v1 images.

Not a flashing tool. Known SHA-256 values are from LEDE 17.01.7 ar71xx/generic.
"""
import argparse
import hashlib
import json
import struct
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

def inspect_tplink_v1_candidate(data: bytes) -> dict:
    """Inspect candidate legacy TP-Link fields; never authorize flashing."""
    if len(data) < 0x200:
        return {"candidate": False, "reason": "shorter than 512-byte header"}
    def be32(offset: int) -> int:
        return struct.unpack_from(">I", data, offset)[0]
    def ascii_field(start: int, length: int) -> str:
        return data[start:start + length].split(b"\\x00", 1)[0].decode("ascii", errors="replace")
    return {
        "candidate": True,
        "header_length_assumption": 512,
        "header_version_be32": be32(0),
        "vendor_string": ascii_field(4, 24),
        "firmware_version_string": ascii_field(28, 36),
        "hardware_id_be32": be32(0x40),
        "hardware_revision_be32": be32(0x44),
        "checksum_region_0x4c_0x5b_hex": data[0x4c:0x5c].hex(),
        "firmware_length_be32": be32(0x7c),
        "kernel_offset_be32": be32(0x80),
        "kernel_length_be32": be32(0x84),
        "rootfs_offset_be32": be32(0x88),
        "rootfs_length_be32": be32(0x8c),
        "warning": "Candidate offsets from legacy TP-Link v1 layout; not independently validated as an installable image.",
    }


def parse_squashfs(data: bytes, offset: int) -> dict:
    """Decode the standard 96-byte SquashFS v4 superblock, read-only."""
    fmt = "<5I6H8Q"
    size = struct.calcsize(fmt)
    if offset + size > len(data):
        return {"offset": offset, "valid": False, "reason": "truncated superblock"}
    fields = struct.unpack_from(fmt, data, offset)
    (magic, inodes, mtime, block_size, fragments, compression, block_log,
     flags, ids, major, minor, root_inode, bytes_used, id_start, xattr_start,
     inode_start, directory_start, fragment_start, lookup_start) = fields
    valid = (magic == 0x73717368 and major == 4 and minor == 0
             and block_size > 0 and block_size & (block_size - 1) == 0
             and bytes_used >= size and offset + bytes_used <= len(data))
    return {
        "offset": offset, "valid": valid, "version": f"{major}.{minor}",
        "inode_count": inodes, "block_size": block_size,
        "compression_id": compression, "fragments": fragments,
        "bytes_used": bytes_used, "end_offset_exclusive": offset + bytes_used,
        "fits_within_file": offset + bytes_used <= len(data),
        "note": "Superblock sanity check only; filesystem content not extracted or validated.",
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
    squashfs = [parse_squashfs(data, offset) for offset in signatures["SquashFS little-endian"]]
    return {
        "filename": path.name,
        "bytes": len(data),
        "sha256": digest,
        "expected_sha256": expected,
        "sha256_status": ("PASS" if digest == expected else "FAIL") if expected else "UNKNOWN_FILENAME",
        "first_32_bytes_hex": data[:32].hex(),
        "signature_offsets_decimal": signatures,
        "squashfs_superblocks": squashfs,
        "tplink_v1_candidate": inspect_tplink_v1_candidate(data),
        "warning": "Signature scanning is heuristic, not image validation or flash-layout proof.",
    }

def compare_images(first: Path, second: Path) -> dict:
    """Compare bytes without assuming an OEM header or flash partition layout."""
    a, b = first.read_bytes(), second.read_bytes()
    prefix = 0
    while prefix < min(len(a), len(b)) and a[prefix] == b[prefix]:
        prefix += 1
    suffix = 0
    limit = min(len(a), len(b)) - prefix
    while suffix < limit and a[len(a) - suffix - 1] == b[len(b) - suffix - 1]:
        suffix += 1
    return {
        "first": first.name, "second": second.name,
        "size_difference_bytes": len(a) - len(b),
        "identical_prefix_bytes": prefix,
        "identical_suffix_bytes": suffix,
        "first_difference_offset": prefix if prefix < min(len(a), len(b)) else None,
        "first_64_bytes_hex": a[:64].hex(),
        "second_64_bytes_hex": b[:64].hex(),
        "warning": "Shared bytes do not prove image headers, padding or flash partition offsets.",
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
    result = {"format": "wr703n-readonly-report-v2", "reports": reports}
    if len(args.files) == 2:
        result["pair_comparison"] = compare_images(args.files[0], args.files[1])
    rendered = json.dumps(result, indent=2) + "\n"
    if args.output:
        args.output.write_text(rendered, encoding="utf-8")
    print(rendered, end="")
    return 0 if all(r["sha256_status"] == "PASS" for r in reports) else 1

if __name__ == "__main__":
    raise SystemExit(main())
