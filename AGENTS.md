# Repository Instructions

This pnpm workspace writes English-language novels as compiled evidence graphs. Treat Markdown hierarchy, narrative lineage, citations, review fingerprints, and compiler state as source code, while remembering that a clean compiler is only one of several writing harnesses.

## Required skills

- Use `$novel` for research, settings, storylines, scenarios, manuscripts, hierarchy, continuity, drafting, revision, and full literary review. Read the phase document it routes to before acting.
- Use `$evidence-graph` when changing a package's evidence stage, writing or reviewing evidence tags, handling fingerprints, deciding coverage or exclusions, editing evidence configuration, or diagnosing an evidence build.
- Use `$benchmark` when designing, launching, supervising, or comparing a multi-package novel experiment.
- Use `pnpm create:novel` when adding a work package under `packages/*`; do not reproduce a package skeleton by hand.
- Use `$edit-agent-instructions` before creating, moving, splitting, or changing any repository skill or file under `config/docs`.

## Workspace layout

- `config` is the shared private package. `config/src/createNovelConfig.ts` owns the evidence graph factory, `config/docs/principles` owns subject- and genre-independent literary principles, and `config/docs/obligations` owns shared H2 evidence targets.
- Every directory directly under `packages/*` is one novel work package. Discover the target from the request and its `package.json`; never hardcode one work into shared instructions.
- Repository skills live at `.agents/skills/<name>/SKILL.md`, with directly linked Markdown phase documents beside it. `$edit-agent-instructions` owns how skills, principles, and obligations are authored.
- `.wiki` holds non-binding research, design notes, and benchmark status. A note becomes a rule only when promoted into its canonical instruction, config, or evidence document.

## Package evidence state

Every work package calls the shared lint factory with explicit layer states:

```ts
createNovelConfig({
  location: __dirname,
  settings: "disabled",
  storylines: "disabled",
  scenarios: "disabled",
  manuscripts: "disabled",
});
```

Packages may append typed `claims` for work- or experiment-specific evidence. Additional claims do not replace or weaken the shared graph.

Each authored layer advances in one direction:

```text
disabled → evidence → review
```

- `disabled`: write a complete first version without compiler pressure. Obvious truthful evidence may be recorded, but coverage is not yet enforced.
- `evidence`: activate the layer's file-level principle checklists, common unit-obligation checklist, and setting and lineage claims, resolve their compiler errors truthfully, and revise content when the graph exposes a defect.
- `review`: keep the graph active, require current reviewed fingerprints, and independently recheck every acknowledgement.

Every layer stage governs that layer's unit answers to `obligations/common.md`. The `settings` stage also governs the common and settings principle checklists and the distributed roles in `obligations/settings.md`; the `storylines` stage also governs `obligations/storylines.md`. The settings H2 catalog itself becomes downstream evidence whose review requirement follows each consuming layer's own stage.

Comment each package state with the condition for its next transition. Do not skip, reverse, or lower a state to hide diagnostics. Do not activate a downstream layer before the immediate upstream layer has a clean review build; the pipeline is `settings → storylines → scenarios → manuscripts`.

## Content boundaries

- Keep only Markdown in every `docs` directory.
- Keep canonical work constraints and detailed world facts in each work package's `docs/settings`. Record the work's scope, promise, and reader access in the first settings file, then the world facts that serve them. Every addressable fact or constraint is an H2. Put non-evidence overview prose above the first H2.
- Keep reusable literary principles in `config/docs/principles` as `common.md` answered by every layer, `narratives.md` answered by the three narrative layers, and one file per authored layer: `settings.md`, `storylines.md`, `scenarios.md`, `manuscripts.md`. Each principle is independent of any work's subject, genre, characters, setting, and ending, and the compiler reads every H2 as one checklist item.
- Keep shared H2 evidence targets under `config/docs/obligations`: `common.md` for the no-exclusion checklist every settings H2 and narrative H2/H3/H4 answers, `settings.md` for required roles distributed across settings H2 owners, and `storylines.md` for required roles distributed across storyline H2 owners. Do not create another layer file without an independent target. Host populations and cardinality belong in `config/src`; `common.md` states required repair, while distributed-role files define their roles. Neither duplicates TypeScript configuration or tag grammar.
- Keep package-specific evidence documents under descriptive package `docs` subdirectories and activate them only through that package's added claims. Do not create empty contract or checklist files.
- Keep narrative artifacts in `docs/storylines`, `docs/scenarios`, and `docs/manuscripts`. Do not create placeholder files or invent story content without an explicit request.
- Start settings, storyline, scenario, and manuscript filenames with zero-padded order such as `001-opening.md`. Preserve the sequence key and slug across the three narrative layers.
- Use H2 for sequences, H3 for chapters, and H4 for scenes in every narrative artifact. A manuscript H4 is an internal authoring and evidence boundary; it may be hidden or rendered as a scene break at publication and need not be a visible book heading.
- Keep a work's source images directly under its `assets` subdirectories. Do not add source snapshots, manifests, checksums, asset READMEs, or generated management scripts.
- Do not add a package README unless explicitly requested. Keep the explicitly requested root README current with the actual packages in the workspace.

