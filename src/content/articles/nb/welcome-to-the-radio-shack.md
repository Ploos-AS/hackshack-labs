---
title: "Velkommen til radioshacken: Amatørradio møter åpen kildekode"
description: "Fra kortbølgelytting og SDR til pakkedata, ADS-B og AIS: et nytt praktisk radiolaboratorium."
category: reference
lang: nb
date: 2026-10-14
tags: [ham-radio, sdr, linux, packet-radio, ads-b, ais]
series: ham-radio-sdr
translationKey: welcome-to-the-radio-shack
draft: false
tested: false
---

> **Redaksjonell status (14. oktober 2026):** Dette er en introduksjon og prosjektplan, ikke en praktisk utstyrstest. Konkrete oppsett dokumenteres og merkes som verifisert først etter testing på fysisk maskinvare.

## Hvorfor en radioshack hører hjemme i et hackerlaboratorium

En *shack* er radioamatørens tradisjonelle arbeidsplass: radioer, kabler, antenner, måleinstrumenter og mange eksperimenter. En moderne shack kan også bestå av en Linux-maskin, en liten enkortdatamaskin (SBC), en programvaredefinert radiomottaker (SDR) og en nettleser.

HackShack Labs er opptatt av møtet mellom **radio, åpen kildekode, elektronikk, nettverk og retrodatamaskiner**. Vi vil forklare teknologien, bygge rimelige prosjekter og publisere etterprøvbare resultater – også feil og begrensninger.

## Dette skal vi undersøke

### SDR: en mottaker du kan programmere

En RTL-SDR USB-mottaker er en tilgjengelig inngang til å utforske radiosignaler med programvare. Linux-verktøy som SDR++, GNU Radio og OpenWebRX lar oss motta, visualisere og forstå signaler på forskjellige måter. En mottaker, egnet antenne og passende programvare er nok til å komme i gang med lovlig mottak.

### Amatørradio og digitale modi

Amatørradio åpner for veien fra lytting til lisensiert toveiskommunikasjon. Vi vil dekke grunnleggende stasjonsoppsett, antenner, digitale modi og forskjellen mellom mottak og sending. Sending på amatørbåndene krever relevante tillatelser og at lokale regler følges.

### Packet radio, APRS og BBS

Pakkedata knytter sammen to av favorittområdene våre: radio og klassiske datanettverk. AX.25, APRS, Direwolf og packet-radio-BBS viser hvordan data kan transporteres over radiosamband. Vi skal skille mellom historiske protokoller, vedlikeholdt programvare og prosjekter som fortsatt trenger testing.

### Flysporing med ADS-B

En SBC, egnet 1090 MHz-mottaker og antenne, og programvare som readsb og tar1090 kan bli en lokal flysporingsstasjon. Den mottar utsendelser fra kompatible fly; **det er ikke en aktiv radar**, og den kan ikke oppdage alle fly. Rekkevidden påvirkes av terreng, antenneplassering og tilgjengelige sendinger.

### Skipssporing med AIS

AIS-meldinger fra utstyrte fartøy kan mottas med en egnet VHF-mottaker og programvare som AIS-catcher. AIS benytter maritime VHF-kanaler rundt 162 MHz. Som ADS-B er dette en **passiv sporingsmottaker**, ikke radar, og den gir ikke fullstendig oversikt over trafikken.

### Kombinert SBC-basert mottakerstasjon

Én Linux-SBC kan potensielt kjøre separate ADS-B- og AIS-mottakere, et lokalt dashboard og valgfri datalagring. Vi vil sammenligne CPU-belastning, USB-stabilitet, strømforbruk, temperatur, antenner og nettverksisolasjon før vi anbefaler en bestemt SBC.

## Slik dokumenterer vi eksperimentene

Artiklene skal merkes som dokumentasjonsbaserte, laboratorietestede eller maskinvareverifiserte etter hva som faktisk er gjort. Hvert testet oppsett bør oppgi maskinvarerevisjoner, OS- og programvareversjoner, antenneoppsett, kommandoer og målte resultater. Vi foretrekker **lokale løsninger først**: mottakeren bør kunne brukes uten konto hos en ekstern sporingstjeneste. Datadeling skal være valgfri og forklart.

Radioregler varierer mellom land. Vi skal skille mellom passivt mottak og sending, kontrollere relevante regler før vi publiserer sendeveiledninger, og ta hensyn til personvern og posisjonsdata.

## Start her

Vår [serie om amatørradio og SDR](/no/series/ham-radio-sdr/) samler artiklene. Første praktiske prosjekt er planlagt som **Bygg en ADS-B-flysporer med SBC og RTL-SDR**, fulgt av AIS-mottaker og deretter en kombinert stasjon. Inntil disse oppsettene er fysisk testet, er de planlagte eksperimenter og ikke verifiserte guider.
