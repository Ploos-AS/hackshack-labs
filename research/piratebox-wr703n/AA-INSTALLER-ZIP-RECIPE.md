# PirateBox AA-with-installer: actual ZIP generation rules

**Source inspected:** [PirateBox-Dev/openwrt-image-build, AA-with-installer, Makefile](https://github.com/PirateBox-Dev/openwrt-image-build/blob/AA-with-installer/Makefile), 2026-10-11. **Branch is mutable:** pin its commit SHA before reproducibility claims. Historical code inspected as text only, never executed.

## Confirmed build path

The [openwrt-dev-environment Makefile](https://github.com/PirateBox-Dev/openwrt-dev-environment/blob/master/Makefile) explicitly clones `openwrt-image-build` and checks out **AA-with-installer**. Its `piratebox` target invokes:

```make
cd $(IMAGE_BUILD) && make all INSTALL_TARGET=piratebox
```

In the AA-with-installer Makefile, `INSTALL_TARGET=piratebox` selects the output `target_piratebox/install_piratebox.zip`, and the `install_zip` target runs `prepare_install_zip` before zipping `./install`.

## ZIP generation ingredients seen in Makefile

- `GENERAL_PACKAGES` includes `pbxopkg`, `box-installer`, USB host/storage, VFAT, ext4, block-mount, loop, wireless and related kernel modules. This is the firmware/base-image list, **not** a complete verified installed manifest.
- PirateBox target package list is `extendRoot-piratebox piratebox-mod-imageboard extendRoot-minidlna extendRoot-avahi extendRoot-dbus`; their transitive dependencies are resolved by opkg. Note that the source lists the imageboard module, so earlier minimal-build guidance to omit it is **our proposed optimization**, not an upstream default.
- `IMAGE_FILE=OpenWRT.img.gz`, fetched from `http://downloads.piratebox.de/OpenWRT_ext4_100MB.img.gz`, then populated via mounted ext4 image. Do **not** mount or run this process outside a disposable lab.
- `create_cache` downloads packages with opkg; `cache_package_list` includes package indexes.
- `auto_package` is generated in `install/`; an additional package image is copied there; PirateBox target also copies `kareha_3.1.4.zip`.
- `$(INSTALL_ZIP)` invokes `zip -r9 ... ./install` and creates a SHA-256 sidecar file for the resulting ZIP.

## Major research consequence

The ZIP is **not merely an installer script**. Its build recipe includes a prepopulated compressed OpenWrt ext4 image and cached IPKs. Matching it to a firmware requires both package/kernel compatibility and provenance for the remote `OpenWRT_ext4_100MB.img.gz` input.

## Unresolved

- Branch commit SHA and full recipe at that immutable revision.
- Exact `auto_package` content and whether all source targets are compatible.
- Exact contents, hashes and authenticity of published ZIP and external disk image.
- Exact final firmware package manifest and resulting image size.
- The README mentions `acquire_stable_packages`, but the inspected development Makefile does not define that target: **documentation/code drift**, not a verified runnable procedure.

**Safety:** Never run upstream `make all` on a normal workstation. The recipe uses `sudo`, mounts disk images, runs package installation scripts, downloads over HTTP and performs filesystem writes. Source inspection is not an endorsement of its safety.
