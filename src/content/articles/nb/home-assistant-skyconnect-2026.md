---
title: "Home Assistant SkyConnect i 2026: Fortsatt verdt å bruke?"
description: "Hva den opprinnelige SkyConnect kan gjøre, når du bør beholde den, og når en nyere radio kan være aktuell."
category: guides
lang: nb
date: 2026-10-18
tags: [home-assistant, zigbee, thread, smart-home]
series: "Smart Home"
translationKey: skyconnect-2026
draft: false
tested: false
evidence: documentation
---

> **Grunnlag:** Dokumentasjonsbasert guide, ikke en praktisk ytelsestest. HackShack Labs eier en SkyConnect, men vi presenterer ingen egne målinger av kompatibilitet, rekkevidde eller ytelse. Artikkelen inneholder ingen affiliate-lenker.

## Kort svar

**Hvis din opprinnelige Home Assistant SkyConnect fungerer stabilt, bør du beholde den.** En nyere radio er ikke automatisk en nødvendig oppgradering. SkyConnect fikk navnet **Home Assistant Connect ZBT-1** og brukes fortsatt til å koble kompatible Zigbee-enheter til Home Assistant. Hva du bør velge, avhenger av nettverket, fastvaren og om du trenger Zigbee eller Thread.

**Dokumentasjon kontrollert:** 18. oktober 2026. Dette er et øyeblikksbilde av dokumentasjonen, ikke en test mot en bestemt Home Assistant Core-versjon.

## Hva er SkyConnect?

SkyConnect er en USB-radio utviklet for Home Assistant. Den brukes ofte med **ZHA** eller **Zigbee2MQTT** for å koble til Zigbee-enheter. Thread krever riktig fastvare og programvareoppsett. Thread er en nettverksteknologi, mens Matter er en standard for samhandling på applikasjonsnivå. En Thread-radio garanterer ikke alene støtte for alle Matter-produkter.

## Zigbee, Thread og multiprotokoll

Gi adapteren én tydelig oppgave. Har du allerede et Zigbee-nettverk, er det tryggeste utgangspunktet å beholde Zigbee-fastvaren og koordinatorrollen. Home Assistant klassifiserer multiprotokollfastvaren som **eksperimentell og ikke anbefalt**. Bruk dedikert Zigbee- eller Thread-fastvare for nye installasjoner.

**Ikke bytt fastvare uten en plan.** Det kan forstyrre eksisterende nettverk. Ta sikkerhetskopi av Home Assistant og relevante Zigbee-nettverksdata, les migreringsveiledningen og kontroller hvordan du kan gjenopprette oppsettet.

## ZHA eller Zigbee2MQTT?

Begge kan bruke en Zigbee-koordinator, men ikke samtidig mot samme adapter. ZHA er integrert i Home Assistant. Zigbee2MQTT er en separat tjeneste som normalt bruker MQTT. Støtte for enkelte funksjoner varierer mellom enheter; sjekk eksakt modell i kompatibilitetsoversiktene.

En etterprøvbar sammenligning bør bruke de samme enhetene, fastvareversjonene, plasseringene og målemetodene. Bytte mellom løsningene kan kreve ny paring.

## ZBT-2: Hva er faktisk nytt?

**Home Assistant Connect ZBT-2** er den offisielle etterfølgeren til ZBT-1. Home Assistant oppgir **MG24** i stedet for MG21, forbedret ekstern antenne med base og høyere kommunikasjonshastighet mellom adapter og vert (**460800 mot 115200 baud**). Det betyr **ikke** dokumentert firedoblet rekkevidde eller opplevd hastighet i alle Zigbee-nettverk. ZBT-2 må fortsatt brukes til **enten Zigbee eller Thread**, ikke begge samtidig. Se [Home Assistants sammenligning](https://www.home-assistant.io/connect/zbt-2/).

## Bør du oppgradere?

Oppgradering kan være fornuftig dersom du har et konkret behov som en ny radio faktisk løser. Men et nytt modellnummer er ikke i seg selv god nok grunn. Prøv dette før du kjøper ny adapter:

1. Bruk USB-forlengelseskabel og flytt radioen bort fra USB 3-porter, eksterne SSD-er og datamaskinen. Home Assistant advarer særskilt mot 2,4 GHz-støy fra USB 3.
2. Undersøk Zigbee-kanalen opp mot Wi-Fi-kanalene på 2,4 GHz. Ikke endre kanal uten plan: enkelte enheter må kobles til på nytt.
3. Plasser kompatible **nettdrevne Zigbee-rutere** der de kan forbedre mesh-nettverket. Batterisensorer fungerer normalt ikke som rutere.
4. Kontroller ZHA-integrasjonen, adapteren og tilgjengelig fastvareinformasjon i Home Assistant. Noter gjeldende versjon før oppdatering. Bruk Zigbee2MQTTs dokumentasjon dersom du benytter den løsningen.
5. Ta sikkerhetskopi av nettverksdata før migrering og følg fremgangsmåten for akkurat din Zigbee-løsning.

## Home Assistant-backup er ikke alltid en koordinatorflytting

Før du bytter Zigbee-koordinator, må du skille mellom en sikkerhetskopi av Home Assistant-oppsettet og en **støttet migrering av radio og nettverk**. Avhengig av løsning og adapter er det ikke sikkert at gjenoppretting av applikasjonen overfører koordinatorens nettverksidentitet, sikkerhetsnøkler eller enhetstilknytninger til en annen radio. Følg oppdatert migreringsveiledning for ZHA eller Zigbee2MQTT og både gammel og ny maskinvare, behold den gamle adapteren til den nye løsningen er verifisert, og vær forberedt på at enheter kan måtte pares på nytt. Eksporterte nettverksnøkler må holdes private; de er sikkerhetsfølsomme legitimasjonsdata, ikke vanlige feilsøkingsvedlegg.

## Hva har vi ikke testet?

HackShack Labs eier SkyConnect og IKEA Zigbee-enheter som kan inngå i en senere, etterprøvbar test. **Vi har ikke verifisert fastvareversjoner, stabilitet, migrering eller målt ytelse som grunnlag for denne artikkelen.**

## Kilder

- [Home Assistant Connect ZBT-2: spesifikasjoner og migrering](https://www.home-assistant.io/connect/zbt-2/)
- [ZBT-1: fastvarevalg og multiprotokoll](https://www.home-assistant.io/connectzbt1/)
- [Offisiell dokumentasjon for Home Assistant Connect ZBT-1](https://www.home-assistant.io/connectzbt1/)
- [Home Assistant Zigbee Home Automation](https://www.home-assistant.io/integrations/zha/)
- [Zigbee2MQTT-dokumentasjon](https://www.zigbee2mqtt.io/)
- [Home Assistant Matter-integrasjon](https://www.home-assistant.io/integrations/matter/)
