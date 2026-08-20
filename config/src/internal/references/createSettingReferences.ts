import fs from "node:fs";
import path from "node:path";

import type { ITtscEvidenceGraphReference } from "@ttsc/evidence";

import { PACKAGE_DOCS_ROOT } from "../utilities/PACKAGE_DOCS_ROOT";

/**
 * Creates one H2 reference per settings file.
 *
 * Separate references make each file complete on its own.
 */
export function createSettingReferences(
  location: string,
  requireReview: boolean,
): ITtscEvidenceGraphReference[] {
  const settingsRoot = path.join(location, "docs/settings");
  if (!fs.existsSync(settingsRoot)) return [];

  return fs
    .readdirSync(settingsRoot)
    .sort()
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
}
