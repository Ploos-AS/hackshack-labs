# PirateBox WR703N: package bootstrap and USB storage audit

Source inspection performed 2026-10-11. **No firmware or physical-device testing.**

## pbxopkg is a repository registration package

At pinned [PirateBox feed commit 3a9d8c3](https://github.com/PirateBox-Dev/openwrt-piratebox-feed/blob/3a9d8c3cd66d50555fb32135b96f6960e8c9262e/utils/pbxopkg/Makefile), `pbxopkg` is version **0.1.1-1**. Its `postinst` appends `src/gz piratebox http://stable.openwrt.piratebox.de/all/packages` to `opkg.conf` (or beta equivalent). It does not install PirateBox itself. An older OpenWrt wiki describes a **0.0.4** package; do not conflate versions.

## extendRoot is not ordinary overlay extroot

At the same pinned commit, [utils/extendRoot/Makefile](https://github.com/PirateBox-Dev/openwrt-piratebox-feed/blob/3a9d8c3cd66d50555fb32135b96f6960e8c9262e/utils/extendRoot/Makefile) declares **extendRoot 0.10.1-3**.

Base dependencies include `kmod-usb2`, `kmod-usb-storage`, `kmod-fs-vfat`, `kmod-fs-ext4`, `kmod-loop`, `block-mount` and `losetup`, plus character-set modules. `extendRoot-piratebox` pulls in Python, Lighttpd, PHP, timezone, Avahi, D-Bus and PirateBox wrappers.

In a [2017 OpenWrt developer mailing-list post](https://lists.openwrt.org/pipermail/openwrt-devel/2017-June/017186.html), upstream maintainer Matthias Strubel explains the design: a filesystem image on a FAT-formatted USB stick is mounted through loopback; `opkg -d ext` installs software into that separate destination, with scripts/symlinks connecting it to the root filesystem. This is distinct from overlay extroot.

**Compatibility warning:** the same upstream post describes `opkg` post-installation changes breaking this technique in later OpenWrt generations. Do not transplant the 2016 packages into 18.06/19.07 without adapting and testing the installer.

## Temporary repository is not a package archive snapshot

[openwrt-temp-repository](https://github.com/PirateBox-Dev/openwrt-temp-repository) currently contains index-generation scripts and `add-openwrt-opkg.conf` sources; its `packages/` directory has only a `.keep` file. Therefore the Git repository is **not** a complete recoverable package archive.

## Firmware / USB division (provisional)

| Component | Likely location | Evidence / caveat |
| --- | --- | --- |
| OpenWrt kernel, boot/network, USB storage drivers, loop/ext4/vfat | Internal flash | Kernel modules must match firmware ABI; inspect actual historical image manifest |
| extendRoot bootstrap scripts and mount configuration | Internal flash | Early mount required before external packages can run; confirm actual files |
| Python, Lighttpd, PHP and application dependencies | USB extended package destination | `extendRoot-piratebox` and wrapper packages; confirm actual installed paths |
| PirateBox website, uploads and shared content | USB | Confirm init script, image file creation and paths |
| Package index and downloaded `.ipk` files | Not recovered | Need archival source and independent integrity evidence |

## Next verification gate

1. Inspect pinned `utils/extendRoot/files/etc/init.d` and `net/piratebox/files/etc/init.d/piratebox` for exact boot sequence and data paths.
2. Recover trustworthy `Packages` index and compatible `.ipk` files; verify signatures/hashes and architecture.
3. Build a read-only dependency map, without executing package postinst scripts.
4. Only then attempt isolated ImageBuilder reproduction.

**Do not run historical HTTP installation instructions or flash unverified images.**
