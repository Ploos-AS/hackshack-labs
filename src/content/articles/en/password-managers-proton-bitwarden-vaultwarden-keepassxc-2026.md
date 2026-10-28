---
title: "Proton Pass vs Bitwarden vs Vaultwarden vs KeePassXC: Which Password Manager Should You Use in 2026?"
description: "An independently written comparison of four password management approaches: hosted convenience, official self-hosting, lightweight self-hosting and offline databases."
category: guides
lang: en
date: 2026-10-15
tags: [password-managers, privacy, security, proton, bitwarden, vaultwarden, keepassxc]
series: "Privacy & Digital Independence"
translationKey: password-managers-proton-bitwarden-vaultwarden-keepassxc-2026
draft: false
tested: false
evidence: documentation
---

> **Documentation-based — not hands-on tested (15 October 2026).** This is an architectural comparison, not an audit or a benchmark. Features, plan limits and pricing can change. Verify current details with each project's official documentation.

> **Affiliate disclosure:** The Proton Pass link in the article is an affiliate link. Ploos AS may receive a commission at no extra cost to you. The Bitwarden, Vaultwarden and KeePassXC links are ordinary, non-affiliate links. Commercial relationships do not influence our recommendations.

## The short answer

**Already happy with a trustworthy password manager? You probably do not need to switch.** For a new user, [Bitwarden](https://bitwarden.com/) is a strong general-purpose starting point; [Proton Pass (affiliate link)](https://go.getproton.me/SH33k) is worth considering for people who prefer its hosted experience and identity tools; [KeePassXC](https://keepassxc.org/) is an excellent desktop-first offline choice; and [Vaultwarden](https://github.com/dani-garcia/vaultwarden) is for people who *want to administer* their own compatible server.

These are not four identical products. Bitwarden and Proton Pass are services with client applications; Vaultwarden is a community-developed server compatible with many Bitwarden clients; KeePassXC is primarily a local encrypted database application.

## Comparison at a glance

| Question | Proton Pass | Bitwarden | Vaultwarden | KeePassXC |
| --- | --- | --- | --- | --- |
| Typical deployment | Hosted service | Hosted or official self-hosting | Self-hosted, unofficial Bitwarden-compatible server | Local encrypted database |
| Server maintenance | Provider | Provider or you | You | None required |
| Offline-first workflow | Check current client behavior | Check current client behavior | Client behavior depends on client and sync state | Yes, local database |
| Sharing/sync | Service features; check plan | Service or own server; check plan | Requires server operation and backups | Bring your own file sync if needed |
| Best fit | Managed convenience and Proton users | Flexible mainstream option | Self-hosting enthusiasts | Desktop/offline control |
| Main trade-off | Provider/account dependency | Hosted dependency or server operations | Operational burden and unofficial compatibility | You manage database sync, backups and mobile workflow |

**Security is not a single ranking.** Threat models, recovery procedures, endpoint security and your ability to maintain infrastructure matter more than a simplistic “cloud versus local” label.

## Proton Pass: managed convenience

Proton Pass combines password management with Proton's wider privacy ecosystem. Its integration and hosted synchronization may reduce the amount of infrastructure a user has to maintain. Evaluate current support for passkeys, aliases, sharing, recovery and platform coverage against your needs; do not assume every feature is included in the free tier.

Official information: [Proton Pass](https://proton.me/pass).

## Bitwarden: flexible default

Bitwarden offers official applications and a hosted service, with an official self-hosting option for those who need it. Its established cross-platform approach makes it a sensible first product to evaluate for mixed-device households and small teams. Verify which organization, sharing, authentication and administrative features require payment before deciding.

Official information: [Bitwarden](https://bitwarden.com/) and [self-hosting documentation](https://bitwarden.com/help/install-on-premise-linux/).

## Vaultwarden: small server, real responsibilities

Vaultwarden is **not** an official Bitwarden server and is not maintained by Bitwarden. It implements a compatible server API and is attractive to homelab operators who want a lightweight deployment. Compatibility with future clients or features is not guaranteed.

Do not expose a new Vaultwarden instance to the internet without a security plan. Use HTTPS, secure account registration, strong authentication, timely updates, restricted administration, off-site encrypted backups and **tested restoration**. A Docker container is not a backup or a security boundary by itself.

Project: [Vaultwarden on GitHub](https://github.com/dani-garcia/vaultwarden).

## KeePassXC: offline by design

KeePassXC stores credentials in an encrypted local database. There is no mandatory hosted account or server. That makes it compelling for people who want an offline-first desktop workflow and are comfortable taking responsibility for synchronization, backup and recovery. Cross-device access is possible but requires deliberate tooling and careful handling of database conflicts.

Project: [KeePassXC](https://keepassxc.org/).


## What the free options actually provide

**Verified against project documentation on 15 October 2026; not independently tested.** This is a functional baseline, not a promise about future pricing or plan entitlements.

| Product | No-cost starting point | When payment may matter | Without an internet connection |
| --- | --- | --- | --- |
| Proton Pass | Free account and basic password vault | Advanced aliases, sharing and other plan-dependent features; consult the [current plan comparison](https://proton.me/pass/pricing) | Offline access depends on the particular app and whether data has already synchronized; **do not assume a new device can sign in offline** |
| Bitwarden | Free individual account with password management | Organization, family and some advanced security features; see [plans](https://bitwarden.com/pricing/) | Installed clients can use locally cached vault data in supported circumstances; changes and initial login require connectivity. See [offline access](https://bitwarden.com/help/using-bitwarden-offline/) |
| Vaultwarden | Free, open-source server software | Hosting, backups, domain and administrator time; not a paid consumer subscription | Depends on the Bitwarden-compatible client and its cached data, not merely whether the server is online |
| KeePassXC | Free, open-source desktop application | No software subscription; optional sync or hardware-key costs | Opens an available local KDBX database without network access |

A paid plan is not necessarily more secure for an individual. Check whether the particular feature you need is included **before** subscribing.

## Source availability, audits and provider risk

All four have publicly available source code for substantial components, but **open source is not the same as an independent security audit**. Audit scope, date, tested version and remediation status matter. Review [Proton's security information](https://proton.me/pass/security), [Bitwarden's compliance and audits](https://bitwarden.com/compliance/), the [Vaultwarden repository](https://github.com/dani-garcia/vaultwarden) and [KeePassXC security documentation](https://keepassxc.org/docs/) before making an audit-based claim. This article does **not** independently certify the scope or outcome of any audit.

Hosted services add provider availability, account access, legal jurisdiction and business-continuity dependencies. Proton is based in Switzerland; Bitwarden is based in the United States. Vaultwarden and KeePassXC let you choose where data is stored, but you take responsibility for that environment. If a provider is acquired, breached or closes, **an up-to-date, usable export and a recovery plan** matter more than brand promises. Encrypted vaults reduce exposure but do not eliminate risks from compromised devices or malicious client software.

End-to-end or zero-knowledge encryption also has a cost: a provider may be unable to recover your vault if you lose the master password and all available recovery methods. **Test account recovery while you still have access**; do not assume support can decrypt your data.

## A compromised server is still dangerous

A server that stores only encrypted vault records should not ordinarily be able to read the vault contents directly. That does **not** mean the server is outside the trust boundary. A compromised server serving a web vault could potentially deliver malicious JavaScript to the browser, capture secrets entered there, or interfere with authentication. Native clients reduce this particular web-delivered-code exposure, although they still require trustworthy updates and secure endpoints. Treat Vaultwarden administration and server patching as security-critical. See [Vaultwarden documentation](https://github.com/dani-garcia/vaultwarden/wiki) and [Bitwarden security whitepaper](https://bitwarden.com/help/bitwarden-security-white-paper/).

## Keep your vault account separate from its second factor

Storing TOTP codes beside passwords is convenient, but a breach of the **unlocked vault** can expose both secrets. It is not equivalent to keeping a separate authenticator or hardware key. Where supported, protect the vault account with a **FIDO2/WebAuthn hardware security key**, keep backup keys or recovery codes separately, and use a long, unique master passphrase. KeePassXC also supports additional database protection mechanisms such as key files and supported YubiKey challenge-response configurations; understand backup and recovery implications before enabling them. See [KeePassXC user guide](https://keepassxc.org/docs/KeePassXC_UserGuide) and [Bitwarden two-step login documentation](https://bitwarden.com/help/setup-two-step-login/).

## KeePassXC on phones

KeePassXC itself is a **desktop application**, not an official KeePassXC mobile app. Other applications supporting KDBX databases include [KeePassDX for Android](https://www.keepassdx.com/), [Strongbox for iOS](https://strongboxsafe.com/) and [KeePassium for iOS](https://keepassium.com/). These are independent products with their own policies and feature sets. A tool such as [Syncthing](https://syncthing.net/) can synchronize a database file, but simultaneous edits and conflicts require care. Verify each app's current compatibility and backup behavior before relying on it.

## Scope: what this comparison does not cover

This is a **four-option comparison**, not a ranking of every password manager. Apple's built-in Passwords/iCloud Keychain, browser password managers, 1Password and other commercial products are legitimate alternatives. Staying with an existing well-maintained built-in manager may be safer than a rushed migration. We selected these four to illustrate hosted, officially self-hostable, community self-hosted and local-database approaches.

## Related HackShack Labs reading

- [The Proton ecosystem](/articles/proton-ecosystem-overview/) for the broader service trade-offs.
- [Why mini PCs make excellent homelab servers](/articles/why-mini-pcs-make-excellent-homelab-servers/) for server hardware considerations.
- [Proton VPN, Docker and Gluetun](/articles/proton-vpn-linux-docker-gluetun/) for the distinction between a configuration and a verified security claim.

## Next experiment: migration compatibility

A useful follow-up is a controlled export/import test between these products using **synthetic credentials only**. Record exactly which usernames, URLs, notes, custom fields, attachments, TOTP seeds and passkeys survive each path, and test recovery from backup. Publish results only after reproducing them on documented versions.

## Passkeys, MFA and recovery: what to check

Before migrating, check the **specific versions and plans** you intend to use:

- Password autofill and browser integration on every required platform.
- Passkey creation, use, export and migration constraints; interoperability is evolving.
- Support for TOTP codes, hardware security keys and account MFA.
- Emergency access, account recovery and what happens if you lose your devices.
- Shared vault permissions and whether family/team features require a subscription.
- Export formats and whether imports preserve notes, attachments, passkeys and custom fields.

Avoid putting all recovery factors in a single place without a separate recovery strategy. Maintain offline recovery codes for critical accounts.

## Do you actually need to buy anything?

Usually **no**. Start with a free tier or KeePassXC, provided it meets your needs. If your current setup is secure, backed up and works across your devices, migrating merely to follow a trend introduces risk without a clear benefit.

Self-hosting is not automatically cheaper: count maintenance time, backups, monitoring, domain/TLS configuration and incident response.

## Export formats: portability is not the same as backup recoverability

**Bitwarden:** Its encrypted JSON exports have two different recovery properties. An **account-restricted** export can only be imported back into the originating account and can become unusable after encryption-key rotation. A **password-protected** encrypted export can be imported into another Bitwarden account with the chosen password. Neither format guarantees that every attachment or passkey migrates; inventory those separately. Read the [official encrypted-export guidance](https://bitwarden.com/help/encrypted-export/).

**Proton Pass:** The [official export guide](https://proton.me/support/pass-export) describes a PGP-encrypted JSON inside ZIP, an unencrypted ZIP, and CSV. Export is documented from the browser extension, web app and Windows desktop app, **not the mobile apps**. A portable encrypted backup may need decryption before another provider can import it; treat any resulting JSON as highly sensitive.

**KeePassXC:** Its [user guide](https://keepassxc.org/docs/KeePassXC_UserGuide) documents export of passkeys to `.passkey` files. **Those exported passkey files are unencrypted** and require protection just like plaintext password exports. Confirm that the *destination* can import each item before promising migration.

**Vaultwarden:** It is an [unofficial Bitwarden-compatible server](https://github.com/dani-garcia/vaultwarden), not a Bitwarden-operated service. Backup of its database, attachments, encryption material and configuration requires its own verified restore procedure; a client-side vault export does not automatically replace a full server backup.

## Moving safely between managers

1. Create and test backups of the existing vault.
2. Confirm the destination supports the fields you need.
3. Export only on a trusted device; many export formats are **unencrypted plaintext**.
4. Import and check a representative sample of logins, notes and multi-factor settings.
5. Keep the old vault available until the new setup is verified.
6. Securely remove temporary plaintext exports and review device backups/sync folders.

Do not assume passkeys or attachments migrate with passwords.

**Plaintext-export caveat:** Deleting a CSV or JSON export does not guarantee that its contents are unrecoverable, particularly on SSDs, in snapshots, cloud-synced folders or automatic backups. Prefer a supported encrypted export when available. If a plaintext export is unavoidable, create it only on a trusted device in a controlled, encrypted location, keep it out of sync and backup paths, import promptly, and remove temporary copies afterward. Do not promise that ordinary file deletion securely sanitizes flash storage; for a higher-risk migration, use an appropriately isolated disposable environment and verify the destination before retiring the old vault.

## Our assessment: choose by workflow

| Your situation | Start by evaluating | Think twice if… |
| --- | --- | --- |
| You want a managed manager across devices | Bitwarden | You require an entirely offline workflow |
| You already use Proton and value integrated identity tools | Proton Pass | You want to avoid dependence on one provider |
| You want a local desktop database | KeePassXC | You need effortless shared-vault administration |
| You operate a homelab and accept security maintenance | Vaultwarden | You cannot commit to updates, monitoring and restore tests |

These are **use-case recommendations**, not lab-tested product rankings. We have not measured performance, audited cryptography or verified current plan pricing for this article.

## Sources and further reading

- [Proton Pass](https://proton.me/pass)
- [Bitwarden](https://bitwarden.com/)
- [Bitwarden official self-hosting guide](https://bitwarden.com/help/install-on-premise-linux/)
- [Vaultwarden project and documentation](https://github.com/dani-garcia/vaultwarden)
- [KeePassXC project](https://keepassxc.org/)

*Last editorial review: 15 October 2026. This article contains a clearly identified Proton Pass affiliate link.*
