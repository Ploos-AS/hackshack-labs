#!/bin/sh
# Read-only observation script; does NOT verify a kill switch.
set -eu
cd "$(dirname "$0")"
echo "=== Docker / Compose versions ==="
docker version --format '{{.Server.Version}}'
docker compose version
echo "=== Validate Compose without printing expanded secrets ==="
docker compose config --quiet
echo "=== Container status ==="
docker compose ps
echo "=== Client routes and DNS ==="
docker compose exec -T test-client sh -c 'ip -4 route; ip -6 addr; ip -6 route; cat /etc/resolv.conf; dig example.org'
echo "=== IPv4 egress (observation only) ==="
docker compose exec -T test-client curl -4 --max-time 10 https://ifconfig.me/ip || true
echo
echo "=== IPv6 egress (observation only; failure not proof of filtering) ==="
docker compose exec -T test-client curl -6 --max-time 10 https://ifconfig.me/ip || true
echo
