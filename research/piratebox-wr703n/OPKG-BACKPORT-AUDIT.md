# FriedZombie V0.2.1: source-level opkg and version audit

2026-10-11. Inspected the **release tag**, not the moving default branch.

- Annotated tag `V0.2.1` -> tag object `21f7608fd2e139185ccb554526d8200ba3bbd72b` -> commit `f5a441b9a4950db64086b1ebf7fafaed54aa69f5`.
- [Tagged package/opkg/Makefile](https://github.com/FriedZombie/OpenWrt_Attitude-Adjustment_backports/blob/f5a441b9a4950db64086b1ebf7fafaed54aa69f5/package/opkg/Makefile): `PKG_REV=9c97d5ecd795709c8584e972bfdf3aee3a5b846d`, `PKG_RELEASE=3`; the recipe uses `--disable-gpg` for both target and host builds. This is a **source recipe**, not proof of the binary included in either published ImageBuilder.
- [Tagged include/version.mk](https://github.com/FriedZombie/OpenWrt_Attitude-Adjustment_backports/blob/f5a441b9a4950db64086b1ebf7fafaed54aa69f5/include/version.mk): default `VERSION_NUMBER` and `VERSION_CODE` are `12.09-rc2`, default distribution is `OpenWrt_backports`. Build-time `CONFIG_VERSION_*` values may override these defaults.
- [PirateBox firmware Makefile](https://github.com/PirateBox-Dev/openwrt-image-build/blob/fd335adb54d7797023608896d12edb5d0bb6a05c/Makefile) references `OpenWrt-ImageBuilder-opkg618-fw2-ar71xx_generic-for-linux-x86_64.tar.bz2` only as a commented alternative.
- [V0.2.1 release](https://github.com/FriedZombie/OpenWrt_Attitude-Adjustment_backports/releases/tag/V0.2.1) publishes two ImageBuilder archives, but neither has yet been downloaded and inspected.

## What opkg618-fw2 means

**Unknown.** The filename is suggestive but cannot establish a specific opkg patch, version, filesystem behavior or compatibility. Do not present a guessed explanation as fact.

## Verification gates

1. Download each ImageBuilder asset via HTTPS and calculate SHA-256; obtain an independent checksum if possible.
2. Safely inspect tar metadata, reject absolute/parent-traversing paths, links escaping extraction root, and suspicious expanded size.
3. Compare embedded `opkg` packages and package manifests, build version metadata, profile names, kernel ABI, and feed indexes.
4. Reproduce the TLWR703 image offline only with verified, compatible dependencies; never flash on first pass.

## Article consequence

Describe PirateBox's historical base as **Attitude Adjustment-derived**, with source defaults of **12.09-rc2** in this candidate's tagged tree. Do not state that the published PirateBox firmware definitively runs 12.09-rc2 until its actual image metadata is verified. LEDE 17.01.7 remains the last verified official device-specific image, not a demonstrated PirateBox base.
