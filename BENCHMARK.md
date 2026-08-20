# Novel Benchmark Campaigns

## Campaign 2 — two GPT-5.6-Luna owners, opened 2026-08-21

### Contract

- **Lineup and ownership**: `napoleon-imperator` and `after-school-conquest` run in parallel, each under one persistent GPT-5.6-Luna writing owner with exclusive write authority over that package. The coordinator alone owns shared config, skills, workspace files, campaign records, and cross-work audits. The other three packages are outside this campaign and remain held.
- **Language**: English throughout, including settings, evidence documents, treatments, scripts, and manuscripts.
- **Layer order and meaning**: `settings → storylines → scenarios → manuscripts`; each layer advances `disabled → evidence → review`. Settings are executable canon, storylines are reader-complete detailed treatments, scenarios are production-capable initial scripts, and manuscripts are finished literary prose.
- **Scale**: *Imperator* retains its existing multi-volume-equivalent biographical scope from Toulon to Saint Helena, with the three committed scene-level periods defined in its canon. *The After-School World Conquest Club* delivers one complete standalone light-novel comedy whose playful first-person surface accrues real personal and civic costs without abandoning comic control.
- **Creative authority**: each owner may decide canon, plot, voice, and ending within its title, premise, genre, language, scale, and experiment axis. New canon is recorded in settings before use. Package-local typed claims are permitted only for a real work-specific evidence need; shared graph changes are escalated.
- **Completion**: all four layers at `review`, clean package and root builds, then at least two consecutive complete full-work reviews with no finding and no content edit.
- **Experiment limit**: the works differ simultaneously in subject, genre, research burden, scale, and voice, and there is no control arm. Findings are exploratory, not causal evidence about the model.

Campaign 1 is preserved below as history. Its sequential five-work contract was superseded before literary completion by the user's two-owner directive and the synchronized wrtn harness merged in PR #14.

### Planned observations

Elapsed layer transitions; compiler diagnostics and substantive repairs; upstream revisions; stale reviews renewed; package-local claim changes; literary findings and interventions; clean full-review rounds. Counts and speed are process measures, never literary merit.

### Progress

| Package | Layer | Stage | H2/H3/H4 | Package build | Review rounds | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| `napoleon-imperator` | settings | `disabled` | 30 files, 365 H2 | clean | 0 | owner audits the inherited canon, closes sourcing debt, then advances settings through evidence and review |
| `after-school-conquest` | settings | `disabled` | no authored units | clean | 0 | owner researches and writes the complete first settings version |

### Findings

Recorded during the run as shared-harness defects, work-specific defects, and benchmark-design limits.

## Campaign 1 — five English works, opened 2026-08-18

### Contract

- **Lineup and order**: `napoleon-imperator` runs first and alone, through all four layers to a finished work. The remaining four — `abyss-regressor`, `after-school-conquest`, `long-night-voyager`, `pale-lantern` — are scaffolded and held until it finishes. The first work is deliberately treated as the harness's proving ground: what it exposes is repaired in the shared principles and skills before four more works inherit the defect. One exclusive owner per package; the coordinator owns shared config, skills, workspace files, package creation, and cross-work audits.
- **Language**: English throughout, including settings and narrative artifacts.
- **Layer order**: `settings → storylines → scenarios → manuscripts`. Stage semantics `disabled → evidence → review` per layer. No layer activates before its immediate upstream layer has a clean review build.
- **Layer contract**: settings are executable canon; storylines are detailed narrative treatments a reader can follow; scenarios are production-capable initial scripts; manuscripts are finished literary prose.
- **Scale target**: one full-length novel per package. `napoleon-imperator` is the deliberate outlier at long-form biography scale; the other four target a single-volume novel. Scope changes are negotiated explicitly, never shrunk quietly to finish sooner.
- **Completion**: all four layers at `review`, clean package and root builds, then repeated full-work literary reviews until two consecutive rounds find nothing and make no content edit.
- **Preservation**: all work stays in this repository; the campaign record lives in this file.

### Harness preflight (2026-08-18)

The shared harness was proven before authorship began, not assumed:

- `pnpm install` was broken on a clean run — the catalog pins `^0.28.0` while the registry's newest `@ttsc/evidence` is 0.27.0, and the lockfile still pointed at an `artifacts/` tarball the repository no longer had. Published 0.27.0 was confirmed to lack the `checklist` reference the principle design depends on, so the catalog's requirement is real rather than aspirational. Resolved by packing 0.28.0 from a local `ttsc` checkout and binding it through an `overrides` block, documented in `README.md` for deletion once 0.28.0 publishes.
- A throwaway probe package then exercised all three stages and was deleted. `disabled` compiled clean; `evidence` reported exactly the 3 common and 5 settings checklist items unanswered and refused exclusion; `review` demanded a distinct fingerprint per item. Reference roots resolved from `packages/*` to `config/docs` correctly.
- Root `pnpm build` passes across all five scaffolded packages.

