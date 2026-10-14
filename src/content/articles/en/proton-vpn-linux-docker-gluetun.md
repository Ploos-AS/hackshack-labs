---
title: "Proton VPN on Linux and Docker: A Test Plan for Gluetun"
description: "A documented setup and failure-test plan for Proton VPN with Linux, WireGuard and Docker/Gluetun, without claiming unperformed tests."
category: guides
lang: en
date: 2026-10-14
tags: [proton, vpn, linux, docker, gluetun, wireguard, privacy]
series: "Privacy & Digital Independence"
translationKey: proton-vpn-linux-docker-gluetun
draft: true
tested: false
---

> **Advertisement — affiliate link:** This article contains a clearly marked Proton VPN affiliate link. Ploos AS may earn commission from qualifying purchases at no additional cost to you. That does not determine the outcome of any test.

> **Editorial status (14 October 2026):** Documentation-based setup and test plan, **not hardware-verified**. We have not run the complete tests described below. Commands are examples to adapt and inspect before use; versions, options and supported platforms may change.

## Three setups, three different security boundaries

An official VPN desktop application can protect traffic routed through the host. A manual WireGuard tunnel gives more control but places firewall and DNS leak prevention on the administrator. Gluetun is a VPN gateway container: applications sharing its network namespace use its networking and firewall rules. It does **not** automatically protect every process on the Docker host.

Proton's [Linux guide](https://protonvpn.com/support/linux-vpn-setup) documents the official GUI and CLI, plus manual WireGuard and OpenVPN. The [Gluetun provider guide](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md) documents its Proton integration. These are separate products and support boundaries.

## What is supported?

Proton states that its Linux GUI/CLI are officially supported on recent stable Debian, Ubuntu and Fedora versions using GNOME; other setups may work with limited support. The official Linux CLI is **not a general headless-server solution**. For servers, use a carefully designed WireGuard configuration or a container VPN gateway where appropriate. Always check the [current Linux support guide](https://protonvpn.com/support/linux-vpn-setup), not screenshots from an older release.

### A manual WireGuard route

Proton documents downloading a WireGuard configuration from the account portal and using NetworkManager or `wg-quick` on Linux. Unlike the official application, a manual tunnel requires independent controls for routing, IPv6 and DNS behavior. It is **not sufficient** to bring up an interface and assume a kill switch. See [manual WireGuard setup](https://protonvpn.com/support/wireguard-linux).

## Gluetun architecture

Example of a *starting point*, not a verified production deployment:

```yaml
services:
  gluetun:
    image: qmcgaw/gluetun:v3
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun:/dev/net/tun
    environment:
      VPN_SERVICE_PROVIDER: protonvpn
      VPN_TYPE: wireguard
      WIREGUARD_PRIVATE_KEY: ${WIREGUARD_PRIVATE_KEY:?Set in protected environment}
      SERVER_COUNTRIES: Netherlands
    restart: unless-stopped

  test-client:
    image: curlimages/curl:latest
    network_mode: "service:gluetun"
    depends_on:
      - gluetun
    command: ["sh", "-c", "sleep 3600"]
```

**Do not paste a real WireGuard private key into Git.** Supply it through a protected local environment or secrets mechanism, keep the corresponding configuration out of screenshots, and consider key rotation after accidental disclosure. A pinned image digest is preferable for reproducible production tests; the tags above are illustrative.

The sidecar pattern is the critical point: `network_mode: "service:gluetun"` means the test client shares Gluetun's network namespace. Published ports for such applications generally belong on the Gluetun service. Docker socket access and `privileged: true` are unnecessary for this example.

For provider-specific configuration and current options, use the [Gluetun Proton page](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md) and [WireGuard options](https://github.com/qdm12/gluetun-wiki/blob/main/setup/options/wireguard.md).

## A failure test is more important than a successful IP check

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

## A note on health-check failures

A log line like `write udp ... 1.1.1.1:53: operation not permitted` is evidence that **a specific UDP operation was rejected**. It does not, by itself, prove that a DNS leak occurred, that Proton failed or that the firewall is broken. Possible causes include firewall policy, routing transitions, container capabilities and probe configuration. Correlate the error with routes, firewall rules, tunnel state and packet captures before changing security controls. Disabling the firewall just to make the health check green defeats the point of this setup.

## Port forwarding is a separate feature

Gluetun and Proton can require additional configuration for port forwarding, and port assignment may change after reconnects. Do not equate a successful VPN connection with functioning inbound connections. Refer to the provider and Gluetun documentation for the current limitations, and test that application settings update when ports change.

## Editorial conclusion

For ordinary Linux desktop use, Proton's official supported client is a reasonable starting point. For dedicated Docker workloads, a deliberately scoped Gluetun gateway is often easier to reason about than routing an entire host through a VPN—**provided the failure tests pass**. Manual WireGuard offers flexibility at the price of administering leak prevention yourself.

<a href="https://go.getproton.me/SH33j" rel="sponsored noopener" referrerpolicy="strict-origin-when-cross-origin">Explore Proton VPN (affiliate link)</a> is a commercial link and not a test result.

## Sources and next experiment

Primary references: [Proton VPN Linux](https://protonvpn.com/support/linux-vpn-setup), [manual WireGuard](https://protonvpn.com/support/wireguard-linux), [WireGuard configuration downloads](https://protonvpn.com/support/wireguard-configurations), [Gluetun Proton provider](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md), [Gluetun WireGuard options](https://github.com/qdm12/gluetun-wiki/blob/main/setup/options/wireguard.md).

**Next:** Run this matrix on an Ubuntu Docker host, report versions, failure results and limitations, and only then publish performance or security conclusions.
