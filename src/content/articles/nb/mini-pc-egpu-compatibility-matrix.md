---
title: "Kompatibilitetsmatrise for eGPU og mini-PC: Hva er faktisk verifisert?"
description: "Kildebasert oversikt som skiller produsenttester, dokumenterte grensesnitt og ubekreftede eGPU-oppsett for mini-PC-er."
category: reference
lang: nb
date: 2026-10-15
tags: [mini-pc, egpu, thunderbolt, usb4, kompatibilitet, intel-nuc, asus, linux]
series: "Used Hardware & Homelab"
translationKey: mini-pc-egpu-compatibility-matrix
draft: false
tested: false
---

> **Redaksjonell status – 15. oktober 2026:** Dokumentasjonsbasert undersøkelse, **ikke en maskinvaretest utført av HackShack Labs**. En oppgitt port betyr ikke at alle GPU-er, dokker, operativsystemer og fastvareversjoner fungerer. Ingen affiliatelenker.

## Kort svar

**Det finnes ingen universell kompatibilitetsliste for eGPU og mini-PC.** En troverdig oppføring må angi **nøyaktig mini-PC**, **tilkobling**, **dokk/kabinett**, **GPU**, **fastvare**, **operativsystem** og **driver**. Denne første matrisen skiller produsentens testing fra rene portspesifikasjoner.

## Bevisnivåer

- **Produsenttestet konfigurasjon:** Produsenten oppgir at en GPU er testet i et eGPU-kabinett. Dette er sterkere enn en portspesifikasjon, men ikke en uavhengig HackShack-test.
- **Produsentdokumentert eGPU-funksjon:** Produsenten omtaler eGPU for produktfamilien, men har ikke dokumentert den konkrete kombinasjonen.
- **Kun grensesnitt dokumentert:** En Thunderbolt-/USB4-port er oppgitt, men ingen bestemt eGPU-kombinasjon er bekreftet.
- **Ikke verifisert:** Vi mangler tilstrekkelig dokumentasjon. Det betyr **ikke** at kombinasjonen er inkompatibel.
- **Maskinvareverifisert av HackShack:** Forbeholdt egne reproduserbare tester; **ingen oppføringer har denne statusen ennå**.

## Første kompatibilitetsmatrise

| Mini-PC / familie | Tilkobling | Bevisnivå | Hva er dokumentert? | Hva mangler? |
| --- | --- | --- | --- | --- |
| **ASUS NUC 14 Pro / Pro+** | eGPU-kabinett; eksakt grensesnitt/dokk ikke angitt i QVL | **GPU-i-kabinett testet av produsenten** | ASUS' QVL oppgir flere kort som «Validated in eGPU chassis», blant annet EVGA RTX 3080 XC3 Ultra, MSI RTX 3050 Ventus 2X og Gigabyte RX 6800 Gaming OC | Eksakt dokk, BIOS, OS, driver, PCIe-lenke og Linux-støtte |
| **Intel-/ASUS-NUC med Thunderbolt** | Thunderbolt | **Produsentdokumentert eGPU-funksjon** | ASUS har egen veiledning for eGPU-feilsøking på NUC med Thunderbolt | Nøyaktig NUC-revisjon, kabinett og GPU; rapporterte oppstarts- og stabilitetsproblemer |
| **ASUS ROG NUC (2024-serien)** | Thunderbolt 4 Type-C | **Kun grensesnitt dokumentert** | ASUS oppgir én Thunderbolt 4-port | Ingen konkret ekstern GPU, dokk eller Linux-konfigurasjon er bekreftet av portspesifikasjonen |

