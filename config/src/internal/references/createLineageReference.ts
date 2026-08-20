import type { ITtscEvidenceGraphReference } from "@ttsc/evidence";

import { PACKAGE_DOCS_ROOT } from "../utilities/PACKAGE_DOCS_ROOT";

/**
 * Creates a reference to one parent story unit.
 *
 * Each child has one parent, each parent has one child, and neither may exclude.
 */
export function createLineageReference(
  files: string[],
  symbol: "h2" | "h3" | "h4",
  requireReview: boolean,
): ITtscEvidenceGraphReference {
  return {
    type: "markdown",
    root: PACKAGE_DOCS_ROOT,
    files,
    symbol,
    noEvidenceExclude: true,
    uniqueEvidence: true,
    singleEvidencePerSymbol: true,
    requireReview,
  };
}
