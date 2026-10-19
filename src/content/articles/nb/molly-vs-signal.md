---
title: "Molly vs. Signal: Er den alternative Android-klienten verdt å bruke?"
description: "Forskjellene mellom Molly, Molly-FOSS og offisiell Signal når det gjelder lokal sikkerhet, varsler, oppdateringer og tillit."
category: guides
lang: nb
date: 2026-10-19
tags: [molly, signal, android, privacy, security, grapheneos]
series: "Privacy & Digital Independence"
translationKey: molly-vs-signal
draft: false
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
| Ekstra passfrase for lokal database | Ingen separat databasepassfrase; bygger på Androids lagringsbeskyttelse. Skjermlås bruker enhetsautentisering; Signal-PIN er ikke et databasepassord | Ja | Ja |
| Automatisk applås og andre Molly-kontroller | Skjermlås med tidsgrense eller manuell låsing; ikke tilsvarende separat Molly-databasepassfrase | Ja | Ja |
| Proprietære Google-komponenter | Kan brukes | Kan være inkludert | Utelatt i FOSS-varianten |
| Varsler uten Google | FCM når tilgjengelig; WebSocket uten Play-tjenester (kan påvirke batteriet) | WebSocket; UnifiedPush med distributør og server | WebSocket; UnifiedPush med distributør og server |
| Offisiell Signal-støtte | Ja | Nei | Nei |

Dette er en **funksjonssammenligning, ikke en sikkerhetsrangering**. Ekstra databasepassfrase betyr ikke at vanlig Signal lagrer alle meldinger ukryptert; Androids lagringsbeskyttelse og Signals øvrige sikkerhet er fortsatt relevant.

## Hva legger Molly til?

