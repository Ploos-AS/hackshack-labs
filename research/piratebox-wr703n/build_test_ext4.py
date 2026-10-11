#!/usr/bin/env python3
"""Build and inspect a disposable ext4 test image without mounting it.

Requires local e2fsprogs: mke2fs, dumpe2fs, e2fsck.
No network, root, loop devices, historical archives, or flashing.
"""
import argparse
import re
import shutil
import subprocess
import tempfile
from pathlib import Path

SIZE_MIB = 50
def run(*argv):
    return subprocess.run(argv, check=True, text=True, capture_output=True).stdout

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--keep", type=Path, help="Output filename (must not exist)")
    args = parser.parse_args()
    for tool in ("mke2fs", "dumpe2fs", "e2fsck"):
        if not shutil.which(tool):
            parser.error(f"Missing {tool}; install e2fsprogs")
    if args.keep:
        target = args.keep.resolve()
        if target.exists():
            parser.error("Refusing to overwrite an existing file")
        target.parent.mkdir(parents=True, exist_ok=True)
        # Exclusive creation prevents accidental overwrite.
        with target.open("xb") as fp:
            fp.truncate(SIZE_MIB * 1024 * 1024)
        cleanup = False
    else:
        temp = tempfile.TemporaryDirectory(prefix="pbx-ext4-")
        target = Path(temp.name) / "OpenWRT-test.img"
        with target.open("xb") as fp:
            fp.truncate(SIZE_MIB * 1024 * 1024)
        cleanup = True
    try:
        run("mke2fs", "-q", "-t", "ext4", "-F", "-L", "PBX_TEST_ONLY", str(target))
        header = run("dumpe2fs", "-h", str(target))
        assert "Filesystem magic number:  0xEF53" in header
        block_size = int(re.search(r"^Block size:\s+(\d+)$", header, re.M).group(1))
        blocks = int(re.search(r"^Block count:\s+(\d+)$", header, re.M).group(1))
        assert 0 < blocks * block_size <= SIZE_MIB * 1024 * 1024
        # e2fsck uses status 0 for clean filesystem; -n is strictly read-only.
        run("e2fsck", "-fn", str(target))
        print(f"PASS: disposable ext4 image; {blocks} blocks x {block_size} bytes")
        print("No mount, loop device, privileged operation or historical image used.")
        if args.keep:
            print(f"Saved: {target}")
    finally:
        if cleanup:
            temp.cleanup()

if __name__ == "__main__":
    main()
