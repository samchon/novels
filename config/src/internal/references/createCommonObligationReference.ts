import type { ITtscEvidenceGraphReference } from "@ttsc/evidence";

import { createSharedDocsRoot } from "../utilities/createSharedDocsRoot";

/**
 * Creates the common unit-obligation checklist.
 *
 * Every selected H2, H3, or H4 answers every item and may not exclude one.
 */
export function createCommonObligationReference(
  location: string,
  requireReview: boolean,
): ITtscEvidenceGraphReference {
  return {
    type: "markdown",
    root: createSharedDocsRoot(location),
    files: ["obligations/common.md"],
    symbol: "h2",
    checklist: true,
    noEvidenceExclude: true,
    requireReview,
  };
}
