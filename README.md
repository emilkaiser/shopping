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
│       ├── shopping/
│       ├── research/
│       └── monitoring/
├── inbox/\n├── purchases/
│   ├── active/
│   ├── purchased/
│   └── abandoned/
├── templates/
├── schemas/
├── docs/
└── src/
```

## Typical usage with an agent

Give it either a link:

```
Add https://example.com/product to my shopping system.
Research it and tell me whether it belongs to an existing purchase.
```

or a need:

```
I need noise-cancelling headphones for flights.
Comfort matters more than microphone quality.
Budget is 3000 SEK.
```

The repository instructions tell the agent to reuse an existing active purchase where possible, research exact product identity and alternatives, preserve source links, and update the structured decision state.

## Local CLI

Requires Node.js 24+ and Yarn 4.

```bash
yarn install
yarn shop new "Apple Watch Ultra"
yarn shop status
yarn shop validate
yarn typecheck
```

`shop intake` captures a URL or description in `inbox/` for later agent processing. When a repo-aware agent is available, direct chat intake should bypass the inbox and update the active purchase immediately.\n\n`shop new` creates:

```
purchases/active/<slug>/
├── purchase.yaml
├── research.md
└── decision.md
```

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

## Monitoring

v0 stores monitoring **intent**, not continuous telemetry.

Do not commit every price observation. Once the system needs frequent price checks, add SQLite/Postgres or another observation store and keep Git as the durable decision layer. See `docs/architecture.md`.

## Status lifecycle

```
inbox -> researching -> shortlist -> waiting -> ready_to_buy -> purchased
```

A purchase can also become `abandoned` or `deferred`.

## Next likely additions

- URL/share-sheet ingestion into the same purchase model;
- scheduled market/listing monitors;
- observation store for price history;
- richer normalization for condition, warranty, seller, and variant identity;
- purchase-history-derived preference learning.