## Detail and revision

Every layer must satisfy `config/docs/obligations/common.md` and its `$novel` phase document as a complete, detailed deliverable at its own abstraction. Detail is not immutability: later work may reveal a better or necessary upstream decision.

When that happens, change the earliest owning layer first and follow `settings and shared contracts → storylines → scenarios → manuscripts`. Use the graph to locate dependants, then reread every affected unit in full, inspect adjacent consequences the graph may not express, update downstream artifacts, and renew stale reviews. Never preserve a false upstream decision merely to keep the compiler green.

Keep the layers distinct. Settings state facts and constraints; storylines own narrative connections, events or processes, and their changes or accumulations; scenarios specify detailed executable scene progression; manuscripts contain finished prose. Do not put reveal schedules or chapter instructions in settings, scenario field sheets in storylines, or planning labels in manuscripts.

## Evidence discipline

- Put principle acknowledgements in one file-level HTML comment before the first H1 of each settings and narrative Markdown file. Do not repeat principle tags under H2, H3, or H4.
- Principle references are compiler checklists: each file answers each anchored H2 item individually — `common.md` for every file, `narratives.md` additionally for narrative files, and its own layer's file. Whole-file citations are refused and no principle item may be excluded: each item binds wherever its condition applies, and the citation asserts that compliance.
- Common unit obligations are a compiler checklist: every settings H2 and every narrative H2, H3, and H4 answers each anchored `obligations/common.md` item directly, and no item permits exclusion. A failed item requires the halt and repair written in that target; do not add a tag or advance the state while it remains false.
- Layer obligation files use ordinary coverage for distributed roles. Every H2 that materially realizes a role may cite it, so one role may span multiple H2 hosts. Every shared settings and storyline role is required and permits no exclusion. Put common-obligation, distributed-role, setting, and cross-layer lineage acknowledgements directly below the H2, H3, or H4 they justify.
- Use configured evidence-root paths in tags: `settings/...`, `storylines/...`, `scenarios/...`, `manuscripts/...`, shared `principles/...` and `obligations/...`, or a package-local root declared by an added claim. Do not prefix them with `docs/`.
- Preserve strict one-to-one, no-exclusion lineage between matching narrative units. Treat settings as unit-level foundations and principles as file-level literary contracts. A unit cites only the settings it uses; a setting no host in a claim population uses takes one concrete population-wide exclusion, and principles and lineage permit no exclusion at all.
- A diagnostic is a question about the artifact, not an order to add a tag. Correct hierarchy, canon, narrative connection, execution, or prose when that is the real fault.
- Write review tags only in the `review` stage while performing the check they record. In `review`, every principle item answer carries the fingerprint of that single item; editing one principle expires every file's answer to that item. Never invent a fingerprint or refresh one without rereading its target and host.
- Never weaken the shared factory or a package wrapper to silence a content error. Added claims are additive.

## Completion

A layer is not complete merely because its evidence build passes. It must also pass review with current fingerprints. A novel is not complete merely because all layers pass `requireReview`: afterward run repeated literal full-work reviews according to `.agents/skills/novel/review.md` until at least two consecutive complete rounds find nothing and make no content edit.

Run `pnpm --filter <package-name> build` only at the layer-transition and final package gates required by the applicable skills; prose checkpoints do not trigger it. A pure deletion that changes no stage, claim, config, code, or schema requires exact target and diff inspection, not a build. Except for that pure-deletion case, after completing the required no-edit reviews for document, skill, manifest, package, or evidence-config changes, run one final `pnpm build` from the workspace root and `git diff --check`. Report unresolved diagnostics instead of weakening the graph.
