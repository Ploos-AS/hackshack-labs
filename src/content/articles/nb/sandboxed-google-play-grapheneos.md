---
title: "Google Play i sandkasse på GrapheneOS: Hva er forskjellen?"
description: "Hvordan valgfrie Google Play-tjenester fungerer på GrapheneOS, hva sandkassen endrer, og når det er fornuftig å installere dem."
category: guides
lang: nb
date: 2026-10-19
tags: [grapheneos, android, google-play, personvern, sikkerhet]
series: "Privacy & Digital Independence"
translationKey: sandboxed-google-play-grapheneos
draft: false
tested: false
evidence: documentation
---

> **Redaksjonell status – 19. oktober 2026:** Dokumentasjonsbasert guide. Vi har ikke installert GrapheneOS eller målt Google Play-nettverkstrafikk på en testtelefon. Ingen sponsing eller affiliate-lenker.

## Kort fortalt

**GrapheneOS kan kjøre Google Play-tjenester som vanlige apper i sandkasse, i stedet for å gi dem den privilegerte systemintegrasjonen de har på vanlige Google-sertifiserte Android-enheter.** Installasjonen er valgfri. Det endrer **tillatelser og tillitsgrenser**, ikke Googles forretningsmodell eller hvilke opplysninger du selv deler med Google.

**Vår anbefaling:** Begynn uten Google Play hvis appene dine fungerer. Installer Google Play i sandkasse først når en app du trenger krever det, og vurder hvilke tillatelser og kontofunksjoner du vil bruke.

## Hva installeres?

