import type { ITtscEvidenceGraphReference } from "@ttsc/evidence";

import { createSharedDocsRoot } from "../utilities/createSharedDocsRoot";

/**
 * Creates the reference to required setting obligations.
 *
 * Each required role is covered wherever settings H2 facts or constraints realize it.
 * A complete work may not exclude one.
 */
export function createSettingObligationReference(
  location: string,
  requireReview: boolean,
): ITtscEvidenceGraphReference {
  return {
    type: "markdown",
    root: createSharedDocsRoot(location),
    files: ["obligations/settings.md"],
    symbol: "h2",
    noEvidenceExclude: true,
    requireReview,
  };
}
