---
title: "Bygg en rimelig elektronikkbenk: Fra null til et funksjonelt hjemmelaboratorium"
description: "En praktisk guide til rimelig elektronikkutstyr: hva du bør kjøpe først, hva som kan vente, og hvordan du velger Linux-vennlige instrumenter."
category: guides
lang: nb
date: 2026-10-19
tags: [elektronikk, laboratorieutstyr, multimeter, usb-seriell, lodding, aliexpress]
series: "Electronics Lab"
translationKey: low-cost-electronics-test-bench
draft: true
tested: false
evidence: documentation
---

> **Redaksjonell status – 19. oktober 2026:** Dokumentasjonsbasert innkjøpsguide under arbeid, **ikke en praktisk produkttest**. Utstyr merket *planlagt* er ikke bekreftet kjøpt eller testet. Pris, tilgjengelighet, elsikkerhetsdokumentasjon og kompatibilitet må kontrolleres før kjøp.
>
> **Merking av affiliate-lenker:** Noen produktlenker er AliExpress-affiliate-lenker. HackShack Labs / Ploos AS kan motta provisjon ved kjøp gjennom dem. Provisjonssats avgjør ikke anbefalingene våre. Vi kan kjøpe utstyr fra andre leverandører når totalprisen er bedre.

## Begynn med oppgavene, ikke handlekurven

En nyttig elektronikkbenk handler om å **måle trygt, strømforsyne kretser sikkert, lage gode forbindelser og dokumentere resultatene**. Du trenger ikke oscilloskop første dag. Du må derimot forstå spennings- og strømgrensene til utstyret.

Guiden er delt i tre nivåer. Kjøp bare det prosjektene krever, og sett av penger til gode prober, kabler, sikringer og oppbevaring.

| Nivå | Grunnutstyr | Hva du kan gjøre |
| --- | --- | --- |
| **1. Minimum** | Egnet digitalt multimeter, breadboard, koblingsledninger, enkelt loddeutstyr, USB-til-TTL-serieadapter | Måle likestrømskretser, bygge prototyper, lese seriellutdata fra mikrokontrollere |
| **2. Hobbylab** | Strømbegrenset laboratorieforsyning, logikkanalysator, ESD-utstyr, avloddeverktøy | Gi prototyper trygg strømforsyning, undersøke digitale signaler, reparere kretskort |
| **3. Avansert hobbylab** | Oscilloskop, elektronisk last, effekt-/energimåler, kalibreringsreferanser ved behov | Undersøke timing, rippel, belastningsrespons og energibruk |

## Valg av instrumentmerker: UNI-T først, alternativer vurderes

Til denne benken vil vi **undersøke UNI-T først** for multimetre, laboratorieforsyninger, oscilloskoper og andre måleinstrumenter, med **FNIRSI** og **ANENG** som alternativer når de gir en fordel i pris, størrelse eller funksjoner. Dette er en **innkjøps- og redaksjonell prioritering, ikke en generell anbefaling av merkene**. Hver modell må vurderes ut fra sikkerhet, målespesifikasjoner, dokumentasjon og Linux-kompatibilitet.

| Instrument | Førstevalg til vurdering | Alternativer | Viktigste kriterier |
| --- | --- | --- | --- |
| Digitalt multimeter | UNI-T | ANENG; FNIRSI | Sikringer, CAT-klasse, inngangsbeskyttelse, nøyaktighet og reparerbarhet |
| Oscilloskop | UNI-T | FNIRSI | Båndbredde, reell samplingshastighet, minne, prober og eksport |
| Laboratorieforsyning | UNI-T | FNIRSI | Strømbegrensning, rippel, sikkerhet, fjernstyring og dokumentasjon |
| Komponent-/LCR-tester | UNI-T | FNIRSI; ANENG der det passer | Måleområder, målemetode og kalibrering |
| USB-/serie- og logikkutstyr | Best dokumenterte enhet | Alle merker med dokumentert protokoll | Linux-drivere, sigrok-støtte og signalnivåer |
| Energimåler for stikkontakt | UNI-T UT230B-EU som kandidat | Alternativer med verifisert sikkerhet og eksport | Riktig støpsel, sikkerhet, lavlastmåling og datagrensesnitt |

