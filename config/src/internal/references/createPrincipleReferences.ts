import type { ITtscEvidenceGraphReference } from "@ttsc/evidence";

import { createSharedDocsRoot } from "../utilities/createSharedDocsRoot";

/**
 * Creates the principle references for one layer.
 *
 * Every file gets common and layer rules. Narrative files also get narrative rules.
 */
export function createPrincipleReferences(
  location: string,
  layer: "settings" | "storylines" | "scenarios" | "manuscripts",
  requireReview: boolean,
): ITtscEvidenceGraphReference[] {
  const referenceRoot: string = createSharedDocsRoot(location);
  const createChecklistReference = (
    file: string,
  ): ITtscEvidenceGraphReference => ({
    type: "markdown",
    root: referenceRoot,
    files: [`principles/${file}`],
    symbol: "h2",
    checklist: true,
    noEvidenceExclude: true,
    requireReview,
  });

  return [
    createChecklistReference("common.md"),
    ...(layer === "settings"
      ? []
      : [createChecklistReference("narratives.md")]),
    createChecklistReference(`${layer}.md`),
  ];
}
