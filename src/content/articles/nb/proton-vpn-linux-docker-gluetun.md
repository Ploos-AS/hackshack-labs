---
title: "Proton VPN på Linux og Docker: Testplan for Gluetun"
description: "Dokumentert oppsett og plan for feiltesting av Proton VPN med Linux, WireGuard og Docker/Gluetun – uten påstander om tester vi ikke har utført."
category: guides
lang: nb
date: 2026-10-14
updated: 2026-10-15
tags: [proton, vpn, linux, docker, gluetun, wireguard, personvern]
series: "Privacy & Digital Independence"
translationKey: proton-vpn-linux-docker-gluetun
draft: false
tested: false
evidence: documentation
changelog:
  - date: 2026-10-15
    type: editorial
    note: "Utvidet den foreslåtte Gluetun-testprosedyren med bestått/feilet-kriterier, omstartsforbehold og sikkerhetsadvarsler; ingen VPN-tester er utført."
  - date: 2026-10-15
    type: sources
    note: "La til dokumentasjonskilder for Gluetun DNS og brannmur, Proton-portvideresending og oppstartsregler i Docker Compose."
---

> **Reklame – annonselenke:** Artikkelen inneholder en tydelig merket Proton VPN-annonselenke. Ploos AS kan få provisjon ved kvalifiserte kjøp uten ekstra kostnad for deg. Det påvirker ikke testkonklusjonene.

> **Redaksjonell status (15. oktober 2026):** Dette er en dokumentbasert oppsetts- og testplan, **ikke maskinvareverifisert**. Vi har ikke gjennomført hele testprogrammet. Kommandoene er eksempler som må gjennomgås og tilpasses før bruk. Versjoner, innstillinger og plattformstøtte kan endres.

## Tre oppsett med ulike sikkerhetsgrenser

En offisiell VPN-klient kan beskytte trafikken som rutes gjennom vertsmaskinen. Et manuelt WireGuard-oppsett gir mer kontroll, men gjør administratoren ansvarlig for brannmur og lekkasjebeskyttelse. Gluetun er en VPN-gateway i en container: applikasjoner som deler nettverksnavnerommet, bruker dens nettverk og brannmur. Gluetun beskytter **ikke automatisk alle prosesser på Docker-verten**.

