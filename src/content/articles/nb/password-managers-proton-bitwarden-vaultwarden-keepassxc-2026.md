---
title: "Proton Pass mot Bitwarden, Vaultwarden og KeePassXC: Hvilken passordbehandler bør du velge i 2026?"
description: "En merkeuavhengig sammenligning av passordbehandlere med skytjeneste, selvhosting og lokal kryptert database."
category: guides
lang: nb
date: 2026-10-15
tags: [passordbehandlere, personvern, sikkerhet, proton, bitwarden, vaultwarden, keepassxc]
series: "Privacy & Digital Independence"
translationKey: password-managers-proton-bitwarden-vaultwarden-keepassxc-2026
draft: false
tested: false
evidence: documentation
---

> **Dokumentasjonsbasert – ikke praktisk testet (15. oktober 2026).** Dette er en sammenligning av løsningene og arkitekturen deres, ikke en sikkerhetsrevisjon eller ytelsestest. Funksjoner, abonnementsvilkår og priser kan endres. Kontroller gjeldende informasjon i den offisielle dokumentasjonen.

> **Annonselenke:** [Lenken til Proton Pass](https://go.getproton.me/SH33k) er en affiliatelenke. Ploos AS kan få provisjon uten ekstra kostnad for deg. Lenkene til Bitwarden, Vaultwarden og KeePassXC er vanlige lenker uten affiliate-sporing. Kommersielle avtaler påvirker ikke anbefalingene våre.

## Kort fortalt

**Har du allerede en passordbehandler du stoler på og er fornøyd med? Da trenger du sannsynligvis ikke bytte.** For nye brukere er [Bitwarden](https://bitwarden.com/) et godt allround-utgangspunkt. [Proton Pass](https://go.getproton.me/SH33k) passer for dem som foretrekker Protons administrerte løsning og identitetsfunksjoner. [KeePassXC](https://keepassxc.org/) er et godt valg for lokal, offline-orientert bruk på datamaskin, mens [Vaultwarden](https://github.com/dani-garcia/vaultwarden) passer for dem som ønsker å drifte en kompatibel server selv.

Dette er ikke fire identiske produkter. Proton Pass og Bitwarden tilbyr tjenester og klienter. Vaultwarden er en fellesskapsutviklet server som er kompatibel med mange Bitwarden-klienter. KeePassXC bruker i hovedsak en lokal kryptert database.

## Sammenligning

| Spørsmål | Proton Pass | Bitwarden | Vaultwarden | KeePassXC |
| --- | --- | --- | --- | --- |
| Vanlig oppsett | Skytjeneste | Skytjeneste eller offisiell selvhosting | Uoffisiell, selvhostet Bitwarden-kompatibel server | Lokal kryptert database |
| Servervedlikehold | Leverandøren | Leverandøren eller deg | Deg | Ingen server nødvendig |
| Offline-bruk | Kontroller klientens oppførsel | Kontroller klientens oppførsel | Avhenger av klient og synkronisering | Ja, lokal database |
| Deling/synkronisering | Tjenestefunksjoner, avhengig av abonnement | Tjeneste eller egen server | Krever drift og sikkerhetskopiering | Egen synkroniseringsløsning ved behov |
| Passer best for | Enkel, administrert løsning | Fleksibelt standardvalg | Selvhosting-entusiaster | Lokal kontroll |
| Viktigste ulempe | Avhengighet av leverandør og konto | Skytjeneste eller driftsansvar | Driftsansvar og uoffisiell kompatibilitet | Du må håndtere synkronisering og sikkerhetskopier |

**Sikkerhet kan ikke rangeres med ett tall.** Trusselmodell, gjenoppretting, enhetssikkerhet og evnen til å drifte infrastrukturen er viktigere enn et enkelt skille mellom sky og lokal lagring.

## Proton Pass: administrert og praktisk

Proton Pass kombinerer passordbehandling med Protons øvrige personverntjenester. Synkronisering og integrasjon kan gjøre at du slipper å vedlikeholde egen infrastruktur. Kontroller dagens støtte for passkeys, aliaser, deling, gjenoppretting og plattformer – og hvilke funksjoner som krever betaling.

Offisiell informasjon: [Proton Pass](https://proton.me/pass).

## Bitwarden: fleksibelt utgangspunkt

Bitwarden har offisielle applikasjoner og en skytjeneste, samt et offisielt alternativ for selvhosting. Det er derfor naturlig å vurdere for husholdninger og mindre organisasjoner med ulike enheter. Kontroller hvilke funksjoner for deling, organisasjoner, autentisering og administrasjon som krever abonnement.

Offisiell informasjon: [Bitwarden](https://bitwarden.com/) og [dokumentasjon om selvhosting](https://bitwarden.com/help/install-on-premise-linux/).

## Vaultwarden: liten server, stort ansvar

Vaultwarden er **ikke** Bitwardens offisielle server og vedlikeholdes ikke av Bitwarden. Prosjektet implementerer et kompatibelt servergrensesnitt og er interessant for homelab-brukere som ønsker en lett løsning. Kompatibilitet med fremtidige klienter og funksjoner er ikke garantert.

Ikke eksponer en ny Vaultwarden-instans mot Internett uten en sikkerhetsplan. Bruk HTTPS, sikker kontoregistrering, sterk autentisering, raske oppdateringer, begrenset administrasjon, krypterte sikkerhetskopier utenfor serveren og **testet gjenoppretting**. En Docker-container er verken en sikkerhetskopi eller en fullstendig sikkerhetsgrense.

Prosjekt: [Vaultwarden på GitHub](https://github.com/dani-garcia/vaultwarden).

## KeePassXC: offline som utgangspunkt

KeePassXC lagrer passord i en kryptert lokal database. Du trenger ingen obligatorisk skykonto eller server. Dette passer godt for dem som ønsker lokal kontroll og er komfortable med å håndtere synkronisering, sikkerhetskopiering og gjenoppretting selv. Flere enheter er mulig, men krever gjennomtenkt oppsett og håndtering av databasekonflikter.

Prosjekt: [KeePassXC](https://keepassxc.org/).

## Passkeys, tofaktorautentisering og gjenoppretting

Kontroller **de konkrete versjonene og abonnementene** du vil bruke:

- Autofyll og nettleserintegrasjon på alle relevante plattformer.
- Opprettelse, bruk, eksport og flytting av passkeys; kompatibiliteten er i utvikling.
- TOTP-koder, sikkerhetsnøkler og tofaktorautentisering for selve kontoen.
- Nødtilgang, kontogjenoppretting og konsekvensene av å miste enheter.
- Delingsrettigheter og eventuelle betalte familie- eller bedriftsfunksjoner.
- Eksportformater og om import tar med notater, vedlegg, passkeys og egendefinerte felt.

Ikke oppbevar alle gjenopprettingsfaktorene på ett sted uten en egen plan. Ha offline gjenopprettingskoder for viktige kontoer.

## Trenger du egentlig kjøpe noe?

Som regel **nei**. Begynn med en gratisversjon eller KeePassXC hvis det dekker behovene dine. Har du allerede et sikkert og sikkerhetskopiert oppsett som fungerer på enhetene dine, skaper et unødvendig bytte mer risiko enn nytte.

Selvhosting er ikke automatisk billigere: regn med tidsbruk, sikkerhetskopiering, overvåking, domene/TLS og håndtering av hendelser.

## Sikker flytting mellom passordbehandlere

1. Lag og test sikkerhetskopi av den gamle databasen.
2. Kontroller at den nye løsningen støtter feltene du trenger.
3. Eksporter bare på en betrodd enhet; mange eksportformater er **ukryptert klartekst**.
4. Importer og kontroller et utvalg innlogginger, notater og tofaktorinnstillinger.
5. Behold den gamle databasen til den nye løsningen er verifisert.
6. Fjern midlertidige klarteksteksporter på en forsvarlig måte og kontroller sikkerhetskopier og synkroniseringsmapper.

Ikke anta at passkeys eller vedlegg følger med ved flytting.

## Vår vurdering

**Beste generelle utgangspunkt:** Bitwarden, avhengig av funksjonsbehov. **Best for dem som foretrekker Protons administrerte økosystem:** Proton Pass. **Best for bevisst offline-bruk på datamaskin:** KeePassXC. **Best for entusiaster som ønsker å drifte egen tjeneste:** Vaultwarden.

Dette er **anbefalinger etter bruksområde**, ikke en rangering basert på laboratorietester. Vi har ikke målt ytelse, revidert kryptografien eller verifisert gjeldende abonnementspriser for denne artikkelen.

## Kilder og videre lesning

- [Proton Pass](https://proton.me/pass)
- [Bitwarden](https://bitwarden.com/)
- [Bitwardens offisielle guide for selvhosting](https://bitwarden.com/help/install-on-premise-linux/)
- [Vaultwarden-prosjektet](https://github.com/dani-garcia/vaultwarden)
- [KeePassXC-prosjektet](https://keepassxc.org/)

*Sist redaksjonelt gjennomgått: 15. oktober 2026. Artikkelen inneholder én tydelig merket affiliatelenke.*
