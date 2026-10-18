---
title: "Velkommen til radioshacken: Amatørradio møter åpen kildekode"
description: "Fra kortbølgelytting og SDR til pakkeradio, ADS-B og AIS: et radiolaboratorium under oppbygging."
category: guides
lang: nb
date: 2026-10-14
tags: [ham-radio, sdr, linux, packet-radio, ads-b, ais]
series: ham-radio-sdr
translationKey: welcome-to-the-radio-shack
draft: false
tested: false
evidence: documentation
---

> **Redaksjonell status (14. oktober 2026):** Dette er en introduksjon og prosjektplan, ikke en praktisk utstyrstest. Konkrete oppsett dokumenteres og merkes som verifisert først etter testing på fysisk maskinvare.

## Hvorfor en radioshack hører hjemme i et hackerlaboratorium

En *shack* er radioamatørens tradisjonelle arbeidsplass: radioer, kabler, antenner, måleinstrumenter og mange eksperimenter. En moderne shack kan også bestå av en Linux-maskin, en liten enkortdatamaskin (SBC), en programvaredefinert radiomottaker (SDR) og en nettleser.

HackShack Labs er opptatt av møtet mellom **radio, åpen kildekode, elektronikk, nettverk og retrodatamaskiner**. Vi vil forklare hvordan det fungerer, bygge rimelige prosjekter og publisere etterprøvbare resultater – også feil og begrensninger.

## Dette skal vi undersøke

### SDR: en mottaker du kan programmere

En RTL-SDR USB-mottaker er en tilgjengelig inngang til å utforske radiosignaler med programvare. Linux-verktøy som SDR++, GNU Radio og OpenWebRX lar oss motta, visualisere og forstå signaler på forskjellige måter. En mottaker, egnet antenne og passende programvare er nok til å komme i gang med mottak som er tillatt etter gjeldende regler for den aktuelle tjenesten.

### Amatørradio og digitale driftsarter

For norske lesere er [Nasjonal kommunikasjonsmyndighet (Nkom)](https://nkom.no/frekvenser-og-elektronisk-utstyr/radioamator) utgangspunktet for gjeldende regler, radioamatørlisens og kallesignal. [Norsk Radio Relæ Liga (NRRL)](https://www.nrrl.no/) er den norske radioamatørorganisasjonen. En ny radioamatørforskrift trådte i kraft i mars 2026, så eldre veiledninger kan være utdaterte. Amatørradio åpner for veien fra lytting til lisensiert toveiskommunikasjon. Vi vil dekke grunnleggende stasjonsoppsett, antenner, digitale modi og forskjellen mellom mottak og sending. Sending på amatørbåndene krever relevante tillatelser og at lokale regler følges.

### Pakkeradio, APRS og BBS

Pakkeradio knytter sammen to av favorittområdene våre: radio og klassiske datanettverk. AX.25, APRS, Direwolf og packet-radio-BBS viser hvordan data kan transporteres over radiosamband. Vi skal skille mellom historiske protokoller, vedlikeholdt programvare og prosjekter som fortsatt trenger testing.

### Flysporing med ADS-B

En SBC, egnet 1090 MHz-mottaker og antenne, og programvare som readsb og tar1090 kan bli en lokal flysporingsstasjon. Den mottar utsendelser fra kompatible fly; **det er ikke en aktiv radar**, og den kan ikke oppdage alle fly. Rekkevidden påvirkes av terreng, antenneplassering og tilgjengelige sendinger. **Ikke bruk en hobbybasert ADS-B-visning til flysikkerhetsbeslutninger**: signaler kan mangle, være forsinket eller inneholde feil, og mottakerens dekning er ufullstendig.

### Skipssporing med AIS

AIS-meldinger fra utstyrte fartøy kan mottas med en egnet VHF-mottaker og programvare som AIS-catcher. AIS benytter maritime VHF-kanaler rundt 162 MHz. Som ADS-B er dette en **passiv sporingsmottaker**, ikke radar, og den gir ikke fullstendig oversikt over trafikken. **Ikke bruk en hobbybasert AIS-visning til navigasjon eller kollisjonsunngåelse**: ikke alle fartøy sender AIS, og mottatte posisjoner kan være gamle eller feil.

### Kombinert SBC-basert mottakerstasjon

Én Linux-SBC kan potensielt bruke to separate SDR-dongler – én for ADS-B på 1090 MHz og én for AIS rundt 162 MHz – med frekvenstilpassede antenner og eventuelt egne filtre eller lavstøyforsterkere. Den kan kjøre et lokalt dashboard og valgfri datalagring. Vi vil sammenligne CPU-belastning, USB-stabilitet, strømforbruk, temperatur, antenner og nettverksisolasjon før vi anbefaler en bestemt SBC.

## Slik dokumenterer vi eksperimentene

Artiklene skal merkes som dokumentasjonsbaserte, laboratorietestede eller maskinvareverifiserte etter hva som faktisk er gjort. Hvert testet oppsett bør oppgi maskinvarerevisjoner, OS- og programvareversjoner, antenneoppsett, kommandoer og målte resultater. Vi foretrekker **lokal drift først**: mottakeren bør kunne brukes uten konto hos en ekstern sporingstjeneste. Datadeling skal være valgfri og forklart.

Antenneinstallasjoner krever også en sikkerhetsplan: forsvarlig montering og arbeid i høyden, lynvern og jording, og vurdering av RF-eksponering ved fremtidig sending. Dette får en egen guide. Radioregler varierer mellom land. Vi skal skille mellom passivt mottak og sending, kontrollere relevante regler før vi publiserer sendeveiledninger, og ta hensyn til personvern og posisjonsdata.

## Start her

Vår [serie om amatørradio og SDR](/no/series/ham-radio-sdr/) samler artiklene. **Neste planlagte guide (ennå ikke publisert): Bygg en ADS-B-flysporer med SBC og RTL-SDR.** Deretter planlegger vi en AIS-mottaker og en kombinert stasjon. Inntil disse oppsettene er fysisk testet, er de planlagte eksperimenter og ikke verifiserte guider.
