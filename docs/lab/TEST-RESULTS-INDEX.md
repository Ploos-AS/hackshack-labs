# HackShack Labs — Test results index

**Purpose:** One reusable evidence format across retro-video, mini-PC, and measurement-instrument reviews. All entries below are **planned**, not measured.

| Test series | Equipment | Planned test IDs | Status | Protocol / source |
| --- | --- | --- | --- | --- |
| Retro video | RetroScaler GBS Control Pro (1), Hagibis capture cards (3) | RV-01…RV-07 | NOT TESTED | [Retro video protocol](RETRO-VIDEO-LINUX-TEST-PROTOCOL.md) |
| Mini-PCs | Intel N150 32 GB / 2 TB (2) | PC-N150-01, PC-N150-02 | NOT TESTED | [Instrument candidates / owned devices](INSTRUMENT-PURCHASE-CANDIDATES.md) |
| Mini-PCs | GMKtec G3 N100 16 GB / 512 GB (1) | PC-N100-01 | NOT TESTED | [Instrument candidates / owned devices](INSTRUMENT-PURCHASE-CANDIDATES.md) |
| Industrial serial PC | Core i7-5500U, 6 × RS-232 (1) | PC-SERIAL-01 | NOT TESTED | [Instrument candidates / owned devices](INSTRUMENT-PURCHASE-CANDIDATES.md) |
| Instruments | UNI-T UT325, UT60BT, UT61E+ etc. | INST-001… | NOT TESTED / NOT PURCHASED | [Purchase candidates](INSTRUMENT-PURCHASE-CANDIDATES.md) |

## Workflow

1. Duplicate [the result template](TEST-RESULT-TEMPLATE.md) into a dated test-run file.
2. Assign a stable test ID and record the exact physical unit, revision, tools and environment.
3. Define pass/fail thresholds **before** testing.
4. Preserve raw logs and recordings outside Git if too large; store manifests and SHA-256 checksums in Git. Do not commit proprietary firmware, copyrighted media or personal identifiers.
5. Review evidence, document failures as carefully as successes, and only then draft an English review and Norwegian translation.
6. Update this index with real result paths and status after testing. Never mark planned tests PASS.

## Suggested storage structure

```text
docs/lab/
  TEST-RESULT-TEMPLATE.md
  TEST-RESULTS-INDEX.md
  RETRO-VIDEO-LINUX-TEST-PROTOCOL.md
  results/
    README.md
    RV-01_YYYY-MM-DD.md
    PC-N150-01_YYYY-MM-DD.md
```

Results files shown above are **examples**, not completed reports.
