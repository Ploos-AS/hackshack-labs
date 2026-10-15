# HackShack Labs — publishing workflow

This is the repeatable process for English originals and Norwegian Bokmål translations. See [article template](ARTICLE-TEMPLATE.md), [editorial conventions](EDITORIAL.md) and [editorial policy](EDITORIAL-POLICY.md).

## 1. Plan and research

1. Choose a question the article can answer with evidence; identify reader, category, slug and relevant series.
2. Record primary sources and access/check dates. Separate vendor assertions, independent findings, hypotheses and actual measurements.
3. Identify affiliate or sponsorship relationships before drafting. Do not allow them to determine comparisons or conclusions.
4. Check the least expensive adequate approach, including existing, refurbished or repairable equipment.

## 2. Draft the English original

Create `src/content/articles/en/<slug>.md` from [the template](ARTICLE-TEMPLATE.md). Set `draft: true` initially, `tested: false` and `evidence: documentation` unless genuine evidence justifies otherwise.

Use accurate categories, tags, descriptions and `translationKey`. Include reproducible procedures only when clearly labeled as tested or proposed. Avoid unverifiable performance numbers. Add prominent disclosure near any affiliate link.

## 3. Translate into Norwegian Bokmål

Create `src/content/articles/nb/<slug>.md`. Preserve slug, `translationKey`, category, dates, test status, safety warnings, technical constraints and commercial disclosures. Translate meaning, not just headings. Never silently omit caveats.

## 4. Review and publish

1. Apply the sign-off checklist in [ARTICLE-TEMPLATE.md](ARTICLE-TEMPLATE.md).
2. Run `npm install --no-audit --no-fund`, `npm run qa:editorial`, `node scripts/qa-code-copy.mjs`, `npm run build`, and `node scripts/qa-article-pages.mjs`.
3. Resolve errors; review warnings. Automated checks cannot prove source accuracy, affiliate compliance or translation fidelity.
4. Set `draft: false` **only after** editorial review, then rerun the checks.
5. Review generated EN and NB pages in a browser, especially links, code-copy behavior, keyboard access and mobile layout.
6. Merge/push. GitHub Actions builds and deploys to GitHub Pages only if the CI gates pass. Verify the final run and published pages.

## 5. Update existing articles

- Set `updated` to the date of the substantive change.
- Add a dated `changelog` entry: `editorial`, `sources`, `lab-test` or `hardware-test`.
- Lab/hardware entries require recorded environment, methodology and outcomes. Keep `tested: false` for documentation-only changes.
- Recheck the Norwegian counterpart for meaningful editorial changes and synchronized metadata.
- Do not retroactively claim tests based on a passing website build or static QA.

## 6. Evidence policy

- `documentation`: technical documentation, no independently performed test.
- `desk-research`: comparative research without lab validation.
- `lab-tested`: reproducible work performed in a controlled lab, with recorded evidence.
- `hardware-verified`: verified on physical equipment, with exact hardware and firmware/software versions.
- `tested: true` must never be inferred from published instructions, simulated copy-button tests or CI passing. Editorial review determines whether a test is genuinely supported.

## 7. QA boundaries

Static editorial QA detects certain inconsistencies, links and disclosure patterns; it is not a legal or factual audit. Generated-page QA checks structure and JSON-LD, not the behavior of all browsers. Code-copy QA exercises JavaScript in a simulated environment, not Firefox or Chromium. Record manual checks separately.
