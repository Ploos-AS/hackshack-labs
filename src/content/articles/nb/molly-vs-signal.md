---
title: "Molly vs. Signal: Er den alternative Android-klienten verdt å bruke?"
description: "Forskjellene mellom Molly, Molly-FOSS og offisiell Signal når det gjelder lokal sikkerhet, varsler, oppdateringer og tillit."
category: guides
lang: nb
date: 2026-10-19
tags: [molly, signal, android, privacy, security, grapheneos]
series: "Privacy & Digital Independence"
translationKey: molly-vs-signal
draft: true
tested: false
evidence: documentation
---

> **Redaksjonell status – 19. oktober 2026:** Dokumentasjonsbasert sammenligning, **ikke** en praktisk sikkerhetsrevisjon eller kompatibilitetstest. Funksjoner og distribusjonskanaler kan endres. Ingen sponsing eller affiliate-lenker.

## Kort fortalt

**Molly er en uavhengig, uoffisiell Android-variant av Signal**, ikke et eget meldingsnettverk. Den bruker Signal-tjenesten, så kontaktene dine kan fortsette å bruke vanlig Signal. Molly legger til valgfrie funksjoner for å beskytte lokalt lagrede meldinger, håndtere varsler og låse appen. Fordelene må veies mot at du stoler på en ekstra utvikler og oppdateringskanal.

For de fleste er **offisiell Signal fortsatt det enkleste utgangspunktet**. Molly er aktuelt hvis du trenger bestemte tilleggsfunksjoner og forstår kompromissene.

## Molly, Molly-FOSS og Signal

| Spørsmål | Offisiell Signal | Molly | Molly-FOSS |
| --- | --- | --- | --- |
| Android-klient | Offisiell | Uavhengig Signal-variant | Uavhengig Signal-variant |
| Signal-kontakter og -nettverk | Ja | Ja | Ja |
| Ende-til-ende-kryptering | Ja | Bruker Signals meldingsprotokoll | Bruker Signals meldingsprotokoll |
| Ekstra passfrase for lokal database | Ikke tilsvarende Molly-funksjon | Ja | Ja |
| Automatisk applås og andre Molly-kontroller | Annet funksjonsutvalg | Ja | Ja |
| Proprietære Google-komponenter | Kan brukes | Kan være inkludert | Utelatt i FOSS-varianten |
| Varsler uten Google | Avhenger av oppsett | WebSocket / UnifiedPush | WebSocket / UnifiedPush |
| Offisiell Signal-støtte | Ja | Nei | Nei |

Dette er en **funksjonssammenligning, ikke en sikkerhetsrangering**. Ekstra databasepassfrase betyr ikke at vanlig Signal lagrer alle meldinger ukryptert; Androids lagringsbeskyttelse og Signals øvrige sikkerhet er fortsatt relevant.

## Hva legger Molly til?

Ifølge [Molly-prosjektet](https://molly.im/) og [kildekoden](https://github.com/mollyim/mollyim-android) tilbyr appen passfrasekryptering av den lokale databasen, automatisk låsing, valgfrie tiltak for sletting av sensitive data fra minnet, tilpasset sikkerhetskopiering og proxyvalg som SOCKS/Tor via Orbot. Prosjektet dokumenterer også UnifiedPush for dem som vil unngå Googles varslingstjeneste.

Dette er **funksjoner prosjektet selv beskriver**, ikke noe vi har verifisert på en testtelefon. Særlig sletting av minnedata må ikke forstås som en garanti mot kriminalteknisk gjenoppretting eller et kompromittert operativsystem.

## Hva er fortsatt likt?

Molly er fortsatt avhengig av **Signal-økosystemet** for meldinger. Den er ikke en desentralisert erstatning for Signal og gjør deg ikke anonym overfor kontaktene dine. Mottakerne kan bruke vanlig Signal.

Ende-til-ende-kryptering beskytter meldingsinnhold under overføring, men hindrer ikke mottakeren i å lagre eller videresende innhold. Krypteringen beskytter heller ikke mot kompromitterte enheter, phishing eller dårlig kontosikkerhet. Se [Signals forklaring av sikkerhetsmodellen](https://support.signal.org/hc/en-us/articles/360007320391-Is-it-private-Can-I-trust-it).

## Ulempen ved en uoffisiell klient

En uavhengig variant kan tilby nyttige funksjoner, men må også følge sikkerhetsendringer og protokollendringer i Signal. Derfor er **ferske utgivelser, tillit til vedlikeholderne og pålitelige oppdateringer** særlig viktig.

Kontroller prosjektets [oppdaterte utgivelser og installasjonsveiledning](https://github.com/mollyim/mollyim-android) før du bytter. Installer bare fra kanaler prosjektet selv lenker til, og følg veiledningen for signaturkontroll der det er mulig. Unngå tilfeldige APK-nettsteder.

Ikke anta at en uoffisiell klient har samme støttegarantier som Signal. Kompatibilitet og kontoregistrering kan endre seg.

## Molly på GrapheneOS

Molly-FOSS er interessant for dem som bruker GrapheneOS uten Google Play-tjenester. UnifiedPush eller WebSocket kan redusere avhengigheten av Googles varslingsinfrastruktur, men **batteriforbruk, pålitelighet og varsler i bakgrunnen må testes på den aktuelle telefonen og konfigurasjonen**.

GrapheneOS gjør ikke automatisk en uoffisiell app pålitelig. Hold både operativsystem og app oppdatert, kontroller tillatelser og velg etter din egen trusselmodell. Vår [introduksjon til GrapheneOS](/nb/articles/grapheneos-explained-who-should-use-it/) beskriver flere av avveiningene.

## Hvem bør velge hva?

- **Velg Signal** hvis du vil ha den offisielle klienten, forutsigbare oppdateringer og færrest ekstra avhengigheter.
- **Vurder Molly** hvis du trenger flere lokale sikkerhetskontroller og aksepterer å følge oppdateringer fra et uavhengig prosjekt.
- **Vurder Molly-FOSS** hvis du i tillegg vil unngå proprietære Google-komponenter i appen og er forberedt på å konfigurere og kontrollere varsler.

Hvis du bytter fra Signal, **les oppdaterte veiledninger for sikkerhetskopiering og flytting før du avinstallerer noe**. Ikke regn med at meldingshistorikken flyttes automatisk eller at et bytte enkelt kan reverseres.

## Konklusjon

Molly er best beskrevet som **en alternativ Signal-klient**, ikke et nytt meldingsnettverk eller en automatisk personvernforbedring. Tilleggsfunksjonene er interessante, særlig for Android- og GrapheneOS-brukere som prioriterer personvern. Offisiell Signal er fortsatt et fornuftig valg for de fleste.

## Kilder og videre lesning

- [Molly – offisielt nettsted](https://molly.im/)
- [Molly – kildekode, funksjoner og distribusjon](https://github.com/mollyim/mollyim-android)
- [Signal: Is it private? Can I trust it?](https://support.signal.org/hc/en-us/articles/360007320391-Is-it-private-Can-I-trust-it)
- [GrapheneOS – funksjoner](https://grapheneos.org/features)
