# First hardware-verified article: release gate

Candidate: **GL.iNet Mango GL-MT300N-V2 — isolated OpenWrt access point**.

This is a **test plan**, not evidence of testing. Do not mark an article `tested: true` until the acceptance criteria below are met. The TP-Link WR703N legacy-firmware experiment is higher-risk and should remain documentation-based until recovery has been demonstrated.

## Required physical evidence

- Record device manufacturer, exact model, hardware revision, board markings, firmware version and date; redact serial numbers, MAC addresses and credentials from public images.
- Photograph the device, label and relevant ports with original images, including attribution and licensing.
- Record power adapter rating and actual wiring; isolate the test network from production and the Internet unless a specific step requires upstream connectivity.
- Capture the original configuration and document a verified restoration path **before** flashing.
- Download firmware only from an identified authoritative source. Record URL, retrieval date, exact filename, byte size and independent SHA-256 comparison to the release manifest. Verify the image targets the exact device revision and installation method.
- Document factory vs sysupgrade distinctions. Do not guess or publish untested flashing commands.
- Record commands, observed outputs, boot logs where available, test dates, exact firmware version and unexpected behavior. Keep private network information out of logs.
- Test AP association, DHCP, DNS, Ethernet reachability to a local service, client isolation and loss/recovery of power as applicable. Record pass/fail per step.
- Demonstrate rollback/recovery on the same hardware, or state explicitly that recovery remains **untested** and withhold hardware-verified installation status.
- Describe limitations, failure modes, security implications and the version-specific scope of conclusions.

## Publication gates

1. An article author completes a physical test record with evidence links.
2. A reviewer checks that hashes, firmware source, commands, recovery claims and photographs agree.
3. A separate reviewer checks security warnings and whether the evidence supports each claim.
4. Set `tested: true` **only for an article whose stated procedure has been verified on identified physical hardware**. Other articles remain documentation-based.
5. Publish a dated change log and explicit `Last reviewed` and `Links checked` dates **only when those actions actually occurred**.
6. Keep English and Norwegian versions aligned; if a translation is unavailable, do not redirect users silently.

## Evidence record template

| Field | Value |
| --- | --- |
| Date / tester | Pending |
| Device / revision | Pending |
| Starting firmware | Pending |
| Target firmware / source | Pending |
| SHA-256 / manifest source | Pending |
| Recovery demonstrated | No |
| AP / DHCP / Ethernet tests | Not run |
| Photos / logs | Pending |
| Reviewer / sign-off | Pending |

**Current state:** Hardware verification pending. No tested results are claimed.
