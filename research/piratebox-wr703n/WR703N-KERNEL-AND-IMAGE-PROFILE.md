# TL-WR703N historical kernel and image profile (source audit)

Status: **verified in pinned source code; NOT verified against release binaries or hardware**.

## Source

FriedZombie/OpenWrt_Attitude-Adjustment_backports, source commit
`f5a441b9a4950db64086b1ebf7fafaed54aa69f5` (candidate source behind V0.2.1):

- [ar71xx target Makefile](https://github.com/FriedZombie/OpenWrt_Attitude-Adjustment_backports/blob/f5a441b9a4950db64086b1ebf7fafaed54aa69f5/target/linux/ar71xx/Makefile)
- [ar71xx image Makefile](https://github.com/FriedZombie/OpenWrt_Attitude-Adjustment_backports/blob/f5a441b9a4950db64086b1ebf7fafaed54aa69f5/target/linux/ar71xx/image/Makefile)

## Directly observed

The target Makefile sets:

```make
ARCH:=mips
BOARD:=ar71xx
SUBTARGETS:=generic nand
LINUX_VERSION:=3.3.8
```

The image Makefile declares:

```make
$(eval $(call SingleProfile,TPLINK-LZMA,$(fs_64kraw),TLWR703,tl-wr703n-v1,TL-WR703N,ttyATH0,115200,0x07030101,1,4Mlzma))
```

Interpretation of source fields: TLWR703 profile; TP-Link LZMA image template; board name `tl-wr703n-v1`; console `ttyATH0` at 115200; TP-Link hardware identifier `0x07030101`; 4 MiB LZMA image layout. This is a **source-level profile**, not a verified firmware header or a recommended flashing command.

## What remains unproven

1. Whether either V0.2.1 binary ImageBuilder archive was produced from precisely this source/configuration.
2. The actual compiled kernel release string and ABI in either archive.
3. Whether the `opkg618-fw2` variant includes all expected patches.
4. Whether a PirateBox image built from these inputs boots on a physical TL-WR703N v1.
5. Whether the image fits flash and RAM with the complete historical PirateBox package selection.

## Next verification

Inspect the two release tarballs without extraction; compare metadata and inspect kernel/package metadata where present. Preserve archive SHA-256 and note that a locally computed checksum is **not** independent publisher authentication. Never flash based on source-only evidence.
