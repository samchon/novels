import type {
  ITtscEvidenceGraphClaim,
  ITtscEvidenceGraphReference,
} from "@ttsc/evidence";

import type { INovelConfigProps } from "../../INovelConfigProps";
import { createPrincipleReferences } from "../references/createPrincipleReferences";
import { createStorylineObligationReference } from "../references/createStorylineObligationReference";
import { PACKAGE_DOCS_ROOT } from "../utilities/PACKAGE_DOCS_ROOT";

/**
 * Creates claims for storyline files.
 *
 * They check file principles, shared roles, and links to settings.
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
      name: "storyline H2 sequences assign or exclude each storyline obligation",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["storylines/**/*.md"],
      symbol: "h2",
      disabled: props.storylines === "disabled",
      reference: createStorylineObligationReference(
        props.location,
        requireReview,
      ),
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
      name: "storyline H3 chapters account for settings",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["storylines/**/*.md"],
      symbol: "h3",
      disabled: props.storylines === "disabled",
      reference: [...settingReferences],
    },
    {
      name: "storyline H4 scenes account for settings",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["storylines/**/*.md"],
      symbol: "h4",
      disabled: props.storylines === "disabled",
      reference: [...settingReferences],
    },
  ];
}