**Merkenavnet erstatter aldri dokumentasjon for den konkrete modellen.** Kontroller selger, modell/revisjon, relevant sikkerhetsdokumentasjon og totalpris. Ved instrumenter til strømnettet skal ikke merkelojalitet gå foran elsikkerhet.

Produsentkataloger: [UNI-T laboratorieinstrumenter](https://instruments.uni-trend.com/), [UNI-T måleinstrumenter](https://meters.uni-trend.com/product-categories/), [FNIRSI](https://www.fnirsi.com/). ANENG-modeller er foreløpig kandidater som må vurderes enkeltvis. Vi legger inn affiliate-lenker til **kontrollerte produktannonser**, ikke generelle merkepåstander.

## Tilkoblingskrav: Linux, USB og Bluetooth/BLE

**Linux-kompatibilitet er et høyt prioritert innkjøpskriterium.** En USB-port eller Bluetooth-logo er ikke nok: instrumentet må kunne levere nyttige måledata eller styrekommandoer, ikke bare lade batteriet eller koble til en proprietær mobilapp.

| Krav | Slik kontrollerer vi det |
| --- | --- |
| Linux (Debian/Ubuntu) | Dokumentert driver/protokoll eller troverdig fungerende åpen integrasjon for den konkrete modellen |
| USB | Type datagrensesnitt (CDC/seriell, HID, USBTMC eller proprietært), ikke bare lading |
| Bluetooth/BLE | Lokal GATT-/seriell datatilgang, paring og eventuelle krav om mobil/skykonto |
| Automatisering | Dokumentert SCPI eller annen protokoll, Python-bibliotek eller repeterbar CLI-bruk |
| Logging/eksport | CSV/JSON eller skriptbare målinger med enheter, tidsstempler og kjente samplingsgrenser |
| Vedlikehold | Helst fastvareoppdatering uten Windows; reservedeler og kalibreringsinformasjon |
| Sikkerhet | Egnet beskyttelse og etterprøvbar dokumentasjon for modellen, særlig ved nettspenning |

**Tilkoblingsnivåer:** **A** = verifisert datatilgang/styring fra Linux; **B** = dokumentert protokoll eller troverdig åpen implementasjon, men maskinvaretest gjenstår; **C** = bare leverandørapp/Windows eller uklar protokoll; **D** = intet nyttig datagrensesnitt. Nivåene **erstatter ikke** vurdering av elsikkerhet.

**Eksempler vi vil undersøke, ennå ikke laboratorietestet:** UNI-T UT61E+ har en USB-protokoll dokumentert av miljøet; UNI-T UT60BT har åpen Linux-/BLE-støtte; enkelte ANENG-multimetre med BLE har åpne dekodere. Støtten varierer mellom modeller og fastvare. En Bluetooth-app fra produsenten er ikke dokumentasjon på Linux-kompatibilitet.

Kilder: [UNI-T programvarenedlastinger](https://meters.uni-trend.com/services-support/downloads-1/), [UT61E+ USB-protokoll](https://github.com/mwuertinger/ut61ep), [dmm-tools på flere plattformer](https://github.com/antoinecellerier/dmm-tools), [status for åpne BLE-multimeterprotokoller](https://github.com/libreble/multimeter/blob/main/docs/protocols/README.md).

## Første modellutvalg (dokumentasjonsgjennomgang, ikke testet)

Vi prioriterer instrumenter som kan inngå i en målekjede med **Debian/Ubuntu og Python**. Grensesnittstøtte avhenger av modell og revisjon. Vi legger ikke inn priser eller nye AliExpress-affiliate-lenker før produktannonser og provisjonsvilkår er kontrollert.

| Bruksområde | Modell til vurdering | Dokumentasjon for tilkobling | Prioritet / uavklarte punkter |
| --- | --- | --- | --- |
| Hovedmultimeter | **UNI-T UT61E+** | USB CP2110; åpne Python- og loggeprosjekter | **Høy** – kontroller medfølgende kabel, inngangsbeskyttelse og annonse |
| Trådløst multimeter | **UNI-T UT60BT** | Bluetooth omtalt i åpne verktøy; deler av støtten er eksperimentell | **Vurderes** – bekreft protokoll, BLE og maskinvarerevisjon |
| Budsjettmultimeter | **ANENG AN9002** | Oppført i åpne multimeterverktøy | **Vurderes** – bekreft variant, beskyttelse og Linux-funksjon |
| USB-effektmåler | **FNIRSI FNB58** | Åpent USB/BLE-loggeverktøy med Linux-CLI og CSV/JSON | **Høy** – kontroller revisjon og funksjoner |
| Kompakt laboratorieforsyning | **FNIRSI DPS-150** | Produsenten tilbyr Linux-programvare | **Vurderes** – kontroller styring, strømbegrensning og sikkerhet |
| Energimåler til stikkontakt | **UNI-T UT230B-EU** | Dataeksport ikke dokumentert | **Planlagt** – kontroller sikkerhet, EU-variant og nøyaktighet ved lav last |

**Dokumentasjon:** [UT61E+ Linux/Python](https://github.com/ljakob/unit_ut61eplus), [UNI-T dmm-tools](https://github.com/antoinecellerier/dmm-tools), [ut61xpy for flere merker](https://github.com/olegv142/ut61xpy), [FNIRSI Linux-programvare](https://www.fnirsi.com/pages/software-downloads), [FNIRSI USB-logger](https://github.com/Randomblock1/fnirsi-usb-tool). Dette er opplysninger fra programvareprosjekter, **ikke verifisert i vårt laboratorium**.

**Før kjøp:** Kontroller selger, eksakt modell og fastvare, originalt tilbehør, merkedata, sikkerhetsdokumentasjon, datagrensesnitt, Linux-oppsett, totalpris/MVA og provisjonsberettigelse. Utstyr til nettspenning må tilfredsstille sikkerhetskrav uavhengig av tilkoblingsmuligheter.

## 1. Start med multimeteret

Se etter pålitelige måleledninger, utskiftbare sikringer, egnet inngangsbeskyttelse og tydelig dokumenterte **CAT-klassifiseringer for den konkrete modellen**. Nybegynnere bør starte med **lavspente likestrømskretser**. Et billig multimeter er ikke automatisk trygt ved måling på strømnettet.

**Sjekkliste:** Likespenning og motstand, kontinuitetsmåling, strømområder og sikringer, bruksanvisning, utskiftbare ledninger, garanti og totalpris.

**Aktuell kandidat som hovedmultimeter:** [UNI-T UT61E+ – AliExpress-affiliate](https://s.click.aliexpress.com/e/_c4q9NTqD) (**planlagt kandidat; ikke bekreftet bestilt eller testet**). Kontroller modell, medfølgende USB-grensesnitt/kabel, sikkerhetsdokumentasjon, selger og totalpris før kjøp.

## 2. Strømforsyning: strømbegrensning er viktig

En justerbar likestrømsforsyning med **strømbegrensning** kan beskytte prototyper mot koblingsfeil. Undersøk hvordan begrensningen virker, hvordan utgangen oppfører seg ved oppstart, og om forsyningen kan styres lokalt. USB eller Ethernet, dokumentert SCPI/API og Linux/Python-støtte er ønskelig for automatisering, men ikke nødvendig for den første benken.

Ikke bruk improviserte nettspenningsforsyninger eller udokumenterte moduler med eksponert nettspenning som nybegynnerutstyr.

## 3. USB-til-TTL-adaptere for feilsøking

En USB-til-TTL-adapter er en rimelig måte å feilsøke rutere, mikrokontrollere og innebygde Linux-enheter på. **TTL-UART er verken RS-232 eller USB**: Kontroller signalspenning (ofte 3,3 V eller 5 V), felles jord og pinneoppsett før tilkobling. Ikke koble adapterens strømforsyningspinne uten å forstå strømforsyningen i begge enhetene.

**Planlagte kandidater (ikke kjøpt eller testet):**

- [CH343G USB-til-TTL feilsøkingsmodul – AliExpress-affiliate](https://s.click.aliexpress.com/e/_c3HfSMkp)
- [Industriell FT232RL/CH343G USB-til-TTL-adapter – AliExpress-affiliate](https://s.click.aliexpress.com/e/_c2Ql9dhf)

**Linux-testplan:** Finn USB VID/PID og kjernedriver, test `/dev/ttyUSB*` eller `/dev/ttyACM*`, logikknivå på 3,3 V, stabile baudrater og langvarig serieoverføring. Ikke anta at alle adaptere merket FT232RL har en ekte FTDI-brikke.

## 4. Lodding, avlodding og ESD

Velg en temperaturstyrt loddebolt med utskiftbare spisser og lett tilgjengelig forbruksmateriell. Legg til stabil holder, flussmiddel, loddelisse, pinsett og **effektivt avsug av lodderøyk**. ESD-beskyttelse er viktig for følsomme kretser. Følg produsentens jordingsanvisninger, og improviser aldri tilkoblinger til strømnettet.

Et breadboard og et lite utvalg motstander, kondensatorer og koblingsledninger er ofte mer nyttig enn et dyrt instrument den første uken.

## 5. Logikkanalysator og oscilloskop

En USB-logikkanalysator kan dekode UART, SPI og I²C. Kontroller faktisk samplingsytelse, tillatte inngangsspenninger og **sigrok/PulseView**-støtte for den aktuelle maskinvarerevisjonen. Den erstatter ikke et oscilloskop ved analyse av analoge signaler.

Et oscilloskop er nyttig for timing, bølgeformer, støy og strømforsyning. Sammenlign båndbredde, samplingshastighet, minnedybde, prober og dataeksport til Linux. **Jordklemmen på mange benkoscilloskoper er koblet til vernejord**: Feil måling på strømnettet eller ikke-isolerte kretser kan være farlig.

## 6. Måling av strømforbruk

Energimålere til stikkontakt er praktiske for måling av en mini-PC eller loddestasjon, men **nøyaktighet ved lav belastning, effektfaktor og kortvarige endringer varierer**. Ikke anta at data kan eksporteres uten dokumentasjon.

- [UNI-T UT230B-EU energimåler – AliExpress-affiliate](https://s.click.aliexpress.com/e/_c3WjGYlx) – **planlagt kandidat**, ikke kjøpt eller testet. Kontroller riktig EU-støpsel/stikkontakt, merkedata og relevant sikkerhetsdokumentasjon før bestilling.

For repeterbare datamålinger foretrekker vi instrumenter med dokumentert lokalt grensesnitt (USB, Ethernet eller Bluetooth/BLE), Linux-verktøy og eksporterbare målinger.

## 7. Programvare og dokumentasjon

En Linux-maskin kan bruke serieterminal, **sigrok/PulseView** for støttede logikkanalysatorer, Python for logging og versjonskontrollert Markdown for testnotater. Dokumenter instrumentmodell, fastvare, innstillinger, omgivelsesforhold, koblinger og kjent måleusikkerhet. Programvare som bare fungerer på Windows, er en ulempe når det finnes pålitelige åpne grensesnitt.

## Hva kan vente?

Et dyrt oscilloskop, elektronisk last, spektrumanalysator og presisjonsutstyr for kalibrering kan vente til et prosjekt krever det. Et bedre multimeter, trygg strømforsyning og gode måleprober gir ofte mer nytte enn mange dårlige instrumenter.

## Våre prinsipper for innkjøp og testing

Dette er en **levende innkjøpsguide**, ikke en liste over utstyr laboratoriet har godkjent. De tre AliExpress-produktene er på den **planlagte innkjøpslisten**. Status oppdateres først når bestilling, mottak eller testing er bekreftet. Utstyret kan kjøpes fra AliExpress, Proshop eller andre leverandører; **innkjøpskanalen avgjør ikke vurderingen**.

Fremtidige tester skiller mellom **produsentpåstander**, **uavhengig dokumentasjon** og **egne målinger**. Vi vil undersøke Linux-kompatibilitet, dokumenterte grensesnitt, repeterbarhet, reparerbarhet, krav til fastvareoppdatering og sikkerhetsdokumentasjon der det er relevant. Provisjonsvilkår og produktannonser kan endre seg.

## Neste steg for laboratoriet

Begynn med minimumsnivået, og utvid deretter med strømbegrenset strømforsyning og logikkanalysator. Når utstyret kommer, planlegger vi egne artikler om **CH343G mot FT232RL**, **måling av strømforbruk** og **repeterbare instrumentmålinger fra Linux**.

## Videre lesning

- [sigrok-prosjektet](https://sigrok.org/wiki/Main_Page)
- [PulseView](https://sigrok.org/wiki/PulseView)
- [Python-dokumentasjon](https://docs.python.org/3/)