**Kilder:** [ASUS NUC 14 Pro / Pro+ QVL (PDF)](https://dlcdnets.asus.com/pub/ASUS/NUC/QVL/ASUS_NUC_14_Pro_ProPlus_QVL_Report_20241212.pdf?model=NUC14RVH) dokumenterer GPU-er testet i eGPU-kabinett, men gir ikke en komplett reproduserbar kombinasjon. Én oppføring i listen ser ut til å ha motstridende modellbetegnelser og bør ikke brukes uten bekreftelse. Se også [ASUS' eGPU-feilsøking for NUC](https://rog.asus.com/support/faq/1052635/) og [ROG NUC-spesifikasjonene](https://rog.asus.com/no/desktops/mini-pc/rog-nuc/spec/).

## Kombinasjoner av dokk og GPU: foreløpig ubekreftet

At en dokk og en mini-PC begge oppgir Thunderbolt, USB4 eller OCuLink, betyr ikke at kombinasjonen er verifisert.

| Grensesnitt på vertsmaskinen | Dokk å undersøke | Status | Viktige kontroller |
| --- | --- | --- | --- |
| Thunderbolt 3/4 | Thunderbolt PCIe-eGPU-kabinett | **Ikke verifisert for konkret par** | Fastvare, kabel, kontroller, PSU, PCIe-lenke og OS |
| USB4 med PCIe-tunnellering | USB4 eGPU-dokk | **Ikke verifisert for konkret par** | PCIe-tunnellering på verten, dokkfastvare og GPU-oppdagelse |
| OCuLink | OCuLink PCIe-dokk | **Ikke verifisert for konkret par** | Antall PCIe-baner, generasjon, strømrekkefølge, kabel og tilkobling under drift |
| M.2 NVMe PCIe | M.2-til-PCIe-riser | **Eksperimentelt, ikke verifisert** | Nøkkeltype, baner, lagring, kjøling og mekanisk sikkerhet |

## Hva må en reproduserbar test inneholde?

1. **Vertsmaskin:** produsent, nøyaktig modell/SKU, hovedkortrevisjon, BIOS/UEFI-versjon og innstillinger.
2. **Tilkobling:** Thunderbolt/USB4/OCuLink/M.2, kontroller, kabelmodell og lengde.
3. **Dokk:** produsent, modell/revisjon, kontroller/fastvare og strømforsyning.
4. **GPU:** nøyaktig kortmodell, VRAM og strømtilkoblinger.
5. **Programvare:** operativsystem, kjerne, GPU-driver, containermiljø og arbeidslast.
6. **Resultater:** kaldstart, omstart, GPU-oppdagelse, `LnkCap`/`LnkSta` der de finnes, enkel GPU-beregning, belastningstest og eventuelle feil.
7. **Bevis:** originale logger, bilder og gjentakbare instruksjoner uten personopplysninger.

### Linux-kommandoer

```sh
lspci -nn | grep -Ei 'vga|3d|display|nvidia|amd'
lspci -tv
# Erstatt 01:00.0 med riktig PCI-adresse:
sudo lspci -vv -s 01:00.0 | grep -E 'LnkCap:|LnkSta:'
# På Thunderbolt-maskiner med bolt installert:
boltctl list
```

Kommandoene leser informasjon uten å endre oppsettet. De beviser ikke at CUDA, ROCm eller PCIe-passthrough fungerer.

## Viktige forbehold

**Apple Silicon med macOS støtter ikke eGPU.** [Apples eGPU-dokumentasjon](https://support.apple.com/en-gb/102363) gjelder kompatible Intel-baserte Mac-er.

**En Thunderbolt-/USB4-port er ikke en GPU-test.** Produsentens QVL er nyttig, men garanterer ikke at en annen BIOS-, dokk-, driver- eller OS-versjon fungerer. ASUS [beskriver selv begrensningene ved periferiutstyrstesting](https://rog.asus.com/support/faq/1052501/).

## Neste verifiseringsmål

Vi utvider matrisen når vi har en kilde for en **konkret kombinasjon**, eller egne reproduserbare tester. En komplett oppføring med vertsmaskin, dokk, GPU, fastvare og Linux er mer nyttig enn en lang liste med markedsføringspåstander.

Les også [Kan du koble et skjermkort til en mini-PC?](/no/articles/mini-pc-external-gpu-guide/).
