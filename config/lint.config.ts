import type { ITtscLintConfig } from "@ttsc/lint";

import {
  createLintConfig as createSharedLintConfig,
  type ICreateLintConfigProps,
} from "./src/createLintConfig";

/** Build the shared novel evidence graph from a work package's location and per-layer stages. */
export function createLintConfig(
  props: ICreateLintConfigProps,
): ITtscLintConfig {
  return createSharedLintConfig(props);
}

// Read as the config package's own lint configuration, this file has no
// evidence subjects. Work packages import the named factory and pass their
// own `__dirname`.
export default {} satisfies ITtscLintConfig;
