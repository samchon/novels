/**
 * Sets how far a novel layer has progressed.
 *
 * Stages move from `disabled` to `evidence` and then `review`. The last stage
 * also checks review fingerprints.
 */
export type NovelStage = "disabled" | "evidence" | "review";
