# Evidence Review

Start only when the layer is in `review`. Missing or stale review diagnostics are the worklist; do not bulk-fill fingerprints.

## Review a citation

1. Read the complete target scope, including selected descendants.
2. Read the complete host and necessary upstream context.
3. Decide whether the host truly realizes, refines, or depends on the target.
4. Fix the target, host, reason, or placement when they disagree.
5. Write `@evidenceReview` with the facts or behavior compared.
6. Obtain the fingerprint from the compiler and append it.

## Review a principle item

1. Read the principle item in full.
2. Reread the whole host file asking only that item's question.
3. Fix the file when it does not do what the item requires; never soften the answer instead.
4. Write `@evidenceReview` naming what in the file was checked against the item.

One item, one check: a fingerprint covers that item alone, and a review sentence reused across items or files records nothing.

## Review an exclusion

1. Read the target.
2. Find its actual owner or the concrete scope fact excluding it.
3. If the layer owes missing work, delete the exclusion and repair the artifact.
4. Write `@evidenceExcludeReview` only after deciding the exclusion is true.

“Checked”, “confirmed”, and “not applicable” do not describe a check. Name the rule boundary, facts, causality, or scene behavior examined.

## Fingerprints

- A fingerprint covers the target and selected descendants, excluding evidence comments; a checklist item's fingerprint covers that H2 alone.
- Child-heading changes expire ancestor reviews.
- Never invent or copy a fingerprint.
- On expiry, repeat the substantive review; do not replace only the token.

Finish when package graph and review diagnostics are clean. Run root `pnpm ttsc` and `git diff --check`.

This proves current evidence review, not literary completion. After all layers pass, follow the novel skill's [review.md](../novel/review.md).
