#!/usr/bin/env python3
"""Run the offline, read-only ImageBuilder research pipeline on two local archives.

No network, extraction, execution, mounting or flashing. Reports go to an
existing, empty output directory. All inputs must pass structural inspection.
"""
import argparse
import json
from pathlib import Path

from inspect_imagebuilder_archive import inspect
from read_imagebuilder_metadata import read_metadata
from compare_imagebuilder_reports import compare

NAMES = (
    "OpenWrt-ImageBuilder-ar71xx_generic-for-linux-x86_64.tar.bz2",
    "OpenWrt-ImageBuilder-opkg618-fw2-ar71xx_generic-for-linux-x86_64.tar.bz2",
)


def run(archive_dir: Path, output_dir: Path):
    if not archive_dir.is_dir() or not output_dir.is_dir():
        raise ValueError("Both directories must exist")
    if archive_dir.resolve() == output_dir.resolve():
        raise ValueError("Output directory must differ from archive directory")
    outputs = ("standard-inspection.json", "opkg618-inspection.json",
               "standard-metadata.json", "opkg618-metadata.json", "comparison.json")
    if any((output_dir / name).exists() for name in outputs):
        raise ValueError("Report already exists; refusing overwrite")
    paths = [archive_dir / name for name in NAMES]
    if not all(path.is_file() for path in paths):
        raise ValueError("Both named release archives must be present")
    audits = [inspect(path) for path in paths]
    if any(audit["issues"] or not audit["safe_to_consider_extraction"] for audit in audits):
        raise ValueError("One or more archives failed header checks; no reports written")
    metadata = [read_metadata(path) for path in paths]
    reports = (audits[0], audits[1], metadata[0], metadata[1],
               compare(audits[0], audits[1]))
    for name, report in zip(outputs, reports):
        (output_dir / name).write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    return outputs


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--archive-dir", required=True, type=Path)
    parser.add_argument("--output-dir", required=True, type=Path)
    args = parser.parse_args()
    try:
        print("\n".join(run(args.archive_dir, args.output_dir)))
    except (OSError, ValueError) as exc:
        parser.exit(2, f"Research pipeline failed: {exc}\n")


if __name__ == "__main__":
    main()
