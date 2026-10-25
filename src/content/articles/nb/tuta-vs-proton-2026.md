---
title: "Tuta mot Proton i 2026: E-post, kalender, Linux og den kommende Drive-konkurransen"
description: "En dokumentasjonsbasert sammenligning av Tuta og Proton, inkludert e-postklienter, kryptering, priser og Tuta Drives lukkede betatest."
category: deep-dives
lang: nb
date: 2026-10-16
tags: [tuta, proton, epost, kalender, drive, linux, personvern, kryptering]
series: "Privacy & Digital Independence"
translationKey: tuta-vs-proton-2026
draft: false
tested: false
evidence: documentation
---

> **Redaksjonell status – 16. oktober 2026:** Dokumentasjonsbasert sammenligning, ikke en praktisk ytelsestest, sikkerhetsrevisjon eller uavhengig kryptografisk verifikasjon. Funksjoner, priser og betatilgang kan endres. Se primærkildene nedenfor.

> **Kommersiell åpenhet:** HackShack Labs utgis av Ploos AS, som deltar i Protons affiliate-program. Denne artikkelen inneholder **ingen sporbare affiliate-lenker**. Avtalen påvirker ikke konklusjonene våre. Tuta og Proton vurderes etter de samme praktiske kriteriene.

## Kortversjonen

**Tuta** er interessant dersom du ønsker kryptert e-post og kalender med egne Linux-programmer, og kan klare deg uten vanlig IMAP/SMTP-tilgang. **Proton** har et bredere økosystem i dag: e-post, kalender, Drive, Docs, Sheets, passordbehandling og VPN. Proton Mail Bridge gir kvalifiserte abonnenter en løsning for tradisjonelle e-postprogrammer; Tuta tilbyr ikke generell IMAP/POP3/SMTP-tilgang.

**Tuta Drive finnes, men er foreløpig ikke et allment tilgjengelig alternativ til Proton Drive.** Tuta annonserte en **invitasjonsbasert lukket beta 16. april 2026**. Vi skal ikke regne planlagte funksjoner som tilgjengelige for alle.

## Sammenligning: det som faktisk betyr noe

| Kriterium | Tuta | Proton |
| --- | --- | --- |
| E-post | Kryptert e-posttjeneste med egne klienter | Kryptert e-posttjeneste med egne klienter |
| Tredjeparts e-postprogram | Ingen generell IMAP/POP3/SMTP-tilgang | Bridge gir IMAP/SMTP på kvalifiserte abonnement |
| Kalender | Kryptert kalender med Linux-støtte | Kryptert Proton Calendar |
| Fillagring | Tuta Drive i invitasjonsbasert lukket beta (bekreftet april 2026); offentlig tilgjengelighet ikke dokumentert her | Proton Drive er allment tilgjengelig |
| Dokumentredigering | Ikke forutsatt at Tuta har en tilsvarende Docs-tjeneste | Proton Docs og Sheets er tilgjengelige |
| Linux | Offisiell AppImage og Flatpak, med begrensninger i støttede distribusjoner | Støtten varierer mellom produktene; Drive CLI finnes for Linux, mens offisiell synkroniseringsbeta står på veikartet |
| Andre tjenester | E-post, kalender og Drive under utvikling | VPN, Pass, Drive, Docs, Sheets og flere tjenester |
| Migrering | Kontroller eksport/import og klientbegrensninger før flytting | Kontroller Bridge, eksport og Drive-nedlasting/CLI før flytting |

Dette er en **sammenligning av funksjoner, ikke en sikkerhetsrangering**. Begreper som «kvantesikker» eller «zero-knowledge» beviser ikke alene at et helt produkt er sikrest for alle.

## Kryptering: skill påstander fra dokumentasjon

Tuta beskriver **TutaCrypt** og beskyttelse mot framtidige kvantetrusler. Proton dokumenterer sin ende-til-ende-kryptering og kryptografiske forbedringer. Vi bør undersøke hvilke data og metadata som beskyttes, hvordan nøkler håndteres, hva som skjer ved e-post til eksterne mottakere, og hvilke påstander som er uavhengig kontrollert. Vi har **ikke revidert implementasjonene**.

Hos begge leverandørene har vanlig e-post begrensninger: Ikke anta at enhver melding til eksterne mottakere automatisk er ende-til-ende-kryptert uten en særskilt sikker leveringsmekanisme. Transportkryptering og kryptert lagring er ikke det samme som ende-til-ende-kryptering.

## Linux og kompatibilitet

Tuta har en offisiell Linux-klient, men opplyser uttrykkelig at tredjepartsprogrammer ikke kan koble til via IMAP/POP3/SMTP. Det er et arkitekturvalg, ikke bare en manglende innstilling.

