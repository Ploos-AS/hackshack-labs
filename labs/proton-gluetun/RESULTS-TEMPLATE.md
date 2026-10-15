# Gluetun lab test record

Status: NOT RUN

- Date/time (UTC):
- Operator:
- Host OS/kernel:
- Docker Engine / Compose:
- Gluetun digest:
- Netshoot digest:
- Proton server/endpoint (no credentials):
- Host uplink and Docker bridge:
- Docker network EnableIPv6:
- Host IPv6 routes:
- Gluetun DNS settings and observed upstream:
- Packet capture files (local only, sanitized before sharing):

| ID | Test | Expected | Observed | PASS/FAIL/NOT RUN | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | IPv4 baseline | VPN exit observed | | NOT RUN | |
| 2 | DNS | No unintended plaintext DNS uplink | | NOT RUN | |
| 3 | IPv6 | Tunneled or blocked | | NOT RUN | |
| 4 | Tunnel loss, 60 s | Zero direct client egress | | NOT RUN | |
| 5 | Recovery | Tunnel restored, no fail-open | | NOT RUN | |
| 6 | Gluetun/client/daemon restart | No fail-open | | NOT RUN | |
| 7 | Application workload | No direct egress | | NOT RUN | |

Do not upload WireGuard keys, raw packet captures, expanded Compose configuration, or private endpoint details.
