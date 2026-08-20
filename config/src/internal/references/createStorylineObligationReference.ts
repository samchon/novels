import type { ITtscEvidenceGraphReference } from "@ttsc/evidence";

import { createSharedDocsRoot } from "../utilities/createSharedDocsRoot";

/**
 * Creates the reference to storyline obligations.
 *
 * Each obligation is covered wherever storyline H2 sequences realize it, or
 * excluded once when the complete storyline population has no such role.
 */
export function createStorylineObligationReference(
  location: string,
  requireReview: boolean,
): ITtscEvidenceGraphReference {
  return {
    type: "markdown",
    root: createSharedDocsRoot(location),
    files: ["obligations/storylines.md"],
    symbol: "h2",
    requireReview,
  };
}
