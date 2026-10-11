#!/usr/bin/env bash
# Verify archived WR703N v1 LEDE 17.01.7 files. Does not flash hardware.
set -euo pipefail
base='https://downloads.openwrt.org/releases/17.01.7/targets/ar71xx/generic'
dir="${1:-wr703n-firmware}"
mkdir -p "$dir"
cd "$dir"
factory='lede-17.01.7-ar71xx-generic-tl-wr703n-v1-squashfs-factory.bin'
sysupgrade='lede-17.01.7-ar71xx-generic-tl-wr703n-v1-squashfs-sysupgrade.bin'
curl --fail --location --show-error --retry 3 --output "$factory" "$base/$factory"
curl --fail --location --show-error --retry 3 --output "$sysupgrade" "$base/$sysupgrade"
cat > expected.sha256 <<EOF
25ca8f0291a0c968eccab8014f07caf7396aaf426a93971fdc78e9b277caade9  $factory
d2da675ed456743c674b2190de859954fb1606be7dbd9e59056ec10fc878e44f  $sysupgrade
EOF
sha256sum --check expected.sha256
printf '\nFile sizes:\n'
wc -c "$factory" "$sysupgrade"
printf '\nSHA-256 verification complete. This does not establish hardware compatibility or a safe flashing procedure.\n'
