---
title: "Logikkanalysator på Linux: Kom i gang med sigrok og PulseView"
description: "Om samplingsfrekvens, spenningsgrenser, protokolldekoding og en reproduserbar arbeidsflyt på Linux."
category: guides
lang: nb
date: 2026-10-23
tags: [logikkanalysator, linux, sigrok, pulseview, uart, spi, i2c]
series: "Electronics Fundamentals"
translationKey: logic-analyzer-linux-sigrok-pulseview
draft: false
tested: false
evidence: documentation
---

En USB-logikkanalysator kan registrere digitale signalendringer og gjøre det enklere å forstå hva en innebygd enhet gjør. På Linux gir det åpne **sigrok**-økosystemet og det grafiske programmet **PulseView** opptak og protokolldekoding for støttet maskinvare.

Dette er en **dokumentasjonsbasert introduksjon, ikke en produkttest**. HackShack Labs har ennå ikke testet den rimelige logikkanalysatoren vi planlegger å bruke.

## Logikkanalysator eller oscilloskop?

En logikkanalysator registrerer i hovedsak om signaler tolkes som *lave* eller *høye*. Den passer til timing og dekoding av UART, I²C og SPI, men viser ikke den faktiske analoge kurveformen, oversving, spenningsmargin eller støy. Multimeter og oscilloskop er fortsatt viktige når elektriske forhold er usikre.

**Kontroller inngangenes tillatte spenningsområde før tilkobling.** En USB-logikkanalysator for 3,3 V/5 V-logikk tåler ikke automatisk RS-232-spenningssvingninger, nettspenning eller ukjente signaler. Bruk bare en trygg, felles referanse.

## Tre viktige spesifikasjoner

- **Kanaler:** Antall samtidige signaler. UART krever én eller to; SPI kan kreve klokke, MOSI, MISO og chip select; I²C trenger vanligvis SDA og SCL.
- **Samplingsfrekvens:** Antall målinger per sekund per kanal. Flere prøver innenfor korteste puls gir bedre tidsoppløsning. Annonsert maksimalverdi kan avhenge av antall aktive kanaler og USB-kapasitet.
- **Opptakslengde:** Hvor mye som kan lagres. Høyere samplingsfrekvens kan redusere tilgjengelig opptakstid.

Som eksempel gir **24 MS/s** et nominelt intervall mellom prøvene på omtrent **41,7 ns**. Det betyr **ikke** at instrumentet kan analysere vilkårlige 24 MHz-signaler korrekt. Som en **grov tommelfingerregel** bør du starte med minst **4× bitraten eller raskeste hendelsesfrekvens**, og sikte mot **10× eller mer** for tidsdetaljer. Svært korte glitcher krever langt høyere rate; tallene garanterer ikke fangst, og en flanke har ikke én bestemt frekvens. Kontroller terskelverdier, kanalbegrensninger og kravene til dekoderen.

## Installer på Debian eller Ubuntu

Installer PulseView og sigrok-verktøy der de er tilgjengelige:

```sh
sudo apt update
sudo apt install pulseview sigrok-cli
# For kompatible Cypress FX2/FX2LP-analysatorer på Debian:
sudo apt install sigrok-firmware-fx2lafw
sigrok-cli --version
sigrok-cli --scan
```