Proton Mail Bridge støtter tradisjonelle e-postprogrammer på kvalifiserte abonnement. Proton lanserte dessuten **Drive CLI for Linux i juni 2026**, men veikartet fra oktober 2026 omtaler fremdeles en offisiell Linux-beta for synkronisering som framtidig arbeid. En CLI er **ikke** det samme som en støttet grafisk synkroniseringsklient.

Bruker du Thunderbird, lokale e-postarkiver eller automatisering, må du kontrollere nøyaktig hvilken integrasjon som støttes før du bytter.

## Tuta Drive: hvorfor vi følger utviklingen

Tuta annonserte **invitasjonsbasert lukket beta 16. april 2026**. Det dokumenterer en betaversjon, men ikke en dato for generell lansering, offentlig pris, full plattformstøtte eller pålitelig synkronisering. Vi gir derfor ikke Tuta poeng for udokumenterte funksjoner innen sikkerhetskopiering, deling eller samarbeid.

Når flere får tilgang, bør vi teste filopplasting og -nedlasting, mappestrukturer, avbrutte overføringer, delingsrettigheter, eksport, Linux-bruk og totalkostnad. Vi må bruke samme datasett og metode for Proton Drive.

## Priser og egne domener

Tutas annonserte personlige abonnement ved **årlig betaling** omfatter Free (1 GB), Revolutionary (€3 per måned, 20 GB) og Legend (€8 per måned, 500 GB). Dette er oppgitte priser, ikke uavhengig verifiserte sluttbeløp. Vilkår og avgifter kan variere. Tuta tilbyr egne domener på betalte abonnement. Proton støtter også egne domener på aktuelle abonnement, men pakkene og lagringskvotene er forskjellige. Sammenlign **hele årskostnaden for funksjonene du faktisk trenger**.

Vi må ikke sammenligne Tutas e-postlagring og Protons samlede tjenestelagring som om de var identiske produkter.

## Flytting: domenekontroll og kontogjenoppretting

Bruker du eget domene, må du kontrollere tilgangen til domeneregistraren og DNS før du bytter leverandør. Planlegg endringer i MX, SPF, DKIM og DMARC etter leverandørenes oppdaterte veiledninger, og ta høyde for DNS-forplantning. Eksporter eller arkiver e-post og kalendere med støttede metoder **før** du sier opp den gamle kontoen. Test import og kalenderinvitasjoner i stedet for å anta at alle etiketter, mapper, kontakter og avtaler overføres feilfritt. Behold om mulig den gamle tjenesten tilgjengelig under en kontrollert overgang.

Kontroller også kontogjenoppretting, tofaktorenheter og e-postadresser som brukes til å gjenopprette andre tjenester. Hvis den gamle e-postkontoen er gjenopprettingsadresse for domeneregistrar, passordbehandler eller bank, kan et uforberedt bytte føre til at du mister tilgangen. Flyttbarhet og kryptering fjerner ikke slike praktiske avhengigheter.

## Hvem bør velge hva?

- **Vurder Tuta** hvis e-post og kalender er viktigst, du liker leverandørens egne klienter og ikke trenger standard e-postprotokoller.
- **Vurder Proton** hvis du trenger et bredere tjenestetilbud nå, eller vil bruke Bridge med tradisjonelle e-postprogrammer.
- **Vent med å bytte** dersom Tuta Drive er avgjørende. En lukket beta er ikke et godt grunnlag for å flytte kritiske filer.
- **Behold det som fungerer** hvis dagens løsning dekker behovene. Et nytt abonnement er ikke automatisk en forbedring.

## Hva må testes videre?

Vi har ikke gjennomført praktiske sammenligninger av kontoene. En framtidig laboratorietest bør registrere abonnement, operativsystem, klientversjoner, DNS for egne domener, import/eksport, frakoblet bruk, kalenderinvitasjoner og filoperasjoner når Tuta Drive blir tilgjengelig. Sikkerhet må vurderes mot konkrete trusselmodeller, ikke en enkel vinneretikett.

## Kilder og videre lesning

- [Tuta: Drive i lukket beta, 16. april 2026](https://tuta.com/blog/tuta-drive-in-beta-launch)
- [Tuta: abonnement og priser](https://tuta.com/pricing)
- [Tuta: klienter, protokollbegrensninger og migrering](https://tuta.com/support/howto)
- [Tuta: kryptering og sikkerhet](https://tuta.com/support/security)
- [Proton: Mail-abonnement og funksjoner](https://proton.me/mail/pricing)
- [Proton: Drive-veikart og Linux CLI](https://proton.me/drive/roadmap)
- [Proton: veikart for høsten/vinteren 2026](https://proton.me/blog/2026-autumn-winter-roadmaps)
- [Relatert: Proton Mail mot egen e-postserver](/no/articles/proton-mail-vs-self-hosted-email/)
- [Relatert: Proton Drive og Docs mot Nextcloud](/no/articles/proton-drive-docs-vs-nextcloud/)

*Kilder kontrollert 16. oktober 2026. Artikkelen er basert på leverandørdokumentasjon og er ikke praktisk testet.*
