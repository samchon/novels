# Novel Benchmark Campaigns

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
- **Discarded work**: the first `napoleon-imperator` settings attempt was moved out of the repository, not merged. Nothing in the package descends from it.
- **Where the second attempt stopped (2026-08-18)**: paused mid-review, not abandoned. `docs/settings` holds 15 ordered files and 87 anchored H2 facts; the stage is already `review`; every file carries its 8 principle answers; files 001–009 carry their 8 review lines and 010–015 carry none. The 48 remaining diagnostics are all the same unreviewed-answer kind, and the compiler states each fingerprint. Resuming means finishing that review pass on the last six files — rereading each file against one item at a time and writing what was actually compared, never bulk-filling the fingerprints the diagnostics print. Nothing else in the package is outstanding.

### Planned observations

Stage-transition points per layer; compiler diagnostics and the real repairs they caused, separated from tags added merely to satisfy coverage; upstream revisions forced by downstream discovery; stale reviews renewed; literary findings and coordinator interventions; full-review rounds to convergence. Speed, heading counts, citation counts, and exclusion counts are recorded as process measures and are never treated as literary merit. No control arm is defined, so results are exploratory rather than causal.

### Progress

| Package | Layer | Stage | H2/H3/H4 | Package build | Review rounds | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| `napoleon-imperator` | settings | `review` | 15 files, 87 H2 | 48 errors, all one kind | 0 | finish the review pass on files 010–015 |
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
