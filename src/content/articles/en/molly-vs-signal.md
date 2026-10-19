---
title: "Molly vs Signal: Is the Alternative Android Client Worth Using?"
description: "How Molly, Molly-FOSS and official Signal differ in local security, notifications, updates and trust."
category: guides
lang: en
date: 2026-10-19
tags: [molly, signal, android, privacy, security, grapheneos]
series: "Privacy & Digital Independence"
translationKey: molly-vs-signal
draft: false
tested: false
evidence: documentation
---

> **Editorial status — 19 October 2026:** Documentation-based comparison, **not** a hands-on security audit or compatibility test. Features and distribution channels can change. No sponsorship or affiliate links.

## Short answer

**Molly is an independent, unofficial Android fork of Signal**, not a separate messaging network. It communicates through Signal's service, so you do not need to persuade your contacts to install a different messenger. Molly adds optional controls for protecting messages stored on your device, notification delivery and app locking. Those extras are useful to some people, but they also introduce another developer and update channel into your trust model.

For most people, **official Signal remains the simplest default**. Consider Molly if you understand the trade-offs and want its specific Android features.

## Molly, Molly-FOSS and Signal

| Question | Official Signal | Molly | Molly-FOSS |
| --- | --- | --- | --- |
| Android client | Official | Independent Signal fork | Independent Signal fork |
| Signal contacts and network | Yes | Yes | Yes |
| End-to-end encrypted conversations | Yes | Uses Signal's messaging protocol | Uses Signal's messaging protocol |
| Optional extra database passphrase | No separate database passphrase; relies on Android storage protections. Screen Lock uses device authentication; Signal PIN is not a database password | Yes | Yes |
| Automatic app locking and other Molly controls | Screen Lock with timeout or manual lock; no equivalent separate Molly database passphrase | Yes | Yes |
| Proprietary Google components | May be used | May be included | Excluded by the FOSS variant |
| Google-free notification options | FCM when available; WebSocket fallback without Play services (possible battery trade-off) | WebSocket; UnifiedPush with distributor and server | WebSocket; UnifiedPush with distributor and server |
| Official Signal support | Yes | No | No |

This is a **feature comparison, not a security ranking**. The extra passphrase does not mean official Signal stores all messages unencrypted; Android's existing storage protections and Signal's own security features still matter.

## What Molly adds

