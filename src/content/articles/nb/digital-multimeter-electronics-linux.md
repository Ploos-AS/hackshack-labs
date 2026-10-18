---
title: "Slik velger du digitalt multimeter til elektronikk og Linux"
description: "En praktisk kjøpsguide om sikkerhet, nøyaktighet, datalogging, USB, Bluetooth og åpne protokoller."
category: guides
lang: nb
date: 2026-10-18
tags: [electronics, linux, multimeter, test-equipment]
series: "Lab Equipment"
translationKey: digital-multimeter-electronics-linux
draft: true
tested: false
evidence: documentation
---

> **Dokumentasjon og åpenhet:** Dette er en kjøpsguide basert på generelle måleprinsipper og publisert dokumentasjon, ikke en sammenlignende praktisk test. Vi oppgir ingen egne nøyaktighetsmålinger, modellrangeringer eller affiliate-lenker.

## Kort svar

Til hobbyelektronikk, innebygd utvikling og reparasjon av eldre datamaskiner bør du velge et **sikkert og tilstrekkelig nøyaktig digitalt multimeter** med nyttige måleområder, gode måleledninger og lesbar betjening. Skal du automatisere målinger fra Linux, må du kontrollere grensesnittet og protokollen for **den eksakte modellen** før du betaler ekstra for USB eller Bluetooth.

## Begynn med målebehovet

Ved arbeid med AVR, FPGA og retrodatamaskiner måler du ofte DC-spenninger, kontinuitet, motstand og strøm. Rask, hørbar kontinuitetstest kan være viktigere enn en lang funksjonsliste. Til grundigere kondensatormåling kan et eget LCR-meter etter hvert være mer nyttig.

Et multimeter er **ikke et oscilloskop** og kan ikke erstatte det ved feilsøking av klokkesignaler, korte feilpulser eller digital timing.

## Nøyaktighet, oppløsning og True RMS

Antall visningssteg («counts») beskriver oppløsning, **ikke** nøyaktighet. Sammenlign spesifikasjonene for aktuelle måleområder og forhold. En angivelse som ±(% av avlesning + digits) inkluderer både en proporsjonal del og et tillegg i visningssiffer. True RMS er nyttig ved relevante AC-målinger, men båndbredde, crest factor og måleforhold spiller fortsatt inn.

## Sikkerhet først

Ved arbeid på nettspenning må du kontrollere riktig målekategori og spenningsklasse, troverdig uavhengig sikkerhetsdokumentasjon der den finnes, sikringer, måleledninger og prober. CAT-merking i en nettannonse er ikke alene tilstrekkelig dokumentasjon. For nybegynnere er lavspenningselektronikk et fornuftig utgangspunkt. Overskrid aldri instrumentets spesifiserte grenser.

## Sjekkliste for Linux

| Egenskap | Hva må kontrolleres? |
| --- | --- |
| USB | USBTMC, seriell tilkobling eller produsentspesifikk adapter? |
| Ethernet | Lokal SCPI/VISA eller bare proprietær programvare? |
| Bluetooth / BLE | Dokumentert GATT/protokoll eller kun mobilapp? |
| Python | Fungerende bibliotek og etterprøvbare eksempler for modellen? |
| Logging | Samplingsfrekvens, tidsstempler, eksportformat og stabilitet |
| Fastvare | Kan den oppdateres uten Windows? |
| Personvern | Fungerer tilkoblingen lokalt uten konto eller sky? |

**Bluetooth betyr ikke automatisk Linux-kompatibilitet.** Python-biblioteket Bleak kan kommunisere med mange BLE-enheter, men du trenger fortsatt kjennskap til enhetens karakteristikker og dataformat. Sigrok-støtte er også modellavhengig.

## Sammenlign merker uten merkelojalitet

UNI-T, Brymen og Fluke har produkter i forskjellige prisklasser. Et kjent merke erstatter ikke kontroll av **den aktuelle modellens** sikkerhet, spesifikasjoner, garanti, dokumentasjon og Linux-integrasjon. Vi publiserer først konkrete sammenligninger når vi har etterprøvbare data.

## Må du kjøpe noe?

Hvis multimeteret du allerede har, er sikkert og dekker behovet, kan du beholde det. Et ekstra enkelt instrument kan være nyttig ved samtidige strøm- og spenningsmålinger, men er ikke alltid nødvendig. Til protokollfeilsøking kan en kompatibel logikkanalysator være bedre; til bølgeformer trenger du et oscilloskop.

## Planlagte tester hos HackShack Labs

Vi planlegger å registrere modell, maskinvarerevisjon, fastvare, testforhold, referanseinstrument, repeterbarhet, kontinuitetsrespons, USB/BLE-datafangst, Linux-distribusjon, Python-kode og skyavhengighet. **Vi hevder ikke å ha gjennomført disse testene i denne artikkelen.**

## Videre lesning

- [Maskinvare støttet av sigrok](https://sigrok.org/wiki/Supported_hardware)
- [Bleak: Python-bibliotek for Bluetooth Low Energy](https://bleak.readthedocs.io/)
- [PyVISA-dokumentasjon](https://pyvisa.readthedocs.io/)
- [Oversikt over målekategorier (Fluke)](https://www.fluke.com/en/learn/blog/safety/measurement-categories)
