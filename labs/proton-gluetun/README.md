# Proton VPN / Gluetun isolated lab (M1)

**Status: untested lab fixture.** This directory is a reproducible starting point for the [HackShack Labs test plan](../../src/content/articles/en/proton-vpn-linux-docker-gluetun.md), **not** a verified kill switch or production VPN configuration.

## Requirements

Disposable Linux Docker host with Compose v2, TUN device, Proton VPN WireGuard credentials, `tcpdump` on the host, and console access for fault injection. Do not use on the main Docker host, a remote-only server, or a network with production workloads.

1. `cp .env.example .env`; keep `.env` local and private.
2. Pull selected images: `docker pull qmcgaw/gluetun:v3` and `docker pull nicolaka/netshoot:latest`.
3. Get immutable digests with `docker image inspect --format '{{index .RepoDigests 0}}' qmcgaw/gluetun:v3` (repeat for Netshoot); paste complete `repository@sha256:...` values into `.env`. Review upstream changelogs and record the exact versions.
4. Insert the real WireGuard key into the private local environment file, with restrictive file permissions. Do **not** commit or paste `.env` or expanded Compose output.
5. Run `docker compose config --quiet` (do not run `docker compose config` in public CI logs: it expands secrets), then `docker compose up -d`.
6. Run `./baseline.sh` and record observations locally. It performs **read-only** checks, not a kill switch test.
7. To test failure, capture traffic on the host's bridge and uplink, then manually block only the VPN endpoint UDP traffic using a reversible firewall rule. Record 60 seconds of repeated client traffic and verify **zero** direct egress. No generic firewall mutation script is provided because the wrong rule can cut off administration.
8. Restore the firewall, verify reconnection, and separately test Gluetun restart and recreation of `test-client`. Inspect packet captures for NAT-rewritten source addresses. Sanitize before sharing.
9. Stop the lab with `docker compose down`.

## Limitations

The test client uses `network_mode: service:gluetun`; only that namespace is in scope. This baseline deliberately avoids published ports, VPN port forwarding and a custom healthcheck; those features must be tested separately against the pinned Gluetun release. `depends_on` only controls startup ordering; it does not guarantee VPN readiness or automatically repair namespace attachments after restart.

**Acceptance criteria:** DNS must not escape via unintended host resolvers; IPv6 must be tunneled or blocked; zero client-originated direct uplink packets during a 60-second VPN outage; recovery must not fail open. A successful public IP lookup is insufficient.

The public article contains a more ambitious illustrative Compose snippet with a healthcheck. The fixture here deliberately omits that unverified healthcheck until its command is confirmed against the pinned image.

See `RESULTS-TEMPLATE.md` for evidence fields.
