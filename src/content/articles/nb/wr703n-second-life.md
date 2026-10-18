---
title: "TP-Link TL-WR703N: Gi en liten Linux-ruter nytt liv"
description: "En dokumentasjonsbasert gjennomgang av TL-WR703N, eldre OpenWrt, seriellkonsoll, mulige bruksområder og et nyere alternativ."
category: guides
lang: nb
date: 2026-10-11
updated: 2026-10-11
tags: [openwrt, tp-link, wr703n, embedded-linux, retro-hardware]
series: "WR703N Labs"
translationKey: wr703n-second-life
draft: true
tested: false
evidence: documentation
---

**Har du en TP-Link TL-WR703N liggende i en skuff?** Denne lille reiseruteren er fortsatt interessant for den som vil lære om Linux på svært begrenset maskinvare. Den ble populær blant entusiaster fordi den er kompakt, bruker lite strøm og historisk har kunnet kjøre OpenWrt.

WR703N kom rundt 2011 og er for lengst ute av produksjon. Denne veiledningen er først og fremst for deg som allerede har en. Skal du kjøpe utstyr til et nytt prosjekt, finnes det mer praktiske alternativer.

## En liten Linux-datamaskin

Den opprinnelige TL-WR703N er en komplett innebygd datamaskin i et lite blått og hvitt kabinett.

| Komponent | Opprinnelig maskinvare |
| --- | --- |
| Systembrikke | Atheros AR9331 |
| Prosessor | 400 MHz MIPS 24Kc |
| Minne | 32 MB RAM |
| Flash | 4 MB SPI NOR |
| Trådløst nett | 2,4 GHz 802.11b/g/n, opptil 150 Mbit/s lenkehastighet |
| Ethernet | Én 10/100 Mbit/s-port |
| USB | Én USB 2.0-vertsport |
| Strøm | 5 V via micro-USB |
| Mål | Omtrent 57 × 57 × 18 mm |

Fire megabyte flash og 32 MB RAM er svært lite etter dagens målestokk. Likevel gjør kombinasjonen av Ethernet, Wi-Fi og USB ruteren interessant for å utforske ressursbegrenset Linux. Kretskortet har også tilkoblingspunkter for 3,3 V UART. Å åpne kabinettet og bruke disse krever forsiktighet.

## Viktig: Dette er foreldet maskinvare

**Ikke bruk WR703N med gammel, usupportert firmware som hovedruter eller sikkerhetsbarriere mot internett.** Historiske OpenWrt-utgaver får ikke ordinære sikkerhetsoppdateringer og kan inneholde utdaterte kjerner, kryptografibiblioteker og nettverkstjenester.

Bruk et eget, isolert laboratorienett. Ikke eksponer administrasjonsgrensesnittet mot internett. Ikke koble et eksperimentelt aksesspunkt til produksjonsnettet uten å forstå konfigurasjonen.

## Hvorfor OpenWrt er interessant

TP-Link markedsførte opprinnelig WR703N som en bærbar ruter, blant annet for deling av internett via kompatible USB-modemer. OpenWrt ga entusiaster tilgang til Linux-verktøy, kommandolinje, konfigurasjonsfiler og lette nettverkstjenester.

Atheros AR9331 og de knappe ressursene gjør ruteren til et nyttig studieobjekt for innebygde systemer. Det betyr ikke at den egner seg til moderne rutertjenester.

## Identifiser ruteren før du endrer noe

Kontroller modell og maskinvarerevisjon på etiketten under enheten. Hvis original TP-Link-firmware fortsatt er installert, noter revisjonen og hopp over kommandoene nedenfor.

Hvis OpenWrt allerede kjører og du har SSH-tilgang, kan du samle inn systeminformasjon:

```sh
cat /etc/openwrt_release
cat /proc/cpuinfo
cat /proc/mtd
free
```

Ta vare på resultatene. Særlig partisjonsoversikten og firmwareversjonen er nyttige når du undersøker oppgradering eller gjenoppretting.

## Finne kompatibel OpenWrt-firmware

