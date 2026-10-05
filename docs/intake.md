# Intake workflow

Shopping inputs should be low-friction.

## Chat / agent path

The preferred flow is simply to send either:

```
https://retailer.example/product
```

or:

```
I need a 7-seat EV. Used is fine. Good luggage space matters.
```

A repo-aware agent should use `.agents/skills/intake/SKILL.md` and update the relevant active purchase directly.

## CLI / share-action path

For inputs arriving outside an agent session:

```bash
yarn shop intake "https://retailer.example/product"
yarn shop intake "Noise-cancelling headphones for flights under 3000 SEK"
```

This creates a small pending record under `inbox/`.

The next repo-aware agent run can consume the inbox, research the input, and merge it into durable purchase state.

## Why keep an inbox?

It gives browser/share-sheet/shortcut integrations a tiny write contract without forcing them to understand the full purchase schema.

The inbox should remain temporary. Once processed, its contents belong in:
- `purchase.yaml` for structured decision state;
- `research.md` for evidence and comparison;
- `decision.md` for the eventual outcome.
