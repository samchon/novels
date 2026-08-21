import type {
  ITtscEvidenceGraphClaim,
  ITtscEvidenceGraphReference,
} from "@ttsc/evidence";

import type { INovelConfigProps } from "../../INovelConfigProps";
import { createCommonObligationReference } from "../references/createCommonObligationReference";
import { createLineageReference } from "../references/createLineageReference";
import { createPrincipleReferences } from "../references/createPrincipleReferences";
import { PACKAGE_DOCS_ROOT } from "../utilities/PACKAGE_DOCS_ROOT";

/**
 * Creates claims for scenario files.
 *
 * They check file principles, common unit obligations, storylines, and settings.
 */
export function createScenarioClaims(
  props: INovelConfigProps,
  settingReferences: ITtscEvidenceGraphReference[],
  requireReview: boolean,
): ITtscEvidenceGraphClaim[] {
  return [
    {
      name: "scenario files answer the common, narrative, and scenario principle checklists",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["scenarios/**/*.md"],
      symbol: "file",
      disabled: props.scenarios === "disabled",
      reference: createPrincipleReferences(
        props.location,
        "scenarios",
        requireReview,
      ),
    },
    {
      name: "scenario H2 sequences answer common unit obligations, refine storylines, and recheck settings",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["scenarios/**/*.md"],
      symbol: "h2",
      disabled: props.scenarios === "disabled",
      reference: [
        createCommonObligationReference(props.location, requireReview),
        createLineageReference(
          ["storylines/**/*.md"],
          "h2",
          requireReview,
        ),
        ...settingReferences,
      ],
    },
    {
      name: "scenario H3 chapters answer common unit obligations, refine storylines, and recheck settings",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["scenarios/**/*.md"],
      symbol: "h3",
      disabled: props.scenarios === "disabled",
      reference: [
        createCommonObligationReference(props.location, requireReview),
        createLineageReference(
          ["storylines/**/*.md"],
          "h3",
          requireReview,
        ),
        ...settingReferences,
      ],
    },
    {
      name: "scenario H4 scenes answer common unit obligations, refine storylines, and recheck settings",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["scenarios/**/*.md"],
      symbol: "h4",
      disabled: props.scenarios === "disabled",
      reference: [
        createCommonObligationReference(props.location, requireReview),
        createLineageReference(
          ["storylines/**/*.md"],
          "h4",
          requireReview,
        ),
        ...settingReferences,
      ],
    },
  ];
}