Begynn med den offisielle [enhetssiden for WR703N](https://openwrt.org/toh/tp-link/tl-wr703n), [tekniske data for WR703N v1](https://openwrt.org/toh/hwdata/tp-link/tp-link_tl-wr703n_v1) og [OpenWrts utgivelsesarkiv](https://archive.openwrt.org/releases/).

Enhetsdatabasen viser historiske LEDE 17.01.7-bilder av typene *factory* og *sysupgrade* for WR703N v1. Direkte nedlastingslenker som var oppført der, var ikke tilgjengelige ved kontroll 11. oktober 2026. **Vi omtaler dem derfor ikke som verifiserte nedlastinger.**

Et *factory*-bilde brukes ved en støttet førstegangsinstallasjon fra produsentens firmware. Et *sysupgrade*-bilde er beregnet på oppgradering av en eksisterende, kompatibel OpenWrt-installasjon. De er ikke ombyttbare. Siste utgivelse for en generell maskinvareklasse med 4 MB flash og 32 MB RAM er heller ikke nødvendigvis siste tilgjengelige bilde for akkurat denne modellen.

Vi vil behandle valg av firmware, verifiserte filer, kontrollsummer og installasjon i en egen artikkel når arkivene og gjenopprettingsmetoden er undersøkt nærmere. Ikke installer firmware for en lignende ruter bare fordi versjonsnummeret er høyere.

## Seriell tilgang og gjenoppretting

Feil under firmwareinstallasjon kan gjøre at enheten ikke starter. WR703N er dokumentert med seriellkonsoll på **115200 baud, 8 databiter, ingen paritet og ett stoppbit (115200 8N1)**. OpenWrt-dokumentasjonen omtaler UART-punkter som `TP_IN`, `TP_OUT` og jord.

Du trenger en passende **USB-til-UART-adapter med 3,3 V signalnivå**. Koble aldri vanlige RS-232-spenningsnivåer direkte til kretskortet. Kontroller pinneoppsettet for akkurat din kortrevisjon før du kobler noe til. Ikke anta at enhver oppstartsfeil kan repareres. U-Boot og TFTP er omtalt i [OpenWrts enhetsdokumentasjon](https://openwrt.org/toh/tp-link/tl-wr703n).

Vi planlegger å supplere med et eget fotografi av kretskortet og en praktisk verifisert gjenopprettingsveiledning. Dette er **ikke utført eller dokumentert som en gjennomført maskinvaretest** ennå.

## Tre mulige eksperimenter

**Et isolert trådløst aksesspunkt.** Lag et lite, frittstående Wi-Fi-nett for å lære om DHCP, ruting og aksesspunktoppsett uten å endre hjemmenettet.

**Seriell kommunikasjon over nettverk.** Med riktige maskinvaretilkoblinger kan et lett verktøy som `ser2net` i noen oppsett gjøre seriellutstyr tilgjengelig over et lokalt nett. Undersøk først om pakken finnes for aktuell firmware, og om minnet strekker til.

**USB-lagring og extroot.** På en fungerende OpenWrt-installasjon kan kompatibel USB-lagring og *extroot* gi mer plass til skrivbare filer. Dette øker ikke RAM. Kjerne- og filsystemmoduler må passe til firmwareversjonen.

Dette er muligheter som bør undersøkes, **ikke** oppsett vi har kvalifisert på egen WR703N.

## Starter du fra bunnen? Vurder GL.iNet Mango

Hvis du ikke allerede eier en WR703N, anbefaler vi ikke å betale overpris for å skaffe en. **GL.iNet Mango (GL-MT300N-V2)** gir en lignende liten ruterplattform med større kapasitet.

| Egenskap | TL-WR703N | GL.iNet Mango (GL-MT300N-V2) |
| --- | --- | --- |
| Prosessor | AR9331, 400 MHz | MT7628, 580 MHz |
| RAM | 32 MB | 128 MB |
| Flash | 4 MB | 16 MB |
| Ethernet | 1 port | 2 porter |
| USB | USB 2.0 | USB 2.0 |
| Wi-Fi | 2,4 GHz 802.11n | 2,4 GHz 802.11n |
| OpenWrt | Eldre, uten nåværende offisiell støtte | Støtte i nyere oppstrømsutgaver |

Mango har fire ganger så mye RAM og flashkapasitet, men ikke nødvendigvis fire ganger så høy ytelse. I motsetning til den opprinnelige WR703N har den støtte i nyere OpenWrt-utgaver. Dette ble kontrollert mot enhetsinformasjon for utgave 25.12.2 i oktober 2026. GL.iNet tilbyr også egen OpenWrt-basert firmware.

Se [GL.iNets produktside for Mango](https://www.gl-inet.com/products/gl-mt300n-v2/) for produsentens informasjon. Dette er en produsentlenke, ikke en affiliatelenke.

## Oppsummering

WR703N er ikke lenger et godt valg som hverdagsruter, men den kan fortsatt lære oss mye om Linux, nettverk og små innebygde systemer. Har du allerede en, kan den være verdt å undersøke.

**Neste i WR703N Labs:** *Installere eldre OpenWrt på TL-WR703N* skal ta for seg kontroll av firmwarefiler, kontrollsummer, forsiktig installasjon og forberedelse til gjenoppretting.

---

*Utgitt av HackShack Labs / Ploos AS · CC BY 4.0 · Sist gjennomgått 11. oktober 2026 · Firmwarelenker kontrollert 11. oktober 2026 · Maskinvareinstallasjon er ikke verifisert.*
