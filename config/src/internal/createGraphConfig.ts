import { evidence, type ITtscEvidenceGraphClaim } from "@ttsc/evidence";
import type { ITtscLintConfig } from "@ttsc/lint";

import type { INovelConfigProps } from "../INovelConfigProps";
import { createManuscriptClaims } from "./claims/createManuscriptClaims";
import { createScenarioClaims } from "./claims/createScenarioClaims";
import { createSettingClaims } from "./claims/createSettingClaims";
import { createStorylineClaims } from "./claims/createStorylineClaims";
import { createSettingReferences } from "./references/createSettingReferences";
import { requiresReview } from "./utilities/requiresReview";

/**
 * Builds the full lint config.
 *
 * It creates the shared claims for each layer and adds the novel's extra claims.
 */
export function createGraphConfig(
  props: INovelConfigProps,
): ITtscLintConfig {
  const settingReview = requiresReview(props.settings);
  const storylineReview = requiresReview(props.storylines);
  const scenarioReview = requiresReview(props.scenarios);
  const manuscriptReview = requiresReview(props.manuscripts);

  const sharedClaims: ITtscEvidenceGraphClaim[] = [
    ...createSettingClaims(props, settingReview),
    ...createStorylineClaims(
      props,
      createSettingReferences(props.location, storylineReview),
      storylineReview,
    ),
    ...createScenarioClaims(
      props,
      createSettingReferences(props.location, scenarioReview),
      scenarioReview,
    ),
    ...createManuscriptClaims(
      props,
      createSettingReferences(props.location, manuscriptReview),
      manuscriptReview,
    ),
  ];
  const claims: ITtscEvidenceGraphClaim[] = [
    ...sharedClaims.filter((claim) =>
      Array.isArray(claim.reference) ? claim.reference.length > 0 : true,
    ),
    ...(props.claims ?? []),
  ];

  return {
    plugins: {
      evidence,
    },
    rules: {
      "evidence/graph": [
        "error",
        {
          claims,
        },
      ],
    },
  } satisfies ITtscLintConfig;
}
