# Pixel privacy → GrapheneOS article series — editorial roadmap

**Status:** Planned; documentation research first, real-device verification before any claim of hands-on testing.
**Languages:** English originals and Norwegian Bokmål translations.
**Publishing order:** First publish and maintain the **Google Pixel with stock Google Android** privacy article as a standalone mainstream-Android analysis. GrapheneOS follows as a separate series. The Pixel article mentions GrapheneOS only briefly and links to the later introduction; it must not frame GrapheneOS as a prerequisite.

## Article 0 — publish first

**Google Pixel for Privacy: Is Less Android Bloat Actually Better?** — stock Google Android as shipped on Pixel, not bare AOSP and not GrapheneOS. Focus on avoiding a second OEM ecosystem (for example Samsung), app/account duplication, privacy controls, Google data collection, security updates and the limits of this argument. English: `src/content/articles/en/google-pixel-privacy-less-oem-bloat.md`; Norwegian: `src/content/articles/nb/google-pixel-privacy-less-oem-bloat.md`.

## GrapheneOS follow-up series

1. **GrapheneOS Explained: Who Should Use It?** — threat models, supported devices, update lifetime, what changes from stock Pixel.
2. **Installing GrapheneOS on a Pixel** — official web installer, bootloader relocking, verified installation, recovery and backups; do not invent tested outcomes.
3. **GrapheneOS User Profiles: Practical Isolation Without Complexity** — owner versus secondary profiles, what separates apps/data, notifications, background execution, switching, usability and risk of losing access to data.
4. **App Installation and Updates Across GrapheneOS Profiles** — install availability from owner to other profiles, independent app data and permissions, app store choices, Sandboxed Google Play, update ownership, package versions, trust and supply-chain issues.
5. **Sandboxed Google Play: Compatibility Without Privileged Google Services** — per-profile choices, what works, limitations, permission model.
6. **Living With GrapheneOS in Norway** — banking, BankID, Vipps, payments, transport, notifications; test exact app/version/device before reporting compatibility.
7. **Backups, Migration and Recovery on GrapheneOS** — per-profile data, restore constraints, export, encrypted offline backups and failure scenarios.
8. **GrapheneOS Profile Setups: Minimal, Balanced and High Isolation** — three *trade-off-based* patterns, not one universal 'optimal' setup.

## Editorial focus: user profiles

Explain that profiles are **not** equivalent to multiple phones or network anonymity. Separate app data and identities do not prevent service-side correlation, shared IP addresses or tracking via logins.

Compare configurations:
- **Minimal:** Owner profile with daily apps; additional profiles only for a clear need.
- **Balanced:** Owner for administration and a daily secondary profile; optional separate profile for high-trust/low-trust apps as appropriate.
- **High isolation:** Distinct profiles for work, sensitive apps and untrusted apps, with explicit costs in notifications, sharing, app management and user experience.

For every pattern, document:
- Which profile is owner and which is used daily.
- Where each app is installed and where its data lives.
- Which profile contains Google Play services, if any.
- Installation, updates, permissions, notification delivery and cross-profile sharing.
- Backup/export, migration and what happens when a profile is deleted.
- Battery and convenience trade-offs.
- Limitations confirmed in the current GrapheneOS release.

## Software-installation article: mandatory questions

1. How does **Install available apps** from the owner profile actually work? Distinguish sharing installation of a package from sharing its data.
2. Can different profiles use different versions of the same package? Verify Android package/version constraints before claiming this.
3. What happens when an app is installed from different sources (GrapheneOS Apps, Play Store, F-Droid, Obtainium, APK)? Explain signing-key and update-source conflicts without recommending unsafe workarounds.
4. What is the safest repeatable workflow for installing and updating Sandboxed Google Play in only selected profiles?
5. How do notifications behave when secondary profiles are stopped or active?
6. What is and is not shared: files, contacts, clipboard, intents, accounts and app data?
7. How should app permissions and network access be reviewed per profile?
8. How are app data backed up and restored for each profile?
9. Which setup is reasonable for BankID/Vipps? Never claim compatibility without a real tested version matrix.

## Public test protocol

See [GrapheneOS lab test plan and result template](GRAPHENEOS-LAB-TEST-PLAN.md). All 17 cases start as NOT RUN; no hardware testing is claimed. The plan defines reproducible evidence and publication gates.

## QA and verification

- Use official primary sources: https://grapheneos.org/features , https://grapheneos.org/usage , https://grapheneos.org/faq , https://grapheneos.org/install .
- Record device model, GrapheneOS build, Android version, app version and date for any real-device claim.
- Mark documentation-only content `tested: false` and `evidence: documentation`.
- Publish an explicit lab matrix and results before using `lab-tested`.
- Avoid universal 'best' configurations, unsupported security claims and instructions that weaken verified boot.
- Preserve a clear distinction between stock Pixel privacy and GrapheneOS articles.
