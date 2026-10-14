---
title: "GL.iNet Mango: En billig liten ruter å leke med"
description: "Hvorfor GL-MT300N-V2 kan være en glimrende inngang til OpenWrt, Linux og nettverkseksperimenter – og hvor begrensningene går."
category: projects
lang: nb
date: 2026-10-14
tags: [gl-inet, mango, openwrt, ruter, linux, nettverk, maker]
series: "Pocket Networking Lab"
translationKey: glinet-mango-tinkering
draft: true
tested: false
---

> **Redaksjonell merknad (14. oktober 2026):** Dette er en dokumentbasert forhåndsomtale, ikke en praktisk test. Vi har ennå ikke installert firmware eller målt ytelsen på GL-MT300N-V2 i forbindelse med artikkelen. Priser og firmwarestøtte kan endre seg.

## Den morsomste ruteren er kanskje den du tør å eksperimentere med

En kraftig ruter er fornuftig som hovedruter hjemme. Den er sjelden det beste stedet å eksperimentere med brannmurregler midt på natten.

Lille **GL.iNet Mango (GL-MT300N-V2)** tilbyr noe annet: rimelig maskinvare, et Linux-basert firmwaremiljø, nyttige grensesnitt og stor frihet til å prøve nye ting. Den er liten nok til å bli med i sekken og billig nok til å settes av til ett eksperiment av gangen.

GL.iNets egen nettside oppga **29,99 USD ved kontroll 14. oktober 2026**. Dette er en veiledende pris fra produsenten, ikke dokumentert norsk utsalgspris. Frakt, merverdiavgift og tilgjengelighet kan endre totalen.

## Hva finnes inni Mango?

| Egenskap | GL-MT300N-V2 |
| --- | --- |
| Systembrikke | MediaTek MT7628-familien, ca. 580 MHz |
| RAM / flash | 128 MB DDR2 / 16 MB NOR |
| Wi-Fi | 2,4 GHz 802.11b/g/n, markedsført som N300 |
| Ethernet | 1 × WAN og 1 × LAN, begge 10/100 Mbps |
| Andre porter | USB 2.0, Micro-USB for strøm, reset- og modusbryter |
| Maskinvareeksperimenter | UART og GPIO dokumentert av GL.iNet |
| Strøm | Micro-USB med egnet 5 V-strømforsyning |
| Størrelse | Ca. 58 × 58 × 25 mm |

