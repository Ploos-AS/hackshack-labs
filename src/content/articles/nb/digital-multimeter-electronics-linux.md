---
title: "Slik velger du digitalt multimeter til elektronikk og Linux"
description: "En praktisk kjøpsguide om sikkerhet, nøyaktighet, datalogging, USB, Bluetooth og åpne protokoller."
category: guides
lang: nb
date: 2026-10-18
tags: [electronics, linux, multimeter, test-equipment]
series: "Lab Equipment"
translationKey: digital-multimeter-electronics-linux
draft: false
tested: false
evidence: documentation
---

> **Grunnlag og åpenhet:** Dette er en kjøpsguide basert på generelle måleprinsipper og publisert dokumentasjon, ikke en sammenlignende praktisk test. Vi oppgir ingen egne nøyaktighetsmålinger, modellrangeringer eller affiliate-lenker.

## Kort svar

Til hobbyelektronikk, innebygd utvikling og reparasjon av eldre datamaskiner bør du velge et **sikkert og tilstrekkelig nøyaktig digitalt multimeter** med nyttige måleområder, gode måleledninger og lesbar betjening. Skal du automatisere målinger fra Linux, må du kontrollere grensesnittet og protokollen for **den eksakte modellen** før du betaler ekstra for USB eller Bluetooth.

**Dokumentasjon kontrollert:** 18. oktober 2026. Spesifikasjoner og kompatibilitet må kontrolleres for eksakt modell og maskinvarerevisjon før kjøp.

## Begynn med målebehovet

Ved arbeid med AVR, FPGA og retrodatamaskiner måler du ofte DC-spenninger, kontinuitet, motstand og strøm. Rask, hørbar kontinuitetstest kan være viktigere enn en lang funksjonsliste. Til grundigere kondensatormåling kan et eget LCR-meter etter hvert være mer nyttig.

Et multimeter er **ikke et oscilloskop** og kan ikke erstatte det ved feilsøking av klokkesignaler, korte feilpulser eller digital timing.

## Nøyaktighet, oppløsning og True RMS

Antall visningssteg («counts») beskriver oppløsning, **ikke** nøyaktighet. Sammenlign spesifikasjonene for aktuelle måleområder og forhold. En angivelse som ±(% av avlesning + digits) inkluderer både en proporsjonal del og et tillegg i visningssiffer. Eksempel: Hvis 5,000 V-området har **0,001 V oppløsning**, viser **5,000 V** og er spesifisert til **±(0,5 % av avlesning + 3 digits)**, blir første ledd 0,025 V og tre siste visningssteg 0,003 V. Samlet toleranse er **±0,028 V**, altså 4,972–5,028 V under oppgitte betingelser. Kontroller oppløsningen på det aktuelle området.

True RMS er nyttig ved relevante AC-målinger, men båndbredde, crest factor og måleforhold spiller fortsatt inn.

## Sikkerhet først

Ved arbeid på nettspenning må du kontrollere riktig målekategori og spenningsklasse, troverdig uavhengig sikkerhetsdokumentasjon der den finnes, sikringer, måleledninger og prober. CAT-merking i en nettannonse er ikke alene tilstrekkelig dokumentasjon. Ved strømmåling bør du kontrollere at instrumentet har riktig dimensjonerte **HRC-sikringer** med høy bryteevne, og at ledningene er i god stand. **Mål aldri spenning mens en ledning står i strøminngangen**: det kan kortslutte kretsen. Kontroller alltid måleuttak og bryterstilling først.

**Sikkerhet ved strømmåling:** Et vanlig multimeter i strømmodus kobles **i serie** med lasten, ikke parallelt over strømforsyningen som ved spenningsmåling. Koble aldri måleprobene direkte mellom polene på et batteri, en spenningskilde eller en stikkontakt mens instrumentet står i strømmodus; inngangens lave motstand kan gi kortslutning. Bruk riktig sikret inngang og måleområde. Ved ukjente eller energirike kretser bør du bruke egnet strømtang eller kvalifisert hjelp.

**Sikkerhet ved motstands- og kontinuitetsmåling:** Koble fra strømmen og sørg for at lagret energi er håndtert før måling av motstand, kontinuitet eller dioder. Disse målemodusene skal ikke brukes på spenningssatte kretser. Kondensatorer og strømforsyninger kan beholde farlig spenning etter frakobling. Kontroller at kretsen er sikker med egnet utstyr og fremgangsmåte før berøring. En kontinuitetspipelyd er ikke bevis på at en nettkrets er spenningsløs.

**USB og jord:** Et multimeter koblet til en jordet PC kan skape en farlig jordforbindelse ved måling på nettrefererte kretser. Undersøk om dataforbindelsen er **galvanisk isolert**, for eksempel optisk/IR; anta aldri at en vanlig USB-forbindelse er sikker isolasjon.

