import type { ITtscEvidenceGraphClaim } from "@ttsc/evidence";

import type { INovelConfigProps } from "../../INovelConfigProps";
import { createPrincipleReferences } from "../references/createPrincipleReferences";
import { createSettingObligationReference } from "../references/createSettingObligationReference";
import { PACKAGE_DOCS_ROOT } from "../utilities/PACKAGE_DOCS_ROOT";

/**
 * Creates claims for settings files.
 *
 * They check file principles and setting obligations.
 */
export function createSettingClaims(
  props: INovelConfigProps,
  requireReview: boolean,
): ITtscEvidenceGraphClaim[] {
  return [
    {
      name: "setting files answer the common and settings principle checklists",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["settings/**/*.md"],
      symbol: "file",
      disabled: props.settings === "disabled",
      reference: createPrincipleReferences(
        props.location,
        "settings",
        requireReview,
      ),
    },
    {
      name: "settings H2 facts account for each setting obligation",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["settings/**/*.md"],
      symbol: "h2",
      disabled: props.settings === "disabled",
      reference: createSettingObligationReference(
        props.location,
        requireReview,
      ),
    },
  ];
}
