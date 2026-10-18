---
title: "Finn maskinvarerevisjonen på TP-Link TL-WR703N"
description: "Registrer nøyaktig maskinvare- og fastvareidentitet før du vurderer å installere OpenWrt eller annen fastvare."
category: mini-how-tos
lang: nb
date: 2026-10-11
tags: [tp-link, tl-wr703n, openwrt, piratebox]
series: offline-networking
translationKey: identify-wr703n-hardware
draft: true
tested: false
evidence: documentation
---

> **Forskningsutkast:** Ingen fysisk TL-WR703N er undersøkt for denne artikkelen. Dette er ikke en verifisert installasjonsveiledning.

## Før du begynner

**Ikke installer fastvare ennå.** Koble ruteren fra Internett og undersøk etiketten på kabinettet. Noter nøyaktig modell og maskinvareversjon, ofte merket **Ver** eller **H/W Ver**. Ta gjerne et bilde av etiketten, men fjern eller skjul eventuelle private identifikatorer før publisering.

## Registrer dette

- Nøyaktig modellnavn slik det står på kabinettet.
- Maskinvarerevisjon fra etiketten, dersom den finnes.
- Gjeldende fastvareversjon, hvis den kan leses trygt i administrasjonsgrensesnittet.
- Synlige modifikasjoner eller tegn på tidligere endring av fastvaren.

Hvis etiketten mangler eller er uklar, **ikke gjett revisjonen ut fra utseendet alene**. Sikker identifisering kan kreve oppstartslogger eller fysisk inspeksjon.

## Neste steg

Sammenlign opplysningene med [OpenWrts enhetsside for TL-WR703N](https://openwrt.org/toh/tp-link/tl-wr703n). Undersøk støtte for den konkrete revisjonen, flashminne og RAM før du vurderer et fastvarebilde.

PirateBox og LibraryBox er avsluttede historiske prosjekter. Den videre planen for HackShack Labs er å dokumentere kompatibel OpenWrt, og senere MikroWrt og Ploos PocketBox når disse er klare. Ingen av disse er bekreftet installert på denne ruteren i forbindelse med artikkelen.
