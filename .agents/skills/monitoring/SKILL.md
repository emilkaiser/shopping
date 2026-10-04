# Price and availability monitoring skill

Use when a purchase has a meaningful future trigger.

## Monitor types

- `listing`: one exact listing.
- `market`: any matching offer meeting normalized criteria.
- `opportunity`: unusually strong value relative to the current market.

## Requirements

A monitor must define:
- what exact product/variant qualifies;
- allowed condition(s);
- region/currency;
- trigger condition;
- exclusions that avoid false positives.

## Repository boundary

Git stores:
- monitor intent;
- current threshold;
- occasional meaningful snapshots;
- notification/recommendation state.

Git does not store:
- hourly/daily scrape logs;
- raw HTML;
- every observed price.

High-frequency observations belong in an external store when introduced. See `docs/architecture.md`.

## Notification quality

Notify only when the new information can reasonably change the buying decision.
Suppress minor fluctuations, duplicate offers, incompatible variants, and weak sellers unless the purchase explicitly allows them.
