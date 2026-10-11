# Last official OpenWrt firmware for TP-Link TL-WR703N v1

Verified against OpenWrt's published firmware directories on 2026-10-11.

**Last confirmed device-specific official image: LEDE 17.01.7 (June 2019).**

- Official release directory: https://downloads.openwrt.org/releases/17.01.7/targets/ar71xx/generic/
- Factory image: `lede-17.01.7-ar71xx-generic-tl-wr703n-v1-squashfs-factory.bin`
- Sysupgrade image: `lede-17.01.7-ar71xx-generic-tl-wr703n-v1-squashfs-sysupgrade.bin`
- Factory SHA256: `25ca8f0291a0c968eccab8014f07caf7396aaf426a93971fdc78e9b277caade9`
- Sysupgrade SHA256: `d2da675ed456743c674b2190de859954fb1606be7dbd9e59056ec10fc878e44f`

**Important distinction:** OpenWrt's TL-WR703N hardware page says support ended in 2022 and **19.07.10** was the final official release *for 4/32 devices as a class*. But the WR703N-specific firmware files are absent from the official 18.06.9 and 19.07.10 `ar71xx/generic` directories, and absent from the checked 19.07.10 `ar71xx/tiny` and `ath79/tiny` directories. Thus do **not** call 19.07.10 the last official WR703N image.

Sources:
- https://openwrt.org/toh/hwdata/tp-link/tp-link_tl-wr703n_v1
- https://downloads.openwrt.org/releases/18.06.9/targets/ar71xx/generic/
- https://downloads.openwrt.org/releases/19.07.10/targets/ar71xx/generic/
- https://downloads.openwrt.org/releases/19.07.10/targets/ar71xx/tiny/
- https://downloads.openwrt.org/releases/19.07.10/targets/ath79/tiny/

Security: LEDE 17.01.7 is obsolete and unsupported. It should only be used for isolated historical reconstruction, not as a general-purpose internet-facing router. Neither this finding nor image hashes demonstrate PirateBox compatibility.

Suggested article wording (English):

> The last official device-specific firmware image we could verify for the TP-Link TL-WR703N v1 is LEDE 17.01.7, released in June 2019. Although OpenWrt 19.07.10 was the last official release for many 4 MB flash / 32 MB RAM devices, it did not include a TL-WR703N image in the checked official release directories. This hardware is no longer supported by OpenWrt and should not be used as an internet-facing router.
