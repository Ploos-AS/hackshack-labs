# Proton VPN + Gluetun — reproducible test protocol

**Status:** planned; not executed. **Target:** Ubuntu 24.04 LTS N150 Docker host. **Scope:** isolated non-production test only.

## Preconditions
- Access to Docker/Compose, Proton WireGuard configuration, and a separate test network.
- No private keys in Git, logs, command history, screenshots or shared issue comments.
- Record Ubuntu/kernel/Docker/Compose versions, Gluetun image digest, architecture, network topology, Docker IPv6 configuration, DNS setup and expected egress paths.
- Review the current [Gluetun Proton provider](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md) and [WireGuard settings](https://github.com/qdm12/gluetun-wiki/blob/main/setup/options/wireguard.md); confirm environmental variables for this release.
- Start from the draft Compose example in the bilingual article, run `docker compose config`, and check there are no unintended published ports. Do not run until configuration and secrets handling have been reviewed.
- Never turn off Gluetun's firewall to force a passing health check.

## Test record table

| ID | Test | Expected condition | Evidence |
| --- | --- | --- | --- |
| G01 | Fresh start and VPN handshake | Container connects without direct client egress | Redacted logs, routing/firewall snapshot |
| G02 | Public IPv4 egress | Client exits via expected VPN endpoint | IP test from **inside** test-client |
| G03 | DNS routing | DNS requests follow intended resolver path | Resolver info + isolated packet capture |
| G04 | IPv6 | IPv6 either uses an explicitly supported VPN route or is blocked | IPv6 probe and packet capture |
| G05 | Tunnel interruption | No fail-open clear-net traffic | Simulated tunnel loss; capture on host uplink |
| G06 | Tunnel recovery | Client can only resume on restored safe tunnel | Timestamps, health checks, captures |
| G07 | Restart scenarios | No unprotected egress on Gluetun/client/Docker restarts | Captures for each scenario |
| G08 | Port-forwarding (optional) | Changes handled safely when reconnecting | Provider documentation + redacted observations |
| G09 | Healthcheck error reproduction | Determine cause of UDP 1.1.1.1:53 permission error, if reproducible | Log timestamps, ip routes, firewall and packet capture |

A **PASS** requires observable evidence, not simply a running container. A **FAIL** must preserve the reproduction steps and whether exposure was confirmed. Mark unavailable or untested conditions **NOT RUN** rather than assuming success.

## Results template

```text
Test ID:
UTC time:
Host OS / kernel:
Docker / Compose:
Gluetun digest:
Network topology / IPv6:
Expected:
Observed:
Capture or log reference (sanitized):
Result: PASS | FAIL | NOT RUN | INCONCLUSIVE
Notes / next action:
```

## Publish gate
- Confirm every documented command against the pinned release.
- Separate vendor-documented capabilities from personally observed behavior.
- Publish security assurances only for scenarios that passed with adequate evidence.
- Keep results and logs free of credentials, sensitive IP addresses and browsing data.
- Document failures honestly and retest after changes.

The [article draft](../../src/content/articles/en/proton-vpn-linux-docker-gluetun.md) and its [Norwegian translation](../../src/content/articles/nb/proton-vpn-linux-docker-gluetun.md) remain `draft: true` until editorial publication decisions.
