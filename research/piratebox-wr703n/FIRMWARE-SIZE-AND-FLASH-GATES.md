# TL-WR703N firmware size and package-placement gate

Status: **design gate only — no historical binaries inspected, no firmware built, no router flashed.**

## Verified historical source parameters

Pinned FriedZombie source commit `f5a441b9a4950db64086b1ebf7fafaed54aa69f5` declares the `TLWR703` image profile using `TPLINK-LZMA`, `fs_64kraw`, board `tl-wr703n-v1`, hardware ID `0x07030101`, and `4Mlzma`. Its `ar71xx` target Makefile declares `LINUX_VERSION:=3.3.8`. These are **source-level facts**, not measured binary properties.

The PirateBox 1.1.0-4 feed lists Python, Lighttpd, PHP5 and other dependencies; it is **not proven** to work unchanged with this older builder. The historical external USB `/mnt/ext` opkg destination is not a substitute for firmware flash capacity.

## Distinguish three budgets

1. **Physical flash:** 4 MiB = 4,194,304 bytes of total SPI flash; this includes bootloader, configuration/calibration and other partitions. **Never** treat the full 4 MiB as a safe firmware payload allowance.
2. **Firmware image:** determine the actual writable firmware partition and accepted image/header layout for the *specific hardware revision* from a trusted device dump or matching platform definition. The image must fit that verified limit, with appropriate margins. An image merely named `factory.bin` is not proof of validity.
3. **Runtime memory and external storage:** 32 MiB RAM (device-class assumption requiring board verification), tmpfs/overlay use, Python/Lighttpd/PHP5 process footprint, and USB availability impose separate limits. A package placed on USB can still require RAM, early-boot modules, and a working USB stack.

## Non-negotiable gates before any flash

- Confirm the exact router hardware revision, flash chip and existing partition map using read-only observations.
- Inspect the actual firmware header, image length, expected hardware ID, and checksums.
- Verify kernel modules and package feed match the compiled kernel ABI; **source `3.3.8` alone is insufficient**.
- Identify packages that must be present in flash before USB can be mounted: USB host, storage, filesystem and mount support, plus network recovery path.
- Measure the minimum rootfs/kernel image size and runtime RAM use in a disposable emulator or controlled lab before hardware trials.
- Keep original calibration/ART data and bootloader untouched; define a tested recovery procedure separately.

## Decision

**NO-GO for flashing** until archive hashes, binary headers, partition capacity, package compatibility, and recovery strategy are established. Prefer a reproducible offline artifact audit before attempting to reconstruct the 2014/2016 dependency chain.

References:
- [Pinned historical ar71xx Makefile](https://github.com/FriedZombie/OpenWrt_Attitude-Adjustment_backports/blob/f5a441b9a4950db64086b1ebf7fafaed54aa69f5/target/linux/ar71xx/Makefile)
- [Pinned historical image Makefile](https://github.com/FriedZombie/OpenWrt_Attitude-Adjustment_backports/blob/f5a441b9a4950db64086b1ebf7fafaed54aa69f5/target/linux/ar71xx/image/Makefile)
- [PirateBox feed dependency audit](DEPENDENCIES.md)
- [Historical image profile](WR703N-KERNEL-AND-IMAGE-PROFILE.md)