### Findings during the run

- **Principle gaps closed before the first work was drafted (2026-08-18).** An audit against four named failure modes found two of them unowned. Foreshadowing was fully owned as a *plan* by `storylines.md#disclosure`, but nothing governed the *telling*, so `manuscripts.md#narrated-withholding` was added for narration that either flags significance it has not earned or steps around a fact its focal mode plainly holds. Flow continuity was owned between units by `narratives.md#unit-handover` and `#leap-continuity`, but the join between paragraphs inside a unit fell between `prose-control` (the sentence) and `pacing-rhythm` (consecutive units), so `manuscripts.md#continuous-telling` was added. Expositional entry and plausibility were already owned — by `narratives.md#expositional-entry` and by `#causal-chain` with `storylines.md#figure-in-event`, `#action-consequence`, and `scenarios.md#physical-progression`. Separately, `narratives.md#canon-integrity` was widened: it bound only settings-declared facts, leaving facts the narrative itself established unprotected across units. All three edits landed in the narrowest owning file and none touched `common.md` or `settings.md`, so no settings work was invalidated.
- **Multi-agent authorship defect (2026-08-18).** The first owner delegated its research to helper agents, which then each wrote a full settings canon into the same directory; three competing `001-*` and three competing `002-*` files resulted, and the helpers kept writing after their owner was stopped. Files were preserved outside the repository and the package restarted clean. `$benchmark` now states that an owner may delegate research but not authorship, and that a work's helpers must be stopped and its directory confirmed quiet before restarting it.

### Resuming this campaign

`$benchmark` lists every field an owner's brief must carry, so a brief is reconstructed from the skill rather than recorded here. These facts are not derivable from it:

- **Standing structural wish for `napoleon-imperator`**: the finished work opens at Austerlitz, the Battle of the Three Emperors. This is a storyline decision — `principles/settings.md#execution-neutrality` forbids recording it in canon — so the settings phase only owes canon detailed enough that the opening invents nothing: terrain, chronology, order of battle, weather, command relationships, and the Third Coalition context. The storyline phase owes the opening itself.
- **Research tooling**: `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION` is raised to 2000 in `.claude/settings.json` because the default 200 was exhausted in one sitting by parallel research. The limit is per session, and subagents draw on the same pool. WebFetch is not capped; primary archives reached that way — Gallica, archive.org, the Fondation Napoléon, the Napoleon Series, DOI links — satisfy `principles/settings.md#canon-and-sources` better than search does.
- **Layer-activation gate**: no layer moves off `disabled` while `@ttsc/evidence` 0.28.0 is unpublished. The overrides bind the graph to a locally packed build, so a layer activated before the release is compiled against something no one else can install; the registry is checked at every activation and the transition waits, rechecking every fifteen minutes, until 0.28.0 resolves.
- **Both settings attempts discarded (2026-08-19)**: `napoleon-imperator/docs/settings` is empty and all four layers are `disabled`. The second attempt reached 15 files and 87 anchored H2 facts with full evidence and review tags, and was discarded whole rather than repaired: it was authored and advanced to `review` against an unpublished build, and its research was done across two sessions, one of them with no working web search, which left roughly thirty facts marked unreachable and later closed under time pressure. Nothing in the package descends from it. The next attempt starts from an empty directory and does its research once. Drafting proceeds at `disabled`, which the gate does not block, and writes no evidence tags — the `evidence` pass rereads every file against every item anyway, and the discarded attempt suffered from sentences written toward the checklist rather than toward the canon. Only the transition off `disabled` waits for the release.