Protons [Linux-veiledning](https://protonvpn.com/support/linux-vpn-setup) beskriver grafisk klient, CLI og manuelle oppsett med WireGuard og OpenVPN. [Gluetuns leverandørveiledning](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md) beskriver integrasjonen med Proton. Dette er ulike produkter med ulike støtteordninger.

## Hva støttes?

Proton oppgir offisiell støtte for nyere stabile Debian-, Ubuntu- og Fedora-utgaver med GNOME for sine Linux-klienter. Andre oppsett kan fungere, men med begrenset støtte. Protons offisielle Linux-CLI er **ikke en generell løsning for hodeløse servere**. Til serverbruk bør man vurdere et gjennomtenkt WireGuard-oppsett eller en VPN-gateway i container. Kontroller alltid [oppdatert Linux-dokumentasjon](https://protonvpn.com/support/linux-vpn-setup).

### Manuell WireGuard

Proton dokumenterer nedlasting av WireGuard-konfigurasjon fra kontosidene, og bruk av NetworkManager eller `wg-quick` på Linux. Uten den offisielle klienten må du selv kontrollere ruting, IPv6 og DNS. At tunnelen er oppe, er **ikke bevis på fungerende kill switch**. Se [manuelt WireGuard-oppsett](https://protonvpn.com/support/wireguard-linux).

## Arkitektur med Gluetun

Compose-eksempelet med låste digester og kommandoene nedenfor er et foreslått laboratorieoppsett, ikke et verifisert produksjonsoppsett.

**Legg aldri en ekte privat WireGuard-nøkkel i Git.** Bruk et beskyttet lokalt miljø eller en mekanisme for hemmeligheter, hold konfigurasjoner ute av skjermbilder og vurder nøkkelbytte etter lekkasje. Laboratorieprosedyren nedenfor bruker låste OCI-digester.

Det avgjørende er `network_mode: "service:gluetun"`: testklienten deler Gluetuns nettverksnavnerom. Publiserte porter for applikasjoner som bruker dette mønsteret, må vanligvis defineres på Gluetun-tjenesten. Eksempelet trenger verken tilgang til Docker-socketen eller `privileged: true`.

For Proton krever Gluetuns leverandørdokumentasjon per nå `VPN_SERVICE_PROVIDER=protonvpn`, `VPN_TYPE=wireguard` og en gyldig `WIREGUARD_PRIVATE_KEY` generert via Proton. Noen andre leverandører krever også `WIREGUARD_ADDRESSES`; **ikke kopier andre leverandørers innstillinger ukritisk**. Bruk aldri eksempel-nøkler fra dokumentasjon.

Se [Gluetun og Proton](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md) og [WireGuard-alternativene](https://github.com/qdm12/gluetun-wiki/blob/main/setup/options/wireguard.md) for gjeldende innstillinger.

## Kjørbar laboratorieprosedyre (foreslått, ikke utført)

Bruk en separat Ubuntu-vert med Docker, uten produksjonstjenester. Kommandoene er **testinstruksjoner**, ikke måleresultater. Noter utdata fra `docker compose version` og `docker version` og verifiser image-digester før start.

Hent valgte versjoner og finn registerdigestene:

```sh
docker pull qmcgaw/gluetun:v3
docker pull nicolaka/netshoot:latest
docker image inspect --format '{{index .RepoDigests 0}}' qmcgaw/gluetun:v3
docker image inspect --format '{{index .RepoDigests 0}}' nicolaka/netshoot:latest
```

Legg **fullstendige repository@sha256-digester** i variablene i en lokal, beskyttet `.env`-fil. Ikke legg den i Git. Taggene brukes bare ved første nedlasting. Oppdater digest bevisst ved versjonsbytte. Testen krever `GLUETUN_IMAGE`, `NETSHOOT_IMAGE` og `WIREGUARD_PRIVATE_KEY`.

```yaml
services:
  gluetun:
    image: ${GLUETUN_IMAGE:?Angi låst Gluetun-digest}
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun:/dev/net/tun
    environment:
      VPN_SERVICE_PROVIDER: protonvpn
      VPN_TYPE: wireguard
      WIREGUARD_PRIVATE_KEY: ${WIREGUARD_PRIVATE_KEY:?Angi privat}
      SERVER_COUNTRIES: Netherlands
    healthcheck:
      test: ["CMD", "/gluetun-entrypoint", "healthcheck"]
      interval: 15s
      timeout: 5s
      retries: 3
    restart: unless-stopped

  test-client:
    image: ${NETSHOOT_IMAGE:?Angi låst Netshoot-digest}
    network_mode: "service:gluetun"
    depends_on:
      gluetun:
        condition: service_healthy
        restart: true
    command: ["sleep", "infinity"]
```

**Sikkerhetsmerknad:** `docker compose config` utvider miljøvariabler og kan skrive ut WireGuard-nøkkelen. Bruk `docker compose config --quiet` for validering; ikke publiser utvidet konfigurasjon eller CI-logger med hemmeligheter.

**Beskyttelse av hemmeligheter:** En lokal `.env`-fil hindrer at nøkkelen legges i Git, men er **ikke et hemmelighetshvelv**. Compose legger `WIREGUARD_PRIVATE_KEY` inn som miljøvariabel i containeren. Personer med tilgang til Docker-daemonen eller containerinspeksjon kan hente den ut. Begrens filrettigheter og Docker-tilgang, unngå å skrive miljøvariabler i logger og diagnostikk, og bytt nøkkel hvis den eksponeres. `docker compose config --quiet` beskytter ikke mot `docker inspect` eller en kompromittert vert.

**Forbehold om helsesjekk:** Verifiser kommandoen og innholdet i Gluetun-imaget mot den valgte versjonen. Hvis kommandoen ikke støttes, bruk dokumentert helsesjekk for den versjonen. Grønn helsestatus er et oppstartsvilkår, **ikke** en sikkerhetstest. Compose-varianter håndterer omstart av avhengige tjenester ulikt; gjenskap derfor testklienten eksplisitt etter omstart av Gluetun.

```sh
docker compose config --quiet
docker compose up -d
docker compose ps
docker compose exec test-client sh -c 'ip -4 route; ip -6 addr; ip -6 route; cat /etc/resolv.conf'
docker compose exec test-client dig example.org
docker compose exec test-client curl -4 --max-time 10 https://ifconfig.me/ip
docker compose exec test-client curl -6 --max-time 10 https://ifconfig.me/ip
```

Undersøk også Docker-nettets IPv6-innstilling med `docker network inspect <nettverksnavn>` og feltet `EnableIPv6`. Et mislykket IPv6-oppslag beviser ikke alene at trafikken er riktig filtrert.

| Test | Handling | Bestått når |
| --- | --- | --- |
| Referansemåling | Noter ruter, resolver, `dig`, IPv4/IPv6 og VPN-endepunkt | Observasjonene er lagret; ingen sikkerhetskonklusjon ennå |
| DNS | Kjør `dig example.org` i Netshoot og pakkefangst på verten | Ingen utilsiktet ukryptert DNS går ut på vertens uplink; undersøk Gluetuns oppstrøms resolver separat |
| IPv6 | Undersøk `ip -6 addr`, `ip -6 route` og Docker `EnableIPv6`; prøv `curl -6` | IPv6 er verifisert tunnelert eller ingen IPv6 slipper ut utenom tunnelen |
| Tunnelbrudd | På **isolert testvert**, blokker midlertidig UDP til kjent VPN-endepunkt med en reverserbar vertsbrannmurregel, mens Docker-nettet er oppe; send forespørsler i 60 sekunder | **Null** datapakker fra klienten går direkte ut på vertens uplink i løpet av de 60 sekundene |
| Gjenoppretting | Fjern bare den midlertidige regelen; gjenta DNS- og IP-sjekker | Trafikken går igjen gjennom tunnelen, uten direkte trafikk under overgangen |
| Omstart | `docker compose restart gluetun`, deretter `docker compose up -d --force-recreate test-client`; test også separat omstart av Docker | Ingen direkte trafikk; klienten kobles til igjen eller gjenskapes bevisst |
| Applikasjon | Gjenta tunnelbrudd med en ufarlig testjobb | Ingen direkte trafikk, uansett applikasjonsstatus |

**Pakkefangst:** Finn vertens uplink og Docker-bro med `ip route` og `docker network inspect`. Kjør på **verten**, i egne terminaler, for eksempel `sudo tcpdump -ni <uplink> -w uplink.pcap` og `sudo tcpdump -ni <bridge> -w bridge.pcap`. Sammenlign klienttrafikken på broen med kryptert trafikk til VPN-endepunktet på uplink. Docker NAT kan endre kildeadressen, så et filter kun på container-IP på uplink kan overse lekkasjer. All ukryptert trafikk fra klienten direkte ut er feil. Stopp fangsten og fjern testregelen umiddelbart etterpå. Ikke publiser uanonymiserte pakkefiler.

Vi oppgir med hensikt ingen universell kommando for å blokkere endepunktet: brannmurtype og adresser varierer, og en feil regel kan kutte fjernadministrasjon. Ha konsolltilgang og plan for tilbakerulling. 60 sekunder er et **foreslått akseptansekriterium**, ikke et målt resultat.

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

En UDP-feil med «operation not permitted» i helsesjekkloggen viser bare at **en konkret UDP-operasjon ble avvist**. Den beviser ikke alene DNS-lekkasje, feil hos Proton eller en ødelagt brannmur. Mulige forklaringer er brannmurpolicy, ruting under overgang, containerrettigheter og oppsettet for helsesjekken. Sammenhold loggen med rutetabeller, brannmurregler, tunneltilstand og pakkefangst før sikkerhetsreglene endres. Å slå av brannmuren bare for å få grønn helsestatus undergraver formålet.

## DNS, lokalnett og portvideresending hos Proton: dokumenterte innstillinger

**DNS:** Gluetuns gjeldende DNS-dokumentasjon oppgir `DNS_UPSTREAM_RESOLVER_TYPE=dot` (DNS over TLS) og `DNS_UPSTREAM_RESOLVERS=cloudflare` som standardverdier. `/etc/resolv.conf` i applikasjonscontaineren viser den *lokale* resolveren, men sier ikke hvordan Gluetun sender forespørsler videre. Undersøk både `dig` i Netshoot og pakkefangst på vertens uplink. En ukryptert DNS-forespørsel internt i det delte nettverksnavnerommet er ikke automatisk en ekstern DNS-lekkasje. [Gluetuns DNS-innstillinger](https://github.com/qdm12/gluetun-wiki/blob/main/setup/options/dns.md).

**Webgrensesnitt på lokalnettet:** En tjeneste som deler Gluetuns nettverksnavnerom, skal ikke publisere Docker-porter selv. For et webgrensesnitt på port 8080 som kun skal nås fra Docker-verten, legg `ports: ["127.0.0.1:8080:8080"]` på **gluetun**, ikke den avhengige tjenesten. Tilgang fra en annen maskin på lokalnettet krever en bevisst LAN-binding eller en betrodd reverse proxy, kildebegrensning i brannmuren og autentisering. Gluetun dokumenterer `FIREWALL_INPUT_PORTS=8080` ved behov for innkommende trafikk på standardgrensesnittet. `FIREWALL_OUTBOUND_SUBNETS` tillater utgående tilgang til bestemte LAN-adresser **fra** VPN-navnerommet; det er ikke en generell innkommende portåpning. Unngå overlapp med WireGuard-tunnelens adresseområde. Dette er valgfrie eksempler, **ikke** en del av den isolerte testens Compose-fil. [Brannmurinnstillinger](https://github.com/qdm12/gluetun-wiki/blob/main/setup/options/firewall.md).

**Kontrollserver:** Gluetun har en HTTP-kontrollserver for status og operasjoner. Ikke eksponer den på internett eller publiser porten bare for å sjekke VPN-status. Kontroller autentisering og tillatte endepunkter for valgt Gluetun-versjon før eventuell ekstern tilgang.

**Sjekkliste for Proton VPN-portvideresending (valgfritt, ikke testet her):**

1. Kontroller at Proton-abonnementet og valgt server støtter portvideresending. Bruk eventuelt Gluetuns serverfilter `PORT_FORWARD_ONLY=on`.
2. Når du genererer **WireGuard**-konfigurasjonen hos Proton, aktiver **NAT-PMP (Port Forwarding)**.
3. Sett `VPN_PORT_FORWARDING=on` i Gluetun. Dette gjelder videresending på **VPN-leverandørens side**, ikke Dockers `ports:`.
4. Finn den dynamisk tildelte porten i Gluetuns logger eller statusfil og konfigurer applikasjonen til å lytte på denne. Kontroller på nytt etter gjentilkobling; programmer som annonserer egen lytteport, må kanskje oppdateres eksplisitt.
5. Test tilgjengelighet fra utsiden av LAN/VPN og dokumenter bestått/feilet. Ikke eksponer administrative webgrensesnitt via VPN-portvideresending.

Se [Proton-veiledningen for Gluetun](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md) og [innstillinger for portvideresending](https://github.com/qdm12/gluetun-wiki/blob/main/setup/options/port-forwarding.md). Den samme feiltestmetoden kan brukes med andre VPN-leverandører, men legitimasjon og portvideresending er leverandørspesifikt.

**Compose ved omstart:** Docker Compose dokumenterer `depends_on: { gluetun: { condition: service_healthy, restart: true } }` for å starte avhengige tjenester på nytt etter en *eksplisitt Compose-operasjon*. Dette garanterer ikke at alle nettverksnavnerom blir reparert etter daemon-krasj eller erstatning av containere. Verifiser med installert Compose-versjon og gjenskap testklienten eksplisitt ved behov. [Docker Compose oppstartsrekkefølge](https://docs.docker.com/compose/how-tos/startup-order).

## Portvideresending må testes separat

Portvideresending kan kreve egne innstillinger hos Gluetun og Proton, og tildelt port kan endre seg ved gjentilkobling. En fungerende VPN-tunnel betyr ikke automatisk at innkommende forbindelser fungerer. Bruk oppdatert dokumentasjon og kontroller at applikasjonen oppdaterer portnummeret ved endringer.

## Praktisk konklusjon

På en vanlig Linux-skrivebordsmaskin er Protons støttede klient et naturlig startpunkt. For avgrensede Docker-jobber kan en Gluetun-gateway gi tydeligere sikkerhetsgrenser enn å legge hele vertsmaskinen bak VPN – **forutsatt at feiltestene består**. Manuell WireGuard gir frihet, men du må da selv ivareta lekkasjebeskyttelse.

<a href="https://go.getproton.me/SH33j" rel="sponsored noopener" referrerpolicy="strict-origin-when-cross-origin">Se Proton VPN (annonselenke)</a>. Dette er en kommersiell lenke, ikke et testresultat.

## Kilder og neste eksperiment

Hovedkilder: [Proton VPN på Linux](https://protonvpn.com/support/linux-vpn-setup), [manuell WireGuard](https://protonvpn.com/support/wireguard-linux), [nedlasting av WireGuard-konfigurasjon](https://protonvpn.com/support/wireguard-configurations), [Gluetun Proton-leverandør](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md), [WireGuard-alternativer i Gluetun](https://github.com/qdm12/gluetun-wiki/blob/main/setup/options/wireguard.md).

**Neste:** Gjennomfør testmatrisen på en Ubuntu-vert med Docker, dokumenter versjoner, feilutfall og begrensninger, og publiser først deretter påstander om ytelse og sikkerhet.
