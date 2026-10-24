---
title: "GL.iNet Mango: En liten ruter å eksperimentere med"
description: "Hvorfor GL-MT300N-V2 kan være en glimrende inngang til OpenWrt, Linux og nettverkseksperimenter – og hvor begrensningene går."
category: guides
lang: nb
date: 2026-10-14
tags: [gl-inet, mango, openwrt, ruter, linux, nettverk, maker]
series: offline-networking
translationKey: glinet-mango-tinkering
draft: false
tested: false
evidence: documentation
---

> **Reklame – annonselenke:** Artikkelen inneholder en tydelig merket annonselenke til GL.iNet Mango. Ploos AS kan motta provisjon ved kvalifiserte kjøp, uten ekstra kostnad for deg. Det påvirker ikke våre redaksjonelle vurderinger.

> **Redaksjonell merknad (14. oktober 2026):** Dette er en dokumentbasert forhåndsomtale, ikke en praktisk test. Vi har ennå ikke installert firmware eller målt ytelsen på GL-MT300N-V2 i forbindelse med artikkelen. Priser og firmwarestøtte kan endre seg.

## Kort svar

**GL.iNet Mango (GL-MT300N-V2) er en interessant liten ruter for å lære om Wi-Fi-aksesspunkter, OpenWrt og isolerte nettverk, så lenge maskinvarens begrensninger passer oppgaven.** Dette er en dokumentasjonsbasert vurdering – ikke dokumentasjon på at vi har installert ny fastvare, ytelsestestet ruteren eller kjørt PocketBox på den. [Serien om frakoblet nettverk](/no/series/offline-networking/) skiller publiserte undersøkelser fra planlagte eksperimenter med Mango og den eldre TL-WR703N.

## Den morsomste ruteren er kanskje den du tør å eksperimentere med

En kraftig ruter er fornuftig som hovedruter hjemme. Den er sjelden det beste stedet å eksperimentere med brannmurregler midt på natten.

Lille **GL.iNet Mango (GL-MT300N-V2)** tilbyr noe annet: rimelig maskinvare, et Linux-basert firmwaremiljø, nyttige grensesnitt og stor frihet til å prøve nye ting. Den er liten nok til å bli med i sekken og billig nok til å settes av til ett eksperiment av gangen.

GL.iNets egen nettside oppga **29,99 USD ved kontroll 14. oktober 2026**. Dette er en veiledende pris fra produsenten, ikke dokumentert norsk utsalgspris. Frakt, merverdiavgift og tilgjengelighet kan endre totalen.

Du kan undersøke tilgjengelighet og aktuell pris her: <a href="https://tidd.ly/4zA195J" rel="sponsored noopener" referrerpolicy="strict-origin-when-cross-origin">GL.iNet Mango (annonselenke)</a>. Endelig pris og kjøpsvilkår bestemmes av nettbutikken lenken fører til.

## Hva finnes inni Mango?

| Egenskap | GL-MT300N-V2 |
| --- | --- |
| Prosessor (SoC) | MediaTek MT7628NN (produsent); MT7628AN (OpenWrt-database), 580 MHz |
| RAM / flash | 128 MB DDR2 / 16 MB NOR |
| Wi-Fi | 2,4 GHz 802.11b/g/n, markedsført som N300 |
| Ethernet | 1 × WAN og 1 × LAN, begge 10/100 Mbps |
| Andre porter | USB 2.0, Micro-USB for strøm, reset- og modusbryter |
| Maskinvaretilgang (UART/GPIO) | UART og GPIO dokumentert av GL.iNet |
| Strøm | Micro-USB, 5 V; dokumentasjonen oppgir både 1 A og 2 A – bruk strømforsyning med tilstrekkelig kapasitet |
| Størrelse | Ca. 58 × 58 × 25 mm |

