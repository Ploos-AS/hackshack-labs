---
title: "Proton VPN on Linux and Docker: A Test Plan for Gluetun"
description: "A documented setup and failure-test plan for Proton VPN with Linux, WireGuard and Docker/Gluetun, without claiming unperformed tests."
category: guides
lang: en
date: 2026-10-14
updated: 2026-10-15
tags: [proton, vpn, linux, docker, gluetun, wireguard, privacy]
series: "Privacy & Digital Independence"
translationKey: proton-vpn-linux-docker-gluetun
draft: false
tested: false
evidence: documentation
changelog:
  - date: 2026-10-15
    type: editorial
    note: "Expanded the proposed Gluetun failure-test procedure with pass/fail criteria, restart caveats and security warnings; no live VPN tests performed."
  - date: 2026-10-15
    type: sources
    note: "Added documentation references for Gluetun DNS, firewall, Proton port forwarding and Docker Compose startup semantics."
---

> **Advertisement — affiliate link:** This article contains a clearly marked Proton VPN affiliate link. Ploos AS may earn commission from qualifying purchases at no additional cost to you. That does not determine the outcome of any test.

> **Editorial status (15 October 2026):** Documentation-based setup and test plan, **not hardware-verified**. We have not run the complete tests described below. Commands are examples to adapt and inspect before use; versions, options and supported platforms may change.

## Three setups, three different security boundaries

An official VPN desktop application can protect traffic routed through the host. A manual WireGuard tunnel gives more control but places firewall and DNS leak prevention on the administrator. Gluetun is a VPN gateway container: applications sharing its network namespace use its networking and firewall rules. It does **not** automatically protect every process on the Docker host.

Proton's [Linux guide](https://protonvpn.com/support/linux-vpn-setup) documents the official GUI and CLI, plus manual WireGuard and OpenVPN. The [Gluetun provider guide](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md) documents its Proton integration. These are separate products and support boundaries.

## What is supported?

