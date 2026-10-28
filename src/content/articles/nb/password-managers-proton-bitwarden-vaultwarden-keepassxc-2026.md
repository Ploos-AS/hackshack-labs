---
title: "Proton Pass mot Bitwarden, Vaultwarden og KeePassXC: Hvilken passordbehandler bør du velge i 2026?"
description: "En uavhengig skrevet sammenligning av passordbehandlere med skytjeneste, selvhosting og lokal kryptert database."
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

> **Reklame – annonselenke:** Lenken til Proton Pass i artikkelen er en affiliatelenke. Ploos AS kan få provisjon uten ekstra kostnad for deg. Lenkene til Bitwarden, Vaultwarden og KeePassXC er vanlige lenker uten affiliate-sporing. Kommersielle avtaler påvirker ikke anbefalingene våre.

## Kort fortalt

**Har du allerede en passordbehandler du stoler på og er fornøyd med? Da trenger du sannsynligvis ikke bytte.** For nye brukere er [Bitwarden](https://bitwarden.com/) et godt allround-utgangspunkt. [Proton Pass (annonselenke)](https://go.getproton.me/SH33k) passer for dem som foretrekker Protons administrerte løsning og identitetsfunksjoner. [KeePassXC](https://keepassxc.org/) er et godt valg for lokal, offline-orientert bruk på datamaskin, mens [Vaultwarden](https://github.com/dani-garcia/vaultwarden) passer for dem som ønsker å drifte en kompatibel server selv.

Dette er ikke fire identiske produkter. Proton Pass og Bitwarden tilbyr tjenester og klienter. Vaultwarden er en fellesskapsutviklet server som er kompatibel med mange Bitwarden-klienter. KeePassXC bruker i hovedsak en lokal kryptert database.

## Sammenligning

| Spørsmål | Proton Pass | Bitwarden | Vaultwarden | KeePassXC |
| --- | --- | --- | --- | --- |
| Vanlig oppsett | Skytjeneste | Skytjeneste eller offisiell selvhosting | Uoffisiell, selvhostet Bitwarden-kompatibel server | Lokal kryptert database |
| Servervedlikehold | Leverandøren | Leverandøren eller deg | Deg | Ingen server nødvendig |
| Offline-bruk | Kontroller klientens oppførsel | Kontroller klientens oppførsel | Avhenger av klient og synkronisering | Ja, lokal database |
| Deling/synkronisering | Tjenestefunksjoner, avhengig av abonnement | Tjeneste eller egen server | Krever drift og sikkerhetskopiering | Egen synkroniseringsløsning ved behov |
| Passer best for | Enkel, administrert løsning | Fleksibelt standardvalg | dem som liker å drifte selv | Lokal kontroll |
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

Ikke eksponer en ny Vaultwarden-instans mot internett uten en sikkerhetsplan. Bruk HTTPS, sikker kontoregistrering, sterk autentisering, raske oppdateringer, begrenset administrasjon, krypterte sikkerhetskopier utenfor serveren og **testet gjenoppretting**. En Docker-container er verken en sikkerhetskopi eller en fullstendig sikkerhetsgrense.

Prosjekt: [Vaultwarden på GitHub](https://github.com/dani-garcia/vaultwarden).

## KeePassXC: offline som utgangspunkt

KeePassXC lagrer passord i en kryptert lokal database. Du trenger ingen obligatorisk skykonto eller server. Dette passer godt for dem som ønsker lokal kontroll og er komfortable med å håndtere synkronisering, sikkerhetskopiering og gjenoppretting selv. Flere enheter er mulig, men krever gjennomtenkt oppsett og håndtering av databasekonflikter.

Prosjekt: [KeePassXC](https://keepassxc.org/).


## Hva får du gratis?

**Kontrollert mot prosjektdokumentasjon 15. oktober 2026; ikke testet uavhengig.** Dette er en funksjonsoversikt, ikke en garanti for fremtidige priser eller abonnement.

| Produkt | Gratis utgangspunkt | Når betaling kan være aktuelt | Uten internett |
| --- | --- | --- | --- |
| Proton Pass | Gratis konto og grunnleggende passordhvelv | Avanserte aliaser, deling og andre abonnementsavhengige funksjoner; se [gjeldende abonnementer](https://proton.me/pass/pricing) | Offline-tilgang avhenger av appen og om data allerede er synkronisert; **ikke anta at en ny enhet kan logge inn offline** |
| Bitwarden | Gratis individuell konto med passordbehandling | Organisasjon, familie og enkelte avanserte sikkerhetsfunksjoner; se [abonnementer](https://bitwarden.com/pricing/) | Installerte klienter kan under bestemte forhold bruke lokalt bufrede hvelvdata; endringer og første innlogging krever tilkobling. Se [offline-bruk](https://bitwarden.com/help/using-bitwarden-offline/) |
| Vaultwarden | Gratis serverprogramvare med åpen kildekode | Hosting, sikkerhetskopier, domene og tidsbruk; ikke et vanlig brukerabonnement | Avhenger av Bitwarden-kompatibel klient og lokalt lagrede data, ikke bare om serveren er tilgjengelig |
| KeePassXC | Gratis skrivebordsprogram med åpen kildekode | Ingen programvareabonnement; eventuelle kostnader til synkronisering eller sikkerhetsnøkkel | Åpner en tilgjengelig lokal KDBX-database uten nett |

Et betalt abonnement er ikke nødvendigvis sikrere for en enkeltbruker. Kontroller at funksjonen du faktisk trenger er inkludert **før** du betaler.

## Åpen kildekode, revisjoner og leverandørrisiko

Alle fire har offentlig tilgjengelig kildekode for vesentlige komponenter, men **åpen kildekode er ikke det samme som en uavhengig sikkerhetsrevisjon**. Omfang, dato, testet versjon og oppfølging av funn er viktig. Se [Protons sikkerhetsinformasjon](https://proton.me/pass/security), [Bitwardens revisjoner og samsvar](https://bitwarden.com/compliance/), [Vaultwardens kildekode](https://github.com/dani-garcia/vaultwarden) og [KeePassXCs dokumentasjon](https://keepassxc.org/docs/). Denne artikkelen **bekrefter ikke uavhengig** omfanget eller resultatet av revisjoner.

Skytjenester gir avhengighet av leverandørens tilgjengelighet, kontotilgang, jurisdiksjon og videre drift. Proton er basert i Sveits, Bitwarden i USA. Med Vaultwarden og KeePassXC velger du selv hvor data lagres, men du får også ansvaret for miljøet. Dersom leverandøren blir kjøpt, hacket eller lagt ned, er **en oppdatert eksport som faktisk kan brukes og en gjenopprettingsplan** viktigere enn merkevaren. Kryptering reduserer eksponering, men fjerner ikke risiko fra kompromitterte enheter eller ondsinnede klienter.

Ende-til-ende-kryptering og nullkunnskapsmodeller har også en konsekvens: Leverandøren kan være ute av stand til å gjenopprette hvelvet hvis du mister hovedpassordet og alle tilgjengelige gjenopprettingsmetoder. **Test gjenoppretting mens du fortsatt har tilgang**; ikke anta at kundestøtte kan dekryptere dataene.

## En kompromittert server er fortsatt farlig

En server som bare lagrer krypterte hvelvdata, skal normalt ikke kunne lese innholdet direkte. Det betyr **ikke** at serveren står utenfor tillitskjeden. En kompromittert server som leverer et nettbasert hvelv, kan potensielt sende ondsinnet JavaScript til nettleseren, fange opp hemmeligheter eller manipulere autentiseringen. Installerte klienter reduserer akkurat denne risikoen knyttet til kode levert fra nettserveren, men krever fortsatt pålitelige oppdateringer og sikre enheter. Behandle Vaultwarden-oppdateringer og administrasjon som sikkerhetskritisk. Se [Vaultwarden-wikien](https://github.com/dani-garcia/vaultwarden/wiki) og [Bitwardens sikkerhetsdokumentasjon](https://bitwarden.com/help/bitwarden-security-white-paper/).

## Hold tofaktoren adskilt fra hvelvet

Det er praktisk å lagre TOTP-koder sammen med passordene, men et kompromittert **opplåst hvelv** kan avsløre begge deler. Det gir ikke samme adskillelse som en egen autentiseringsapp eller sikkerhetsnøkkel. Beskytt hvelvkontoen med en **FIDO2/WebAuthn-sikkerhetsnøkkel** der dette støttes, oppbevar reserve­nøkler eller gjenopprettingskoder separat, og bruk en lang, unik passfrase som hovedpassord. KeePassXC støtter også ekstra databasebeskyttelse som nøkkelfiler og støttede YubiKey-konfigurasjoner med utfordring–respons; forstå konsekvensene for sikkerhetskopiering før du aktiverer dette. Se [KeePassXC-brukerveiledningen](https://keepassxc.org/docs/KeePassXC_UserGuide) og [Bitwardens tofaktordokumentasjon](https://bitwarden.com/help/setup-two-step-login/).

## KeePassXC på mobil

KeePassXC er et **skrivebordsprogram**, ikke en offisiell KeePassXC-app for mobil. Andre apper som støtter KDBX-databaser, er [KeePassDX for Android](https://www.keepassdx.com/), [Strongbox for iOS](https://strongboxsafe.com/) og [KeePassium for iOS](https://keepassium.com/). Dette er uavhengige produkter med egne vilkår og funksjoner. [Syncthing](https://syncthing.net/) kan brukes til å synkronisere databasefilen, men samtidige endringer og konflikter må håndteres. Kontroller kompatibilitet og sikkerhetskopiering før du baserer deg på løsningen.

## Avgrensning: hva sammenligner vi ikke?

Dette er en **sammenligning av fire alternativer**, ikke en rangering av alle passordbehandlere. Apples innebygde Passord/iCloud-nøkkelring, passordbehandlere i nettlesere, 1Password og andre kommersielle produkter er relevante alternativer. Å fortsette med en eksisterende og oppdatert innebygd løsning kan være tryggere enn en forhastet flytting. Vi valgte disse fire for å belyse skytjeneste, offisiell selvhosting, fellesskapsutviklet selvhosting og lokal database.

## Les også på HackShack Labs

- [Proton-økosystemet](/no/articles/proton-ecosystem-overview/) om avveininger mellom tjenester.
- [Hvorfor mini-PC-er er gode homelab-servere](/no/articles/why-mini-pcs-make-excellent-homelab-servers/) om maskinvare.
- [Proton VPN, Docker og Gluetun](/no/articles/proton-vpn-linux-docker-gluetun/) om forskjellen på oppsett og verifisert sikkerhet.

## Neste eksperiment: migrering mellom løsninger

En nyttig oppfølger er å teste eksport og import mellom løsningene med **utelukkende syntetiske testdata**. Dokumenter hvilke brukernavn, adresser, notater, egendefinerte felt, vedlegg, TOTP-hemmeligheter og passkeys som faktisk overlever hver flytting. Test gjenoppretting fra sikkerhetskopi. Publiser resultatene først når de er reprodusert på dokumenterte versjoner.

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

## Eksportformater: flyttbarhet er ikke det samme som gjenopprettbar sikkerhetskopi

**Bitwarden:** Kryptert JSON-eksport finnes med ulike egenskaper. En **kontobundet** eksport kan bare importeres i kontoen som laget den, og kan bli ubrukelig etter rotasjon av krypteringsnøkkelen. En **passordbeskyttet** kryptert eksport kan importeres til en annen Bitwarden-konto ved hjelp av eksportpassordet. Ingen av delene garanterer at alle vedlegg eller passnøkler følger med. Se [Bitwardens eksportdokumentasjon](https://bitwarden.com/help/encrypted-export/).

**Proton Pass:** [Den offisielle eksportveiledningen](https://proton.me/nb/support/pass-export) beskriver ZIP med PGP-kryptert JSON, ukryptert ZIP og CSV. Eksport er dokumentert fra nettleserutvidelsen, nettappen og Windows-programmet, **ikke fra mobilappene**. Ved flytting til en annen leverandør kan det være nødvendig å dekryptere eksporten først; behandle den resulterende JSON-filen som svært sensitiv.

**KeePassXC:** [Brukerveiledningen](https://keepassxc.org/docs/KeePassXC_UserGuide) beskriver eksport av passnøkler til filer med endelsen `.passkey`. **Disse filene er ukrypterte** og må sikres som andre klarteksteksporter. Kontroller at mottakerprogrammet faktisk støtter import av hvert element før du regner flyttingen som mulig.

**Vaultwarden:** Dette er en [uoffisiell Bitwarden-kompatibel server](https://github.com/dani-garcia/vaultwarden), ikke en tjeneste drevet av Bitwarden. Sikkerhetskopiering av database, vedlegg, krypteringsmateriale og konfigurasjon krever en egen testet gjenopprettingsprosedyre. En eksport fra klienten erstatter ikke nødvendigvis en komplett serversikkerhetskopi.

## Sikker flytting mellom passordbehandlere

1. Lag og test sikkerhetskopi av den gamle databasen.
2. Kontroller at den nye løsningen støtter feltene du trenger.
3. Eksporter bare på en betrodd enhet; mange eksportformater er **ukryptert klartekst**.
4. Importer og kontroller et utvalg innlogginger, notater og tofaktorinnstillinger.
5. Behold den gamle databasen til den nye løsningen er verifisert.
6. Fjern midlertidige klarteksteksporter på en forsvarlig måte og kontroller sikkerhetskopier og synkroniseringsmapper.

Ikke anta at passkeys eller vedlegg følger med ved flytting.

**Forbehold om klarteksteksport:** Å slette en CSV- eller JSON-fil garanterer ikke at innholdet er ugjenopprettelig, særlig på SSD-er, i øyeblikksbilder, skysynkroniserte mapper eller automatiske sikkerhetskopier. Velg et støttet kryptert eksportformat der det finnes. Hvis klarteksteksport er nødvendig, opprett filen kun på en betrodd enhet og i et kontrollert, kryptert lagringsområde, hold den utenfor synkronisering og sikkerhetskopiering, importer raskt og fjern midlertidige kopier etterpå. Vanlig filsletting er ingen garanti for sikker sletting på flashlagring. Ved migrering med høyere risiko bør du bruke et egnet isolert, midlertidig miljø og kontrollere den nye løsningen før det gamle hvelvet avvikles.

## Vår vurdering: velg etter behov

| Din situasjon | Begynn med å vurdere | Tenk deg om hvis … |
| --- | --- | --- |
| Du vil ha en administrert løsning på flere enheter | Bitwarden | Du krever fullstendig offline-bruk |
| Du bruker allerede Proton og verdsetter integrerte identitetsfunksjoner | Proton Pass | Du vil unngå avhengighet av én leverandør |
| Du ønsker en lokal database på datamaskinen | KeePassXC | Du trenger enkel administrasjon av delte hvelv |
| Du driver homelab og tar ansvar for sikkerhetsvedlikehold | Vaultwarden | Du ikke kan følge opp oppdateringer, overvåking og gjenoppretting |

Dette er **anbefalinger etter bruksområde**, ikke en rangering basert på laboratorietester. Vi har ikke målt ytelse, revidert kryptografien eller verifisert gjeldende abonnementspriser for denne artikkelen.

## Kilder og videre lesning

- [Proton Pass](https://proton.me/pass)
- [Bitwarden](https://bitwarden.com/)
- [Bitwardens offisielle guide for selvhosting](https://bitwarden.com/help/install-on-premise-linux/)
- [Vaultwarden-prosjektet](https://github.com/dani-garcia/vaultwarden)
- [KeePassXC-prosjektet](https://keepassxc.org/)

*Sist redaksjonelt gjennomgått: 15. oktober 2026. Artikkelen inneholder en tydelig merket affiliatelenke til Proton Pass.*
