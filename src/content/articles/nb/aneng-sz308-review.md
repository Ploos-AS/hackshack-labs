---
title: "ANENG SZ308: Kan et svært billig multimeter være nyttig?"
description: "Dokumentasjonsbasert forhåndsvurdering av ANENG SZ308, med testplan for lavspenning og sikkerhetsspørsmål."
category: reviews
lang: nb
date: 2026-10-19
tags: [aneng, sz308, multimeter, elektronikk, rimelig-utstyr]
series: "Rimelig testutstyr"
translationKey: aneng-sz308-review
draft: true
tested: false
evidence: documentation
---

**Kort svar:** Vi har bestilt ANENG SZ308 til HackShack Labs, men instrumentet er ikke mottatt. Vi kan derfor ennå ikke anbefale det eller vurdere nøyaktighet, byggekvalitet og elektrisk sikkerhet.

## Hva er det?

Den medfølgende brukermanualen **SZ308 Smart Digital Multimeter Operator's Instruction Manual** beskriver et håndholdt digitalt multimeter med manuell funksjonsvelger. Den omtaler måling av likespenning, vekselspenning, likestrøm og motstand samt kontinuitets-, diode- og transistortest. Manualen inneholder måletabeller, bruksanvisninger og sikkerhetsadvarsler. Dette er **opplysninger fra manualen, ikke våre målinger**.

## Hvem kan ha nytte av det?

Et rimelig reservemultimeter kan være nyttig til enkle elektronikkoppgaver med **lav spenning**, for eksempel batterisjekk og kontinuitetstest. Å bruke et multimeter du allerede eier, er billigere enn å kjøpe et nytt. Til arbeid på strømnettet må ikke lav pris eller trykte maksspenninger være avgjørende.

## Hva vet vi før testing?

| Punkt | Status |
| --- | --- |
| Produkt | ANENG SZ308 |
| Kilde | Medfølgende SZ308-brukermanual (fem manualsider samlet på ett PDF-ark) |
| Skjerm | Manualen oppgir 1999 tellinger |
| Målinger | DC/AC-spenning, DC-strøm, motstand, kontinuitet, diode og transistor |
| USB/dataeksport | Ikke dokumentert i den medfølgende manualen |
| Linux-tilkobling | Ikke dokumentert; datagrensesnitt er ikke påvist |
| Uavhengig sikkerhetssertifisering | Ikke fastslått ut fra manualen |
| Fysisk testing | Ikke påbegynt; instrumentet er bestilt |

Vi fører inn eksakte måleområder og nøyaktighetsverdier først etter nøye kontroll av tabellene i originalmanualen og sammenligning med det mottatte instrumentet. Oppgitt spenningsområde er **ikke** dokumentasjon på at instrumentet er trygt ved denne spenningen.

## Sikkerheten kommer først

Manualen advarer blant annet om elektrisk støt, riktig plassering av måleledningene og at ledningene må kobles fra før funksjonsbytte eller åpning av instrumentet. Slike advarsler dokumenterer ikke samsvar med en bestemt sikkerhetsstandard.

**Den første evalueringen begrenses til isolerte lavspenningskilder. Vi planlegger ingen målinger på strømnettet, i spenningssatte tavler eller av strøm i kretser med farlig energinivå.** Vi undersøker merking, ledninger, sikringer/beskyttelse og kretskort før vi eventuelt vurderer videre påstander. Vi utleder ikke CAT-klassifisering eller tredjepartssertifisering fra utseendet.

## Planlagte tester — ennå ikke gjennomført

1. **Utpakking og identifikasjon:** Registrere selgerannonse, kjøpspris, avgifter/frakt, emballasje, modellmerking, tilbehør og fotografier.
2. **Visuell kontroll:** Undersøke kabinett, kontakter, ledninger, bryter og synlig sikkerhetsmerking. Dersom det er forsvarlig å åpne instrumentet, fotografere kretskortet og dokumentere sikringer/beskyttelse uten å forveksle utseende med sertifisering.
3. **Likespenning:** Sammenligne flere isolerte lavspenningskilder med et referansemultimeter; loggføre referanse, SZ308-visning, område, repeterbarhet og avvik.
4. **Motstand:** Måle kjente motstander i praktiske områder og ta hensyn til komponenttoleranse og ledningsmotstand.
5. **Kontinuitet og diode:** Undersøke respons, terskel og brukervennlighet på spenningsløse kretser.
6. **Batteri og ergonomi:** Dokumentere strømforsyning, lesbarhet, betjening og praktisk bruk.

Vi publiserer referanseutstyr, testforhold, råmålinger og begrensninger sammen med konklusjonene.

## Vurdering

**Avventer testing.** Manualen beskriver mange grunnfunksjoner, men forteller oss ikke om akkurat dette eksemplaret utfører dem nøyaktig eller sikkert. Vi oppdaterer artikkelen etter mottak og etterprøvbare lavspenningstester.

## Kjøp og åpenhet

[ANENG SZ308 hos AliExpress – affiliatelenke](https://s.click.aliexpress.com/e/_c2x2Ouk1)

*Affiliate-erklæring: HackShack Labs / Ploos AS kan motta provisjon ved kjøp gjennom denne lenken. Produktet er bestilt for uavhengig testing; affiliateavtalen styrer ikke konklusjonene.*

## Kilder

- ANENG SZ308, *Smart Digital Multimeter — Operator's Instruction Manual*, PDF levert til HackShack Labs. Produsentdokumentasjon; spesifikasjoner og advarsler er **ikke** uavhengig verifisert.

*HackShack Labs / Ploos AS · Artikkelutkast · Ikke testet på fysisk maskinvare.*
