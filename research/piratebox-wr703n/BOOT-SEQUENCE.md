# PirateBox 1.1.0: verified init order and storage paths

Source audit 2026-10-11. Source pinned to `3a9d8c3cd66d50555fb32135b96f6960e8c9262e`. No commands were run on a router; no firmware built.

## Boot order

1. OpenWrt boot initializes USB drivers (historical init ordering; exact device boot trace pending).
2. [extendRoot init](https://github.com/PirateBox-Dev/openwrt-piratebox-feed/blob/3a9d8c3cd66d50555fb32135b96f6960e8c9262e/utils/extendRoot/files/etc/init.d/ext) declares `START=40`, `STOP=79`. Its `start()` runs `ext_mount usb`; if `$ext_usbdir` does not exist, it warns and exits with status 9. Otherwise it calls `ext_mount usb swap ext`. Its `stop()` unmounts `swap ext usb`.
3. [PirateBox init](https://github.com/PirateBox-Dev/openwrt-piratebox-feed/blob/3a9d8c3cd66d50555fb32135b96f6960e8c9262e/net/piratebox/files/etc/init.d/piratebox) declares `START=80`, `STOP=20`. Its `start()` checks that `$pb_usbdir` exists, exits 99 if not, otherwise invokes `pb_start`. `stop()` invokes `pb_stop`.

**Important:** init priorities establish intended ordering, but do not by themselves prove a working boot on TL-WR703N or that each dependency is ready.

## Pinned configuration values

From [extendRoot ext.config](https://github.com/PirateBox-Dev/openwrt-piratebox-feed/blob/3a9d8c3cd66d50555fb32135b96f6960e8c9262e/utils/extendRoot/files/etc/ext.config):

- `ext_usbdevice=/dev/sda1`
- `ext_usbmount=/mnt/usb`
- `ext_usbdir=/mnt/usb/external_fs`
- `ext_img=/mnt/usb/external_fs/OpenWRT.img`
- `ext_img_src=/mnt/usb/install/OpenWRT.img.gz`
- `ext_mountpoint=/mnt/ext`
- `ext_swapimg=/mnt/usb/external_fs/OpenWRT.swap`
- `ext_linktarget=/usr/local`
- Historic image URL: `http://downloads.piratebox.de/OpenWRT_ext4_50MB.img.gz` (untrusted, checksum unknown)

From [PirateBox piratebox.config](https://github.com/PirateBox-Dev/openwrt-piratebox-feed/blob/3a9d8c3cd66d50555fb32135b96f6960e8c9262e/net/piratebox/files/etc/piratebox.config):

- `pb_usbdir=/mnt/usb/PirateBox`
- `pb_pb_srcImg=/mnt/usb/install/piratebox_ws_1.1_img.tar.gz`
- `pb_pbimg=/mnt/usb/PirateBox/pbIMG_ws.img`
- `pb_pbmount=/opt/piratebox`
- `pb_ip=192.168.1.1`
- `pb_wireless_ssid=PirateBox - Share Freely`
- Historic web image URL: `http://stable.openwrt.piratebox.de/piratebox_images/piratebox_ws_1.1_img.tar.gz` (untrusted, checksum unknown)

## Recovery and negative cases to test

| Scenario | Expected from inspected init scripts | Remaining uncertainty |
| --- | --- | --- |
| USB absent | extendRoot mount fails | Error handling inside `ext_mount` not yet audited |
| USB present, `external_fs` absent | extendRoot start exits 9 | Whether startup continues and what remains available |
| PirateBox directory absent | PirateBox start exits 99 | Network state and management access |
| USB mounted but image missing | No success can be inferred | Need inspect `ext.common` and `piratebox.common` |
| Clean shutdown | extendRoot attempts unmount swap/ext/usb; PirateBox calls `pb_stop` | Actual stop ordering and mount busy behavior |

## Next

Audit `utils/extendRoot/files/usr/share/ext/ext.common` and `net/piratebox/files/usr/share/piratebox/piratebox.common` to identify actual mount, image creation, download, destructive operations, and service startup. Do not execute historical installers or network downloads until reviewed.