Dette er **produsentopplysninger**, ikke våre målinger. De markedsførte 300 Mbps gjelder teoretisk Wi-Fi-linkhastighet, ikke reell datagjennomstrømning. Ethernet-portene er begrenset til 100 Mbps, og 2,4 GHz-båndet er mange steder tettpakket. Kilder: [GL.iNet](https://www.gl-inet.com/products/gl-mt300n-v2) og [maskinvaredokumentasjonen](https://docs.gl-inet.com/router/en/2/hardware/mt300n-v2/).

## Hvorfor er den så interessant å hacke på?

**Den hører hjemme i OpenWrt-verdenen.** GL.iNets firmware bygger på OpenWrt og har et tilgjengelig administrasjonsgrensesnitt. Ruteren er også oppført i [OpenWrts maskinvaredatabase](https://openwrt.org/toh/hwdata/gl.inet/gl.inet_gl-mt300n_v2). Det gjør den interessant for eksperimenter med vanlig OpenWrt.

**Den har praktiske tilkoblinger.** WAN og LAN er nyttige i nettverkslabben. USB gir flere muligheter, med forbehold om strømforbruk og drivere. UART og GPIO er spennende for elektronikkinteresserte, men det kan være nødvendig å åpne kabinettet og lodde på kontaktpunkter.

**Begrensningene lærer deg noe.** 16 MB flash og 128 MB RAM er betydelig romsligere enn 4 MB/32 MB, men gjør den ikke til en fullverdig server. Du må fortsatt tenke på pakkestørrelser, minnebruk, lagring og hvordan du gjenoppretter enheten etter feil.

GL.iNets maskinvaredokumentasjon peker på en viktig **forskjell mellom Wi-Fi-drivere**: leverandørens MediaTek-driver og den åpne driveren har ikke nødvendigvis samme egenskaper. Ikke anta at monitor mode, repeater-broing eller stabilitet er identisk mellom original firmware og vanlig OpenWrt. Dette må testes. [Kilde](https://docs.gl-inet.com/router/en/2/hardware/mt300n-v2/).

## Seks morsomme prosjekter

1. **Isolert trådløst labnett:** Lag et eget Wi-Fi-nett og koble en annen maskin til Ethernet for nettsider, BBS eller et offline bibliotek. Hold labnettet adskilt fra hjemmenettet.
2. **OpenWrt som læremiljø:** Utforsk LuCI, SSH, nettverksgrensesnitt, DHCP, DNS og brannmursoner. Lagre en fungerende konfigurasjon først.
3. **Reiseruter-lab:** Sammenlign Ethernet som WAN, Wi-Fi-repeater og USB-deling av mobilnett på firmware som støtter funksjonene.
4. **Undersøk seriellkonsollen:** Dokumenter UART-spenning og pinout *før* du kobler til adapter. Bruk riktig 3,3 V TTL-grensesnitt, aldri RS-232-spenningsnivåer direkte.
5. **USB og pakkehåndtering:** Undersøk hvor langt USB, pakkesystem og begrenset flash rekker. Mål begrensningene før du setter viktige tjenester på den.
6. **Et lite offline-nettverk:** La Mango være Wi-Fi-tilgangspunkt og ruter, mens en kraftigere maskin på Ethernet kjører de krevende tjenestene.

Det siste er kanskje det morsomste: Ruteren trenger ikke gjøre *alt*. Et lite aksesspunkt og en separat server kan bli en imponerende, bærbar lab.

## Original firmware eller vanlig OpenWrt?

De to alternativene gir ikke automatisk samme funksjoner. Leverandørens firmware kan ha brukervennlige reiseruterfunksjoner og andre Wi-Fi-egenskaper. Vanlig OpenWrt gir direkte tilgang til oppstrøms pakker og oppsett, men riktig image, versjon, maskinvarerevisjon og driver må kontrolleres.

**Ikke flash en firmware bare fordi en annen ruter ligner.** Bekreft modellbetegnelsen **GL-MT300N-V2**, finn riktig installasjonsveiledning og filtype, verifiser filen og sett deg inn i gjenoppretting før du begynner. Vi har ikke verifisert en bestemt flashprosedyre til denne artikkelen.

## Når er Mango feil valg?

- **Raske moderne nettverk:** 100 Mbps Ethernet, én Wi-Fi-frekvens og beskjeden CPU er klare begrensninger.
- **Krevende VPN-bruk:** GL.iNet oppgir rundt 45 Mbps med WireGuard og 11 Mbps med OpenVPN *under egne testforhold*, ikke garantert ytelse.
- **Mange programmer og lagring:** 16 MB intern flash setter grenser uten nøye planlagt ekstern lagring.
- **Hovedruter med eksperimentell firmware:** Ikke la hele husstandens nett avhenge av en ruter du stadig installerer ny firmware på.

Nettopp derfor er den en ypperlig **ruter nummer to**.

## Planlagt serie med praktiske tester

Vi vil dokumentere: utpakking og firmwareversjon; strømforbruk og hastighet; backup og gjenoppretting; original firmware mot vanlig OpenWrt; isolert tilgangspunkt med tjenester på Ethernet; eventuell USB-lagring; og begrensninger ved VPN-bruk.

Mango er også interessant for **PocketBox**: et lite offline Wi-Fi-miljø der ruteren sørger for forbindelsen og en ekstern maskin tilbyr de rikere tjenestene. **MikroWrt** omtales foreløpig bare som et fremtidig eksperiment, ikke som ferdig firmware for Mango.

**Åpenhet:** Denne artikkelen har ingen GL.iNet-affiliate-lenke. HackShack Labs kan få kommersielle samarbeid med nettverksleverandører, men konklusjonene og testene skal være uavhengige.

**Kilder:** [GL.iNet produktspesifikasjoner](https://www.gl-inet.com/products/gl-mt300n-v2) · [maskinvaredetaljer](https://docs.gl-inet.com/router/en/2/hardware/mt300n-v2/) · [brukerveiledning](https://docs.gl-inet.com/router/en/4/user_guide/gl-mt300n-v2/) · [OpenWrt maskinvaredatabase](https://openwrt.org/toh/hwdata/gl.inet/gl.inet_gl-mt300n_v2).
