---
title: "Prisfellen på brukte mini-PC-er: Er gamle Mac mini og Intel NUC verdt pengene?"
description: "Brukt er ikke nødvendigvis billig: slik sammenligner du eldre mini-PC-er med nyere alternativer, inkludert frakt, avgifter, oppgraderinger og strømforbruk."
category: guides
lang: nb
date: 2026-10-14
tags: [mac-mini, intel-nuc, mini-pc, used-hardware, homelab, ebay, norway]
series: "Used Hardware & Homelab"
translationKey: used-mini-pc-price-trap
draft: false
tested: false
---

> **Redaksjonell status – 14. oktober 2026:** Dette er en dokumentasjonsbasert prisundersøkelse, ikke en maskinvaretest. Prisene er eksempler fra konkrete eBay-annonser, ikke en representativ markedsstatistikk eller bekreftede totalpriser levert til Norge. Enkelte annonser er avsluttet som solgt, men endelig avtalt pris kan være ukjent. Ingen affiliatelenker.

## En brukt datamaskin er ikke automatisk et godt kjøp

En gammel Intel NUC eller Mac mini kan være en utmerket Linux-server, retrodatamaskin eller testmaskin for alternative operativsystemer. Den tar liten plass og kan få mange nye leveår.

Men at maskinen var dyr da den var ny, gjør ikke dagens bruktpris fornuftig. Spørsmålet er **hva du faktisk får for den totale kostnaden i dag**.

## Konkrete eBay-eksempler

Følgende annonser ble undersøkt 14. oktober 2026. Dette er et lite, ikke-tilfeldig utvalg. Dollarprisene er ikke omregnet til kroner, siden valutakurs og tidspunkt påvirker beløpet.

