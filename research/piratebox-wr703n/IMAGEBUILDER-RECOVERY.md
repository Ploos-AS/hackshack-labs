# Recovered candidate ImageBuilder: FriedZombie V0.2.1

Checked 2026-10-11 through GitHub's release API.

Release: https://github.com/FriedZombie/OpenWrt_Attitude-Adjustment_backports/releases/tag/V0.2.1

Two relevant published assets:

| File | Reported bytes | Role |
| --- | ---: | --- |
| `OpenWrt-ImageBuilder-ar71xx_generic-for-linux-x86_64.tar.bz2` | 371481060 | Custom ImageBuilder candidate |
| `OpenWrt-ImageBuilder-opkg618-fw2-ar71xx_generic-for-linux-x86_64.tar.bz2` | 371446096 | Exact filename of commented alternate in PirateBox Makefile |

PirateBox's pinned [Makefile](https://github.com/PirateBox-Dev/openwrt-image-build/blob/fd335adb54d7797023608896d12edb5d0bb6a05c/Makefile) names the second asset in a commented URL. Its active URL is different and malformed (`http://http://...`). Therefore **a candidate was located, not proven to be the actual historical build input**.

## Required next checks

1. Download asset through HTTPS to a disposable directory; do not extract before validating archive listing and total expanded size.
2. Record SHA-256 of downloaded bytes; compare to an independently sourced historical digest if available. GitHub asset existence alone is not a provenance guarantee.
3. Read metadata in archive (`repositories.conf`, `packages/Packages`, `include/version.mk`, `Makefile`, target profile metadata) without executing binaries.
4. Inspect `opkg` executable/package metadata and compare standard versus `opkg618-fw2` candidate.
5. Confirm profile `TLWR703`, kernel-module ABI, image size ceiling and offline package availability.
6. Build in a network-isolated, non-root disposable environment only after dependency validation.

Do not run historic `wget`, `make image`, `opkg` postinst or flash commands yet.
