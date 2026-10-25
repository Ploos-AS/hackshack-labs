---
title: "Installere eldre OpenWrt på TP-Link TL-WR703N"
description: "Undersøk firmwarefiler, kontrollsummer, installasjonsveier og gjenoppretting for TL-WR703N uten å forveksle dokumentasjon med maskinvaretesting."
category: how-tos
lang: nb
date: 2026-10-11
tags: [openwrt, tp-link, wr703n, firmware, recovery]
series: "WR703N Labs"
translationKey: wr703n-install-legacy-openwrt
draft: true
tested: false
evidence: documentation
---

> **Arbeid under utvikling – ikke bruk denne artikkelen som en ferdig prosedyre for firmwareinstallasjon.** Vi har ikke bekreftet installasjonsveier, oppstart eller gjenoppretting på egen WR703N-maskinvare. Nedlasting og SHA-256-kontroll i CI er ikke det samme som en trygg installasjon.

Dette er del 2 av [WR703N Labs](/series/wr703n-labs/). Del 1 handler om [TL-WR703N og begrensningene dens](/no/articles/wr703n-second-life/).

## Dokumentasjon og krav før publisering

| Dokumentasjon | Status | Hva det faktisk viser |
| --- | --- | --- |
| Kontrollsummer for arkiverte LEDE-filer | Verifisert i GitHub Actions | Nedlastede filer samsvarer med oppgitte summer; **ikke** maskinvarekompatibilitet |
| Headerfelt og filstørrelser | Automatisk analyse av **binærfiler** | Egenskaper ved arkivfilene; **ikke** målte flashadresser på ruteren |
| Faktisk maskinvarerevisjon og flashinndeling | **Ikke verifisert på fysisk ruter** | Må dokumenteres før valg av installasjonsfil |
| OEM-installasjon, seriellkonsoll og TFTP-gjenoppretting | **Ikke testet på fysisk ruter** | Må prøves på bekreftet revisjon før dette utkastet blir en installasjonsguide |

**Publiseringskrav:** Behold `draft: true` inntil fysisk enhet, fastvarekilde, gjenopprettingsmetode, skrivebeskyttet seriell oppstartslogg og en etterprøvbar installasjons- eller gjenopprettingstest er dokumentert. Arkivert fastvare er uten ordinær sikkerhetsstøtte og hører bare hjemme i et bevisst isolert labnett, aldri som sikkerhetsbarriere mot internett.

## Hva vi må verifisere

Før publisering skal vi dokumentere nøyaktig maskinvarerevisjon, firmwarefilenes navn og kontrollsummer, riktig installasjonsvei fra hver aktuell startfirmware og en praktisk prøvd gjenopprettingsmetode. Opprinnelig WR703N har 4 MB flash og 32 MB RAM. Foreldet firmware må bare brukes på et isolert laboratorienett.

## Trinn 1: Identifiser maskinvaren

Noter modell og maskinvarerevisjon fra etiketten under ruteren. Firmware for andre TP-Link-modeller eller revisjoner kan ikke antas å være kompatibel.

Hvis OpenWrt allerede kjører og SSH fungerer, kan du samle inn:

```sh
cat /etc/openwrt_release
cat /proc/cpuinfo
cat /proc/mtd
```

Hvis ruteren har original TP-Link-firmware, registrerer du versjonen i produsentens grensesnitt. Kommandoene over er ikke ment for originalfirmwaren.

## Trinn 2: Finn og kontroller firmware