According to the [Molly project](https://molly.im/) and its [source repository](https://github.com/mollyim/mollyim-android), the fork offers passphrase-based encryption for its local database, automatic locking, optional memory-clearing measures, configurable backups, and proxy options including SOCKS/Tor through Orbot. The project also documents UnifiedPush support for users who do not want to rely on Google's push service.

These are **project-described capabilities**, not features we have independently verified on a test phone. Memory clearing in particular should not be interpreted as a guarantee against forensic recovery or a compromised operating system.


## When does Molly actually help?

A modern Pixel already provides strong Android file-based encryption, and GrapheneOS adds further hardening. **Molly's database passphrase is an additional application-level control, not a replacement for device encryption.** Its practical value depends on whether an attacker can access an unlocked session, knows the device credential, or can interact with the app.

| Scenario | Does Molly make a meaningful difference? |
| --- | --- |
| Phone lost or stolen while securely locked | **Usually limited additional benefit:** Android encryption and a strong device credential are the primary protections. |
| Someone can use an already-unlocked phone | **Potentially yes:** an independent Molly passphrase and automatic locking can add a barrier, depending on configuration. |
| Shared device or someone knows the screen-unlock credential | **Potentially yes:** separate app credentials can help, but notifications, screenshots and compromised sessions remain concerns. |
| Compromised Android OS or malware with high privileges | **Do not rely on it:** app-level measures cannot guarantee protection against a compromised endpoint. |
| Avoiding Google's push infrastructure | **Yes, as a configuration choice:** Molly supports UnifiedPush; both Molly and official Signal also support WebSocket. |
| Keeping messaging functional with minimal maintenance | **Often no:** official Signal avoids the additional fork-maintenance dependency. |

## Updates, expiry and fork risk

Signal's service and clients evolve. **Older Signal clients can expire and require updating**, so an independent fork that falls behind may lose compatibility or stop working until its maintainers catch up. Molly's [README](https://github.com/mollyim/mollyim-android#readme) says it normally incorporates upstream changes every two weeks and prioritizes security fixes, but this is a *project policy*, not a guarantee.

As a dated reference, the [Molly release list](https://github.com/mollyim/mollyim-android/releases) showed **v8.19.2-4 released 31 July 2026** when reviewed on 19 October 2026. That is a reason to investigate release cadence, **not** proof of an unpatched vulnerability: compare current upstream Signal and Molly versions and security advisories before relying on either. We have **not completed a like-for-like release-lag measurement**. See [Signal's official support and update guidance](https://support.signal.org/hc/en-us/articles/360007318751-Registration-troubleshooting).

## UnifiedPush setup

UnifiedPush is **not plug-and-play**. It needs a compatible **distributor app** (for example, ntfy configured as a UnifiedPush distributor) and a push server or endpoint. The distributor, its configuration and the server you choose affect notification reliability and privacy. WebSocket is a separate alternative and does not require a UnifiedPush distributor. Compare delivery and battery use on your own device before relying on either option. See the [UnifiedPush documentation](https://unifiedpush.org/users/intro/).

## Installation and verification

Use the [Molly project's release page](https://github.com/mollyim/mollyim-android/releases), its [official Molly F-Droid repository](https://molly.im/fdroid/repo/) or the [separate Molly-FOSS F-Droid repository](https://molly.im/fdroid/foss/repo/). The project also lists Accrescent for Molly-FOSS. Follow the project's published signing-certificate fingerprint and the repository's signing-key fingerprint; **these are different keys for different verification purposes**. Verify them from the official pages at installation time rather than trusting a copied fingerprint in an old article.

## Security review and metadata limits

**Independent audit status:** We have not verified a publicly available independent security audit specifically covering Molly's added features. Open source and reproducible-build support are valuable for scrutiny, but are **not substitutes for an audit**.

Molly does **not** remove Signal's phone-number registration requirement or turn Signal into an anonymous network. Signal's server still handles account registration and message delivery metadata needed to operate the service, subject to Signal's published privacy design. See [Signal's privacy documentation](https://signal.org/legal/#privacy-policy) and [Signal PIN and registration lock](https://support.signal.org/hc/en-us/articles/360007059792-Signal-PIN).

## What stays the same?

Molly still depends on the **Signal ecosystem** for messaging. It is not a decentralized replacement for Signal, and it does not hide your identity from people you communicate with. Your contacts can continue using the official Signal app.

End-to-end encryption protects message content in transit, but it does not prevent a recipient from saving or forwarding what they receive. It also cannot compensate for a compromised endpoint, phishing or poor account security. See [Signal's explanation of its security model](https://support.signal.org/hc/en-us/articles/360007320391-Is-it-private-Can-I-trust-it).

## The trade-off: an unofficial client

An independent fork can ship useful features, but it also needs to track upstream security changes and protocol compatibility. That makes **release freshness, maintainer trust and reliable updates** especially important.

Before switching, check the project's [current releases and installation instructions](https://github.com/mollyim/mollyim-android). Install only from a distribution channel linked by the project, and follow its signature-verification guidance where available. Avoid random APK mirrors.

**Signal does not officially support Molly or other third-party Signal clients.** You depend on an unofficial fork, and compatibility or account-registration behavior may change. Review [Signal's Terms of Service](https://signal.org/legal/#terms) and the project's current notices; we have not established that merely using Molly automatically results in account sanctions.

## Molly on GrapheneOS

**Official Signal also works on GrapheneOS without Google Play services**, using its WebSocket fallback. Molly-FOSS is an optional alternative, not a requirement for de-Googled messaging. UnifiedPush or WebSocket notifications can reduce dependence on Google's notification infrastructure, but the **battery, reliability and background-delivery trade-offs need testing on the exact device and configuration**.

GrapheneOS does not automatically make an unofficial app trustworthy. Keep the OS and app updated, check permissions, and choose software based on your actual threat model. Our [GrapheneOS introduction](/articles/grapheneos-explained-who-should-use-it/) covers the broader security and privacy considerations.

## Who should choose which?

- **Choose Signal** if you want the official client, predictable updates and the fewest additional dependencies.
- **Consider Molly** if you need its extra local security controls and accept responsibility for tracking an independent project's updates.
- **Consider Molly-FOSS** if you also want to avoid proprietary Google components in this app and are prepared to configure and verify notifications.

If you are moving from Signal, **check the current backup and migration instructions before uninstalling anything**. Do not assume message history will transfer automatically or that switching clients is reversible without preparation.

## Verdict

**Is Molly worth using? Yes, if you need a separate app-level passphrase or UnifiedPush, can configure them correctly, and are willing to verify that Molly keeps pace with Signal releases. Otherwise, choose official Signal.** Molly is an alternative client, not a new network or an automatic privacy upgrade. Its added controls are worth understanding, especially for privacy-focused Android and GrapheneOS users. The official Signal app is still a sensible recommendation for most readers.

## Sources and further reading

- [Molly official website](https://molly.im/)
- [Molly Android source, features and distribution](https://github.com/mollyim/mollyim-android)
- [Signal: Is it private? Can I trust it?](https://support.signal.org/hc/en-us/articles/360007320391-Is-it-private-Can-I-trust-it)
- [GrapheneOS features](https://grapheneos.org/features)
- [Signal: Screen Lock](https://support.signal.org/hc/en-us/articles/360007059572-Screen-Lock)
- [UnifiedPush: Introduction](https://unifiedpush.org/users/intro/)
- [Signal: Terms of Service](https://signal.org/legal/#terms)
- [Molly: Releases](https://github.com/mollyim/mollyim-android/releases)
