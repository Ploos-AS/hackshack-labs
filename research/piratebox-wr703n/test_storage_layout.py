#!/usr/bin/env python3
"""Offline, unprivileged model of PirateBox's two-image storage layout.

This does NOT generate ext4 images, run mounts, download files, or flash hardware.
"""
import argparse
import json
import tempfile
from pathlib import Path

def build(root: Path):
    usb = root / "mnt" / "usb"
    ext = usb / "external_fs"
    pb = usb / "PirateBox"
    for folder in (ext, pb, usb / "install", root / "mnt" / "ext", root / "opt" / "piratebox"):
        folder.mkdir(parents=True, exist_ok=True)
    (ext / "OpenWRT.img").write_bytes(b"TEST-PLACEHOLDER-NOT-EXT4\n")
    (pb / "pbIMG_ws.img").write_bytes(b"TEST-PLACEHOLDER-NOT-EXT4\n")
    (ext / "OpenWRT.swap").write_bytes(b"TEST-PLACEHOLDER-NOT-SWAP\n")
    return usb, ext, pb

def validate(root: Path):
    usb = root / "mnt" / "usb"
    required = [
        usb / "external_fs" / "OpenWRT.img",
        usb / "external_fs" / "OpenWRT.swap",
        usb / "PirateBox" / "pbIMG_ws.img",
        root / "mnt" / "ext",
        root / "opt" / "piratebox",
    ]
    return {str(p.relative_to(root)): p.exists() for p in required}

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()
    with tempfile.TemporaryDirectory(prefix="piratebox-layout-") as directory:
        root = Path(directory)
        build(root)
        checks = validate(root)
        assert all(checks.values())
        # Missing USB image must be detected, not silently reconstructed.
        (root / "mnt/usb/PirateBox/pbIMG_ws.img").unlink()
        missing = validate(root)
        assert missing["mnt/usb/PirateBox/pbIMG_ws.img"] is False
        report = {
            "mode": "offline-placeholder-only",
            "initial_checks": checks,
            "missing_image_detected": True,
            "actual_filesystem_created": False,
            "mounts_performed": False,
            "firmware_built": False,
        }
        if args.json:
            print(json.dumps(report, indent=2))
        else:
            print("PASS: expected paths present; missing PirateBox image detected")
            print("No ext4, mounts, network, privileged operations, or firmware build.")
if __name__ == "__main__":
    main()