Bruk [OpenWrts WR703N-side](https://openwrt.org/toh/tp-link/tl-wr703n), [enhetsdata for v1](https://openwrt.org/toh/hwdata/tp-link/tp-link_tl-wr703n_v1) og [det offisielle utgivelsesarkivet](https://archive.openwrt.org/releases/).

**Avvik i filnavn:** Enhetsdatabasen bruker prefikset `openwrt-17.01.7-`, mens den offisielle utgivelsesindeksen oppgir `lede-17.01.7-` for WR703N v1. Indeksen oppgir disse filene:

| Type | Filnavn | Størrelse | SHA-256 |
| --- | --- | --- | --- |
| Factory | `lede-17.01.7-ar71xx-generic-tl-wr703n-v1-squashfs-factory.bin` | 3840 KiB | `25ca8f0291a0c968eccab8014f07caf7396aaf426a93971fdc78e9b277caade9` |
| Sysupgrade | `lede-17.01.7-ar71xx-generic-tl-wr703n-v1-squashfs-sysupgrade.bin` | 3520 KiB | `d2da675ed456743c674b2190de859954fb1606be7dbd9e59056ec10fc878e44f` |

Kilde: [LEDE 17.01.7, ar71xx/generic](https://downloads.openwrt.org/releases/17.01.7/targets/ar71xx/generic/). Filene ble lastet ned og kontrollert med SHA-256 i GitHub Actions. Dette **bekrefter ikke** at de er trygge å installere på vår ruter. Ikke bruk de feilaktige eldre `openwrt-`-adressene.

Før en installasjonsveiledning kan publiseres, må filkilde, tilgjengelighet, filnavn, kontrollsum fra en troverdig manifestfil og tiltenkt installasjonsvei registreres. *Factory* og *sysupgrade* er ikke ombyttbare.

## Kontroll av nyere offisielle utgaver (11. oktober 2026)

Vi undersøkte de offisielle `sha256sums`-manifestene:

- **LEDE 17.01.7, ar71xx/generic:** Begge WR703N v1-filene er oppført.
- **OpenWrt 18.06.9, ar71xx/generic:** Ingen WR703N-oppføring funnet.
- **OpenWrt 19.07.10, ath79/tiny:** Ingen WR703N-oppføring funnet.

**17.01.7 er dermed den nyeste stabile, modellspesifikke utgivelsen vi har identifisert**, ikke bevis for at andre historiske bygg, utviklingsversjoner eller fellesskapsbygg aldri har eksistert. En generell påstand om siste utgave for 4/32-enheter er ikke dokumentasjon på støtte for akkurat WR703N.

Kilder: [17.01.7-manifest](https://downloads.openwrt.org/releases/17.01.7/targets/ar71xx/generic/sha256sums), [18.06.9-manifest](https://downloads.openwrt.org/releases/18.06.9/targets/ar71xx/generic/sha256sums) og [19.07.10-manifest](https://downloads.openwrt.org/releases/19.07.10/targets/ath79/tiny/sha256sums).

**Uavhengig filkontroll:** Begge binærfilene ble lastet ned og SHA-256-verifisert i [GitHub Actions-kjøring #1](https://github.com/Ploos-AS/hackshack-labs/actions/runs/38355522292) 13. oktober 2026. JSON-artefakten viser PASS for begge. Filintegritet sier ingenting om fysisk kompatibilitet eller trygg flashing.

## Gjenta integritetskontrollen

Repoet har et [skript for nedlasting og SHA-256-kontroll](https://github.com/Ploos-AS/hackshack-labs/blob/main/scripts/verify-wr703n-firmware.sh). På en Linux-maskin med `curl` og `sha256sum` kan du kjøre følgende fra en utsjekket kopi:

```sh
bash scripts/verify-wr703n-firmware.sh
```

Skriptet avslutter med feil hvis nedlasting eller kontrollsum ikke stemmer. Det installerer **ikke** firmware, identifiserer ikke maskinvarerevisjonen og kvalifiserer ikke filen for flashing. Behold terminalutskrift og faktiske hashverdier som dokumentasjon.

## Skrivebeskyttet analyse av filstrukturen

Når filene er lastet ned og verifisert, kan du bruke repoets [analyseverktøy](https://github.com/Ploos-AS/hackshack-labs/blob/main/scripts/analyze-wr703n-images.py):

```sh
python3 scripts/analyze-wr703n-images.py \
  wr703n-firmware/lede-17.01.7-ar71xx-generic-tl-wr703n-v1-squashfs-factory.bin \
  wr703n-firmware/lede-17.01.7-ar71xx-generic-tl-wr703n-v1-squashfs-sysupgrade.bin \
  --output wr703n-firmware/analysis.json
```

JSON-rapporten inneholder filstørrelser, beregnede og forventede hashverdier, de første 32 bytene og mulige signaturer for uImage og SquashFS. Signatursøk er **heuristiske** og kan ikke bekrefte partisjonsgrenser, oppstartslasterkompatibilitet eller sikker flashing. Verktøyet returnerer feil dersom filnavn eller SHA-256 ikke samsvarer med de kjente verdiene.

**Resultater fra 13. oktober 2026:** [Kjøring #1](https://github.com/Ploos-AS/hackshack-labs/actions/runs/38355522292) analyserte de nedlastede filene:

| Felt | Factory | Sysupgrade |
| --- | ---: | ---: |
| Antall byte | 3 932 160 | 3 604 484 |
| SHA-256 | PASS | PASS |
| SquashFS-signatur, little-endian | Offset 1 276 820 | Offset 1 276 820 |
| uImage-signatur | Ikke funnet | Ikke funnet |

En ny [kjøring 13. oktober](https://github.com/Ploos-AS/hackshack-labs/actions/runs/38356130125) dekodet SquashFS v4-superblokken:

| SquashFS-egenskap | Begge filer |
| --- | ---: |
| Versjon | 4.0 |
| Komprimerings-ID | 4 (XZ) |
| Blokkstørrelse | 262 144 byte |
| Inoder | 1 127 |
| Fragmenter | 18 |
| Brukte byte | 2 303 654 |
| Startoffset | 1 276 820 |
| Sluttoffset, eksklusiv | 3 580 474 |
| Rimelighetskontroll av superblokk | PASS |

Verdiene er like i begge filer, og oppgitt filsystemutstrekning passer innenfor filstørrelsene. Dette verifiserer verken alle komprimerte blokker eller ruterens faktiske flashpartisjoner. Manglende uImage-signatur betyr ikke nødvendigvis ugyldig firmware. Offseten er **ikke** en verifisert adresse for skriving til flash.

## Factory mot sysupgrade: forskjeller målt i arkivfiler

Analyseverktøyet sammenligner filene byte for byte og registrerer felles prefiks og suffiks, første ulike byte, størrelsesforskjell og de første 64 bytene.

I [kjøring #3, 13. oktober](https://github.com/Ploos-AS/hackshack-labs/actions/runs/38400344910) var factory-filen **327 676 byte større** enn sysupgrade. De hadde identiske første **76 byte**, første forskjell ved **offset 76**, og ingen identisk suffiks. Begge begynte med ASCII-teksten `OpenWrt` og identifikatoren `r4030-6028f00df0` innenfor de første 64 bytene. SHA-256 var PASS for begge.

Dette dokumenterer **ikke** lengden på produsentheader, utfyllingsregler, oppstartslasterområdet eller trygge flashadresser. Factory-filen må bare brukes via en verifisert OEM-installasjonsvei, og sysupgrade bare ved en kompatibel OpenWrt-oppgradering.

## TP-Link v1-header: observasjoner fra binærfiler

En [automatisk kjøring 13. oktober](https://github.com/Ploos-AS/hackshack-labs/actions/runs/38466400856) undersøkte mulige TP-Link v1-headerfelt. Feltinndelingen tilsvarer definisjonene i [OpenWrts mktplinkfw-kildekode](https://lxr.openwrt.org/source/firmware-utils/src/mktplinkfw.c).

| Headerfelt | Factory | Sysupgrade |
| --- | --- | --- |
| Headerversjon, big-endian | `0x01000000` | `0x01000000` |
| Leverandør | `OpenWrt` | `OpenWrt` |
| Firmwarerevisjon | `r4030-6028f00df0` | Samme |
| Maskinvare-ID | `0x07030101` | Samme |
| Maskinvarerevisjon | `1` | `1` |
| Oppgitt firmwarelengde | 3 932 160 byte | 3 932 160 byte |
| Kjerneoffset | `0x200` | `0x200` |
| Kjernelengde | 1 276 308 byte | 1 276 308 byte |
| Rootfs-offset | `0x100000` | `0x100000` |
| Rootfs-lengde | 2 303 654 byte | 2 303 654 byte |
| Primære kontrollsumbyte | Forskjellige | Forskjellige |

**Rootfs-offseten i headeren** må ikke forveksles med den observerte SquashFS-signaturen ved byte 1 276 820. De beskriver forskjellige forhold og kan ikke brukes som utbyttbare adresser for flashskriving. Den kortere sysupgrade-filen oppgir samme totale lengde i headeren. Dette kan stemme med ulik utfylling, men innholdet og kontrollsumreglene må fortsatt verifiseres. Vi utleder ingen flashkommandoer fra analysen.

## Trinn 3: Planlegg gjenoppretting før installasjon

Enhetsdokumentasjonen beskriver seriellkonsoll på **3,3 V UART, 115200 8N1**. Bekreft kortrevisjon og pinneoppsett før tilkobling. Vanlige RS-232-spenningsnivåer må aldri kobles direkte til kortet. Vi må fotografere eget kort, registrere oppstartslogg og teste U-Boot/TFTP-gjenoppretting før prosedyren kan publiseres som verifisert.

## Trinn 4: Velg riktig installasjonsvei

### A. Original TP-Link-firmware: v1.6 og eldre

[OpenWrts enhetsside](https://openwrt.org/toh/tp-link/tl-wr703n) beskriver historisk opplasting av factory-fil gjennom produsentens nettgrensesnitt, ofte på `192.168.1.1` med `admin/admin` på enkelte eldre versjoner. Noen grensesnitt avviser lange filnavn med feil **23002**. Den dokumenterte omveien er å gi den **allerede verifiserte factory-filen** navnet `openwrt.bin`. Et nytt filnavn endrer ikke innholdet eller sikkerheten.

**Ikke utfør installasjonen ennå.** Kontroller først maskinvarerevisjon, eksisterende firmware, riktig image, uavhengig SHA-256-resultat og gjenopprettingsmuligheter. Adresse og innlogging kan variere.

### B. Original TP-Link-firmware: unntak for v1.7

Enhetssiden opplyser at **v1.7 med 3.17.1 Build 140120 Rel.56593n** avviser OpenWrt via produsentens nettgrensesnitt og viser til TFTP. Vi skal ikke gjette TFTP-adresser, filnavn, flashoffseter eller U-Boot-kommandoer. Slike detaljer må kontrolleres mot revisjonsspesifikk dokumentasjon og en faktisk seriell oppstartslogg.

### C. OpenWrt er allerede installert

Bruk en modelltilpasset **sysupgrade**-fil, ikke factory. [OpenWrts sysupgrade-veiledning](https://openwrt.org/docs/guide-user/installation/generic.sysupgrade) beskriver både LuCI og kommandolinje. Før oppgradering må installert versjon, plattform, pakkeliste, konfigurasjonskopi og filhash registreres. Oppgraderinger kan fjerne installerte pakker og filer som ikke er bevart.

[Veiledningen om innstillinger](https://openwrt.org/docs/guide-quick-start/admingui_sysupgrade_keepsettings) advarer mot å videreføre gammel konfigurasjon ved store versjonshopp. Vi planlegger derfor i utgangspunktet en ren konfigurasjon, men den konkrete oppgraderingsveien må undersøkes. **Ingen flashkommando gis før prosedyren er kvalifisert.**

### D. Enheten starter ikke: bare gjenoppretting

Dokumentert gjenoppretting omfatter **U-Boot, TFTP og seriell tilgang**. Dette er ikke det samme som en vanlig weboppgradering. Gjenoppretting er heller ikke garantert hvis oppstartslaster eller flashminne er skadet. Først må vi hente en seriell oppstartslogg og identifisere den faktiske oppstartslasteren.

## Beslutningstre for gjenoppretting

**Tilfelle 1 – OpenWrt starter, men tilgang eller konfigurasjon er ødelagt.** Undersøk OpenWrts *failsafe*-modus først. Dette er verken U-Boot-gjenoppretting eller vanlig fabrikktilbakestilling. [Offisiell failsafe-veiledning](https://openwrt.org/docs/guide-user/troubleshooting/failsafe_and_factory_reset) beskriver at trådløst nett og DHCP normalt er deaktivert, og at enheten vanligvis bruker `192.168.1.1`. Koble en arbeidsstasjon direkte til Ethernet og angi en passende statisk adresse, eksempelvis `192.168.1.10/24`. Eldre WR703N-instruksjoner varierer med hensyn til tidspunkt for Reset-knappen: observer LED-mønsteret. Failsafe kan ikke reparere en manglende kjerne eller ødelagt oppstartslaster.

**Tilfelle 2 – OpenWrt starter og er tilgjengelig.** Ta sikkerhetskopi og registrer firmwareopplysninger. Ikke bruk TFTP eller slett flash bare for å løse en konfigurasjonsfeil.

**Tilfelle 3 – Kjernen starter ikke, men U-Boot kjører.** [Enhetssiden](https://openwrt.org/toh/tp-link/tl-wr703n) beskriver seriell/TFTP-gjenoppretting. Hent først en skrivebeskyttet seriell oppstartslogg på **115200 8N1** og undersøk oppstartslasterens miljø. Historiske eksempler bruker destruktive `erase`- og `cp.b`-kommandoer. **Ikke kopier dem** uten uavhengig verifisering av minnekart, imageoppsett og maskinvarerevisjon. U-Boot/TFTP er en annen metode enn OpenWrt failsafe.

**Tilfelle 4 – Ingen seriell utskrift fra oppstartslasteren.** Undersøk strømforsyning og elektriske tilkoblinger før du konkluderer med ødelagt flash. Skadet oppstartslaster eller maskinvare kan kreve spesialisert SPI-flashgjenoppretting. Her gis ingen uprøvde programmeringsinstruksjoner.

## Sikker sjekkliste for å observere seriellkonsollen

Bruk en USB-til-UART-adapter med **3,3 V logikknivå**. Identifiser `TP_OUT`, `TP_IN` og jord i dokumentasjonen for ditt kort. Ved første, skrivebeskyttede observasjon kobler du **ruterens TX til adapterens RX** og **jord til jord**, og gir ruteren strøm på vanlig måte gjennom micro-USB. Ikke koble adapterens VCC. Ikke bruk en vanlig RS-232-port. Koble først til ruterens RX når oppsettet er kontrollert og interaktiv gjenoppretting er nødvendig. Unngå mekanisk belastning på små testpunkter.

På Linux kan du åpne en seriell sesjon med `picocom -b 115200 /dev/ttyUSB0`, etter at du har kontrollert riktig enhetsnavn. Dette er en kommando på arbeidsstasjonen, **ikke** en firmwarekommando.

Registrer kortrevisjon, adaptermodell, seriellport, oppstartslasterversjon, oppdaget flashstørrelse, LED-mønster, nettverksatferd og full konsollutskrift. Fjern MAC-adresser og andre enhetsidentifikatorer før publisering.

## Verifikasjonsstatus

| Kontroll | Status |
| --- | --- |
| Foto av egen WR703N med maskinvarerevisjon | Gjenstår |
| Offisielt arkiv viser nøyaktige filnavn og SHA-256 | Bekreftet fra indeks |
| Binærfiler lastet ned og kontrollert uavhengig | PASS i GitHub Actions #1, 13. oktober 2026 |
| 18.06.9-manifest undersøkt | Ingen WR703N-fil funnet |
| 19.07.10-manifest undersøkt | Ingen WR703N-fil funnet |
| OEM-installasjonsvei for v1.6 og eldre | Kilde gjennomgått, ikke maskinvaretestet |
| Unntak for v1.7 og TFTP | Kilde gjennomgått, ikke maskinvaretestet |
| Installasjon fra originalfirmware | Gjenstår |
| Oppgradering fra OpenWrt | Gjenstår |
| Seriell pinnekonfigurasjon og oppstartslogg | Gjenstår |
| Gjenoppretting testet | Gjenstår |

**Publiseringskrav:** Artikkelen skal forbli et utkast inntil nødvendige trinn er verifisert på maskinvare og gjenværende risiko er tydelig dokumentert.
