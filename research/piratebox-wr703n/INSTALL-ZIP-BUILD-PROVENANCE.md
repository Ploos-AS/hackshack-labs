# Where install_piratebox.zip came from: upstream build provenance

**Source inspected:** PirateBox-Dev/openwrt-dev-environment README at commit
`befa7b1c9f2be3844889c39fefa8825e604deaee`.

https://github.com/PirateBox-Dev/openwrt-dev-environment/blob/befa7b1c9f2be3844889c39fefa8825e604deaee/README.md

## Key discovery

The upstream development environment explicitly documents that the `make piratebox` target builds **both the PirateBox firmware image and `install_piratebox.zip`**, after building OpenWrt, acquiring additional packages, and starting a temporary local HTTP package repository on port 2342.

The generated output directory is described as:

```
openwrt-image-build/target_piratebox/
  <supported firmware images>
  install_piratebox.zip
```

This means `install_piratebox.zip` is **a generated build artifact**, not necessarily a separately versioned source repository. Looking only for an archived downloadable ZIP is insufficient: we can audit its *generation rules* in `openwrt-image-build` and its *inputs* in `openwrt-dev-environment`.

## Documented build chain (historical; DO NOT execute)

1. `make openwrt_env`
2. `make apply_piratebox_feed` or `make apply_piratebox_beta_feed`
3. `make update_all_feeds`
4. `make install_piratebox_feed`
5. `make create_piratebox_script_image`
6. `make build_openwrt`
7. `make acquire_stable_packages` (or beta)
8. `make run_repository_all` (local HTTP repository)
9. `make piratebox` (firmware **and** ZIP)
10. `make stop_repository_all`

The upstream README says its automated build paths may request root privileges and depend on historical repositories. These commands are recorded for research only and are **not** safe to execute unreviewed.

## Next source-audit targets

- Inspect pinned `openwrt-dev-environment/Makefile`: actual repository revisions, package acquisition and `piratebox` target.
- Inspect pinned `openwrt-image-build/Makefile` for `install_piratebox.zip` creation and exact files added to `install/`.
- Reconstruct the build graph and identify which parts require obsolete remote infrastructure.
- Only then attempt a read-only ZIP contents comparison with any independently obtained archive.

## Limits

The README is evidence of an upstream **documented intended build process**, not proof that it successfully runs today or that a particular released ZIP was built with those exact revisions. No original ZIP was downloaded, hashed or inspected.
