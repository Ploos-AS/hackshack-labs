#!/usr/bin/env python3
"""Read-only inspection of pinned historical PirateBox source files.

Supply a directory containing an independently cloned checkout of the pinned
openwrt-piratebox-feed commit. Never executes source scripts or downloads.
"""
import argparse
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
manifest = json.loads((ROOT / "sources.json").read_text())
feed = next(s for s in manifest["sources"] if s["name"] == "openwrt-piratebox-feed")
checks = {
    "utils/extendRoot/files/usr/share/ext/ext.common": [
        "ext_init()", "ext_usbwait()", "ext_mkswap()", "ext_mkextimg()",
        "ext_enhance_opkg()", "dd if=/dev/zero", "wget",
    ],
    "net/piratebox/files/usr/share/piratebox/piratebox.common": [
        "pb_mkpbimg", "pb_netconfig()", "pb_start()", "tar xzO", "mount -o loop",
    ],
    "utils/extendRoot/files/etc/ext.config": [
        'ext_usbdevice="/dev/sda1"', 'ext_img=', 'ext_swapimg=',
    ],
    "net/piratebox/files/etc/piratebox.config": [
        'pb_pbimg=', 'pb_pb_srcImg_url=',
    ],
}
parser = argparse.ArgumentParser()
parser.add_argument("checkout", type=Path, help="local upstream feed checkout")
args = parser.parse_args()
checkout = args.checkout.resolve()
try:
    head = subprocess.run(
        ["git", "-C", str(checkout), "rev-parse", "HEAD"],
        capture_output=True, text=True, check=True,
    ).stdout.strip()
except (OSError, subprocess.CalledProcessError) as exc:
    raise SystemExit(f"Refusing: not a readable Git checkout: {exc}")
expected = feed["commit"]
if head != expected:
    raise SystemExit(f"Refusing: checkout HEAD {head} != pinned {expected}")
print("Verified pinned checkout HEAD:", head)
failures = 0
for relative, needles in checks.items():
    target = checkout / relative
    if not target.is_file():
        print("MISSING FILE:", relative)
        failures += 1
        continue
    text = target.read_text(errors="replace")
    for needle in needles:
        found = needle in text
        print(("PASS" if found else "MISSING"), relative, repr(needle))
        failures += not found
if failures:
    raise SystemExit(f"{failures} static checks failed")
print("Static indicators present; this does NOT prove compatibility or safety.")
