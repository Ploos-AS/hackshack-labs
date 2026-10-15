# HackShack Labs — article template and publishing checklist

English is the original; Norwegian Bokmål is a translation. This is an **editorial working template**, not publishable Markdown frontmatter. Follow [editorial policy](EDITORIAL-POLICY.md) and [publishing workflow](PUBLISHING-WORKFLOW.md).

## Planning

- Working title, reader question and intended outcome:
- Slug (same in EN and NB):
- Category and series:
- Primary sources and date checked:
- What is known, unknown, and actually tested?
- Affiliate, sponsorship, loaner hardware, or other commercial relationships:
- Cheapest adequate solution, including reuse:
- Article owner / reviewer:

## Article skeleton

### Short answer
Answer the question early, with major caveats.

### Who is this for?
Describe suitable and unsuitable use cases.

### Requirements and alternatives
List versions, supported hardware, dependencies, and cheaper/no-purchase choices.

### Setup or comparison method
Give reproducible steps **only where supported**. Distinguish proposed procedures from executed procedures.

### Results and limitations
Separate measured outcomes, official documentation, third-party claims and hypotheses. Include safety/recovery constraints where relevant.

### Assessment
Give an independent recommendation, including when to avoid buying or switching.

### Sources and further reading
Prefer primary sources; identify what each source supports. Link related HackShack Labs articles when relevant.

## Publishable frontmatter example

Save as `src/content/articles/en/<slug>.md` (and translate to `nb/<slug>.md`). Do not publish the literal placeholder text:

```yaml
---
title: "Specific, useful headline"
description: "Accurate one-sentence summary of the article."
category: guides
lang: en
date: 2026-10-15
tags: [linux, privacy]
series: "Privacy & Digital Independence"
translationKey: unique-article-key
draft: true
tested: false
evidence: documentation
---
```

When translating, change `lang` to `nb`, translate reader-facing text, and retain the same slug, `translationKey`, dates, technical qualifications and disclosure. Use `updated` only when an actual editorial update occurs.

### Optional change history

Add entries **only for real changes**. An update to the article is not evidence that a lab test was performed:

```yaml
updated: 2026-10-15
changelog:
  - date: 2026-10-15
    type: editorial
    note: "Clarified compatibility limitations and corrected installation wording."
  - date: 2026-10-15
    type: sources
    note: "Checked vendor documentation and added two primary references."
```

Supported change types: `editorial`, `sources`, `lab-test`, `hardware-test`. Never enter the last two without reproducible test evidence. A changelog entry should explain *what changed*, not simply say “updated”.

## Editorial sign-off

- [ ] Headline, summary and conclusion agree; no invented measurements or experience
- [ ] `tested` and `evidence` reflect the **actual** verification level
- [ ] Version, device revision, environment and recovery risks specified when applicable
- [ ] Relevant primary sources support factual claims; links are checked
- [ ] Affiliate/sponsorship disclosures are prominent and near monetized links
- [ ] Prices have date, market, currency, shipping/tax assumptions when applicable
- [ ] Reuse, repair and no-purchase alternatives considered
- [ ] English and Norwegian versions agree on technical claims, disclosures and status
- [ ] Frontmatter, dates, slug and translation key are consistent
- [ ] Editorial QA, build QA and deployment pass
- [ ] Browser review on desktop and mobile completed for important new layouts
