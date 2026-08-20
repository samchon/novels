import type { ITtscEvidenceGraphClaim } from "@ttsc/evidence";

import type { NovelStage } from "./NovelStage";

/**
 * Sets up one novel's lint rules.
 *
 * Give the package location, each layer's stage, and any claims used only by
 * this novel.
 */
export interface INovelConfigProps {
  /**
   * Points to the novel package.
   *
   * Use its absolute directory so package and shared files resolve correctly.
   */
  location: string;

  /**
   * Sets the settings stage.
   *
   * It applies to Markdown files under `docs/settings`.
   */
  settings: NovelStage;

  /**
   * Sets the storyline stage.
   *
   * It applies to Markdown files under `docs/storylines`.
   */
  storylines: NovelStage;

  /**
   * Sets the scenario stage.
   *
   * It applies to Markdown files under `docs/scenarios`.
   */
  scenarios: NovelStage;

  /**
   * Sets the manuscript stage.
   *
   * It applies to Markdown files under `docs/manuscripts`.
   */
  manuscripts: NovelStage;

  /**
   * Adds claims used only by this novel.
   *
   * They follow the shared claims and do not replace them.
   */
  claims?: ITtscEvidenceGraphClaim[];
}