**Norge:** Arbeid på faste elektriske installasjoner er regulert. DSB beskriver hvilke mindre arbeider privatpersoner kan gjøre; øvrig arbeid skal utføres av kvalifiserte fagfolk. Norske boliger kan ha **230 V IT-nett**, med 230 V mellom faseledere. Ikke anta at én leder er en trygg nøytral; velg målekategori, måleledninger og fremgangsmåte etter faktisk anlegg. Se [DSBs veiledning](https://www.dsb.no/sikkerhverdag/strom/elektrisk-arbeid-dette-kan-du-gjore-selv/). For nybegynnere er lavspenningselektronikk et fornuftig utgangspunkt.

## Sjekkliste for Linux

| Egenskap | Hva må kontrolleres? |
| --- | --- |
| USB | USBTMC, seriell tilkobling eller produsentspesifikk adapter? |
| Isolasjon | Er dataforbindelsen til PC galvanisk isolert, for eksempel optisk/IR? Kontroller dokumentasjonen. |
| Ethernet | Lokal SCPI/VISA eller bare proprietær programvare? |
| Bluetooth / BLE | Dokumentert GATT/protokoll eller kun mobilapp? |
| Python | Fungerende bibliotek og etterprøvbare eksempler for modellen? |
| Logging | Samplingsfrekvens, tidsstempler, eksportformat og stabilitet |
| Fastvare | Kan den oppdateres uten Windows? |
| Personvern | Fungerer tilkoblingen lokalt uten konto eller sky? |

**Bluetooth betyr ikke automatisk Linux-kompatibilitet.** Python-biblioteket Bleak kan kommunisere med mange BLE-enheter, men du trenger fortsatt kjennskap til enhetens karakteristikker og dataformat. Ved USBTMC- eller nettverksinstrumenter som bruker SCPI, kan **PyVISA** være nyttig dersom instrumentet og tilkoblingen støttes. Sigrok-støtte er modellavhengig: **søk etter eksakt modell i [sigroks oversikt over støttet maskinvare](https://sigrok.org/wiki/Supported_hardware)** og sammenlign med produsentens manual og maskinvarerevisjon.

## Eksempel: Slik undersøker du kompatibilitet

Noter **fullt modellnavn, suffiks og maskinvarerevisjon**. Søk etter akkurat dette i [sigroks maskinvareliste](https://sigrok.org/wiki/Supported_hardware). Kontroller deretter i produsentens manual hvilket datagrensesnitt og hvilken protokoll instrumentet faktisk bruker. Sjekk til slutt Linux-driver og loggefunksjon. **Vi hevder ikke at en bestemt modell støttes uten en verifisert oppføring.**

## Sammenlign merker uten merkelojalitet

UNI-T, Brymen og Fluke har produkter i forskjellige prisklasser. Et kjent merke erstatter ikke kontroll av **den aktuelle modellens** sikkerhet, spesifikasjoner, garanti, dokumentasjon og Linux-integrasjon. Vi publiserer først konkrete sammenligninger når vi har etterprøvbare data.

## Må du kjøpe noe?

Hvis multimeteret du allerede har, er sikkert og dekker behovet, kan du beholde det. Et ekstra enkelt instrument kan være nyttig ved samtidige strøm- og spenningsmålinger, men er ikke alltid nødvendig. Til protokollfeilsøking kan en kompatibel logikkanalysator være bedre; til bølgeformer trenger du et oscilloskop.

## Hva har vi ikke testet?

**Ingen multimetre er benktestet for denne guiden.** Nøyaktighet, sikkerhetskonstruksjon og Linux-kompatibilitet må kontrolleres for den enkelte modellen.


**Les videre:** Se [Elektronikk for nybegynnere](/no/series/electronics-basics/) for en anbefalt rekkefølge fra multimeter til UART, I²C, SPI-flash og logikkanalyse. Artiklene skiller mellom dokumentasjon og faktiske laboratoriemålinger.

## Videre lesning

- [Maskinvare støttet av sigrok](https://sigrok.org/wiki/Supported_hardware)
- [Bleak: Python-bibliotek for Bluetooth Low Energy](https://bleak.readthedocs.io/)
- [PyVISA-dokumentasjon](https://pyvisa.readthedocs.io/)
- [DSB: Elektrisk arbeid – dette kan du gjøre selv](https://www.dsb.no/sikkerhverdag/strom/elektrisk-arbeid-dette-kan-du-gjore-selv/)
- [Oversikt over målekategorier (Fluke)](https://www.fluke.com/en/learn/blog/safety/measurement-categories)