- **Sourcing is a standard, not a claim (2026-08-19).** The first canon draft compiled and read well while resting on tertiary summaries: of 146 externally sourced H2s, 89 cited only reference works or carried no locator at all, and four cited a scholarly book while admitting in the citation that it had not been opened. Two hardening passes lifted 447 followable locators into place and corrected real facts on the way — Marengo's decisive charge was Kellermann's and not Desaix's, Wagram's near-parity was actually a large French advantage, the Austerlitz gun count came from a propaganda figure, and two events were narrated in the wrong order. The harness cannot see any of this: the graph checks that a citation exists and was reviewed, never what it is worth. Source quality is a reading job, and `docs/references` now tiers every cited source so the debt stays visible.
- **A canon can contradict its own scale (2026-08-19).** `001-aim-and-conventions.md#intended-scale` committed three periods to scene-level detail. The 1805 period had two dedicated files and 21 anchored facts; the 1812-1821 collapse had one file and 9, with the whole Russian campaign as a single fact and Waterloo sharing one with the Hundred Days. A storyline reaching 1812 would have had to invent terrain, order of battle, and chronology at every step. Six new files closed it. The same defect then stood exposed at 1806-1811, the third committed period, which still holds about six dedicated facts against the collapse's sixty-three. Depth is not judged by a file's own quality but against the depth the work's strong units already reach.
- **Fork isolation must be a tool boundary, not an instruction (2026-08-19).** Three times an owner told its research helpers to write nothing and return findings as text; three times ordinary subagents inherited write access and wrote competing content into the same files, once destroying a directory and once introducing a date-order contradiction, a quote attributed to a source that did not contain it, and a regressed correction. Passing `subagent_type: "Explore"`, which carries no Edit or Write tool at all, ended it on the first try. `$benchmark` states the delegation rule; the rule only holds when the tools enforce it.
- **The best sources were blocked by the tool, not the sites (2026-08-19).** `napoleon.org` and `gallica.bnf.fr` returned 403 to WebFetch throughout an entire pass, pushing research onto reference works for a French-history subject. Both answer a browser user-agent normally, and Gallica's SRU endpoint returns real ark identifiers. `napoleon-series.org` is the inverse: it refuses the browser agent and answers WebFetch. Try every retrieval path before recording a fact as unreachable.

- **A bibliography is a fact, not an index (2026-08-19).** The campaign first collected its research into a generated `docs/references` tree that listed each source with the units citing it. It mirrored the `Sources:` lines it was built from, so one thing lived in two places and drifted the moment either moved — it needed regenerating twice in a session — and it taught a "cited by" relation the compiler does not know, beside an `@evidence` vocabulary that already fixes what a citation means. It was deleted. The canon already held the right form in one file: a source gets its own anchored H2 stating what it is, what it contains, and the reliability problem it carries, so a unit cites the source itself and inherits that standing. Extending that form gave 112 sources their own unit, split a scholarship aggregate that had let a citation name a shelf instead of a work, and let a book nothing used be dropped rather than carried.

### Planned observations

Stage-transition points per layer; compiler diagnostics and the real repairs they caused, separated from tags added merely to satisfy coverage; upstream revisions forced by downstream discovery; stale reviews renewed; literary findings and coordinator interventions; full-review rounds to convergence. Speed, heading counts, citation counts, and exclusion counts are recorded as process measures and are never treated as literary merit. No control arm is defined, so results are exploratory rather than causal.

### Progress

| Package | Layer | Stage | H2/H3/H4 | Package build | Review rounds | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| `napoleon-imperator` | settings | `disabled` | 30 files, 365 H2 | clean (nothing enforced) | 0 | finish the sourcing debt; hold the `evidence` transition for the release |
| `abyss-regressor` | — | `disabled` | — | clean (empty) | 0 | held until the first work finishes |
| `after-school-conquest` | — | `disabled` | — | clean (empty) | 0 | held until the first work finishes |
| `long-night-voyager` | — | `disabled` | — | clean (empty) | 0 | held until the first work finishes |
| `pale-lantern` | — | `disabled` | — | clean (empty) | 0 | held until the first work finishes |

### Findings

Recorded as the campaign runs, separated into shared-harness defects, work-specific defects, and benchmark-design limits.

---

This file is the log for multi-package writing experiments run under `$benchmark`.

## Recording a campaign

Open a campaign section here before launch and keep it honest while it runs:

- **Contract**: start time, lineup, language and scale targets, layer order `settings → storylines → scenarios → manuscripts`, stage semantics `disabled → evidence → review`, completion condition (all four layers at `review`, clean package and root builds, two consecutive clean full-work review rounds), and where changes are preserved.
- **Planned observations**: stage-transition times, compiler diagnostics and the real repairs they caused, upstream revisions, stale-review renewals, literary findings and interventions, and full-review rounds. Speed, heading counts, citation counts, and exclusion counts are never literary merit.
- **Progress**: a table per package — current layer and stage, H2/H3/H4 progress, package build, review rounds, and the next action with its real risk.
- **Findings**: what the harness exposed, what it missed, and which defects belonged to the shared harness, to a specific work, or to the campaign design itself.

Completed campaigns stay in this file as historical evidence; a reset states what was kept, what was discarded, and why.
