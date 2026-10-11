#!/usr/bin/env python3
"""Read-only safety/metadata audit of a historical OpenWrt ImageBuilder tarball.

Does not extract, execute, download, mount or flash anything.
Usage: python3 inspect_imagebuilder_archive.py /path/to/archive.tar.bz2
"""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import tarfile

MAX_MEMBER = 512 * 1024 * 1024
MAX_TOTAL = 8 * 1024 * 1024 * 1024
MAX_FILES = 250000
INTERESTING = ("repositories.conf", "Makefile", "profiles.json", "profiles.mk",
               "include/version.mk", "packages/Packages", "packages/Packages.gz")


def inspect(path: Path):
    if not path.is_file():
        raise ValueError("Expected an existing regular file")
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    issues, candidates = [], []
    count = total = 0
    with tarfile.open(path, mode="r:bz2") as archive:
        for member in archive:
            count += 1
            if count > MAX_FILES:
                issues.append("Too many archive members")
                break
            name = member.name
            p = PurePosixPath(name)
            if p.is_absolute() or ".." in p.parts or not name or "\\" in name:
                issues.append(f"Unsafe path: {name[:160]}")
            if not (member.isfile() or member.isdir()):
                issues.append(f"Link or special file: {name[:160]} ({member.type!r})")
            if member.size > MAX_MEMBER:
                issues.append(f"Oversized member: {name[:160]}")
            total += member.size
            if total > MAX_TOTAL:
                issues.append("Expanded size limit exceeded")
                break
            if member.isfile() and any(name.endswith("/" + suffix) for suffix in INTERESTING):
                candidates.append({"path": name, "size": member.size})
    return {"archive": str(path), "sha256": digest.hexdigest(), "members": count,
            "declared_uncompressed_bytes": total, "interesting_files": candidates,
            "issues": issues, "safe_to_consider_extraction": not issues}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("archive", type=Path)
    args = parser.parse_args()
    try:
        result = inspect(args.archive)
    except (OSError, tarfile.TarError, ValueError) as exc:
        parser.exit(2, f"Archive inspection failed: {exc}\n")
    print(json.dumps(result, indent=2))
    if result["issues"]:
        parser.exit(1)


if __name__ == "__main__":
    main()
