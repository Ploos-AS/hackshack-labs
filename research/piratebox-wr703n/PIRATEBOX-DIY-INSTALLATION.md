# Historical PirateBox OpenWrt DIY guide — source reconstruction

Reference requested: https://piratebox.cc/openwrt:diy

**Evidence status:** The original page returned HTTP 502 when accessed on 2026-10-11. This note is reconstructed from contemporaneous third-party copies/translations and another accessible PirateBox wiki page; it is **not** a verbatim audit of the unavailable original.

## Documented 1.0-era installation route

A contemporary Italian translation of PirateBox 1.0 DIY and a 2014 WR703N user report describe the following sequence:

1. Download **two distinct artifacts**: `install_piratebox.zip` and the router-specific **customized OpenWrt** factory image from the historical `stable.openwrt.piratebox.de/auto` repository.
2. Format a USB stick as a single FAT32 partition, extract the ZIP and copy its **`install/` directory** onto the USB stick.
3. Select the image for the exact hardware revision. For TL-WR703N v1, the historical filename was `openwrt-ar71xx-generic-tl-wr703n-v1-squashfs-factory.bin`.
4. The original instructions flashed the custom firmware through the router's firmware UI. After reboot, the USB installer automatically installed additional components, with potentially multiple reboots and long waits.
5. Users then configured access credentials and optional PirateBox services.

**This is historical documentation, not a procedure to execute today.** Original binary availability, authenticity, compatibility, and safe recovery are unverified. Do not flash an unknown file or follow the original instructions blindly.

## Distinguish installation paths

| Route | Firmware | Package delivery | Evidence |
|---|---|---|---|
| PirateBox 1.0-era DIY | Custom router-specific OpenWrt factory image | `install_piratebox.zip` copied to FAT32 USB; automatic install | Contemporary translation and 2014 WR703N user report |
| Older package-based route | Existing compatible OpenWrt | `pbxopkg`, `opkg update`, `opkg install piratebox` | OpenWrt PirateBox wiki |
| PirateBox 1.1 upgrade | Customized OpenWrt firmware via upgrade | ZIP `install/` directory on USB | PirateBox `openwrt:upgrade_from_1.0.0` page |

The 1.1 upgrade page explicitly warns that its ZIP and customized firmware must match. It describes `sysupgrade` and a fallback direct `mtd write`; **neither is approved for our lab without independent image validation**.

## Research implications for TL-WR703N

- **Two missing artifacts, not one:** reconstruct both the customized firmware and the ZIP installer, including a provenance chain and hashes.
- The presence of a `factory.bin` filename alone cannot establish valid hardware headers or safe flash capacity.
- The USB installer likely performs substantial post-boot work; examine its scripts as **untrusted data**, never execute them during audit.
- The older `pbxopkg` route and later `install_piratebox.zip` route should not be merged into one assumed dependency chain.
- Verify that `install/` ZIP contents, expected USB paths, boot hooks, package indexes, and matching firmware version form one internally consistent release.
- The cited user account is anecdotal evidence of a 2014 installation, **not** independent verification of our reconstructed image.

## Sources

- Original requested page (unavailable during review): https://piratebox.cc/openwrt:diy
- Contemporary PirateBox 1.0 translation: https://nilocram.wordpress.com/category/piratebox/
- 2014 WR703N firsthand account: https://forums.whirlpool.net.au/thread/3n8lv5m3?p=50
- PirateBox 1.1 upgrade page: https://piratebox.cc/openwrt:upgrade_from_1.0.0
- OpenWrt PirateBox wiki: https://openwrt.org/docs/guide-user/hardware/piratebox.librarybox.openwrt.routers

## Next

Locate an archived `install_piratebox.zip` **with a defensible provenance trail**, record size and SHA-256, and inspect its ZIP central directory read-only. Match its installation manifest against the corresponding custom firmware and historical repository. Until then, **NO-GO for flashing**.
