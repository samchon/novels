---
name: edit-agent-instructions
description: Write or revise the repository's binding instruction documents — agent skills and shared literary contracts. Use whenever a SKILL.md, a linked phase document, or a file under config/docs is created, moved, split, renamed, or edited.
---

# Edit Agent Instructions

Three document families bind every agent working here. All are read as normative instruction rather than prose, so all are edited under one contract.

- [skills.md](skills.md): `.agents/skills/**`, the capability routers and their phase documents.
- [principles.md](principles.md): `config/docs/principles/**`, the literary checklists the evidence graph compiles.
- [obligations.md](obligations.md): `config/docs/obligations/**`, shared roles realized or excluded across an artifact population.

## Shared contract

Keep each rule in one owning file. Link to canonical repository files instead of copying their contents.

Never state one rule in two documents. A duplicated rule drifts as one copy is revised, and a reader who satisfies one copy believes the other is satisfied too.

Preserve necessary context, decisions, workflow, and failure guards. Remove repetition, filler, ceremony, and conclusions that add no instruction.

Use short paragraphs with one job. Prefer direct rules and compact lists over dense prose. Add no unreferenced file, script, asset, example, or UI metadata.

Research notes in `.wiki` are non-binding. Promote a finding into one of these document families only by editing its canonical owner under the applicable contract.

Inspect the diff before finishing. Run root `pnpm build` and `git diff --check`.
