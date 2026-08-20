import type { ITtscEvidenceGraphReference } from "@ttsc/evidence";

import { createSharedDocsRoot } from "../utilities/createSharedDocsRoot";

/**
 * Creates the reference to required setting obligations.
 *
 * Each obligation is covered wherever settings H2 facts realize it, or excluded
 * once when the complete settings population has no such role.
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
    requireReview,
  };
}
