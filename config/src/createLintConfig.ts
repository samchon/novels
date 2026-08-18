import fs from "node:fs";
import path from "node:path";

import {
  evidence,
  type ITtscEvidenceGraphClaim,
  type ITtscEvidenceGraphReference,
} from "@ttsc/evidence";
import type { ITtscLintConfig } from "@ttsc/lint";

/**
 * A layer's current evidence harness.
 *
 * - `disabled`: write one complete draft without evidence diagnostics.
 * - `evidence`: enable graph claims, but do not require review fingerprints.
 * - `review`: require a review and current fingerprint for every acknowledgement.
 *
 * Advance only after the current pass is complete and its enabled checks are clean.
 */
export type EvidenceStage = "disabled" | "evidence" | "review";

/** Per-work controls for progressively enabling the narrative evidence graph. */
export interface ICreateLintConfigProps {
  /** Absolute package directory used to resolve settings and shared principles. */
  location: string;
  /** Evidence stage for `docs/settings`. */
  settings: EvidenceStage;
  /** Evidence stage for `docs/storylines`. */
  storylines: EvidenceStage;
  /** Evidence stage for `docs/scenarios`. */
  scenarios: EvidenceStage;
  /** Evidence stage for `docs/manuscripts`. */
  manuscripts: EvidenceStage;
}

const requiresReview = (stage: EvidenceStage): boolean => stage === "review";

const PACKAGE_DOCS_ROOT = "docs";

/** The authored layers that carry a principle checklist, by principle file name. */
type PrincipleLayer = "settings" | "storylines" | "scenarios" | "manuscripts";

const createLineageReference = (
  files: string[],
  symbol: "h2" | "h3" | "h4",
  requireReview: boolean,
): ITtscEvidenceGraphReference => ({
  type: "markdown",
  root: PACKAGE_DOCS_ROOT,
  files,
  symbol,
  noEvidenceExclude: true,
  singleEvidencePerSymbol: true,
  requireReview,
});

/**
 * The settings catalog of facts, people, places, and style that ground a work.
 *
 * Setting documents do not cite other settings as evidence. The references
 * below are reused only when storylines, scenarios, and manuscripts consume
 * settings.
 *
 * A work package's `docs/settings` holds Markdown files only, so the caller's
 * `location` is read directly. Adding a settings file never requires touching
 * a `lint.config.ts` file list, and each file stays a separate reference with
 * its own independent 100% obligation.
 *
 * Settings are a catalog: one H2 may use several entries, and some entries a
 * work never uses. Unlike lineage references, `singleEvidencePerSymbol`,
 * `uniqueEvidence`, and `noEvidenceExclude` are therefore not applied.
 */
const createSettingReferences = (
  location: string,
  requireReview: boolean,
): ITtscEvidenceGraphReference[] => {
  const settingsRoot = path.join(location, "docs/settings");
  if (!fs.existsSync(settingsRoot)) return [];

  return fs
    .readdirSync(settingsRoot)
    .map(
      (file) =>
        ({
          type: "markdown",
          root: PACKAGE_DOCS_ROOT,
          files: [`settings/${file}`],
          symbol: "h2",
          requireReview,
        }) satisfies ITtscEvidenceGraphReference,
    );
};

/**
 * The literary principle checklists a layer's files answer item by item.
 *
 * Principles live in `config/docs/principles` as `common.md` answered by every
 * layer, `narratives.md` answered by the three narrative layers, and one file
 * per authored layer, each principle one anchored H2. Every principle
 * reference is a `checklist`: each file host answers each H2 item with its own
 * citation, and a whole-document citation is refused as an aggregate, so one
 * file can never tick a box on behalf of another.
 *
 * Every principle reference refuses exclusions. Principles are written
 * conditionally — an item that governs speech, tension, or closure binds only
 * where its condition triggers — so citing an item asserts that the file
 * honors it wherever it applies, and a file the compiler cannot honestly
 * satisfy is defective rather than excludable.
 *
 * With `requireReview`, each acknowledgement carries the fingerprint of that
 * single item, so editing one principle expires every host's answer to that
 * item and nothing else.
 */
const createPrincipleReferences = (
  location: string,
  layer: PrincipleLayer,
  requireReview: boolean,
): ITtscEvidenceGraphReference[] => {
  const configRoot: string = path.resolve(__dirname, "..");
  const referenceRoot: string = path
    .relative(location, path.join(configRoot, "docs"))
    .replaceAll("\\", "/");

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
};

