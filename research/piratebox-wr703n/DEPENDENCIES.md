# PirateBox dependency audit — TL-WR703N

Inspected 2026-10-11. This is source inspection, not a working firmware build.

## Two distinct historical paths

**Historical image builder:** [openwrt-image-build Makefile at fd335adb](https://github.com/PirateBox-Dev/openwrt-image-build/blob/fd335adb54d7797023608896d12edb5d0bb6a05c/Makefile) targets `TLWR703`, outputs a WR703N v1 factory image, installs `pbxopkg`, and uses a custom ar71xx ImageBuilder archive. The Makefile does **not** establish that the image includes a working PirateBox service.

**Later PirateBox feed:** [net/piratebox/Makefile at 3a9d8c3](https://github.com/PirateBox-Dev/openwrt-piratebox-feed/blob/3a9d8c3cd66d50555fb32135b96f6960e8c9262e/net/piratebox/Makefile) declares PirateBox **1.1.0-4** with its own package dependencies and installation scripts. Do not assume this 2016 feed works with the earlier image-builder configuration unchanged.

## Direct dependencies declared by PirateBox 1.1.0-4

`python`, `lighttpd`, `lighttpd-mod-cgi`, `lighttpd-mod-redirect`, `lighttpd-mod-alias`, `lighttpd-mod-setenv`, `lighttpd-mod-fastcgi`, `php5-cgi`, `zoneinfo-core`, `zoneinfo-simple`, `php5-mod-json`, `php5-mod-sqlite3`, `php5-mod-pdo-sqlite`, `php5-mod-sqlite`, `php5-mod-pdo`, `php5-mod-gd`, `radvd`, `ip`.

The upstream declaration repeats `php5-mod-json`; it is deduplicated above. The optional `piratebox-mod-imageboard` adds Perl-related dependencies, `unzip` and Kareha resources. **Do not include the optional module in the minimal build.**

## Installation side effects and risks

The PirateBox package `postinst` script stops/disables `uhttpd`, `dnsmasq`, `watchdog` and some LuCI services if present, then calls `/etc/init.d/piratebox setup`, `init`, `enable`, `start`, and `stop_keep`. This is **not** a passive package install. Never run its post-installation script on a production router or build host. Audit `files/etc/init.d/piratebox` and `files/etc/piratebox.config` before executing.

## Evidence on historical OpenWrt generation

A [2013 OpenWrt forum explanation](https://forum.archive.openwrt.org/viewtopic.php?id=44803) explicitly describes PirateBox images built against **Attitude Adjustment stable** and explains kernel-module mismatch problems when mixing OpenWrt snapshots. This supports investigating **12.09 Attitude Adjustment first** for the historical image-building track; it does **not** prove the later 1.1.0-4 feed supports that release.

The [OpenWrt PirateBox wiki](https://openwrt.org/docs/guide-user/hardware/piratebox.librarybox.openwrt.routers) describes the legacy `pbxopkg_0.0.4_all.ipk` bootstrap and `opkg install piratebox`, but does not verify current archive availability or authenticity.

## Next checks

1. Inspect `openwrt-temp-repository` for `pbxopkg` source/package metadata and recorded dependencies.
2. Inspect pinned `net/piratebox/files/etc/init.d/piratebox` and `piratebox.config` for downloaded payloads and storage assumptions.
3. Determine which dependencies are intended for router flash versus external USB storage. WR703N has tight onboard capacity.
4. Identify a complete historical package index with matching OpenWrt release, architecture, kernel ABI and hashes.
5. Perform only an isolated, non-privileged dependency-resolution experiment before attempting any firmware build or hardware flash.

**Status:** dependency list inspected; compatible package set, archive integrity and firmware operation **not verified**.
