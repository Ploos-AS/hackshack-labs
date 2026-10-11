#!/usr/bin/env python3
"""Compare two JSON reports from inspect_imagebuilder_archive.py; never opens archives."""
import argparse
import json
from pathlib import Path


def load(path):
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    for key in ("sha256", "issues", "interesting_files", "members", "declared_uncompressed_bytes"):
        if key not in data:
            raise ValueError(f"{path}: missing {key}")
    if data["issues"] or not data.get("safe_to_consider_extraction"):
        raise ValueError(f"{path}: archive inspection reported unsafe content")
    if not isinstance(data["interesting_files"], list):
        raise ValueError(f"{path}: invalid interesting_files")
    return data


def compare(a, b):
    left = {f["path"]: f["size"] for f in a["interesting_files"]}
    right = {f["path"]: f["size"] for f in b["interesting_files"]}
    return {
        "sha256_equal": a["sha256"] == b["sha256"],
        "member_count": [a["members"], b["members"]],
        "declared_uncompressed_bytes": [a["declared_uncompressed_bytes"], b["declared_uncompressed_bytes"]],
        "metadata_only_in_first": sorted(left.keys() - right.keys()),
        "metadata_only_in_second": sorted(right.keys() - left.keys()),
        "metadata_different_sizes": [
            {"path": p, "first_size": left[p], "second_size": right[p]}
            for p in sorted(left.keys() & right.keys()) if left[p] != right[p]
        ],
        "warning": "Metadata sizes alone do not prove file contents or binary equivalence."
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("first", type=Path)
    parser.add_argument("second", type=Path)
    args = parser.parse_args()
    try:
        print(json.dumps(compare(load(args.first), load(args.second)), indent=2))
    except (OSError, ValueError, KeyError, TypeError) as error:
        parser.exit(2, f"Cannot compare reports: {error}\n")


if __name__ == "__main__":
    main()
