---
title: "SPI-flash på Linux: Sikker avlesning og sikkerhetskopiering med flashrom"
description: "En dokumentasjonsbasert innføring i SPI-flash, CH341A og trygg avlesning av firmware."
category: guides
lang: nb
date: 2026-10-20
tags: [spi, flashrom, ch341a, linux, firmware, reparasjon]
translationKey: spi-flash-linux-flashrom
draft: false
tested: false
evidence: documentation
---

En liten åttepinners SPI NOR-flashbrikke kan inneholde firmware i en ruter eller BIOS/UEFI i en PC. Det er nyttig å kunne lese innholdet før man endrer noe. **Men en billig USB-programmerer er ikke automatisk trygg for alle brikker.**

Dette er en forsiktig fremgangsmåte basert på dokumentasjon. **HackShack Labs har ikke gjennomført denne testen med det aktuelle CH341A/B-settet.**

## Undersøk maskinvaren først

Les hele merkingen på brikken og finn databladet. Kontroller:

- Nøyaktig brikkenavn, pinnekobling, kapasitet og støttede SPI-kommandoer.
- Forsyningsspenning: ofte 3,3 V, men noen brikker krever **1,8 V**.
- Programmererens faktiske forsyningsspenning **og signalnivåer**.
- Plassering av pinne 1 og riktig orientering av SOIC8-klemme eller sokkel.
- At kortet kan kobles helt fra ekstern strøm.

Enkelte eldre svarte CH341A-kort er rapportert å sende 5 V-signaler til flashbrikker som skal ha 3,3 V. Ikke anta at en medfølgende 1,8 V-adapter også nivåtilpasser alle signalene. Kontroller den konkrete kortrevisjonen.

## Begrensninger ved klemme på montert brikke

En SOIC8-klemme kan spare avlodding, men andre komponenter på SPI-bussen kan forstyrre signalene. Programmereren kan også bakmate hovedkortet gjennom beskyttelsesdioder. **Koble fra strøm og batterier der det er praktisk mulig; ikke koble programmereren til et kort som er påslått.** Selv et avslått kort kan være uegnet for avlesning med klemme. Stopp og undersøk hvis avlesningene er ustabile – **ikke øk spenningen**. Selv tre identiske avlesninger med samme hash viser bare gjentakbarhet, ikke at et bilde lest på kortet er gyldig.

## Installer flashrom

På Debian eller Ubuntu:

```sh
sudo apt update
sudo apt install flashrom
flashrom --version
```

Sjekk [flashrom-dokumentasjonen](https://www.flashrom.org/) for din programmerer og programversjon. Pakkene i Debian/Ubuntu kan ligge etter siste oppstrømsversjon; nyere flashbrikker kan kreve en nyere flashrom-versjon. Eksemplene under forutsetter en kompatibel CH341A SPI-programmerer, trygg elektrisk tilkobling og støttet flashbrikke.

## Les to ganger og sammenlign

```sh
sudo flashrom -p ch341a_spi
sudo flashrom -V -p ch341a_spi -r backup-1.bin 2>&1 | tee flashrom-read-1.log
sudo flashrom -p ch341a_spi -r backup-2.bin
sha256sum backup-1.bin backup-2.bin
cmp backup-1.bin backup-2.bin
```

Den første kommandoen **gjør bare en deteksjon**. Ikke gå videre hvis brikken ikke blir identifisert entydig. Flere brikker kan ha samme identifikasjon, slik at flashrom lister flere kandidater; kontroller merkingen og databladet, og bruk bare `-c` hvis du har bekreftet nøyaktig brikkemodell. Behold den detaljerte (`-V`) loggen sammen med sikkerhetskopiene. Ved bruk av `tee` må du kontrollere avslutningsstatusen til `flashrom` (`set -o pipefail` i Bash).

To identiske avlesninger viser gjentakbarhet, **men beviser ikke at innholdet er gyldig**. En tredje stabil avlesning kan styrke tilliten til tilkoblingen, men identiske hashverdier er fortsatt ingen garanti for gyldig firmware. Sjekk oppdaget brikketype, forventet filstørrelse og eventuelt format. Ta vare på originalen, og noter kortrevisjon, brikkemerking, flashrom-versjon og kommandoresultater.

## Ikke begynn med å skrive

Feil firmware kan gjøre enheten ubrukelig. En firmwarefil kan inneholde enhetsspesifikke kalibreringsdata, MAC-adresser, serienumre og konfigurasjon. Ikke skriv en fil bare fordi størrelsen stemmer. Intel-firmwaredeskriptorer, flash-layout og beskyttede områder (`--ifd` og layoutvalg) krever plattformspesifikk behandling og er utenfor denne innføringen i avlesning. Ikke anta at en komplett SPI-dump er trygg å skrive tilbake. Øv heller på en løs, kompatibel reservebrikke enn på et hovedkort du ikke kan erstatte.

En sikkerhetskopi kan også inneholde hemmeligheter og personopplysninger. Oppbevar den sikkert, og ikke publiser rå firmwarefiler uten å kontrollere rettigheter og personvern.

## Vanlige problemer

| Symptom | Mulig årsak |
| --- | --- |
| Brikken oppdages ikke | Feil pinnekobling, manglende støtte, feil spenning eller dårlig kontakt |
| Ulike hashverdier | Ustabil tilkobling, forstyrrelser på kortet eller ustabil forsyning |
| Enheten starter ikke etter skriving | Feil firmware, manglende enhetsspesifikke data eller feil ved verifisering |
| Brikken blir uventet varm | **Koble fra umiddelbart**; mulig koblings- eller spenningsfeil |

## Videre lesning

- [flashrom-prosjektet](https://www.flashrom.org/)
- [flashrom-manualen](https://manpages.debian.org/stable/flashrom/flashrom.8.en.html)
- [Kildekode og dokumentasjon](https://github.com/flashrom/flashrom)

*Redaksjonell merknad: Dette er en dokumentasjonsbasert guide, ikke en test av en bestemt programmerer. Vi fremsetter ingen påstander om produkters ytelse eller sikkerhetssertifisering.*
