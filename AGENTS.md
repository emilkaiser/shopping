# Repository agent instructions

This repository is the durable knowledge layer for personal shopping decisions.

## Core model

A **purchase** is a buying decision, not merely a product URL. Inputs may be:
- a product or listing URL;
- a natural-language need;
- a request to compare, monitor, buy, reject, or revisit an existing purchase.

Always search existing `purchases/active` records before creating a new purchase. Prefer updating an existing decision over creating duplicates.

## Workflow

When ingesting a URL or shopping need:

1. Identify whether it belongs to an existing purchase.
2. Capture the user's goal, hard requirements, preferences, budget, urgency, and open questions. Do not expect all of these to be present initially; build the brief conversationally and ask high-value clarifying questions when missing answers could materially change the decision.
3. Research exact product identity and variant before comparing prices.
4. Separate factual specifications from subjective review evidence.
5. Prefer primary sources for specifications, reputable reviews for testing, and owner/community sources for lived experience.
6. Compare viable alternatives against the purchase criteria, not against generic "best product" rankings.
7. Record concise conclusions and source links in the purchase record.
8. Recommend monitoring only when price/availability can materially change the decision.
9. Keep high-frequency observations outside Git. Git stores decision state and meaningful snapshots.
10. Record the final decision and rationale when a purchase is completed, abandoned, or deferred.

## Repository rules

- Active purchases: `purchases/active/<slug>/purchase.yaml`
- Narrative research: `purchases/active/<slug>/research.md`
- Final decision: `purchases/active/<slug>/decision.md` until archived
- Templates: `templates/`
- Schemas: `schemas/`
- Repo-scoped skills: `.agents/skills/`
- Tooling: `src/`

Prefer small, legible files. Do not commit scraped HTML, bulk retailer payloads, or noisy price ticks.

## Status lifecycle

`inbox -> researching -> shortlist -> waiting -> ready_to_buy -> purchased`

A purchase may instead become `abandoned` or `deferred`.

## Data quality

Never infer an exact model/variant from a vague listing without marking uncertainty.
Never compare prices across materially different storage, size, generation, condition, warranty, region, or bundle without normalizing those differences.


## Interaction rule

Shopping intake is conversational. Use the host's interactive question mechanism when available for material ambiguities. Ask a small number of decision-relevant questions rather than presenting a generic form. Persist answers so the same question is not repeated in future sessions.
