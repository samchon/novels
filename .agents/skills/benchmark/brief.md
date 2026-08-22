# Brief Each Owner

For an authoring run with N active packages, the root coordinator launches N writing subagents, one exclusive owner per package, in parallel as capacity permits. Keep that owner with the package across `settings -> storylines -> scenarios -> manuscripts` so its canon and artistic decisions remain coherent. A comparison-only run over already completed works needs reviewers, not new writing owners.

All agents share one filesystem and can read every package. That visibility does not grant write authority: each owner writes only its assigned package, while the coordinator owns shared config, skills, workspace files, package creation, benchmark status, and cross-work audits. Never run two writing owners against the same package concurrently.

Within its package, an owner may create and revise package-local evidence documents, cultivate typed `claims` in `lint.config.ts`, and run the package build at required gates. The claims must remain additive, follow `$evidence-graph` classification and naming, and stay inside the brief's experiment axis. The owner records every added or changed claim in its status report. A change to shared graph semantics or to a comparison-defining constraint belongs to the coordinator and must be escalated before editing.

The owner's first authorship task is the `$novel` work-specific contract pass inside settings `disabled`. The brief carries every explicit user directive without weakening its meaning, distinguishes it from owner discretion, and requires the pass to finish before bulk settings prose.

An owner may delegate read-only research but never package authorship: a helper returns findings and writes no repository file. Before reassigning or restarting a work, stop the current owner and its helpers, collect their reports, and confirm the package directory is no longer changing.

## Persistent Ownership

An incomplete package never remains without one active exclusive owner. Keep the declared owner model and package ownership across every layer and state. A bounded-task completion, deliberate gate, provider failure, runtime failure, or agent failure is not a terminal state: immediately resume the same owner context and declared model from the latest sound checkpoint. If that session cannot continue safely, confirm it and every helper have stopped, preserve sound package-local work, and immediately assign a replacement with the same model, brief, package authority, and required readings; never overlap writers.

An integrity intervention may interrupt an owner only as a stop-confirmed message boundary. Immediately resume that owner into the earliest contained corrective scope, forbidding unrelated or later progression while the audit continues; if repeated behavior requires replacement, perform the same-model handoff without leaving the package dormant. Neither a queued report nor an outstanding coordinator audit suspends this ownership invariant.

Every brief states:

- package path, title or seed, genre, intended scale, language, owner model, and authorized creative freedom;
- every user-confirmed work rule and prohibition, its authority, and any known package-local target or unresolved classification;
- required readings: repository instructions, `$novel`, `$evidence-graph`, `config/docs/obligations/common.md`, every other shared and package-specific evidence document selected by the lint config, the graph factory, and all existing package documents;
- research burden, source precision, genre-specific success conditions and failure modes;
- the result of `$novel` [Subject-Specific Principle Pass](../novel/work-specific.md#subject-specific-principle-pass), including each adopted package checklist and its selected file population;
- the declared delivery scale, including an exact volume count when specified, and its regression evidence: expected files and H2/H3/H4 structure, authored-body range, research breadth, and any historical baseline; require the owner to record that scale in settings and state explicitly that these measures detect unexplained contraction but do not by themselves certify quality;
- current layer and lint state, exact package `build` command, and completion report fields;
- the active oversight cadence from [Stage-Calibrated Supervision](observe.md#stage-calibrated-supervision);
- the exact applicable `$novel` phase deliverable and its `obligations/common.md` gate, the work-specific content expected under them, and examples of the shallow substitution the owner must detect; never use “write more detail” as a completion condition;
- persistence: routine uncertainty and status are not reasons to stop while useful authorized work remains.

Grant real creative discretion. An owner may decide canon, plot, voice, and ending within the brief, but records each adopted choice in the semantic owner before relying on it. It may not relabel or override a user-confirmed rule; escalate a conflict or material choice outside its authority.