Dette er **produsentopplysninger**, ikke våre målinger. De markedsførte 300 Mbps gjelder teoretisk Wi-Fi-linkhastighet, ikke reell datagjennomstrømning. Ethernet-portene er begrenset til 100 Mbps, og 2,4 GHz-båndet er mange steder tettpakket. Kilder: [GL.iNet](https://www.gl-inet.com/products/gl-mt300n-v2) og [maskinvaredokumentasjonen](https://docs.gl-inet.com/router/en/2/hardware/mt300n-v2/).

## Hvorfor Mango i 2026 – og når bør du velge noe annet?

Mango er en eldre ruter med bevisste begrensninger. Den er attraktiv fordi den er rimelig, OpenWrt-basert og utstyrt med grensesnitt som egner seg til eksperimenter – ikke fordi den er rask eller moderne. Har du allerede en brukt ruter med OpenWrt-støtte, er det kanskje et billigere og mer miljøvennlig valg. En nyere GL.iNet-modell er bedre hvis du trenger tobånds Wi-Fi, raskere Ethernet eller en fast reiseruter. En enkortsmaskin passer bedre om prosjektet krever mer minne, lagring eller regnekraft, men erstatter ikke nødvendigvis en ruter med to nettverksporter.

Ingen av alternativene nevnes som del av et affiliate-samarbeid. Velg maskinvare ut fra hva du ønsker å undersøke.

## Hvorfor er den så interessant å hacke på?

**Den hører hjemme i OpenWrt-verdenen.** GL.iNets firmware bygger på OpenWrt og har et tilgjengelig administrasjonsgrensesnitt. Ruteren er også oppført i [OpenWrts maskinvaredatabase](https://openwrt.org/toh/hwdata/gl.inet/gl.inet_gl-mt300n_v2). Det gjør den interessant for eksperimenter med vanlig OpenWrt.

**Den har praktiske tilkoblinger.** WAN og LAN er nyttige i nettverkslabben. USB gir flere muligheter, med forbehold om strømforbruk og drivere. UART og GPIO er spennende for elektronikkinteresserte, men det kan være nødvendig å åpne kabinettet og lodde på kontaktpunkter.

**Begrensningene lærer deg noe.** 16 MB flash og 128 MB RAM er betydelig romsligere enn 4 MB/32 MB, men gjør den ikke til en fullverdig server. Du må fortsatt tenke på pakkestørrelser, minnebruk, lagring og hvordan du gjenoppretter enheten etter feil.

GL.iNets maskinvaredokumentasjon peker på en viktig **forskjell mellom Wi-Fi-drivere**: leverandørens MediaTek-driver og den åpne mt76-driveren har ikke nødvendigvis samme egenskaper. GL.iNet omtaler dessuten tidligere problemer med kjernekræsj for den åpne driveren. Ikke anta at monitor mode, repeater-broing eller stabilitet er identisk mellom original firmware og vanlig OpenWrt. Dette må testes. [Kilde](https://docs.gl-inet.com/router/en/2/hardware/mt300n-v2/).

## Seks morsomme prosjekter

1. **Isolert trådløst labnett:** Lag et eget Wi-Fi-nett og koble en annen maskin til Ethernet for nettsider, BBS eller et offline bibliotek. Hold labnettet adskilt fra hjemmenettet.
2. **OpenWrt som læremiljø:** Utforsk LuCI, SSH, nettverksgrensesnitt, DHCP, DNS og brannmursoner. Lagre en fungerende konfigurasjon først.
3. **Reiseruter-lab:** Sammenlign Ethernet som WAN, Wi-Fi-repeater og USB-deling av mobilnett på firmware som støtter funksjonene.
4. **Undersøk seriellkonsollen:** Dokumenter UART-spenning og pinout *før* du kobler til adapter. Bruk riktig 3,3 V TTL-grensesnitt, aldri RS-232-spenningsnivåer direkte. Når ruteren har egen strøm, kobler man vanligvis bare **GND, TX og RX** (TX krysses mot RX). La VCC fra serieadapteren være frakoblet. Bekreft pinout og spenningsnivå før noe kobles til.
5. **USB og pakkehåndtering:** Undersøk hvor langt USB, pakkesystem og begrenset flash rekker. Mål begrensningene før du setter viktige tjenester på den.
6. **Et lite offline-nettverk:** La Mango være Wi-Fi-tilgangspunkt og ruter, mens en kraftigere maskin på Ethernet kjører de krevende tjenestene.

Det siste er kanskje det morsomste: Ruteren trenger ikke gjøre *alt*. Et lite tilgangspunkt og en separat server kan bli en imponerende, bærbar lab.


**Frakoblet betyr ikke automatisk sikkert.** Et separat aksesspunkt med en tjenestemaskin på Ethernet kan fortsatt gi alle tilkoblede Wi-Fi-klienter tilgang til maskinen. Bruk et eget testnett, egnet Wi-Fi-autentisering, brannmur på tjenestemaskinen og ingen bro eller rute til produksjonsnett. Kontroller DHCP og ruting; manglende internettforbindelse er ikke i seg selv nettverksisolasjon. Historiske eller uoppdaterte tjenester hører hjemme i et fysisk eller logisk isolert laboratorienett.

## Original firmware eller vanlig OpenWrt?

De to alternativene gir ikke automatisk samme funksjoner. Leverandørens firmware kan ha brukervennlige reiseruterfunksjoner og andre Wi-Fi-egenskaper. Vanlig OpenWrt gir direkte tilgang til OpenWrts egne pakker og oppsett, men riktig image, versjon, maskinvarerevisjon og driver må kontrolleres.

**Ikke flash en firmware bare fordi en annen ruter ligner.** Bekreft modellbetegnelsen **GL-MT300N-V2**, finn riktig installasjonsveiledning og filtype, verifiser filen og sett deg inn i gjenoppretting før du begynner. Vi har ikke verifisert en bestemt flashprosedyre til denne artikkelen. I Norge må korrekt regulatorisk landskode (**NO**) konfigureres, og tillatte Wi-Fi-kanaler og sendeeffekt kontrolleres etter firmwarebytte. Ikke anta at innstillingene overføres fra original firmware.

**En konfigurasjonsbackup er ikke nødvendigvis et firmware-image for gjenoppretting.** Før flashing må du skille mellom eksporterte innstillinger og en fullstendig gjenopprettingsmetode for akkurat denne enheten. En innstillingsfil kan ikke nødvendigvis reparere en ødelagt oppstartslaster, gjenopprette kalibreringsdata eller starte en ruter som ikke lenger booter. Å legge tilbake innstillinger på tvers av firmwarefamilier kan også være risikabelt. Noter opprinnelig firmwareversjon og nøyaktig maskinvarerevisjon, les produsentens gjenopprettingsveiledning, og ikke overskriv enhetsspesifikke partisjoner eller trådløse kalibreringsdata. Unngå eksperimenter med oppstartslaster og flashpartisjoner uten en dokumentert gjenopprettingsmetode og egnet utstyr.

## Når er Mango feil valg?

- **Raske moderne nettverk:** 100 Mbps Ethernet, én Wi-Fi-frekvens og beskjeden CPU er klare begrensninger.
- **Krevende VPN-bruk:** GL.iNet oppgir rundt 45 Mbps med WireGuard og 11 Mbps med OpenVPN *under egne testforhold*, ikke garantert ytelse.
- **Mange pakker og mye lagring:** 16 MB intern flash setter grenser uten nøye planlagt ekstern lagring.
- **Hovedruter med eksperimentell firmware:** Ikke la hele husstandens nett avhenge av en ruter du stadig installerer ny firmware på.

Nettopp derfor er den en ypperlig **ruter nummer to**.

## Planlagt serie med praktiske tester

Vi vil dokumentere: utpakking og firmwareversjon; strømforbruk og hastighet; backup og gjenoppretting; original firmware mot vanlig OpenWrt; isolert tilgangspunkt med tjenester på Ethernet; eventuell USB-lagring; og begrensninger ved VPN-bruk.


**Åpenhet:** GL.iNet Mango-lenken ovenfor er en annonselenke. Ploos AS kan motta provisjon ved kvalifiserte kjøp. HackShack Labs' tekniske vurderinger og fremtidige tester er redaksjonelt uavhengige.

**Kilder:** [GL.iNet produktspesifikasjoner](https://www.gl-inet.com/products/gl-mt300n-v2) · [maskinvaredetaljer](https://docs.gl-inet.com/router/en/2/hardware/mt300n-v2/) · [brukerveiledning](https://docs.gl-inet.com/router/en/4/user_guide/gl-mt300n-v2/) · [OpenWrt maskinvaredatabase](https://openwrt.org/toh/hwdata/gl.inet/gl.inet_gl-mt300n_v2).
