import type { NovelStage } from "../../NovelStage";

/**
 * Checks whether a layer is in review.
 *
 * Only `review` requires current review fingerprints.
 */
export function requiresReview(stage: NovelStage): boolean {
  return stage === "review";
}
