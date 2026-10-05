# Shopping

A repo-backed personal shopping research and decision system.

The unit of work is a **purchase decision**, not a bookmark. A purchase can begin with either a product/listing URL or a plain-language need, then accumulate candidates, research, monitoring intent, and a final decision.

## Repository layout

```
.
├── AGENTS.md
├── preferences.md
├── .agents/
│   └── skills/
│       ├── intake/
│       ├── shopping/
│       ├── research/
│       └── monitoring/
├── inbox/
├── purchases/
│   ├── active/
│   ├── purchased/
│   └── abandoned/
├── templates/
├── schemas/
├── docs/
└── src/
```

## Preferred usage: direct agent intake

With a repo-aware agent, just send a product link:

```
https://example.com/product
```

or a shopping need:

```
I need noise-cancelling headphones for flights.
Comfort matters more than microphone quality.
Budget is 3000 SEK.
```

The agent should use the repo-scoped intake/shopping skills, search existing active purchases, research the product or need, and persist the result directly.

Messages such as "add this", "is this a good deal?", "research this", or "consider this" should all work as intake.

## CLI / capture intake

For a browser share action, Shortcut, or other integration that cannot do the research itself:

```bash
yarn install
yarn shop intake "https://example.com/product"
yarn shop intake "I need noise-cancelling headphones under 3000 SEK"
```

This writes a tiny pending record to `inbox/`. A later repo-aware agent run can consume it and turn it into durable purchase state.

Other local commands:

```bash
yarn shop new "Apple Watch Ultra"
yarn shop status
yarn shop validate
yarn typecheck
```

`shop new` creates:

```
purchases/active/<slug>/
├── purchase.yaml
├── research.md
└── decision.md
```

See `docs/intake.md` for the complete intake contract.

## Data model

`purchase.yaml` is intentionally small and stable:
- goal and constraints;
- criteria;
- open questions;
- candidates;
- monitoring intent;
- current recommendation;
- lifecycle state.

Long-form evidence belongs in `research.md`. The eventual outcome and rationale belong in `decision.md`.

See `schemas/purchase.schema.json` for the machine-readable contract.

## First live purchase

`purchases/active/apple-watch-ultra/` is the first real decision used to pressure-test the system. It currently frames the choice as Ultra 2 refurb vs Ultra 3 refurb vs Ultra 4 new, with monitoring enabled for unusually strong value opportunities.

## Monitoring

v0 stores monitoring **intent**, not continuous telemetry.

Do not commit every price observation. Once the system needs frequent price checks, add SQLite/Postgres or another observation store and keep Git as the durable decision layer. See `docs/architecture.md`.

## Status lifecycle

```
inbox -> researching -> shortlist -> waiting -> ready_to_buy -> purchased
```

A purchase can also become `abandoned` or `deferred`.

## Next likely additions

- scheduled market/listing monitors that act on the stored monitoring intent;
- observation store for price history;
- richer normalization for condition, warranty, seller, and variant identity;
- purchase-history-derived preference learning;
- a share-sheet / Shortcut integration that calls the same inbox contract.