| Maskin | Synlig pris | Hva vi vet |
| --- | --- | --- |
| [Intel NUC 5, i5-5250U, 16 GB RAM, 256 GB SSD](https://www.ebay.com/itm/266538571456) | **97,30 USD** | Annonse avsluttet 17. juli 2026 |
| [Intel NUC 10, i3-10110U, 8 GB RAM, 256 GB SSD](https://www.ebay.com/itm/205696247969) | **134,99 USD** | Merket solgt; prisforslag akseptert, faktisk kjøpesum ikke bekreftet |
| [Intel NUC 11 Pro, i5-1135G7, 8 GB RAM, 256 GB SSD](https://www.ebay.com/itm/398150635339) | **195 USD** | Merket solgt 20. juli 2026 |
| [Intel NUC 12, i5-1240P, 8 GB RAM, 512 GB SSD](https://www.ebay.com/itm/127733816087) | **199,99 USD** | Merket solgt 11. september 2026; faktisk avtalt pris ikke uavhengig bekreftet |
| [Mac mini M4, 16 GB RAM, 256 GB SSD](https://www.ebay.com/itm/227505964146) | **769,99 USD** | Brukt annonsepris; en nyere Mac til sammenligning, ikke en gammel Intel-modell |

En pris på eBay er **ikke en norsk totalpris**. Oppgitt amerikansk frakt gjelder ikke nødvendigvis levering til Norge. Tilstand, strømforsyning, RAM, SSD og returvilkår må undersøkes.

## Og hva med FINN?

Vi undersøkte [FINN-søk etter Mac mini](https://www.finn.no/recommerce/forsale/search?q=mac+mini) og [FINN-søk etter NUC](https://www.finn.no/recommerce/forsale/search?q=nuc). Vi fikk imidlertid ikke hentet et pålitelig, individuelt lenkbart utvalg av FINN-annonser med priser.

Derfor oppgir vi **ikke** en oppdiktet gjennomsnittspris for FINN, og vi kan foreløpig ikke dokumentere at FINN generelt er dyrere enn eBay. For å gjøre det trenger vi et datert utvalg med samme generasjon, prosessor, RAM, lagring og tilstand.

## Regn ut den reelle kostnaden

**Total bruksklar pris = kjøpesum + frakt + aktuelle importavgifter og gebyrer + manglende komponenter + nødvendige reparasjoner.**

Ved privatimport til Norge er den vanlige merverdiavgiftssatsen for slike varer 25 prosent, og frakt inngår normalt i beregningsgrunnlaget. Ved korrekt VOEC-behandling kan norsk mva være betalt allerede i kassen for kvalifiserte varer under 3 000 kroner. Ellers kan mva og transportørens fortollingsgebyr komme ved innførsel. Unngå å regne mva to ganger.

Kilder: [Tolletaten om beregning av mva](https://www.toll.no/no/netthandel/utregning-mva/) og [Skatteetaten om utenlandsk netthandel](https://www.skatteetaten.no/person/avgifter/kjop-fra-utlandet/).

Vi har **ikke** bekreftet norsk frakt- og kassepris for eBay-eksemplene over.

## Hva med en nyere N100- eller N150-maskin?

En nyere, strømgjerrig mini-PC kan være et bedre valg for tjenester som skal kjøre hele døgnet. Men vi må sammenligne komplette konfigurasjoner med tilsvarende RAM, SSD, nettverksporter, garanti og operativsystemstøtte. Det holder ikke å sammenligne én gammel NUC med en tilfeldig annonse for en ny barebone.

Som et annet referansepunkt [lanserte Apple Mac mini M6 fra 11 990 kroner i Norge i september 2026](https://images.apple.com/no/newsroom/2026/09/the-new-mac-mini-and-mac-studio-are-available-today/). Den er i en helt annen pris- og ytelsesklasse enn en gammel Intel NUC. En direkte sammenligning må ta hensyn til faktisk bruk.

Strømforbruk bør måles på konkrete maskiner, ikke anslås ut fra alder alene. Forskjellen mellom tomgang og full belastning kan være betydelig.

## Når er gammel maskinvare verdt pengene?

**Retro og spesielle operativsystemer.** En PowerPC Mac mini som trengs for MorphOS, eller en bestemt Intel-modell til BSD, Haiku eller AROS, kan være verdifull fordi den støtter et bestemt prosjekt. Det er en annen vurdering enn kroner per prosessorytelse.

**Rimelige homelab-noder.** Brukte bedriftsmaskiner kan være gode kjøp når de er komplette, testede og rimelig priset.

**Større brukte partier.** Direkte overtakelse fra bedrifter, skoler eller profesjonelle gjenbruksaktører kan gi helt andre priser enn enkeltannonser.

**Døgnkontinuerlig drift.** Vurder strømforbruk, lagringshelse, støy, reservedeler og oppdateringsstøtte.

## Sjekkliste før kjøp

- Kontroller nøyaktig modell og prosessorgenerasjon.
- Sjekk om RAM, SSD og strømforsyning følger med.
- Skill mellom «starter» og «fullt testet».
- Beregn totalpris levert til Norge.
- Undersøk støtte for ønsket operativsystem.
- Sammenlign med en nyere maskin med garanti.
- Betal ekstra for samlerverdi bare hvis det faktisk er samlerverdien du ønsker.

## Vår vurdering: Gammelt utstyr fortjener et nytt liv, ikke en premiumpris

> **Old hardware deserves a second life, not a premium price.**

Dette er **HackShack Labs' bevisst strenge redaksjonelle kjøpsgrenser**, ikke dokumenterte markedsverdier, gjennomsnittspriser eller påstander om hva selgere vil akseptere. Vi vurderer *vanlig bruksverdi*, ikke nostalgi, sjeldenhet eller samlerinteresse. Vi forutsetter testede, komplette og fungerende maskiner med strømforsyning, brukbar RAM og lagring, før frakt og avgifter.

| Maskinvare | Godt kjøp for oss | Vår vanlige absolutte grense |
| --- | ---: | ---: |
| Intel Mac mini 2011–2012 | 5–10 USD | 20 USD |
| Intel Mac mini 2014 | 10–15 USD | 25 USD |
| Intel Mac mini 2018 | 25–40 USD | 60 USD |
| Intel NUC 4.–5. generasjon | 5–10 USD | 15 USD |
| Intel NUC 6.–7. generasjon | 10–15 USD | 25 USD |
| Intel NUC 8. generasjon | 20–30 USD | 45 USD |

Vi ville ofte heller ventet på et utrangert parti med bedrifts-PC-er eller kjøpt en nyere maskin enn å betale over disse grensene. Eldre maskiner kan fortsatt være nyttige, men alder, begrenset støtte og usikker gjenværende levetid må gjenspeiles i prisen. Manglende strømforsyning, ukjent tilstand, lite fastloddet RAM eller defekt lagring trekker betalingsviljen ytterligere ned.

**Vi skiller mellom tre typer verdi:** vanlig bruksverdi (tabellen), spesialverdi for bestemte operativsystemer eller maskinvaregrensesnitt, og samlerverdi. En PowerPC Mac mini til MorphOS hører for eksempel hjemme i en spesialkategori, ikke i denne tabellen. Dette er **våre kjøpspreferanser**, ikke en påstand om at markedsprisen objektivt er feil.

## Konklusjon

Spør ikke bare om en gammel Mac mini eller Intel NUC er billig sammenlignet med nyprisen den hadde. Spør:

**«Hva er den beste maskinen for oppgaven min innenfor samme totalbudsjett?»**

Noen ganger er svaret en brukt NUC. Andre ganger er det en nyere mini-PC, en renovert bedriftsmaskin eller en gammel Mac som trengs for et spesielt operativsystem. Og noen ganger er det klokest å vente.

En senere oppfølging bør samle individuelt dokumenterte FINN-annonser, kontrollere faktisk kassepris til Norge og måle strømforbruk og ytelse på utvalgte maskiner. Inntil da er dette en kjøpsguide med konkrete eksempler, ikke en påstand om at hele bruktmarkedet er overpriset.
