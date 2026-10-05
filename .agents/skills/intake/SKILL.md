# Shopping intake skill

Use this skill when the user drops a product URL, retailer listing, or plain-language shopping need.

## Goal

Turn a low-friction input into durable shopping state with as little user effort as possible.

## URL input

When given a URL:

1. Fetch and identify the exact product/listing if accessible.
2. Search existing `purchases/active` for the same buying decision.
3. If it belongs to an existing purchase, add/update the candidate there.
4. Otherwise create a new purchase only if the buying intent is clear.
5. Research enough context to answer "is this worth considering?" rather than merely copying listing metadata.
6. Record seller, condition, variant, price, shipping/warranty details when known.
7. Add competing options when they materially improve the decision.
8. Update `research.md` and `purchase.yaml`.
9. If price/availability is decision-relevant, define monitoring intent.

## Description input

When given a need rather than a URL:

1. Extract goal, must-haves, preferences, avoidances, budget, region, urgency, and open questions.
2. Search active purchases to avoid duplicates.
3. Create/update the relevant purchase.
4. Discover a small set of serious candidates.
5. Research the decision criteria before recommending.

## Low-confidence handling

Do not create false certainty. If exact model, condition, seller, or variant cannot be verified:
- record the uncertainty;
- avoid normalized price comparisons that depend on it;
- continue with the parts of the decision that are still valid.

## Inbox compatibility

Inputs captured by `yarn shop intake "<input>"` are stored in `inbox/`. An agent processing the inbox should:
- consume the oldest unprocessed intake;
- apply this skill;
- update/create the active purchase;
- delete the intake file once its content is represented durably in the purchase record.

The inbox is a transport mechanism, not the source of truth.


## Clarifying questions

Do not assume the initial prompt is complete.

After extracting what is already known, identify the smallest set of missing facts that could materially change:
- which product category or variant is appropriate;
- the shortlist;
- the value judgement;
- the recommendation;
- the monitoring strategy.

Ask those questions before doing deep research when answers are important.

Prefer a compact batch of 1–4 high-value questions over a long questionnaire. Examples:
- What budget range is comfortable, and is there a hard ceiling?
- What are the top 1–3 things you care about most?
- What are you using today, and what do you want to improve?
- Is used/refurbished acceptable?
- Is there a deadline or reason to buy now?
- Is the linked product the baseline to beat, or are you already leaning toward it?
- Should alternatives stay in the same category/brand/ecosystem, or may the research challenge that assumption?

Use an interactive question tool when one is available in the host environment. If no dedicated question tool exists, ask the questions conversationally.

Do not block on low-value details. If an answer is not necessary to begin useful research, proceed and record it as an open question instead.

When the user answers, persist the resulting context in `purchase.yaml` so later sessions do not ask the same questions again.