Proton states that its Linux GUI/CLI are officially supported on recent stable Debian, Ubuntu and Fedora versions using GNOME; other setups may work with limited support. The official Linux CLI is **not a general headless-server solution**. For servers, use a carefully designed WireGuard configuration or a container VPN gateway where appropriate. Always check the [current Linux support guide](https://protonvpn.com/support/linux-vpn-setup), not screenshots from an older release.

### A manual WireGuard route

Proton documents downloading a WireGuard configuration from the account portal and using NetworkManager or `wg-quick` on Linux. Unlike the official application, a manual tunnel requires independent controls for routing, IPv6 and DNS behavior. It is **not sufficient** to bring up an interface and assume a kill switch. See [manual WireGuard setup](https://protonvpn.com/support/wireguard-linux).

## Gluetun architecture

The digest-pinned Compose example and commands below are a proposed lab setup, not a verified production deployment.

**Do not paste a real WireGuard private key into Git.** Supply it through a protected local environment or secrets mechanism, keep the corresponding configuration out of screenshots, and consider key rotation after accidental disclosure. The lab procedure below uses pinned image digests.

The sidecar pattern is the critical point: `network_mode: "service:gluetun"` means the test client shares Gluetun's network namespace. Published ports for such applications generally belong on the Gluetun service. Docker socket access and `privileged: true` are unnecessary for this example.

For Proton specifically, the Gluetun provider guide currently requires `VPN_SERVICE_PROVIDER=protonvpn`, `VPN_TYPE=wireguard` and a valid Proton-generated `WIREGUARD_PRIVATE_KEY`. Some other providers also require `WIREGUARD_ADDRESSES`; **do not blindly copy another provider's settings**. Never copy keys from documentation samples.

For provider-specific configuration and current options, use the [Gluetun Proton page](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md) and [WireGuard options](https://github.com/qdm12/gluetun-wiki/blob/main/setup/options/wireguard.md).

## Executable lab procedure (proposed, not yet run)

Use a disposable Ubuntu Docker host with no production workloads. The commands below are **test instructions**, not results. Run `docker compose version` and `docker version`, record the output, and confirm the selected image digests before testing.

To pin the two images, pull the chosen versions, then inspect the registry digests:

```sh
docker pull qmcgaw/gluetun:v3
docker pull nicolaka/netshoot:latest
docker image inspect --format '{{index .RepoDigests 0}}' qmcgaw/gluetun:v3
docker image inspect --format '{{index .RepoDigests 0}}' nicolaka/netshoot:latest
```

Copy the resulting **full repository@sha256 digests** into the two image variables in a protected local `.env` file; do not commit it. A tag is only used during the initial pull. Recheck the digest after intentional upgrades. The lab requires `GLUETUN_IMAGE`, `NETSHOOT_IMAGE` and `WIREGUARD_PRIVATE_KEY` to be set.

```yaml
services:
  gluetun:
    image: ${GLUETUN_IMAGE:?Set pinned Gluetun repository digest}
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun:/dev/net/tun
    environment:
      VPN_SERVICE_PROVIDER: protonvpn
      VPN_TYPE: wireguard
      WIREGUARD_PRIVATE_KEY: ${WIREGUARD_PRIVATE_KEY:?Set privately}
      SERVER_COUNTRIES: Netherlands
    healthcheck:
      test: ["CMD", "/gluetun-entrypoint", "healthcheck"]
      interval: 15s
      timeout: 5s
      retries: 3
    restart: unless-stopped

  test-client:
    image: ${NETSHOOT_IMAGE:?Set pinned Netshoot repository digest}
    network_mode: "service:gluetun"
    depends_on:
      gluetun:
        condition: service_healthy
        restart: true
    command: ["sleep", "infinity"]
```

**Security note:** `docker compose config` expands environment variables and can print the WireGuard key. Use `docker compose config --quiet` for validation; do not publish expanded configuration or CI logs containing secrets.

**Healthcheck caution:** The Gluetun healthcheck command and Docker image contents must be verified against the pinned release before use; if unsupported, replace the healthcheck with the documented probe for that version. A healthy status is a startup gate, **not** a security test. Compose implementations vary in their handling of dependent-service restarts; recreate the test client explicitly after restarting Gluetun.

```sh
docker compose config --quiet
docker compose up -d
docker compose ps
docker compose exec test-client sh -c 'ip -4 route; ip -6 addr; ip -6 route; cat /etc/resolv.conf'
docker compose exec test-client dig example.org
docker compose exec test-client curl -4 --max-time 10 https://ifconfig.me/ip
docker compose exec test-client curl -6 --max-time 10 https://ifconfig.me/ip
docker network inspect "$(docker compose ps -q gluetun | xargs docker inspect --format '{{range $n, $v := .NetworkSettings.Networks}}{{$n}}{{end}}' | head -n1)" --format '{{json .EnableIPv6}}'
```

The last command is only a network-inspection example; record the actual Compose network name first and prefer `docker network inspect <network-name>` if the lookup differs on your host. A failed IPv6 request is not proof of correct filtering without a packet capture.

| Test | Action | Pass criterion |
| --- | --- | --- |
| Baseline | Record routes, resolver, `dig`, IPv4/IPv6 egress and Gluetun endpoint | Observations recorded; no security conclusion yet |
| DNS | Run `dig example.org` inside Netshoot and capture packets on the host | No unintended plaintext DNS packets leaving the host uplink; inspect Gluetun's upstream resolver separately |
| IPv6 | Record `ip -6 addr`, `ip -6 route` and Docker network `EnableIPv6`; attempt `curl -6` | Either verified tunneled IPv6 or no IPv6 egress outside the tunnel |
| Tunnel loss | On the **isolated lab host**, temporarily block only the known VPN endpoint UDP destination using a reversible host firewall rule, while keeping Docker networking up; generate repeated client requests for 60 seconds | **Zero** client payload packets exit the host uplink outside the tunnel during the 60-second interval |
| Recovery | Remove only the temporary rule; repeat `dig` and egress checks | Connectivity returns through the tunnel; no direct-egress packets during transition |
| Restart | `docker compose restart gluetun`, then `docker compose up -d --force-recreate test-client`; repeat checks after a separate Docker-daemon restart | No fail-open packets; dependent client reconnects or is deliberately recreated |
| Application | Repeat loss and recovery with a disposable application workload | No direct-egress traffic, regardless of application status |

**Packet-capture method:** Identify the host uplink and Docker bridge using `ip route` and `docker network inspect`. In a second terminal on the **host**, capture both interfaces (for example `sudo tcpdump -ni <uplink> -w uplink.pcap` and `sudo tcpdump -ni <bridge> -w bridge.pcap`). Compare client traffic on the bridge with encrypted traffic to the VPN endpoint on the uplink. Docker NAT can rewrite the source address, so filtering the uplink only by the container IP can miss leaks. Treat *any* unencrypted client-originated egress as a failure. Stop capture and remove the temporary firewall rule immediately after the test. Never upload unsanitized captures.

The endpoint-blocking command is intentionally not copy-pasteable: firewall backends and endpoint addresses vary, and a generic rule can interrupt remote administration. Perform the test with console access and a documented rollback. The 60-second interval is a **proposed acceptance threshold**, not a result we have measured.

## A failure test is more important than a successful IP check

Before running tests, verify the exact Compose file with `docker compose config` and pin tested image versions/digests. Check whether IPv6 is enabled on the host and Docker networks; record the result rather than assuming that it is off. Run the test workload only in an isolated, non-production network.

A one-time public-IP lookup only shows where a request exited. It cannot prove that DNS, IPv6 or reconnect failures are safe.

Document the following checks, all from **inside the test-client container**:

1. **Baseline:** record public IPv4, IPv6 availability, DNS resolvers, VPN endpoint and timestamps, without storing credentials.
2. **DNS:** test hostnames using the container resolver; check that queries do not escape through unintended host resolvers.
3. **IPv6:** either confirm the chosen topology tunnels IPv6 correctly or explicitly blocks unsupported IPv6 egress.
4. **Kill switch:** interrupt the VPN tunnel while Docker networking stays available; verify the application cannot send directly through the ordinary uplink.
5. **Recovery:** restore connectivity; confirm health status, DNS recovery and reconnect behavior.
6. **Restart:** restart Gluetun, the application container and the Docker daemon separately; look for fail-open windows.
7. **Operational case:** if using a downloader, pause and inspect traffic during failures; avoid assuming application-level status indicates network isolation.

For a real test, collect sanitized configuration, software versions, logs, packet captures or firewall counters and repeated run outcomes. Do not publish credentials, public management endpoints or identifiable browsing data.

## A reproducible test record

For each run, record the test identifier, image digests, Docker/Ubuntu versions, firewall mode, tunnel endpoint (without credentials), IPv4/IPv6 observations, expected outcome, observed outcome and whether a packet capture confirms it. A connection status is not sufficient to call a kill switch verified. Repeat every failure test after updating Gluetun or changing the Docker networking configuration.

## A note on health-check failures

undefined that **a specific UDP operation was rejected**. It does not, by itself, prove that a DNS leak occurred, that Proton failed or that the firewall is broken. Possible causes include firewall policy, routing transitions, container capabilities and probe configuration. Correlate the error with routes, firewall rules, tunnel state and packet captures before changing security controls. Disabling the firewall just to make the health check green defeats the point of this setup.

## DNS, LAN access and Proton port forwarding: documented configuration

**DNS:** The current Gluetun DNS options document `DNS_UPSTREAM_RESOLVER_TYPE=dot` (DNS over TLS) and `DNS_UPSTREAM_RESOLVERS=cloudflare` as defaults. The application container's `/etc/resolv.conf` shows its *local* resolver; it does not establish how Gluetun sends queries upstream. Check both `dig` inside Netshoot and packet captures on the host uplink. A plain DNS request within the shared namespace is not automatically an external DNS leak. [Gluetun DNS options](https://github.com/qdm12/gluetun-wiki/blob/main/setup/options/dns.md).

**LAN web interfaces:** A service sharing Gluetun's namespace does not publish its own Docker ports. For a local-only web interface on port 8080, put `ports: ["127.0.0.1:8080:8080"]` on **gluetun**, not on the dependent service; that binding is reachable from the Docker host only. To access it from another LAN machine, use a deliberately configured LAN-facing binding or a trusted reverse proxy, firewall-restrict the allowed source addresses and enable authentication. Gluetun documents `FIREWALL_INPUT_PORTS=8080` for inbound traffic on the default interface when needed; `FIREWALL_OUTBOUND_SUBNETS` permits explicitly selected LAN destinations **from** the VPN namespace, not general inbound access. Avoid overlapping that subnet with the WireGuard tunnel address range. These are optional configuration examples, **not** additions to the isolated test Compose file. [Firewall options](https://github.com/qdm12/gluetun-wiki/blob/main/setup/options/firewall.md).

**Control server:** Gluetun has an HTTP control server used for status and operations. Do not expose its port to the internet or publish it merely to check VPN status. Review authentication and allowed routes for the pinned Gluetun release before enabling remote access.

**Proton VPN port-forwarding checklist (optional, not tested here):**

1. Confirm your Proton plan and chosen server support port forwarding. Use Gluetun's `PORT_FORWARD_ONLY=on` server filter when appropriate.
2. When generating the **WireGuard** configuration in Proton, enable **NAT-PMP (Port Forwarding)**.
3. Set `VPN_PORT_FORWARDING=on` in Gluetun. This is VPN-provider-side forwarding, **not** the same as Docker's `ports:` mapping.
4. Observe the dynamically assigned port in Gluetun's logs or configured status file, and configure the application to listen on that port. Re-check after reconnects; an application advertising its own listen port may require an explicit update.
5. Test reachability from outside the LAN/VPN and record pass/fail. Do not expose administrative web interfaces through VPN port forwarding.

See the [Proton provider instructions](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md) and [port-forwarding options](https://github.com/qdm12/gluetun-wiki/blob/main/setup/options/port-forwarding.md). The same failure-test method can be applied to other VPN providers; provider-specific credentials and port-forwarding behavior differ.

**Compose restart semantics:** Docker Compose documents `depends_on: { gluetun: { condition: service_healthy, restart: true } }` for restarting dependents after an *explicit Compose operation*. It does not promise to repair every network namespace reference after a daemon crash or container replacement. Verify behavior on the installed Compose version, and explicitly recreate the test client when necessary. [Docker Compose startup order](https://docs.docker.com/compose/how-tos/startup-order).

## Port forwarding is a separate feature

Gluetun and Proton can require additional configuration for port forwarding, and port assignment may change after reconnects. Do not equate a successful VPN connection with functioning inbound connections. Refer to the provider and Gluetun documentation for the current limitations, and test that application settings update when ports change.

undefined

For ordinary Linux desktop use, Proton's official supported client is a reasonable starting point. For dedicated Docker workloads, a deliberately scoped Gluetun gateway is often easier to reason about than routing an entire host through a VPN—**provided the failure tests pass**. Manual WireGuard offers flexibility at the price of administering leak prevention yourself.

<a href="https://go.getproton.me/SH33j" rel="sponsored noopener" referrerpolicy="strict-origin-when-cross-origin">Explore Proton VPN (affiliate link)</a> is a commercial link and not a test result.

## Sources and next experiment

Primary references: [Proton VPN Linux](https://protonvpn.com/support/linux-vpn-setup), [manual WireGuard](https://protonvpn.com/support/wireguard-linux), [WireGuard configuration downloads](https://protonvpn.com/support/wireguard-configurations), [Gluetun Proton provider](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md), [Gluetun WireGuard options](https://github.com/qdm12/gluetun-wiki/blob/main/setup/options/wireguard.md).

**Next:** Run this matrix on an Ubuntu Docker host, report versions, failure results and limitations, and only then publish performance or security conclusions.