Ifølge [Molly-prosjektet](https://molly.im/) og [kildekoden](https://github.com/mollyim/mollyim-android) tilbyr appen passfrasekryptering av den lokale databasen, automatisk låsing, valgfrie tiltak for sletting av sensitive data fra minnet, tilpasset sikkerhetskopiering og proxyvalg som SOCKS/Tor via Orbot. Prosjektet dokumenterer også UnifiedPush for dem som vil unngå Googles varslingstjeneste.

Dette er **funksjoner prosjektet selv beskriver**, ikke noe vi har verifisert på en testtelefon. Særlig sletting av minnedata må ikke forstås som en garanti mot kriminalteknisk gjenoppretting eller et kompromittert operativsystem.


## Når hjelper Molly faktisk?

En moderne Pixel har allerede sterk filbasert kryptering i Android, og GrapheneOS legger til flere sikkerhetstiltak. **Mollys databasepassfrase er en ekstra beskyttelse på appnivå, ikke en erstatning for telefonens kryptering.** Verdien avhenger av om en angriper kan bruke en ulåst telefon, kjenner enhetens kode eller får tilgang til appen.

| Scenario | Gir Molly en merkbar fordel? |
| --- | --- |
| Telefonen mistes eller stjeles mens den er sikkert låst | **Vanligvis begrenset tilleggsverdi:** Android-kryptering og en sterk skjermlås er viktigst. |
| Noen får bruke en allerede ulåst telefon | **Muligens ja:** en separat Molly-passfrase og automatisk låsing kan gi en ekstra barriere. |
| Delt telefon eller noen kjenner skjermlåskoden | **Muligens ja:** en egen appkode kan hjelpe, men varsler, skjermbilder og åpne økter er fortsatt relevante. |
| Kompromittert Android eller skadevare med høye rettigheter | **Ikke stol på dette alene:** apptiltak gir ingen garanti mot et kompromittert operativsystem. |
| Unngå Googles varslingstjeneste | **Ja, som konfigurasjonsvalg:** Molly støtter UnifiedPush; både Molly og offisiell Signal støtter også WebSocket. |
| Meldinger som fungerer med minst mulig vedlikehold | **Ofte nei:** offisiell Signal har ikke den ekstra avhengigheten av vedlikeholdet av en fork. |

## Oppdateringer, utløp og risiko ved etterslep

Signal endrer både tjenesten og klientene. **Eldre Signal-klienter kan utløpe og kreve oppdatering.** En uoffisiell variant som henger etter, kan derfor miste kompatibilitet eller slutte å fungere til vedlikeholderne tar igjen endringene. [Mollys README](https://github.com/mollyim/mollyim-android#readme) oppgir normalt oppdatering fra Signal annenhver uke og raskere innarbeiding av sikkerhetsrettelser. Dette er en *uttalt praksis*, ikke en garanti.

Som et datert kontrollpunkt viste [Mollys utgivelsesside](https://github.com/mollyim/mollyim-android/releases) **v8.19.2-4 fra 31. juli 2026** ved gjennomgang 19. oktober 2026. Dette er grunn til å undersøke oppdateringstakten, **ikke** bevis på et usikret program. Vi har **ikke gjennomført en direkte måling av etterslepet** mot nyeste Signal-versjon. Se [Signals veiledning om oppdateringer](https://support.signal.org/hc/en-us/articles/360007318751-Registration-troubleshooting).

## Slik fungerer UnifiedPush

UnifiedPush fungerer **ikke automatisk uten oppsett**. Du trenger en kompatibel **distributørapp** (for eksempel ntfy konfigurert som UnifiedPush-distributør) og en pushserver eller et endepunkt. Distributøren, oppsettet og serveren du velger, påvirker pålitelighet og personvern. WebSocket er et separat alternativ som ikke krever en UnifiedPush-distributør. Sammenlign varsler og batteribruk på egen telefon før du stoler på løsningen. Se [dokumentasjonen til UnifiedPush](https://unifiedpush.org/users/intro/).

## Installasjon og verifisering

Bruk [Mollys GitHub-utgivelser](https://github.com/mollyim/mollyim-android/releases), [Mollys offisielle F-Droid-kilde](https://molly.im/fdroid/repo/) eller [den separate F-Droid-kilden for Molly-FOSS](https://molly.im/fdroid/foss/repo/). Prosjektet oppgir også Accrescent som distribusjonskanal for Molly-FOSS. Kontroller APK-ens signeringssertifikat og F-Droid-kildens signeringsnøkkel mot fingeravtrykkene prosjektet publiserer. **Dette er forskjellige nøkler med forskjellige formål.** Hent fingeravtrykkene fra de offisielle sidene ved installasjon.

## Sikkerhetsrevisjon og metadata

**Status for uavhengig revisjon:** Vi har ikke verifisert en offentlig tilgjengelig uavhengig sikkerhetsrevisjon som spesifikt dekker Mollys egne tilleggsfunksjoner. Åpen kildekode og reproduserbare bygg gjør kontroll mulig, men **erstatter ikke en revisjon**.

Molly fjerner **ikke** Signals krav om registrering med telefonnummer og gjør ikke Signal-nettverket anonymt. Signals servere håndterer fortsatt registrering og nødvendige leveringsmetadata innenfor tjenestens dokumenterte personvernmodell. Se [Signals personvernerklæring](https://signal.org/legal/#privacy-policy) og [Signal-PIN og registreringslås](https://support.signal.org/hc/en-us/articles/360007059792-Signal-PIN).

## Hva er fortsatt likt?

Molly er fortsatt avhengig av **Signal-økosystemet** for meldinger. Den er ikke en desentralisert erstatning for Signal og gjør deg ikke anonym overfor kontaktene dine. Mottakerne kan bruke vanlig Signal.

Ende-til-ende-kryptering beskytter meldingsinnhold under overføring, men hindrer ikke mottakeren i å lagre eller videresende innhold. Krypteringen beskytter heller ikke mot kompromitterte enheter, phishing eller dårlig kontosikkerhet. Se [Signals forklaring av sikkerhetsmodellen](https://support.signal.org/hc/en-us/articles/360007320391-Is-it-private-Can-I-trust-it).

## Ulempen ved en uoffisiell klient

En uavhengig variant kan tilby nyttige funksjoner, men må også følge sikkerhetsendringer og protokollendringer i Signal. Derfor er **ferske utgivelser, tillit til vedlikeholderne og pålitelige oppdateringer** særlig viktig.

Kontroller prosjektets [oppdaterte utgivelser og installasjonsveiledning](https://github.com/mollyim/mollyim-android) før du bytter. Installer bare fra kanaler prosjektet selv lenker til, og følg veiledningen for signaturkontroll der det er mulig. Unngå tilfeldige APK-nettsteder.

**Signal gir ikke offisiell støtte til Molly eller andre tredjepartsklienter.** Du er avhengig av en uoffisiell variant, og kompatibilitet eller kontoregistrering kan endre seg. Les [Signals bruksvilkår](https://signal.org/legal/#terms) og oppdaterte meldinger fra prosjektet. Vi har ikke dokumentasjon for å hevde at bruk av Molly i seg selv automatisk fører til kontosanksjoner.

## Molly på GrapheneOS

**Offisiell Signal fungerer også på GrapheneOS uten Google Play-tjenester**, med WebSocket som alternativ for varsler. Molly-FOSS er et valgfritt alternativ, ikke et krav for å bruke Signal uten Google. UnifiedPush eller WebSocket kan redusere avhengigheten av Googles varslingsinfrastruktur, men **batteriforbruk, pålitelighet og varsler i bakgrunnen må testes på den aktuelle telefonen og konfigurasjonen**.

GrapheneOS gjør ikke automatisk en uoffisiell app pålitelig. Hold både operativsystem og app oppdatert, kontroller tillatelser og velg etter din egen trusselmodell. Vår [introduksjon til GrapheneOS](/no/articles/grapheneos-explained-who-should-use-it/) beskriver flere av avveiningene.

## Hvem bør velge hva?

- **Velg Signal** hvis du vil ha den offisielle klienten, forutsigbare oppdateringer og færrest ekstra avhengigheter.
- **Vurder Molly** hvis du trenger flere lokale sikkerhetskontroller og aksepterer å følge oppdateringer fra et uavhengig prosjekt.
- **Vurder Molly-FOSS** hvis du i tillegg vil unngå proprietære Google-komponenter i appen og er forberedt på å konfigurere og kontrollere varsler.

Hvis du bytter fra Signal, **les oppdaterte veiledninger for sikkerhetskopiering og flytting før du avinstallerer noe**. Ikke regn med at meldingshistorikken flyttes automatisk eller at et bytte enkelt kan reverseres.

## Konklusjon

**Er Molly verdt å bruke? Ja, hvis du trenger en separat passfrase på appnivå eller UnifiedPush, kan konfigurere dette riktig og er villig til å følge med på at Molly holder tritt med Signal-utgivelsene. Ellers bør du velge offisiell Signal.** Molly er en alternativ klient, ikke et nytt nettverk eller en automatisk personvernforbedring. Tilleggsfunksjonene er interessante, særlig for Android- og GrapheneOS-brukere som prioriterer personvern. Offisiell Signal er fortsatt et fornuftig valg for de fleste.

## Kilder og videre lesning

- [Molly – offisielt nettsted](https://molly.im/)
- [Molly – kildekode, funksjoner og distribusjon](https://github.com/mollyim/mollyim-android)
- [Signal: Is it private? Can I trust it?](https://support.signal.org/hc/en-us/articles/360007320391-Is-it-private-Can-I-trust-it)
- [GrapheneOS – funksjoner](https://grapheneos.org/features)
- [Signal: Skjermlås](https://support.signal.org/hc/en-us/articles/360007059572-Screen-Lock)
- [UnifiedPush: Introduksjon](https://unifiedpush.org/users/intro/)
- [Signal: Bruksvilkår](https://signal.org/legal/#terms)
- [Molly: Utgivelser](https://github.com/mollyim/mollyim-android/releases)
