import { createNovelConfig } from "@samchon/novel-config";
import type {
  ITtscEvidenceGraphClaim,
  ITtscEvidenceGraphReference,
} from "@ttsc/evidence";

type NovelStage = "disabled" | "evidence" | "review";

const settingsStage: NovelStage = "disabled";
const storylineStage: NovelStage = "disabled";
const scenarioStage: NovelStage = "disabled";
const manuscriptStage: NovelStage = "disabled";

const createHistoricalPrincipleReference = (
  file: "common.md" | "narratives.md",
  stage: NovelStage,
): ITtscEvidenceGraphReference => ({
  type: "markdown",
  root: "docs",
  files: [`principles/${file}`],
  symbol: "h2",
  checklist: true,
  noEvidenceExclude: true,
  requireReview: stage === "review",
});

const createHistoricalPrincipleClaim = (
  name: string,
  files: string[],
  stage: NovelStage,
  narratives: boolean,
): ITtscEvidenceGraphClaim => ({
  name,
  type: "markdown",
  root: "docs",
  files,
  symbol: "file",
  disabled: stage === "disabled",
  reference: [
    createHistoricalPrincipleReference("common.md", stage),
    ...(narratives
      ? [createHistoricalPrincipleReference("narratives.md", stage)]
      : []),
  ],
});

const storylineOrderReference: ITtscEvidenceGraphReference = {
  type: "markdown",
  root: "docs",
  files: ["obligations/storylines.md"],
  symbol: "h2",
  noEvidenceExclude: true,
  requireReview: (storylineStage as string) === "review",
};

const claims: ITtscEvidenceGraphClaim[] = [
  createHistoricalPrincipleClaim(
    "setting files verify Napoleon's historical principles",
    ["settings/**/*.md"],
    settingsStage,
    false,
  ),
  createHistoricalPrincipleClaim(
    "storyline files apply Napoleon's historical and narrative principles",
    ["storylines/**/*.md"],
    storylineStage,
    true,
  ),
  createHistoricalPrincipleClaim(
    "scenario files preserve Napoleon's historical and narrative principles",
    ["scenarios/**/*.md"],
    scenarioStage,
    true,
  ),
  createHistoricalPrincipleClaim(
    "manuscript files preserve Napoleon's historical and narrative principles",
    ["manuscripts/**/*.md"],
    manuscriptStage,
    true,
  ),
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
  settings: settingsStage,

  // Keep disabled until the reviewed settings support a complete storyline;
  // then pass "evidence" and finally "review".
  storylines: storylineStage,

  // Keep disabled until the reviewed storyline supports a complete scenario;
  // then pass "evidence" and finally "review".
  scenarios: scenarioStage,

  // Keep disabled until the reviewed scenario supports a complete manuscript;
  // then pass "evidence" and finally "review".
  manuscripts: manuscriptStage,

  // Package targets are additive and follow their host layer's stage.
  // They extend, never replace, the shared graph.
  claims,
});
