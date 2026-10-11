#!/usr/bin/env python3
"""Read selected text metadata from an audited ImageBuilder tar.bz2, without extraction.

Run: python3 read_imagebuilder_metadata.py archive.tar.bz2
Only regular files in an archive passing inspect_imagebuilder_archive.inspect()
are considered. No executable code from the archive is run.
"""
import argparse
import json
from pathlib import Path, PurePosixPath
import tarfile

from inspect_imagebuilder_archive import inspect

MAX_TEXT_BYTES = 128 * 1024
SUFFIXES = ("repositories.conf", "profiles.mk", "profiles.json",
            "include/version.mk", "package/opkg/Makefile")


def read_metadata(path: Path):
    audit = inspect(path)
    if not audit["safe_to_consider_extraction"]:
        raise ValueError("Archive failed structural audit: " + "; ".join(audit["issues"][:5]))
    records = []
    with tarfile.open(path, "r:bz2") as archive:
        for member in archive:
            if not member.isfile():
                continue
            parts = PurePosixPath(member.name).parts
            if not any(member.name.endswith("/" + suffix) for suffix in SUFFIXES):
                continue
            if member.size > MAX_TEXT_BYTES:
                records.append({"path": member.name, "skipped": "exceeds text size limit"})
                continue
            stream = archive.extractfile(member)
            if stream is None:
                continue
            raw = stream.read(MAX_TEXT_BYTES + 1)
            if len(raw) > MAX_TEXT_BYTES:
                records.append({"path": member.name, "skipped": "read size limit"})
                continue
            try:
                value = raw.decode("utf-8")
            except UnicodeDecodeError:
                records.append({"path": member.name, "skipped": "non-UTF8 content"})
                continue
            records.append({"path": member.name, "text": value})
    return {"sha256": audit["sha256"], "metadata": records,
            "note": "Text is untrusted historical source content; do not execute."}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("archive", type=Path)
    args = parser.parse_args()
    try:
        print(json.dumps(read_metadata(args.archive), indent=2))
    except (OSError, ValueError, tarfile.TarError) as exc:
        parser.exit(2, f"Metadata inspection failed: {exc}\n")


if __name__ == "__main__":
    main()
