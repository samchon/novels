import { evidence } from "@ttsc/evidence";
import type { ITtscLintConfig } from "@ttsc/lint";

export default {
  files: ["src/**/*.ts"],
  plugins: {
    evidence,
  },
  rules: {
    "evidence/singular": "error",
    "evidence/documented": [
      "error",
      {
        symbol: ["type", "function", "property"],
      },
    ],
  },
} satisfies ITtscLintConfig;
