---
title: "Home Assistant SkyConnect i 2026: Fortsatt verdt å bruke?"
description: "Hva den opprinnelige SkyConnect kan gjøre, når du bør beholde den, og når en nyere radio kan være aktuell."
category: guides
lang: nb
date: 2026-10-18
tags: [home-assistant, zigbee, thread, smart-home]
series: "Smart Home Tested"
translationKey: skyconnect-2026
draft: true
tested: false
evidence: documentation
---

> **Dokumentasjon:** Dokumentasjonsbasert guide, ikke en praktisk ytelsestest. HackShack Labs eier en SkyConnect, men vi presenterer ingen egne målinger av kompatibilitet, rekkevidde eller ytelse. Artikkelen inneholder ingen affiliate-lenker.

## Kort svar

**Hvis din opprinnelige Home Assistant SkyConnect fungerer stabilt, bør du beholde den.** En nyere radio er ikke automatisk en nødvendig oppgradering. SkyConnect fikk navnet **Home Assistant Connect ZBT-1** og brukes fortsatt til å koble kompatible Zigbee-enheter til Home Assistant. Hva du bør velge, avhenger av nettverket, fastvaren og om du trenger Zigbee eller Thread.

## Hva er SkyConnect?

SkyConnect er en USB-radio utviklet for Home Assistant. Den brukes ofte med **ZHA** eller **Zigbee2MQTT** for å koble til Zigbee-enheter. Thread krever riktig fastvare og programvareoppsett. Thread er en nettverksteknologi, mens Matter er en standard for samhandling på applikasjonsnivå. En Thread-radio garanterer ikke alene støtte for alle Matter-produkter.

## Zigbee, Thread og multiprotokoll

Gi adapteren én tydelig oppgave. Har du allerede et Zigbee-nettverk, er det tryggeste utgangspunktet å beholde Zigbee-fastvaren og koordinatorrollen. Samtidig Zigbee/Thread-drift med multiprotokollfastvare har hatt vesentlige begrensninger i støtte og stabilitet. Sjekk oppdatert Home Assistant-dokumentasjon før du baserer en ny installasjon på dette.

**Ikke bytt fastvare uten en plan.** Det kan forstyrre eksisterende nettverk. Ta sikkerhetskopi av Home Assistant og relevante Zigbee-nettverksdata, les migreringsveiledningen og kontroller hvordan du kan gjenopprette oppsettet.

## ZHA eller Zigbee2MQTT?

Begge kan bruke en Zigbee-koordinator, men ikke samtidig mot samme adapter. ZHA er integrert i Home Assistant. Zigbee2MQTT er en separat tjeneste som normalt bruker MQTT. Støtte for enkelte funksjoner varierer mellom enheter; sjekk eksakt modell i kompatibilitetsoversiktene.

En etterprøvbar sammenligning bør bruke de samme enhetene, fastvareversjonene, plasseringene og målemetodene. Bytte mellom løsningene kan kreve ny paring.

## Bør du oppgradere?

Oppgradering kan være fornuftig dersom du har et konkret behov som en ny radio faktisk løser. Men et nytt modellnummer er ikke i seg selv god nok grunn. Undersøk først USB-plassering, interferens, ruting mellom Zigbee-enheter, fastvare og dokumentasjon.

## Planlagte tester hos HackShack Labs

Vi planlegger å dokumentere Home Assistant-versjon, ZBT-1-fastvare, ZHA- og Zigbee2MQTT-versjoner, IKEA-modellnumre, paring, gjenoppkobling, nettverksisolasjon og repeterbare målinger av responstid og stabilitet. **Disse testene er ikke gjennomført som grunnlag for denne artikkelen.**

## Kilder

- [Offisiell dokumentasjon for Home Assistant Connect ZBT-1](https://www.home-assistant.io/connectzbt1/)
- [Home Assistant Zigbee Home Automation](https://www.home-assistant.io/integrations/zha/)
- [Zigbee2MQTT-dokumentasjon](https://www.zigbee2mqtt.io/)
- [Home Assistant Matter-integrasjon](https://www.home-assistant.io/integrations/matter/)
