# Shopping skill

Use this skill for shopping intake, research, comparison, and decision updates in this repository.

## Accepted inputs

### URL
Examples:
- "Add https://..."
- "Is this a good deal?"
- "Add this to my Apple Watch research."

Treat the URL as a candidate listing unless context clearly indicates otherwise.

### Natural-language need
Examples:
- "I need noise-cancelling headphones for flights under 3000 SEK."
- "Find a 7-seat EV with good luggage space."

Treat this as a new purchase intent unless an existing active purchase matches.

## Intake procedure

1. Search `purchases/active` for a matching purchase.
2. If none exists, create a slug and copy `templates/purchase.yaml`, `templates/research.md`, and `templates/decision.md`.
3. Fill only known fields. Use null/empty lists rather than inventing values.
4. Add candidate listings under `candidates`.
5. Preserve the user's own wording where it expresses goals or trade-offs.
6. Add unresolved questions explicitly.

## Research procedure

For each meaningful candidate:
- verify exact model/variant;
- record manufacturer specs;
- find current relevant market alternatives;
- compare total effective price where possible;
- distinguish new / used / refurbished;
- note warranty, seller, shipping, and region constraints;
- summarize reputable review findings;
- include community/owner evidence when it adds useful lived experience.

Research should answer the purchase's open questions, not produce generic product encyclopedias.

## Recommendation procedure

Prefer qualitative trade-off language over fake-precision scores.
When useful, use criteria weights as prioritization guidance, not as an automatic numeric verdict.

A recommendation should state:
- current best candidate;
- strongest alternative;
- key trade-off;
- what would change the recommendation;
- whether to buy now, wait, or research further.

## Monitoring

Add a `monitoring` block only when there is a decision-relevant trigger such as:
- exact listing below a threshold;
- any matching product below a threshold;
- stock returning;
- a release/announcement likely to affect the choice.

Do not commit frequent observations. Record only meaningful price snapshots or threshold changes in Git.

## Completion

When the user buys, abandons, or defers:
1. fill `decision.md`;
2. set final status in `purchase.yaml`;
3. move the folder to `purchases/purchased` or `purchases/abandoned` when appropriate;
4. preserve rationale so future shopping decisions can reuse it.


## Direct chat intake

When this repository is connected to an agent, the user should not need to invoke the CLI or manually create files.

A bare product URL, or a message such as "add this", "research this", "consider this", or "I need <thing>", should be treated as shopping intake. Use `.agents/skills/intake/SKILL.md`, perform the research in the same workflow, and persist the result to the repository.

Use `inbox/` only when an external integration cannot perform the research/update directly.
