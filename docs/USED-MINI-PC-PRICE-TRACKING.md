# Used mini-PC price tracking — editorial protocol

Status: planned dataset, no verified FINN price sample yet.
Updated: 2026-10-14.

## Purpose
Build a reproducible, dated comparison of Mac mini and Intel NUC asking prices on FINN, eBay, and Norwegian refurbisher sites, against current complete low-power mini-PC alternatives. This is editorial research, not a purchasing bot.

## Rules
1. Record the **exact listing URL** and observation date (ISO 8601). A search URL is not a listing.
2. Preserve currency and original asking price. Store a conversion rate and source only if converting.
3. Mark listing status: active, sold, ended, unavailable or unknown. Do not confuse asking price with accepted sale price.
4. Keep shipping-to-Norway, VAT and carrier fees separate. Never use US domestic shipping as a Norway quote.
5. Record model, generation, CPU, RAM, SSD, PSU included, tested condition, warranty and return policy; use 'unknown' for absent facts.
6. Avoid storing seller names, contact details, phone numbers, addresses or other personal information.
7. Keep a source capture or source citation where permitted; do not republish seller photographs without permission.
8. Do not imply that a small convenience sample represents the market. Publish sample size, selection method and missing-data counts.
9. Keep collectibles and special-OS hardware (PowerPC Mac mini, legacy NUC) in a separate comparison class from general-purpose compute nodes.
10. Do not automatically scrape FINN or eBay in violation of their terms. Use permitted manual review or authorized APIs.

## Reproducible collection plan
- Target at least 10 individually verifiable listings each for Mac mini and Intel NUC per marketplace before discussing distributions. This is a target, not a statistically representative sample.
- Sample multiple generations and condition classes. Record the search terms, filters, and snapshot date.
- Summarize median *asking price* only within comparable generations/configurations, and only with sufficient observations.
- Flag unavailable Norway delivery quotes rather than estimating them.
- Publish methodology and dated CSV alongside each article update.

## Proposed data file
See `data/used-mini-pc-prices.csv`. Empty values mean not verified; the starter file contains headers only.

## Next editorial milestones
- M1: first verifiable FINN listings with exact URLs and prices.
- M2: Norway-specific eBay checkout comparisons and VAT handling.
- M3: 24-hour wall-power measurements and OS compatibility for tested devices.
- M4: follow-up article with evidence-backed comparisons and limitations.