GrapheneOS tilbyr et valgfritt kompatibilitetslag for **Google Play services og Google Play Store**. Åpne GrapheneOS sin **App Store**, velg **Google Play services** og installer den; Play Store installeres som avhengighet. GrapheneOS sin [gjeldende installasjonsveiledning](https://grapheneos.org/usage#sandboxed-google-play) oppgir at installasjoner fra før Android 15 også kan ha **Google Services Framework**, og fraråder å fjerne denne komponenten. Ikke følg utdaterte veiledninger som krever tre komponenter, og unngå tilfeldige APK-nettsteder.

I motsetning til privilegerte systemtjenester på vanlig Android kjører disse komponentene i den ordinære Android-sandkassen. De får ikke automatisk ekstra systemrettigheter bare fordi Google har laget dem.

## Hva betyr «sandkasse»?

| Spørsmål | Google-sertifisert Android (som standard Pixel) | GrapheneOS med Google Play i sandkasse |
| --- | --- | --- |
| Google Play-integrasjon | Privilegert systemintegrasjon | Vanlige apper med kompatibilitetslag |
| Installasjon | Del av standardsystemet | Valgfritt, per brukerprofil |
| Tillatelser | Android-tillatelser og privilegerte integrasjoner | Vanlige apptillatelser; GrapheneOS har Nettverk, Sensorer, Contact Scopes og Storage Scopes |
| Google-konto | Vanlig del av standardoppsettet | Valgfri; Play Store krever innlogging for å installere apper og foreta kjøp i apper |
| Appkompatibilitet | Oppsettet Google utvikler for | Mange apper fungerer, men integritetssjekker og proprietære funksjoner kan feile |
| Data til Google | Avhenger av innstillinger og bruk | Avhenger også av innstillinger og bruk; ikke målt her |

Tabellen beskriver arkitektur, **ikke en målt reduksjon i sporing**. Kompatibilitetslaget kan gi apper nødvendig funksjonalitet samtidig som den ordinære appsandkassen beholdes.

## Hva kan Google Play gjøre?

Google-komponentene kan kommunisere over nettverket når de har tillatelse. Logger du inn på Google-kontoen eller bruker Google-avhengige apper, kan Google fortsatt motta opplysninger om aktiviteten. Sandkassen **gjør deg ikke anonym**, fjerner ikke all telemetri og hindrer ikke apper i å spore deg via egne kontoer.

Samtidig kan en vanlig Google-app i sandkassen ikke automatisk omgå Androids tillatelsesmodell fordi den kommer fra Google. GrapheneOS tilbyr **Contact Scopes** for å dele bare utvalgte kontakter, **Storage Scopes** for å begrense filtilgang og en egen tillatelse for **Sensorer** i tillegg til **Nettverk**. Kontrollene kan brukes på vanlige apper, inkludert Play-komponenter der det er relevant; ikke alle komponenter trenger alle tillatelsene. Gi bare tillatelser du trenger, men vær klar over at begrensninger kan ødelegge funksjonalitet. Se [Contact Scopes](https://grapheneos.org/usage#contact-scopes) og [Storage Scopes](https://grapheneos.org/usage#storage-scopes).

## Varsler og bakgrunnsaktivitet

Mange Android-apper bruker **Firebase Cloud Messaging (FCM)** gjennom Google Play services. Installasjon av Google Play i sandkasse kan gjøre at slike apper får varsler igjen. GrapheneOS anbefaler å **unnta Google Play services fra batterioptimalisering** for at pushvarsler skal fungere pålitelig i bakgrunnen; dette unntaket trengs ikke for Play Store. Resultatet avhenger av batteriinnstillinger, appversjoner og enhetsoppsett.

**Personvern ved FCM:** Googles varslingsinfrastruktur håndterer nødvendige leveringsopplysninger (som registreringstoken og tidspunkt), selv når selve varslingsinnholdet er kryptert. Det betyr ikke at Google automatisk kan lese ende-til-ende-kryptert meldingsinnhold. Vi har ikke målt metadata for bestemte apper.

Noen apper tilbyr andre varslingsmekanismer. [Sammenligningen vår av Molly og Signal](/no/articles/molly-vs-signal/) omtaler WebSocket og UnifiedPush. Ikke anta at alle apper trenger Google Play for varsler.

## Installasjon og Google-konto

GrapheneOS anbefaler å starte med **Owner-profilen** for enkelhets skyld; appene er fortsatt i sandkasse. En separat bruker- eller arbeidsprofil kan begrense hvilke apper som kan bruke Play-tjenestene, men gjør varsler og profilbytte mer komplisert. **Innlogging på Google-konto er valgfritt for Play-tjenestene, men nødvendig for å installere apper via Play Store og for kjøp i apper.** **Play Store installeres sammen med Play services fordi komponentene er gjensidig avhengige**, selv om du bare trenger FCM. Du kan la butikken være ubrukt og forbli utlogget for tjenester som ikke krever konto; dette er ikke en støttet måte å installere Play services *uten* Play Store på. Kompatibilitetslaget støtter også lisenskontroll og oppdateringer, men fjerner ikke butikkens kontokrav.

## Posisjonstjenester

GrapheneOS **sender som standard Google Play-forespørsler om posisjon videre til operativsystemets egen posisjonsløsning**. Systemet har også en valgfri nettverksposisjonstjeneste. Bruk av Googles nettverksposisjon krever endringer i Play-innstillingene og flere tillatelser; dette er ikke nødvendig for vanlige posisjonsforespørsler fra apper. Se [GrapheneOS sin veiledning om posisjon](https://grapheneos.org/usage#sandboxed-google-play).

## Separate brukerprofiler

GrapheneOS støtter Androids brukerprofiler. Du kan installere Google Play i én profil og la en annen være uten. **Profiler skiller appdata og appinstallasjoner**, men gir ingen garanti for anonymitet. Innlogging i de samme tjenestene kan fortsatt knytte aktivitet sammen.

Profiler kan være nyttige når én nødvendig app krever Google Play, mens resten av appene dine ikke gjør det.

## Hva med bankapper, betaling og DRM?

**Ikke lov bort kompatibilitet uten å teste den aktuelle appen.** Enkelte bank-, betalings-, strømme- og bedriftsapper kontrollerer enhetsintegritet, sertifisering eller proprietære tjenester. **Play Integrity er en viktig årsak:** Apper som krever Googles vurdering av enhetsintegritet eller sterk maskinvarebasert attestasjon gjennom Play Integrity, kan avvise GrapheneOS selv med Play i sandkasse. Dette må skilles fra Androids egen maskinvareattestasjon, som kan verifisere GrapheneOS dersom apputvikleren uttrykkelig godtar prosjektets signeringsnøkler. Se [GrapheneOS sin veiledning for attestasjon](https://grapheneos.org/articles/attestation-compatibility-guide).

**Kontaktløs betaling med Google Wallet fungerer ikke på GrapheneOS** under Googles gjeldende sertifiseringskrav. Play i sandkasse løser ikke dette. Begrensningen gjelder NFC-kortbetaling via Wallet, ikke nødvendigvis alle Wallet-funksjoner eller andre leverandørers betalingsapper. Se [GrapheneOS-prosjektets omtale av NFC-alternativer](https://discuss.grapheneos.org/d/24640-are-there-any-nfc-payment-apps-that-work-on-graphene-os).

Før du bytter telefon, bør du undersøke appene du er avhengig av, spesielt norske bankapper, BankID, betaling, jobbautentisering og nødkommunikasjon. Behold en fungerende telefon til du har testet overgangen.

## Når er Google Play i sandkasse verdt å bruke?

| Situasjon | Praktisk valg |
| --- | --- |
| Alle nødvendige apper fungerer uten Google-komponenter | **La Google Play være uinstallert.** |
| En nødvendig app krever FCM eller Play-API-er | **Prøv Google Play i sandkasse** i riktig profil og test varsler. |
| Du trenger Play Store eller betalte Play-kjøp | **Vurder installasjon**, med bevissthet om konto og data. |
| Du vil isolere Google-avhengige apper | **Bruk en egen brukerprofil** hvis bytte og varslinger fungerer for deg. |
| En nødvendig app avviser enheten på grunn av integritetssjekker | **Ikke anta at sandkassen løser det.** Behold et alternativ som fungerer. |

## Hvordan vi vil teste

En framtidig praktisk sammenligning bør registrere Pixel-modell, GrapheneOS-versjon, Play-komponentversjoner, appversjoner, kontostatus og tillatelser. Vi vil sammenligne installasjon, varsler, batteribruk og observerbar nettverkstrafikk med **uten Play**, **Play i sandkasse uten innlogging** og **Play i sandkasse med innlogging**.

En nettverksmåling alene kan ikke bevise at sporing ikke forekommer. Inntil dette er testet, er artikkelen **dokumentasjonsbasert**.

## Konklusjon

**Google Play i sandkasse er verdt å aktivere når det løser et reelt kompatibilitetsproblem.** Verdien ligger i valgfrihet og mindre privilegert integrasjon, **ikke** i at Google-apper automatisk blir private. Trenger du ikke tjenestene, er det enklest å la være å installere dem.

For flere avveininger, les [GrapheneOS forklart: Hvem passer det for?](/no/articles/grapheneos-explained-who-should-use-it/) og [Google Pixel og personvern](/no/articles/google-pixel-privacy-less-oem-bloat/).

## Primærkilder

- [GrapheneOS: Google Play i sandkasse](https://grapheneos.org/usage#sandboxed-google-play)
- [GrapheneOS: funksjoner](https://grapheneos.org/features)
- [GrapheneOS: appkompatibilitet](https://grapheneos.org/usage#app-compatibility)
- [GrapheneOS: brukerprofiler](https://grapheneos.org/features#improved-user-profiles)
- [Android Developers: appsandkassen](https://source.android.com/docs/security/app-sandbox)
- [Firebase: Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)

- [GrapheneOS: attestasjon og appkompatibilitet](https://grapheneos.org/articles/attestation-compatibility-guide)
- [GrapheneOS: bankapper](https://grapheneos.org/usage#banking-apps)
- [GrapheneOS: alternativer for NFC-betaling (prosjektsvar)](https://discuss.grapheneos.org/d/24640-are-there-any-nfc-payment-apps-that-work-on-graphene-os)
