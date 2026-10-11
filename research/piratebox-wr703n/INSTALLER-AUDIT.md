# Historical PirateBox installer audit

Inspected at pinned feed commit `3a9d8c3cd66d50555fb32135b96f6960e8c9262e`. This is static source review, not execution.

## extendRoot common

[ext.common](https://github.com/PirateBox-Dev/openwrt-piratebox-feed/blob/3a9d8c3cd66d50555fb32135b96f6960e8c9262e/utils/extendRoot/files/usr/share/ext/ext.common)

- `ext_init` waits for USB, writes UCI fstab settings, mounts USB, optionally creates swap and external filesystem image, sets path links and an `opkg` alternate destination, enables and starts `ext`.
- `ext_usbwait` loops indefinitely until `/dev/sda1` appears; this must be replaced by bounded waiting and actionable errors in any reconstructed installer.
- `ext_mkswap` uses `dd if=/dev/zero ... bs=1M count=32` and `mkswap`. This writes a 32 MiB swap file on USB; never run on an unverified target.
- `ext_mkextimg` downloads the configured `OpenWRT_ext4_50MB.img.gz` image if missing and configures a loop mount. The historic HTTP URL has no pinned checksum.
- `ext_enhance_opkg` appends `dest ext /mnt/ext` to `/etc/opkg.conf`.
- Unmount code assumes `/dev/loop0`, which may not be correct on a different runtime.

## PirateBox common

[piratebox.common](https://github.com/PirateBox-Dev/openwrt-piratebox-feed/blob/3a9d8c3cd66d50555fb32135b96f6960e8c9262e/net/piratebox/files/usr/share/piratebox/piratebox.common)

- `pb_mkpbimg` retrieves the configured PirateBox image archive when absent, then uses `tar xzO` to write `pbIMG_ws.img`; no independently verified hash is pinned.
- `pb_mount` mounts that image with `mount -o loop,rw,sync`; unmount code assumes `/dev/loop1`.
- `pb_netconfig` changes UCI network, wireless and firewall configuration, including an open Wi-Fi AP and DNS redirection. Never invoke on a connected production router.
- `pb_start` mounts the PirateBox image and starts additional services; their exact readiness and error handling require isolated tests.
- The historical scripts contain non-POSIX shell constructs despite `#!/bin/sh` wrappers; use the intended OpenWrt shell in compatibility testing.

## Proposed guarded sequence

1. Static audit and source pinning (done).
2. Check hardware revision, USB capacity, expected filesystem and archive integrity (pending).
3. Test source-level invariants with a read-only validator (next).
4. Reproduce image creation in a disposable, non-privileged environment using verified local inputs only.
5. Test boot/service behavior in an isolated network.
6. Flash only after independent recovery plan, image checks and explicit hardware confirmation.

**Never run the upstream init scripts directly on the developer workstation.**
