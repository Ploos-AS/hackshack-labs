# GrapheneOS laboratory test plan and evidence register

**Status:** Protocol published; no physical-device tests recorded yet.
**Maintainer:** HackShack Labs / Ploos AS
**Scope:** GrapheneOS on officially supported Google Pixel hardware.
**Publication rule:** Never label an article `tested: true` merely because this plan exists.

## Reproducibility and evidence

For each test session, record: test ID, UTC date/time, tester, Pixel exact model and SKU, bootloader eligibility, GrapheneOS build identifier and Android version, security patch date, firmware/baseband, installed app name/package/version/source, Google Play presence and version, active user profile, network (Wi-Fi/mobile/offline), and exact steps. Record expected and observed outcomes, result (PASS/FAIL/BLOCKED/NOT RUN), logs or screenshots with sensitive data removed, reproducibility count and known limitations.

Never publish real phone numbers, BankID identifiers, account credentials, payment details, device identifiers, or unredacted network captures. Test with dedicated accounts where possible. Store raw evidence privately; publish only sanitized excerpts with checksums and a description of redactions.

## Test matrix

| ID | Test case | Expected evidence | Acceptance criterion |
| --- | --- | --- | --- |
| GOS-001 | Confirm supported model, unlockable variant and current official install prerequisites | Model/SKU, source URL and timestamp | Official requirements verified before installation |
| GOS-002 | Backup and restore rehearsal before OS replacement | Backup inventory and restore spot-check | Essential local data can be recovered independently |
| GOS-003 | Install with official web installer and relock bootloader | Sanitized install notes and boot state | Installed OS boots with bootloader locked; no bypasses |
| GOS-004 | Verify OS identity, verified boot and expected signing-key fingerprint | Recorded comparison against official guidance | Fingerprint matches official project documentation |
| GOS-005 | Apply GrapheneOS update and reboot | Build IDs before/after | Update succeeds and verified boot remains intact |
| GOS-006 | Network permission and Sensors permission | App/version, permissions and observations | Denied permission has the documented effect in the selected test |
| GOS-007 | Storage Scopes and Contact Scopes | Test fixtures and permission observations | Selected files/contacts accessible; nonselected fixtures inaccessible |
| GOS-008 | Auto-reboot and USB-C restrictions | Configuration, elapsed time and lock state | Observed behavior matches documented settings |
| GOS-009 | Create, switch, stop and delete secondary profile | Profile lifecycle notes | Isolation and data-deletion behavior documented |
| GOS-010 | Install available apps across profiles | Package IDs and per-profile app data | Distinguish shared package installation from isolated app data |
| GOS-011 | Update app from same and conflicting sources | App signatures, version and store | Supported update succeeds; conflicts documented without unsafe bypass |
| GOS-012 | Install sandboxed Google Play in selected profile | Installed packages, permissions and behavior | No claim of privileged OS access; limitations recorded |
| GOS-013 | Notifications and background execution across profiles | Controlled notifications and timestamps | Behavior documented for active, inactive and stopped profiles |
| GOS-014 | Backup, export and restore per profile | Recovery log and checksums | Document exactly which data is recoverable |
| GOS-015 | BankID, Vipps and banking app checks | Exact versions and sanitized observations | Report only tested combinations; no universal compatibility claim |
| GOS-016 | Wallet tap-to-pay, RCS and Android Auto | Hardware/carrier/app matrix | PASS/FAIL/BLOCKED per tested combination; no extrapolation |
| GOS-017 | Compare minimal, balanced and high-isolation profiles | App placement and usability notes | Explicitly document friction, notifications and backup costs |

**NOT RUN is the initial status for every test.** No test may be silently treated as PASS. Hardware-, service-, account- or vehicle-dependent tests may remain BLOCKED until suitable equipment and permissions exist.

## Result template

Copy the following into a new file under `docs/lab-results/grapheneos/` only when a real session has occurred:

```yaml
test_id: GOS-001
status: NOT_RUN # PASS | FAIL | BLOCKED | NOT_RUN
tested_at_utc: null
device_model: null
device_sku: null
grapheneos_build: null
android_version: null
firmware: null
app_package: null
app_version: null
app_source: null
profile: null
network: null
steps: []
expected: null
observed: null
evidence: [] # sanitized artifact path and SHA-256
limitations: []
reviewer: null
```

## Article publication gates

1. **Documentation-based:** official citations checked; `tested: false`, `evidence: documentation`; no device outcome claims.
2. **Partially tested:** identify exactly which tests have PASS/FAIL records and which remain NOT RUN; do not use a blanket claim that all recommendations are tested.
3. **Lab-tested:** only when the specific article's material hands-on claims are covered by reproducible test records with version/device scope and independent editorial review.
4. **Compatibility:** a PASS is only for the exact tested combination and date. Do not generalize BankID, Vipps, Google Wallet, RCS or Android Auto behavior.
5. **Re-test triggers:** GrapheneOS build, Android release, app update, Google Play update, firmware change, security-policy change, or significant hardware difference.

## Official documentation

- https://grapheneos.org/install
- https://grapheneos.org/features
- https://grapheneos.org/usage
- https://grapheneos.org/faq#supported-devices

No lab measurements have been performed as part of creating this protocol.
