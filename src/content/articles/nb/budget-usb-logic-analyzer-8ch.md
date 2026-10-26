---
title: "Fungerer en rimelig 8-kanals USB-logikkanalysator på Linux?"
description: "Dokumentasjonsbasert forhåndsomtale av en generisk 24 MHz USB-logikkanalysator med kjøperrapportert PulseView-oppsett og testplan."
category: reviews
lang: nb
date: 2026-10-19
tags: [logikkanalysator, sigrok, pulseview, linux, elektronikk]
series: "Rimelig testutstyr"
translationKey: budget-usb-logic-analyzer-8ch
draft: true
tested: false
evidence: desk-research
---

**Kort svar:** Vi har bestilt en generisk 8-kanals USB-logikkanalysator som markedsføres med 24 MHz. Den er ikke mottatt eller testet. En kjøper rapporterer at den fungerer med PulseView og fx2lafw-driveren, men at bare 16 MSa/s er stabilt. Dette skal vi kontrollere selv.

## Produktet

AliExpress-annonsen oppgir åtte kanaler og en samplingsfrekvens på 24 MHz. Dette er selgerens opplysninger, ikke målte resultater. Instrumentet er bestilt for uavhengig testing hos HackShack Labs.

## Flere opplysninger fra annonsen (ikke verifisert)

Selgeren oppgir også åtte inngangskanaler, USB-strøm, sanntidsoverføring av data, maksimal opptaksdybde på **«10T»** (enhet og betydning ikke forklart) og støtte for **Windows 7 (32/64-bit), Windows 2000, Windows XP og Linux**. Annonsen beskriver svart plastkabinett, en liten indikator for elektrisk nivå på **CH0** (skrevet «CHO» i annonsen) og inngangsegenskapene **5 pF og 100 kΩ**. Pakken skal inneholde analysator, USB-kabel og tilkoblingsledninger (omtalt som «Connection Sorting»).

Dette er **kun selgerens påstander**. «10T» dokumenterer verken internminne eller verifisert maksimal opptakslengde; 5 pF / 100 kΩ sier ikke hvilke inngangsspenninger som tåles; og listen over eldre operativsystemer dokumenterer ikke kompatibilitet med dagens distribusjoner. Vi kontrollerer leveransen og undersøker relevante elektriske egenskaper og opptaksgrenser før vi anbefaler produktet.

## Linux-oppsett rapportert av en kjøper

En kjøper beskriver følgende fremgangsmåte for Ubuntu og avledede distribusjoner:

```sh
sudo apt install pulseview
sudo apt install sigrok-firmware-fx2lafw
```

I PulseView oppgir kjøperen at man velger **fx2lafw** som driver, søker etter enheter og velger den oppdagede Saleae-kompatible enheten. **Dette er en tredjepartsrapport, ikke en verifisert installasjonsveiledning for vårt eksemplar.** Pakketilgjengelighet og USB-tilgang kan variere mellom distribusjoner.

Den samme kjøperen beskriver PulseView og Zadig/WinUSB på Windows. Vi prioriterer Linux-testingen.

## Rapporterte begrensninger som skal undersøkes

| Punkt | Kjøperens erfaring | Verifisering hos HackShack Labs |
| --- | --- | --- |
| 16 MSa/s | Rapportert stabilt | Avventer |
| 24 MSa/s | Rapportert ustabilt | Avventer |
| 48 MSa/s | Rapportert ustabilt | Avventer |
| Signaler på 2–3 MHz | Kjøperen vurderer dette som praktisk | Avventer |
| Deaktiverte kanaler | Ingen rapportert ytelsesgevinst | Avventer |
| 3,3 V- og 5 V-logikk | Kjøperen rapporterer at begge fungerer | Elektriske inngangsgrenser er ikke fastslått |

Samplingsfrekvens er ikke det samme som garantert signalbåndbredde. Vi antar ikke at inngangen tåler 5 V bare på grunnlag av en kundeanmeldelse.

## Planlagte tester — ennå ikke gjennomført

1. Identifisere faktisk USB VID/PID og kontrollere Linux-driver og firmware.
2. Fange et kjent lavspennings-firkantsignal ved flere samplingsfrekvenser; registrere faktisk prøveantall, opptakstid og repeterbarhet.
3. Gjenta med forskjellig antall aktiverte kanaler.
4. Dekode kjente UART-, SPI- og I²C-signaler og sammenligne med referanseutstyr.
5. Måle minnebruk og stabilitet ved lange opptak.
6. Bekrefte inngangenes spenningsgrenser med pålitelig maskinvaredokumentasjon før 5 V-signaler kobles til.

**Sikkerhet:** Start med isolert 3,3 V-logikk. Ikke koble til strømnettet, signaler med ukjent spenning eller farlige kretser.

## Foreløpig vurdering

**Enheten er ikke testet eller anbefalt ennå.** Kjøperrapporten tyder på et mulig nyttig rimelig verktøy, men annonsert samplingshastighet og elektriske grenser er ikke verifisert.

## Kjøp og åpenhet

[Generisk 8-kanals USB-logikkanalysator – AliExpress-affiliatelenke](https://s.click.aliexpress.com/e/_c30RvLiv)

*Affiliate-erklæring: HackShack Labs / Ploos AS kan motta provisjon ved kjøp gjennom denne lenken. Instrumentet er bestilt for uavhengig testing; affiliateforhold påvirker ikke konklusjonene.*

## Kilder

- AliExpress-produktannonse: oppgitte åtte kanaler og 24 MHz, slik annonsen fremstod ved bestilling.
- Kjøperanmeldelse delt med HackShack Labs: PulseView-oppsett og ytelsesobservasjoner; uavhengig etterprøving gjenstår.

*HackShack Labs / Ploos AS · Utkast · Maskinvaren er ikke mottatt eller testet.*
