---
name: edit-agent-instructions
description: Write or revise the repository's binding instruction documents — agent skills and shared literary contracts. Use whenever a SKILL.md, a linked phase document, or a file under config/docs is created, moved, split, renamed, or edited.
---

# Edit Agent Instructions

Three document families bind every agent working here. All are read as normative instruction rather than prose, so all are edited under one contract.

- [skills.md](skills.md): `.agents/skills/**`, the capability routers and their phase documents.
- [principles.md](principles.md): `config/docs/principles/**`, the literary checklists the evidence graph compiles.
- [obligations.md](obligations.md): `config/docs/obligations/**`, common unit duties and roles distributed across an artifact population.

## Shared contract

Keep each rule in one owning file and link to that file instead of copying the rule elsewhere. Duplicated rules drift and give readers competing completion points.

Choose that owner by rule kind:

- a principle asks a universal file-level literary or structural question;
- `obligations/common.md` asks a universal unit-level completion or evidence-integrity question;
- a layer obligation names one role the complete owning population must realize;
- a skill specifies the procedure that produces or checks the artifact; and
- TypeScript config selects populations, cardinality, exclusions, stages, and review behavior.

If a proposed rule mixes kinds, separate the procedure or mechanism from the single canonical literary target. Link across owners only where an agent must cross the boundary to act.

Preserve necessary context, decisions, workflow, and failure guards. Remove repetition, filler, ceremony, and conclusions that add no instruction.

Use short paragraphs with one job. Prefer direct rules and compact lists over dense prose. Add no unreferenced file, script, asset, example, or UI metadata.

Research notes in `.wiki` are non-binding. Promote a finding into one of these document families only by editing its canonical owner under the applicable contract.

## Review

Inspect every changed instruction literally, including linked callers and the TypeScript behavior it describes. Check ownership, one-rule scope, fixed anchors, `Sources:` lines, local links, frontmatter, and the absence of contradictory or duplicated completion points.

After corrections stop, perform complete review rounds over the full instruction diff. A round counts only when it finds no issue and causes no edit; require two consecutive counted rounds before the final repository gates in `AGENTS.md`.
