import type {
  ITtscEvidenceGraphClaim,
  ITtscEvidenceGraphReference,
} from "@ttsc/evidence";

import type { INovelConfigProps } from "../../INovelConfigProps";
import { createCommonObligationReference } from "../references/createCommonObligationReference";
import { createPrincipleReferences } from "../references/createPrincipleReferences";
import { createStorylineObligationReference } from "../references/createStorylineObligationReference";
import { PACKAGE_DOCS_ROOT } from "../utilities/PACKAGE_DOCS_ROOT";

/**
 * Creates claims for storyline files.
 *
 * They check file principles, common unit obligations, shared roles, and settings.
 */
export function createStorylineClaims(
  props: INovelConfigProps,
  settingReferences: ITtscEvidenceGraphReference[],
  requireReview: boolean,
): ITtscEvidenceGraphClaim[] {
  return [
    {
      name: "storyline files answer the common, narrative, and storyline principle checklists",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["storylines/**/*.md"],
      symbol: "file",
      disabled: props.storylines === "disabled",
      reference: createPrincipleReferences(
        props.location,
        "storylines",
        requireReview,
      ),
    },
    {
      name: "storyline H2 sequences answer common unit obligations and assign storyline roles",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["storylines/**/*.md"],
      symbol: "h2",
      disabled: props.storylines === "disabled",
      reference: [
        createCommonObligationReference(props.location, requireReview),
        createStorylineObligationReference(props.location, requireReview),
      ],
    },
    {
      name: "storyline H2 sequences account for the settings catalog",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["storylines/**/*.md"],
      symbol: "h2",
      disabled: props.storylines === "disabled",
      reference: [...settingReferences],
    },
    {
      name: "storyline H3 chapters answer common unit obligations and account for settings",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["storylines/**/*.md"],
      symbol: "h3",
      disabled: props.storylines === "disabled",
      reference: [
        createCommonObligationReference(props.location, requireReview),
        ...settingReferences,
      ],
    },
    {
      name: "storyline H4 scenes answer common unit obligations and account for settings",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["storylines/**/*.md"],
      symbol: "h4",
      disabled: props.storylines === "disabled",
      reference: [
        createCommonObligationReference(props.location, requireReview),
        ...settingReferences,
      ],
    },
  ];
}
