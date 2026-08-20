import type {
  ITtscEvidenceGraphClaim,
  ITtscEvidenceGraphReference,
} from "@ttsc/evidence";

import type { INovelConfigProps } from "../../INovelConfigProps";
import { createLineageReference } from "../references/createLineageReference";
import { createPrincipleReferences } from "../references/createPrincipleReferences";
import { PACKAGE_DOCS_ROOT } from "../utilities/PACKAGE_DOCS_ROOT";

/**
 * Creates claims for manuscript files.
 *
 * They check file principles and links to scenarios, storylines, and settings.
 */
export function createManuscriptClaims(
  props: INovelConfigProps,
  settingReferences: ITtscEvidenceGraphReference[],
  requireReview: boolean,
): ITtscEvidenceGraphClaim[] {
  return [
    {
      name: "manuscript files answer the common, narrative, and manuscript principle checklists",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["manuscripts/**/*.md"],
      symbol: "file",
      disabled: props.manuscripts === "disabled",
      reference: createPrincipleReferences(
        props.location,
        "manuscripts",
        requireReview,
      ),
    },
    {
      name: "manuscript H2 sequences realize plans and recheck settings",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["manuscripts/**/*.md"],
      symbol: "h2",
      disabled: props.manuscripts === "disabled",
      reference: [
        createLineageReference(
          ["scenarios/**/*.md"],
          "h2",
          requireReview,
        ),
        createLineageReference(
          ["storylines/**/*.md"],
          "h2",
          requireReview,
        ),
        ...settingReferences,
      ],
    },
    {
      name: "manuscript H3 chapters preserve cross-layer lineage",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["manuscripts/**/*.md"],
      symbol: "h3",
      disabled: props.manuscripts === "disabled",
      reference: [
        createLineageReference(
          ["scenarios/**/*.md"],
          "h3",
          requireReview,
        ),
        createLineageReference(
          ["storylines/**/*.md"],
          "h3",
          requireReview,
        ),
        ...settingReferences,
      ],
    },
    {
      name: "manuscript H4 scenes preserve cross-layer lineage",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["manuscripts/**/*.md"],
      symbol: "h4",
      disabled: props.manuscripts === "disabled",
      reference: [
        createLineageReference(
          ["scenarios/**/*.md"],
          "h4",
          requireReview,
        ),
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
