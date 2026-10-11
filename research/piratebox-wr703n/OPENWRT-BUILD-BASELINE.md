# Which OpenWrt release did the original PirateBox WR703N build require?

Research status: 2026-10-11. **Source-based inference, not a successfully reproduced build.**

## Direct upstream evidence

Pinned [openwrt-image-build Makefile](https://github.com/PirateBox-Dev/openwrt-image-build/blob/fd335adb54d7797023608896d12edb5d0bb6a05c/Makefile):

- Firmware tag: `PBX_Image_2.0.1`
- Device profile: `TLWR703`
- Output: `openwrt-ar71xx-generic-tl-wr703n-v1-squashfs-factory.bin`
- Expected custom builder directory: `OpenWrt-ImageBuilder-ar71xx_generic-for-linux-x86_64`
- Active builder URL: `http://http://downloads.piratebox.de/OpenWrt-ImageBuilder-ar71xx_generic-for-linux-x86_64.tar.bz2` — malformed double scheme; **do not run**.
- Commented alternate builder: `FriedZombie/OpenWrt_Attitude-Adjustment_backports`, release `V0.2.1`, filename `OpenWrt-ImageBuilder-opkg618-fw2-ar71xx_generic-for-linux-x86_64.tar.bz2`.
- Adds PirateBox's old HTTP package feed to `repositories.conf`.
- Image package list includes `pbxopkg`, USB storage/vfat/ext4/loop modules, `block-mount`, `losetup`, `swap-utils`, wireless packages and other kernel modules.

**Interpretation:** The build points to an **Attitude Adjustment 12.09-derived, customized ImageBuilder**. It does *not* prove the exact upstream source revision, package ABI, or reproducibility. A stock 12.09 ImageBuilder must not be assumed binary-equivalent. Kernel-module versions must match the chosen builder and target firmware.

## Comparison for article

- **Historical PirateBox baseline:** custom AA-derived OpenWrt ImageBuilder, PirateBox Image 2.0.1. Specific OpenWrt revision remains unverified.
- **Last confirmed official device-specific image:** LEDE 17.01.7 (see `OPENWRT-LAST-RELEASE.md`). No PirateBox 1.1 compatibility claim.
- **Modern OpenWrt:** TL-WR703N's 4 MB flash/32 MB RAM cannot support an up-to-date secure official OpenWrt. See [OpenWrt device page](https://openwrt.org/toh/tp-link/tl-wr703n).

## Article text proposal

> PirateBox's historical TL-WR703N firmware was built using a customized OpenWrt ImageBuilder derived from the Attitude Adjustment era, rather than the last official device firmware. Its build files identify the PirateBox Image 2.0.1 target and a WR703N-specific profile, but the exact underlying OpenWrt revision and package compatibility have not yet been independently reproduced. LEDE 17.01.7 is the last official WR703N firmware image we could verify; it should not be treated as a drop-in PirateBox base.

## Remaining blockers

1. Recover the custom builder archive from a trusted archival source and verify its cryptographic digest.
2. Identify exact OpenWrt revision, `opkg` patches, target kernel and package ABI.
3. Recover matching package indexes and `.ipk` packages with independent integrity evidence.
4. Run an isolated, offline build; inspect its manifest and firmware size.
5. Never flash before revision-specific hardware and recovery checks.