const createGraphConfig = (props: ICreateLintConfigProps): ITtscLintConfig => {
  const settingReview = requiresReview(props.settings);
  const storylineReview = requiresReview(props.storylines);
  const scenarioReview = requiresReview(props.scenarios);
  const manuscriptReview = requiresReview(props.manuscripts);

  const storylineSettingReferences = createSettingReferences(
    props.location,
    storylineReview,
  );
  const scenarioSettingReferences = createSettingReferences(
    props.location,
    scenarioReview,
  );
  const manuscriptSettingReferences = createSettingReferences(
    props.location,
    manuscriptReview,
  );

  // A package whose docs/settings directory is still empty produces claims
  // with no reference population; the plugin refuses those as configuration
  // errors, so they are dropped until the first settings file exists.
  const claims: ITtscEvidenceGraphClaim[] = [
    // Settings are the canon foundation, but writing them is itself a
    // disciplined craft: declared sources, sufficient constraints,
    // verified quantities. Each settings file answers the common and
    // settings principle checklists once, before its first H1.
    ({
      name: "setting files answer the common and settings principle checklists",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["settings/**/*.md"],
      symbol: "file",
      disabled: props.settings === "disabled",
      reference: createPrincipleReferences(
        props.location,
        "settings",
        settingReview,
      ),
    } satisfies ITtscEvidenceGraphClaim),

    // Literary principles govern the whole narrative file. They are
    // answered item by item in one comment before its H1 instead of
    // repeated on every sequence, chapter, and scene.
    ({
      name: "storyline files answer the common, narrative, and storyline principle checklists",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["storylines/**/*.md"],
      symbol: "file",
      disabled: props.storylines === "disabled",
      reference: createPrincipleReferences(
        props.location,
        "storylines",
        storylineReview,
      ),
    } satisfies ITtscEvidenceGraphClaim),

    // A storyline H2 is one sequence of the whole work. The settings
    // catalog does not prove itself; this first event-choosing layer
    // owns which settings are used and which are not.
    ({
      name: "storyline H2 sequences account for the settings catalog",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["storylines/**/*.md"],
      symbol: "h2",
      disabled: props.storylines === "disabled",
      reference: [...storylineSettingReferences],
    } satisfies ITtscEvidenceGraphClaim),

    // Markdown hierarchy already fixes each H3's H2 parent, so the
    // same-layer parent is never cited again. H3 accounts only for the
    // settings it uses.
    ({
      name: "storyline H3 chapters account for settings",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["storylines/**/*.md"],
      symbol: "h3",
      disabled: props.storylines === "disabled",
      reference: [...storylineSettingReferences],
    } satisfies ITtscEvidenceGraphClaim),

    // Markdown hierarchy already fixes each H4's H3 parent. The finest
    // event unit accounts only for its own settings usage.
    ({
      name: "storyline H4 scenes account for settings",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["storylines/**/*.md"],
      symbol: "h4",
      disabled: props.storylines === "disabled",
      reference: [...storylineSettingReferences],
    } satisfies ITtscEvidenceGraphClaim),

    ({
      name: "scenario files answer the common, narrative, and scenario principle checklists",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["scenarios/**/*.md"],
      symbol: "file",
      disabled: props.scenarios === "disabled",
      reference: createPrincipleReferences(
        props.location,
        "scenarios",
        scenarioReview,
      ),
    } satisfies ITtscEvidenceGraphClaim),

    // A scenario H2 refines the matching storyline H2 into scene
    // strategy while rechecking settings directly. This is the first
    // triangulation that stops a storyline misreading from flowing
    // into the scenario and the novel unchallenged.
    ({
      name: "scenario H2 sequences refine storylines and recheck settings",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["scenarios/**/*.md"],
      symbol: "h2",
      disabled: props.scenarios === "disabled",
      reference: [
        // Event lineage tolerates no omission or exclusion and picks
        // exactly one parent.
        createLineageReference(
          ["storylines/**/*.md"],
          "h2",
          scenarioReview,
        ),
        // Settings remain accountable at the exact narrative unit.
        ...scenarioSettingReferences,
      ],
    } satisfies ITtscEvidenceGraphClaim),

    // The scenario's own H2 parent comes from Markdown hierarchy;
    // evidence pins only the cross-layer lineage to the matching
    // storyline H3 in its separate document.
    ({
      name: "scenario H3 chapters refine matching storyline chapters",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["scenarios/**/*.md"],
      symbol: "h3",
      disabled: props.scenarios === "disabled",
      reference: [
        createLineageReference(
          ["storylines/**/*.md"],
          "h3",
          scenarioReview,
        ),
        ...scenarioSettingReferences,
      ],
    } satisfies ITtscEvidenceGraphClaim),

    // A scenario H4 is the actually writable scene specification. Its
    // same-file H3 parent is hierarchical; only the matching storyline
    // H4 is cited cross-layer.
    ({
      name: "scenario H4 scenes refine matching storyline scenes",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["scenarios/**/*.md"],
      symbol: "h4",
      disabled: props.scenarios === "disabled",
      reference: [
        createLineageReference(
          ["storylines/**/*.md"],
          "h4",
          scenarioReview,
        ),
        ...scenarioSettingReferences,
      ],
    } satisfies ITtscEvidenceGraphClaim),

    ({
      name: "manuscript files answer the common, narrative, and manuscript principle checklists",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["manuscripts/**/*.md"],
      symbol: "file",
      disabled: props.manuscripts === "disabled",
      reference: createPrincipleReferences(
        props.location,
        "manuscripts",
        manuscriptReview,
      ),
    } satisfies ITtscEvidenceGraphClaim),

    // A manuscript H2 cites both the scenario and the storyline at the
    // same level, and rechecks settings directly so a canon violation
    // cannot spread on the excuse that the scenario already made the
    // mistake. This is the second triangulation.
    ({
      name: "manuscript H2 sequences realize plans and recheck settings",
      type: "markdown",
      root: PACKAGE_DOCS_ROOT,
      files: ["manuscripts/**/*.md"],
      symbol: "h2",
      disabled: props.manuscripts === "disabled",
      reference: [
        // The novel inherits exactly one immediate scenario parent.
        createLineageReference(
          ["scenarios/**/*.md"],
          "h2",
          manuscriptReview,
        ),
        // The storyline is cited directly to catch a miswired scenario.
        createLineageReference(
          ["storylines/**/*.md"],
          "h2",
          manuscriptReview,
        ),
        ...manuscriptSettingReferences,
      ],
    } satisfies ITtscEvidenceGraphClaim),

    // The manuscript's own H2 parent is hierarchical; only the
    // cross-layer H3 lineage into the scenario and storyline documents
    // is checked directly.
    ({
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
          manuscriptReview,
        ),
        createLineageReference(
          ["storylines/**/*.md"],
          "h3",
          manuscriptReview,
        ),
        ...manuscriptSettingReferences,
      ],
    } satisfies ITtscEvidenceGraphClaim),

    // A manuscript H4 is the scene the reader actually reads and a
    // virtual authoring boundary. Its same-file H3 parent is
    // hierarchical; only scenario and storyline H4s are cited.
    ({
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
          manuscriptReview,
        ),
        createLineageReference(
          ["storylines/**/*.md"],
          "h4",
          manuscriptReview,
        ),
        ...manuscriptSettingReferences,
      ],
    } satisfies ITtscEvidenceGraphClaim),
  ];

  return {
    plugins: {
      evidence,
    },
    rules: {
      "evidence/graph": [
        "error",
        {
          claims: claims.filter((claim) =>
            Array.isArray(claim.reference)
              ? claim.reference.length > 0
              : true,
          ),
        },
      ],
    },
  } satisfies ITtscLintConfig;
};

/**
 * Create a work package's staged evidence graph.
 *
 * Each layer advances through `disabled` for the free draft, `evidence` to
 * compile citations and exclusions, and `review` to also demand review text
 * and fingerprints. Layers hold independent states, so reviewed settings and
 * storylines can stand while scenarios are still drafted freely.
 *
 * Settings enter the pipeline first: their stage governs the common and
 * settings principle checklists on each settings file, while their H2 catalog becomes
 * downstream evidence whose review requirement follows each consuming layer's
 * own stage.
 */
export function createLintConfig(
  props: ICreateLintConfigProps,
): ITtscLintConfig {
  return createGraphConfig(props);
}
