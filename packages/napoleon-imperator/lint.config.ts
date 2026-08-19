import { createLintConfig } from "@samchon/novel-config";

export default createLintConfig({
  location: __dirname,

  // Hold at disabled: the canon is drafted here without compiler pressure,
  // and the evidence transition waits for a published @ttsc/evidence 0.28.0
  // because the graph currently resolves through workspace overrides onto a
  // locally packed build. Then pass "evidence" and finally "review".
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
});
