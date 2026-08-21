import { createNovelConfig } from "@samchon/novel-config";

export default createNovelConfig({
  location: __dirname,

  // disabled defers complete coverage but permits obvious truthful evidence.
  // Finish the settings canon, then pass "evidence" and finally "review".
  settings: "disabled",

  // Keep disabled until the reviewed settings support a complete storyline;
  // then pass "evidence" and finally "review".
  storylines: "disabled",

  // Keep disabled until the reviewed storyline supports a complete scenario;
  // then pass "evidence" and finally "review".
  scenarios: "disabled",

  // Keep disabled until the reviewed scenario supports a complete manuscript;
  // then pass "evidence" and finally "review".
  manuscripts: "disabled",

  // Before leaving settings disabled, keep this empty only if the
  // work-specific contract audit finds no independent package target.
  // Add only adopted targets; additions extend, never replace, the shared graph.
  claims: [],
});
