---
title: "USB til seriell kommunikasjon: TTL, RS-232 og RS-485 forklart"
description: "Lær forskjellen på serielle spenningsnivåer, kobling og trygg tilkobling til innebygde systemer."
category: guides
lang: nb
date: 2026-10-20
tags: [uart, ttl, rs232, rs485, linux, elektronikk]
translationKey: usb-uart-ttl-rs232-rs485
tested: false
evidence: documentation
---

USB-kontakten forteller ikke hvilket elektrisk seriegrensesnitt adapteren bruker. **UART med logikknivåer, RS-232 og RS-485 kan ikke brukes om hverandre.** Feil adapter kan skade elektronikken.

## Tre forskjellige grensesnitt

| Grensesnitt | Vanlig bruk | Elektriske egenskaper |
| --- | --- | --- |
| UART med logikknivåer («TTL-seriell») | Ruterkonsoller og mikrokontrollere | Enkeltendte signaler, ofte 3,3 V eller 5 V; kontroller kortet |
| RS-232 | Eldre PC-er og instrumenter | Inverterte signaler og positive/negative spenninger; ikke direkte kompatibelt med MCU-UART |
| RS-485 | Industrielle nettverk | Differensielt A/B-par; krever RS-485-transceiver |

«TTL» brukes ofte upresist i annonser. **En 3,3 V UART tåler ikke nødvendigvis 5 V.** USB-plugg, kontaktform og brikkenavn beviser ikke spenningsnivået.

## TX, RX og GND

For en UART med bekreftet kompatible logikknivåer kobles **adapter TX → enhet RX**, **adapter RX → enhet TX** og **GND → GND**. Enheten bør normalt ha egen strømforsyning; ikke koble adapterens 3,3 V- eller 5 V-utgang uten dokumentert behov.

På en ukjent ruter er et tryggere første forsøk **ruter TX → adapter RX og felles GND**, mens ruteren får strøm separat. Da kan oppstartsmeldinger leses uten å drive ruterens RX-inngang. Verifiser alltid pinnene og spenningsnivåene først.

## Finn adapteren i Linux

```sh
lsusb
dmesg --follow
ls -l /dev/serial/by-id/ /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

Koble til adapteren mens du følger kjerneloggen. Enhetsnavnet kan variere med driver og andre USB-enheter. Ikke anta at `/dev/ttyUSB0` alltid er riktig.

Installer for eksempel `picocom` og bruk dokumentert baudrate:

```sh
sudo apt install picocom
picocom -b 115200 /dev/ttyUSB0
```

**115200 8N1 er vanlig, men ikke universelt.** Sjekk dokumentasjonen til enheten. På enkelte distribusjoner kreves medlemskap i en gruppe for tilgang til serieporten.

## Typiske feil

- RS-232 kobles direkte til 3,3 V UART-pinner.
- Man antar at 3,3 V/5 V-bryteren endrer signalnivået, selv om den kanskje bare endrer strømuttaket.
- TX kobles mot TX i stedet for mot RX.
- Enheten mates samtidig fra adapterens VCC og egen strømforsyning.
- Felles jord mangler.
- Man antar at RS-485-merkingen A/B er lik hos alle produsenter.

## Våre rimelige adaptere

HackShack Labs har bestilt FT232RL, CH340N og CH343G UART-adaptere, samt en separat CH343G RS-232/RS-485-konverter. **Vi har ennå ikke testet noen av dem selv.** Spenningsnivåer og Linux-støtte skal undersøkes når de kommer.

## Videre lesning

- [Linux-kjernens dokumentasjon om USB-seriell](https://docs.kernel.org/usb/usb-serial.html)
- [pySerial-dokumentasjonen](https://pyserial.readthedocs.io/en/latest/)
- [Texas Instruments: RS-485-ressurser](https://www.ti.com/interface/rs-485-rs-422/overview.html)

*Redaksjonell merknad: Dette er en fagguide, ikke en produkttest. Eventuelle affiliate-lenker skal merkes tydelig.*
