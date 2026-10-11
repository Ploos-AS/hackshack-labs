# PirateBox: opkg patches and USB destination

Status: static source inspection only. Candidate: FriedZombie V0.2.1 commit `f5a441b9a4950db64086b1ebf7fafaed54aa69f5`. No binary archive downloaded or executed.

## Confirmed in candidate source

- [`060-add-find-command.patch`](https://github.com/FriedZombie/OpenWrt_Attitude-Adjustment_backports/blob/f5a441b9a4950db64086b1ebf7fafaed54aa69f5/package/opkg/patches/060-add-find-command.patch) adds `opkg find` and matches both package name and description.
- [`070-use_gzipped_pkg_list.patch`](https://github.com/FriedZombie/OpenWrt_Attitude-Adjustment_backports/blob/f5a441b9a4950db64086b1ebf7fafaed54aa69f5/package/opkg/patches/070-use_gzipped_pkg_list.patch) changes `opkg update` to retain downloaded gzip package indexes and read them via `gz_open`. This may reduce storage used by package indexes, but no resource measurements have been made.
- [`package/opkg/files/opkg.conf`](https://github.com/FriedZombie/OpenWrt_Attitude-Adjustment_backports/blob/f5a441b9a4950db64086b1ebf7fafaed54aa69f5/package/opkg/files/opkg.conf) specifies `dest root /`, `dest ram /tmp`, `lists_dir ext /var/opkg-lists`, and `option overlay_root /overlay`. The `lists_dir ext` syntax refers to opkg list location, **not** a configured installation destination called `ext`.
- The PirateBox historical `extendRoot` scripts separately add `dest ext /mnt/ext` for installation onto a USB-backed filesystem image (see `STORAGE-AND-BOOTSTRAP.md`).

## What this does NOT establish

- Whether the actual published `opkg618-fw2` binary contains these patches.
- Whether the patched `opkg` reliably installs packages into the historical `/mnt/ext` image.
- Whether the PirateBox image and all kernel modules share a compatible ABI.
- Whether the image builder can still produce working firmware.

## Next verification

1. Acquire candidate archives from the GitHub V0.2.1 release via HTTPS in a sandbox with network access.
2. Hash, list and inspect without running historical binaries or install scripts.
3. Compare embedded opkg versions and package metadata, then verify `TLWR703` profile and kernel package versions.
4. Build offline, inspect firmware metadata and size, then plan hardware tests separately.

Never flash firmware or run historic installer/postinst scripts as part of this source audit.
