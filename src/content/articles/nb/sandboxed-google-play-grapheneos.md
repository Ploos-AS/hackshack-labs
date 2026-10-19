---
title: "Google Play i sandkasse på GrapheneOS: Hva er forskjellen?"
description: "Hvordan valgfrie Google Play-tjenester fungerer på GrapheneOS, hva sandkassen endrer, og når det er fornuftig å installere dem."
category: guides
lang: nb
date: 2026-10-19
tags: [grapheneos, android, google-play, personvern, sikkerhet]
series: "Privacy & Digital Independence"
translationKey: sandboxed-google-play-grapheneos
draft: true
tested: false
evidence: documentation
---

> **Redaksjonell status – 19. oktober 2026:** Dokumentasjonsbasert guide. Vi har ikke installert GrapheneOS eller målt Google Play-nettverkstrafikk på en testtelefon. Ingen sponsing eller affiliate-lenker.

## Kort fortalt

**GrapheneOS kan kjøre Google Play-tjenester som vanlige apper i sandkasse, i stedet for å gi dem den privilegerte systemintegrasjonen de har på vanlige Google-sertifiserte Android-enheter.** Installasjonen er valgfri. Det endrer **tillatelser og tillitsgrenser**, ikke Googles forretningsmodell eller hvilke opplysninger du selv deler med Google.

**Vår anbefaling:** Begynn uten Google Play hvis appene dine fungerer. Installer Google Play i sandkasse først når en app du trenger krever det, og vurder hvilke tillatelser og kontofunksjoner du vil bruke.

## Hva installeres?

GrapheneOS tilbyr et valgfritt kompatibilitetslag for tre Google-komponenter: **Google Play services, Google Play Store og Google Services Framework**. Installer dem via GrapheneOS-appen **Apps**, ikke fra tilfeldige APK-nettsteder. GrapheneOS dokumenterer riktig installasjonsrekkefølge og avhengigheter.

I motsetning til privilegerte systemtjenester på vanlig Android kjører disse komponentene i den ordinære Android-sandkassen. De får ikke automatisk ekstra systemrettigheter bare fordi Google har laget dem.

## Hva betyr «sandkasse»?

| Spørsmål | Vanlig Pixel Android | GrapheneOS med Google Play i sandkasse |
| --- | --- | --- |
| Google Play-integrasjon | Privilegert systemintegrasjon | Vanlige apper med kompatibilitetslag |
| Installasjon | Del av standardsystemet | Valgfritt, per brukerprofil |
| Tillatelser | Android-tillatelser og privilegerte integrasjoner | Vanlige apptillatelser; GrapheneOS har blant annet nettverkstillatelse |
| Google-konto | Vanlig del av standardoppsettet | Valgfri; enkelte apper og Play Store-funksjoner kan kreve innlogging |
| Appkompatibilitet | Oppsettet Google utvikler for | Mange apper fungerer, men integritetssjekker og proprietære funksjoner kan feile |
| Data til Google | Avhenger av innstillinger og bruk | Avhenger også av innstillinger og bruk; ikke målt her |

Tabellen beskriver arkitektur, **ikke en målt reduksjon i sporing**. Kompatibilitetslaget kan gi apper nødvendig funksjonalitet samtidig som den ordinære appsandkassen beholdes.

## Hva kan Google Play gjøre?

Google-komponentene kan kommunisere over nettverket når de har tillatelse. Logger du inn på Google-kontoen eller bruker Google-avhengige apper, kan Google fortsatt motta opplysninger om aktiviteten. Sandkassen **gjør deg ikke anonym**, fjerner ikke all telemetri og hindrer ikke apper i å spore deg via egne kontoer.

Samtidig kan en vanlig Google-app i sandkassen ikke automatisk omgå Androids tillatelsesmodell fordi den kommer fra Google. Gi bare tillatelser du trenger, men vær klar over at begrensninger kan ødelegge funksjonalitet.

## Varsler og bakgrunnsaktivitet

Mange Android-apper bruker **Firebase Cloud Messaging (FCM)** gjennom Google Play services. Installasjon av Google Play i sandkasse kan gjøre at slike apper får varsler igjen. GrapheneOS beskriver særskilt håndtering av bakgrunnskjøring for at pushvarsler skal fungere. Resultatet avhenger av batteriinnstillinger, appversjoner og enhetsoppsett.

Noen apper tilbyr andre varslingsmekanismer. [Sammenligningen vår av Molly og Signal](/no/articles/molly-vs-signal/) omtaler WebSocket og UnifiedPush. Ikke anta at alle apper trenger Google Play for varsler.

## Separate brukerprofiler

GrapheneOS støtter Androids brukerprofiler. Du kan installere Google Play i én profil og la en annen være uten. **Profiler skiller appdata og appinstallasjoner**, men gir ingen garanti for anonymitet. Innlogging i de samme tjenestene kan fortsatt knytte aktivitet sammen.

Profiler kan være nyttige når én nødvendig app krever Google Play, mens resten av appene dine ikke gjør det.

## Hva med bankapper, betaling og DRM?

**Ikke lov kompatibilitet uten å teste den aktuelle appen.** Enkelte bank-, betalings-, strømme- og bedriftsapper kontrollerer enhetsintegritet, sertifisering eller proprietære tjenester. Google Play i sandkasse garanterer ikke at disse kontrollene godkjennes.

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

For flere avveininger, les [GrapheneOS forklart: Hvem passer det for?](/no/articles/grapheneos-explained-who-should-use-it/).

## Primærkilder

- [GrapheneOS: Google Play i sandkasse](https://grapheneos.org/usage#sandboxed-google-play)
- [GrapheneOS: funksjoner](https://grapheneos.org/features)
- [GrapheneOS: appkompatibilitet](https://grapheneos.org/usage#app-compatibility)
- [GrapheneOS: brukerprofiler](https://grapheneos.org/features#improved-user-profiles)
- [Android Developers: appsandkassen](https://source.android.com/docs/security/app-sandbox)
- [Firebase: Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
