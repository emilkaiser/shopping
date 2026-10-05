# Architecture

## v0

GitHub is the durable knowledge layer.

It stores:
- purchase intent and constraints;
- candidates and source links;
- research summaries;
- current recommendation;
- monitoring intent;
- final decisions and rationale.

It deliberately does not store high-frequency telemetry.

## Future observation store

When monitoring volume justifies it, add an observation store such as SQLite or Postgres with rows resembling:

```
purchase_id
candidate_id
merchant
url
observed_at
price
currency
availability
condition
shipping
metadata
```

The repository should continue storing only decision-relevant snapshots and conclusions.

## Ingestion boundary

Inputs may originate from ChatGPT, a browser/share action, CLI, or automation. All should converge on the same repository model.

Conceptually:

```
URL / description
      |
      v
  intake/research
      |
      +--> purchase.yaml  (structured state)
      +--> research.md    (evidence + analysis)
      +--> decision.md    (eventual rationale)
      |
      v
 optional monitor
      |
      +--> external observations later
```

## Why not build scraping now?

The v0 goal is to learn the decision workflow before committing to retailer-specific scraping, normalization, or storage infrastructure. Product identity and comparison quality are more important than raw observation volume.
