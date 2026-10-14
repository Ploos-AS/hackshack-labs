---
title: "Proton VPN på Linux og Docker: Testplan for Gluetun"
description: "Dokumentert oppsett og plan for feiltesting av Proton VPN med Linux, WireGuard og Docker/Gluetun – uten påstander om tester vi ikke har utført."
category: guides
lang: nb
date: 2026-10-14
tags: [proton, vpn, linux, docker, gluetun, wireguard, personvern]
series: "Privacy & Digital Independence"
translationKey: proton-vpn-linux-docker-gluetun
draft: true
tested: false
---

> **Reklame – annonselenke:** Artikkelen inneholder en tydelig merket Proton VPN-annonselenke. Ploos AS kan få provisjon ved kvalifiserte kjøp uten ekstra kostnad for deg. Det påvirker ikke testkonklusjonene.

> **Redaksjonell status (14. oktober 2026):** Dette er en dokumentbasert oppsetts- og testplan, **ikke maskinvareverifisert**. Vi har ikke gjennomført hele testprogrammet. Kommandoene er eksempler som må gjennomgås og tilpasses før bruk. Versjoner, innstillinger og plattformstøtte kan endres.

## Tre oppsett med ulike sikkerhetsgrenser

En offisiell VPN-klient kan beskytte trafikken som rutes gjennom vertsmaskinen. Et manuelt WireGuard-oppsett gir mer kontroll, men gjør administratoren ansvarlig for brannmur og lekkasjebeskyttelse. Gluetun er en VPN-gateway i en container: applikasjoner som deler nettverksnavnerommet, bruker dens nettverk og brannmur. Gluetun beskytter **ikke automatisk alle prosesser på Docker-verten**.

