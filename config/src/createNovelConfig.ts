import type { ITtscLintConfig } from "@ttsc/lint";

import type { INovelConfigProps } from "./INovelConfigProps";
import { createGraphConfig } from "./internal/createGraphConfig";

/**
 * Creates lint rules for one novel.
 *
 * It builds the shared evidence rules, then adds the novel's extra claims.
 */
export function createNovelConfig(props: INovelConfigProps): ITtscLintConfig {
  return createGraphConfig(props);
}