Pakkenavn, støttede drivere, firmware og USB-rettigheter varierer med distribusjon og adapter. At utstyret vises i `lsusb`, betyr **ikke** at sigrok støtter det. Sjekk [listen over støttet maskinvare](https://sigrok.org/wiki/Supported_hardware) for **den konkrete revisjonen**.

Mange rimelige åttekanalsanalysatorer bruker Cypress FX2/FX2LP som laster **fx2lafw**-firmware ved tilkobling. Debian-pakken `sigrok-firmware-fx2lafw` leverer den for kompatibel maskinvare; andre revisjoner trenger andre drivere eller firmware. Hvis søket ikke finner enheten, kontroller USB-ID og firmwaremeldinger.

Kontroller at passende **udev-regler** fra libsigrok er installert (noen distribusjoner krever ekstra oppsett). Kjør `sudo udevadm control --reload`, koble fra og til analysatoren, og kontroller sesjons-/grupperettigheter. Ikke kjør GUI som root for å omgå problemet.

**Detaljer om rettigheter fra oppstrømsdokumentasjonen:** [fx2lafw-veiledningen](https://sigrok.org/wiki/Fx2lafw) beskriver enhetsreglene `60-libsigrok.rules` og en tilgangsregel, for eksempel `61-libsigrok-uaccess.rules` (aktiv skrivebordsøkt) eller `61-libsigrok-plugdev.rules` (plugdev-gruppen). Undersøk først hva distribusjonen allerede har installert, og ikke legg inn begge tilgangsvariantene ukritisk. [Sigroks firmwareveiledning](https://sigrok.org/wiki/Firmware) dokumenterer hvor fastvarefilene skal ligge. Dette er oppstrømsanvisninger, ikke testresultater fra vår analysator.

Eksempel på opptak fra en **identifisert, kompatibel FX2-analysator** med trygg elektrisk tilkobling:

```sh
sigrok-cli -d fx2lafw --config samplerate=1m --samples 1M -o cap.sr
```

Kommandoen lagrer en sigrok-opptaksfil. Kontroller støttede rater og tilpass til signalet. **Dette er ikke et måleresultat fra HackShack Labs.**

## Første trygge opptak

1. Finn signaltype, spenningsnivå, tomgangstilstand og forventet hastighet i dokumentasjonen.
2. Med målenheten avslått: koble analysatorens **GND til egnet jord på målenheten** og inngangene bare til signaler innenfor dokumentert område.
3. Slå på målenheten, velg riktig maskinvare i PulseView og en passende samplingsfrekvens med god margin.
4. Gjør først et kort opptak, og juster deretter trigger, varighet og kanalvalg.
5. Legg til relevant **protokolldekoder**. Velg korrekt baudrate/polaritet for UART, SPI-modus/chip select eller SDA/SCL for I²C.
6. Lagre opptaket og innstillingene. Noter revisjoner og programversjoner slik at testen kan gjentas.

**Ikke forsyn kretsen med strøm gjennom analyseinngangene.** En vanlig logikkanalysator skal observere signaler, ikke drive dem. Ikke koble jord til punkter med ukjent potensial.

## Dekoding av vanlige busser

| Buss | Signaler | Vanlige innstillinger |
| --- | --- | --- |
| UART | TX, eventuelt RX, pluss felles jord | Baudrate, databiter, paritet, stoppbiter og polaritet |
| I²C | SDA + SCL | Riktige kanaler; se START, adresse, ACK og STOP |
| SPI | CLK, MOSI, MISO, CS | SPI-modus (CPOL/CPHA), bitrekkefølge og CS-polaritet |

Ved I²C-opptak må SDA og SCL ha fungerende pull-up-motstander til riktig spenning. Uten gyldige stigeflanker fungerer ikke dekodingen pålitelig.

Dekoderen kan vise noe som **ser riktig ut**, selv om innstillingene er feil. Sammenlign derfor dekodingen med rå timingdata og databladet.

## Typiske feil

Manglende opptak kan skyldes manglende **fx2lafw-firmware** på FX2-kloner, driver, udev-rettigheter, løs kontakt eller feil trigger. Enkelte rimelige analysatorer har faste logiske terskler rundt **1,4–1,6 V**, men dette varierer. **1,8 V-signaler kan ha for liten støymargin**; kontroller terskel og inngangsspenning for akkurat din modell. Uforståelig dekoding kan komme av for lav samplingsfrekvens, byttede kanaler eller feil dekoderinnstillinger. Dersom signalet alltid vises høyt eller lavt, kontroller spenning og referansejord før du fortsetter.

Rimelige «8-channel 24 MHz»-modeller kan finnes i flere revisjoner og kloner med ulik støtte. Ikke anta at like produktnavn betyr lik funksjonalitet. 24 MHz i en annonse kan vise til samplingsklokken, ikke en garantert bussfrekvens eller målenøyaktighet.

## Planlagte tester hos HackShack Labs

I vår senere laboratorietest vil vi dokumentere brikketype og revisjon, firmware/drivere, fungerende samplingsfrekvenser, kanalbegrensninger, opptak av kjente UART/I²C/SPI-referanser, stabilitet og Linux-rettigheter. **Her påstår vi ingen gjennomførte laboratoriemålinger.**


**Les videre:** Se [Elektronikk for nybegynnere](/no/series/electronics-basics/) for en anbefalt rekkefølge fra multimeter til UART, I²C, SPI-flash og logikkanalyse. Artiklene skiller mellom dokumentasjon og faktiske laboratoriemålinger.

## Kilder

- [sigrok-prosjektet](https://sigrok.org/wiki/Main_Page)
- [Støttet maskinvare](https://sigrok.org/wiki/Supported_hardware)
- [PulseView-dokumentasjon](https://sigrok.org/wiki/PulseView)
- [sigrok-cli-dokumentasjon](https://sigrok.org/wiki/Sigrok-cli)

- [fx2lafw-firmware og udev-oppsett](https://sigrok.org/wiki/Fx2lafw)
- [Debian-pakken for FX2-firmware](https://packages.debian.org/stable/sigrok-firmware-fx2lafw)