Protons [Linux-veiledning](https://protonvpn.com/support/linux-vpn-setup) beskriver grafisk klient, CLI og manuelle oppsett med WireGuard og OpenVPN. [Gluetuns leverandørveiledning](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md) beskriver integrasjonen med Proton. Dette er ulike produkter med ulike støtteordninger.

## Hva støttes?

Proton oppgir offisiell støtte for nyere stabile Debian-, Ubuntu- og Fedora-utgaver med GNOME for sine Linux-klienter. Andre oppsett kan fungere, men med begrenset støtte. Protons offisielle Linux-CLI er **ikke en generell løsning for hodeløse servere**. Til serverbruk bør man vurdere et gjennomtenkt WireGuard-oppsett eller en VPN-gateway i container. Kontroller alltid [oppdatert Linux-dokumentasjon](https://protonvpn.com/support/linux-vpn-setup).

### Manuell WireGuard

Proton dokumenterer nedlasting av WireGuard-konfigurasjon fra kontosidene, og bruk av NetworkManager eller `wg-quick` på Linux. Uten den offisielle klienten må du selv kontrollere ruting, IPv6 og DNS. At tunnelen er oppe, er **ikke bevis på fungerende kill switch**. Se [manuelt WireGuard-oppsett](https://protonvpn.com/support/wireguard-linux).

## Arkitektur med Gluetun

Dette er et *utgangspunkt*, ikke et produksjonsoppsett vi har testet:

```yaml
services:
  gluetun:
    image: qmcgaw/gluetun:v3
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun:/dev/net/tun
    environment:
      VPN_SERVICE_PROVIDER: protonvpn
      VPN_TYPE: wireguard
      WIREGUARD_PRIVATE_KEY: ${WIREGUARD_PRIVATE_KEY:?Angi i beskyttet miljø}
      SERVER_COUNTRIES: Netherlands
    restart: unless-stopped

  test-client:
    image: curlimages/curl:latest
    network_mode: "service:gluetun"
    depends_on:
      - gluetun
    command: ["sh", "-c", "sleep 3600"]
```

**Legg aldri en ekte privat WireGuard-nøkkel i Git.** Bruk et beskyttet lokalt miljø eller en mekanisme for hemmeligheter, hold konfigurasjoner ute av skjermbilder og vurder nøkkelbytte etter lekkasje. I reproduserbare produksjonstester bør OCI-images låses til digest; taggene her er eksempler.

Det avgjørende er `network_mode: "service:gluetun"`: testklienten deler Gluetuns nettverksnavnerom. Publiserte porter for applikasjoner som bruker dette mønsteret, må vanligvis defineres på Gluetun-tjenesten. Eksempelet trenger verken tilgang til Docker-socketen eller `privileged: true`.

For Proton krever Gluetuns leverandørdokumentasjon per nå `VPN_SERVICE_PROVIDER=protonvpn`, `VPN_TYPE=wireguard` og en gyldig `WIREGUARD_PRIVATE_KEY` generert via Proton. Noen andre leverandører krever også `WIREGUARD_ADDRESSES`; **ikke kopier andre leverandørers innstillinger ukritisk**. Bruk aldri eksempel-nøkler fra dokumentasjon.

Se [Gluetun og Proton](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md) og [WireGuard-alternativene](https://github.com/qdm12/gluetun-wiki/blob/main/setup/options/wireguard.md) for gjeldende innstillinger.

## Feiltesting er viktigere enn å slå opp offentlig IP-adresse

Kontroller først Compose-filen med `docker compose config`, og lås testede image-versjoner eller digester. Noter om IPv6 er aktivert på vertsmaskinen og Docker-nettene; ikke anta at det er avslått. Bruk et isolert testnett, ikke et produksjonsmiljø.

Et enkelt oppslag av offentlig IP viser bare hvor forespørselen gikk ut. Det beviser ikke at DNS, IPv6 og feil under gjentilkobling håndteres trygt.

Dokumenter følgende tester **fra testklient-containeren**:

1. **Utgangspunkt:** Noter offentlig IPv4, eventuell IPv6, DNS-resolvere, VPN-endepunkt og tidspunkt – uten passord eller nøkler.
2. **DNS:** Test navneoppslag via containerens resolver, og undersøk om forespørsler går gjennom uønskede DNS-veier.
3. **IPv6:** Kontroller at IPv6 går gjennom valgt tunnel, eller at utgående IPv6 blokkeres når den ikke støttes.
4. **Kill switch:** Bryt VPN-tunnelen mens Docker-nettet fortsatt fungerer; verifiser at applikasjonen ikke kan sende direkte over vanlig internettforbindelse.
5. **Gjenoppretting:** Gjenopprett forbindelsen og sjekk helsestatus, DNS og gjentilkobling.
6. **Omstart:** Start Gluetun, applikasjonscontaineren og Docker-tjenesten på nytt hver for seg. Se etter tidsvinduer der trafikk kan slippe ut.
7. **Praktisk oppgave:** Ved nedlasting eller andre nettverksjobber, undersøk faktisk trafikk under feil. Ikke anta at applikasjonens status viser nettverksisolasjonen.

En ekte test bør dokumentere anonymisert konfigurasjon, programvareversjoner, logger, pakkefangst eller brannmurtellere og resultater fra gjentatte forsøk. Ikke publiser hemmeligheter eller identifiserbare trafikkdata.

## Reproduserbar testrapport

Noter test-ID, image-digester, Docker- og Ubuntu-versjoner, brannmurmodus, VPN-endepunkt (uten hemmeligheter), IPv4/IPv6-observasjoner, forventet og faktisk resultat, og om pakkefangst bekrefter resultatet. En grønn tilkoblingsindikator er ikke nok til å erklære kill switch verifisert. Gjenta feiltestene etter oppdateringer av Gluetun eller endret Docker-nettverk.

## Om feil fra helsesjekken

En logglinje som `write udp ... 1.1.1.1:53: operation not permitted` viser at **en konkret UDP-operasjon ble avvist**. Den beviser ikke alene DNS-lekkasje, feil hos Proton eller en ødelagt brannmur. Mulige forklaringer er brannmurpolicy, ruting under overgang, containerrettigheter og oppsettet for helsesjekken. Sammenhold loggen med rutetabeller, brannmurregler, tunneltilstand og pakkefangst før sikkerhetsreglene endres. Å slå av brannmuren bare for å få grønn helsestatus undergraver formålet.

## Portvideresending må testes separat

Portvideresending kan kreve egne innstillinger hos Gluetun og Proton, og tildelt port kan endre seg ved gjentilkobling. En fungerende VPN-tunnel betyr ikke automatisk at innkommende forbindelser fungerer. Bruk oppdatert dokumentasjon og kontroller at applikasjonen oppdaterer portnummeret ved endringer.

## Redaksjonell konklusjon

På en vanlig Linux-skrivebordsmaskin er Protons støttede klient et naturlig startpunkt. For avgrensede Docker-jobber kan en Gluetun-gateway gi tydeligere sikkerhetsgrenser enn å legge hele vertsmaskinen bak VPN – **forutsatt at feiltestene består**. Manuell WireGuard gir frihet, men du må da selv ivareta lekkasjebeskyttelse.

<a href="https://go.getproton.me/SH33j" rel="sponsored noopener" referrerpolicy="strict-origin-when-cross-origin">Se Proton VPN (annonselenke)</a>. Dette er en kommersiell lenke, ikke et testresultat.

## Kilder og neste eksperiment

Hovedkilder: [Proton VPN på Linux](https://protonvpn.com/support/linux-vpn-setup), [manuell WireGuard](https://protonvpn.com/support/wireguard-linux), [nedlasting av WireGuard-konfigurasjon](https://protonvpn.com/support/wireguard-configurations), [Gluetun Proton-leverandør](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md), [WireGuard-alternativer i Gluetun](https://github.com/qdm12/gluetun-wiki/blob/main/setup/options/wireguard.md).

**Neste:** Gjennomfør testmatrisen på en Ubuntu-vert med Docker, dokumenter versjoner, feilutfall og begrensninger, og publiser først deretter påstander om ytelse og sikkerhet.
