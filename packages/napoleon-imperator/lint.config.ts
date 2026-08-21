import { createNovelConfig } from "@samchon/novel-config";
import type {
  ITtscEvidenceGraphClaim,
  ITtscEvidenceGraphReference,
} from "@ttsc/evidence";

const storylineStage: "disabled" | "evidence" | "review" = "disabled";

const storylineOrderReference: ITtscEvidenceGraphReference = {
  type: "markdown",
  root: "docs",
  files: ["obligations/storylines.md"],
  symbol: "h2",
  noEvidenceExclude: true,
  requireReview: (storylineStage as string) === "review",
};

const claims: ITtscEvidenceGraphClaim[] = [
  {
    name: "storyline sequences obey the Austerlitz victory-peak opening order",
    type: "markdown",
    root: "docs",
    files: ["storylines/**/*.md"],
    symbol: "h2",
    disabled: storylineStage === "disabled",
    reference: [storylineOrderReference],
  },
];

export default createNovelConfig({
  location: __dirname,

  // disabled defers complete coverage but permits obvious truthful evidence.
  // Finish the settings canon, then pass "evidence" and finally "review".
  settings: "disabled",

  // Keep disabled until the reviewed settings support a complete storyline;
  // then pass "evidence" and finally "review".
  storylines: storylineStage,

  // Keep disabled until the reviewed storyline supports a complete scenario;
  // then pass "evidence" and finally "review".
  scenarios: "disabled",

  // Keep disabled until the reviewed scenario supports a complete manuscript;
  // then pass "evidence" and finally "review".
  manuscripts: "disabled",

  // Before leaving settings disabled, keep this empty only if the
  // work-specific contract audit finds no independent package target.
  // Add only adopted targets; additions extend, never replace, the shared graph.
  claims,
});
