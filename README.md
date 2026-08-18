# Novels

An experiment in writing English-language novels as compiled evidence graphs.

Every work in this pnpm workspace is a TypeScript package whose documents — canon settings, storyline treatments, scene scenarios, and finished manuscripts — form an evidence graph compiled by [`ttsc`](https://github.com/samchon/ttsc) with [`@ttsc/evidence`](https://github.com/samchon/ttsc/tree/master/packages/evidence). Markdown hierarchy, narrative lineage, citations, and review fingerprints are treated as source code: a broken promise between layers is a build error, and a stale review is a diagnostic.

## How a novel compiles

Each work authors four layers in order, and each layer advances through three evidence stages:

```text
settings → storylines → scenarios → manuscripts        (pipeline)
disabled → evidence → review                            (per-layer stage)
```

- **Settings** state the work's canon: facts, constraints, institutions, people, and conventions, one anchored H2 per addressable fact.
- **Storylines** own causes, choices, events, and changes as detailed narrative treatments.
- **Scenarios** specify executable scene progression — staging, movement, decisive dialogue, turn, and exit.
- **Manuscripts** are the finished literary prose.

The three narrative layers share one `H2 sequence → H3 chapter → H4 scene` hierarchy. Matching units cite their upstream parents and the settings they use; manuscripts cite both the scenario and the storyline so a misreading cannot travel silently.

Shared literary principles live in [`config/docs/principles`](config/docs/principles) as [`common.md`](config/docs/principles/common.md) answered by every layer, [`narratives.md`](config/docs/principles/narratives.md) answered by the three narrative layers, and one file per authored layer. Each principle is one anchored H2, and each principle reference is a compiler **checklist**: every file answers every item with its own citation — a whole-file citation is refused, no file's answer covers another file, and no item may be excluded, because each principle binds wherever its condition applies. In the `review` stage every answer carries the fingerprint of that single item, so editing one principle expires exactly the answers to that item across all works.

A compiling work is not a finished work: after all layers pass review, repeated literal full-work reviews continue until two consecutive rounds find nothing.

## Workspace

| Path | Role |
| --- | --- |
| [`config`](config) | Shared private package: the evidence-graph factory ([`createLintConfig.ts`](config/src/createLintConfig.ts)), the principle checklists, and the package generator. |
| `packages/*` | One novel work per package. |
| [`AGENTS.md`](AGENTS.md) | The shared writing and evidence contract. |
| [`.agents/skills`](.agents/skills) | Repository skills: `novel`, `evidence-graph`, `benchmark`, `edit-agent-instructions`. |
| [`BENCHMARK.md`](BENCHMARK.md) | Multi-package experiment log. |

## Works

Five works run under one harness as the current benchmark campaign, logged in [`BENCHMARK.md`](BENCHMARK.md). Each was chosen for a different genre, research burden, narrating voice, and audience. The first is written alone and to completion, so that what it exposes is repaired in the shared principles and skills before the other four inherit it.

| Package | Title | Subject | Genre | Experiment axis | Status |
| --- | --- | --- | --- | --- | --- |
| [`napoleon-imperator`](packages/napoleon-imperator) | *Imperator* | Napoleon Bonaparte's life and age, opened at Austerlitz | Long-form historical biography | Documentary rigor beside limited focalization | in progress, settings `disabled` |
| [`abyss-regressor`](packages/abyss-regressor) | *Abyss Regressor* | A regressor's repeated descent into a world-eating Abyss | Progression fantasy | Serial momentum joined to long-form causality | scaffolded, held |
| [`after-school-conquest`](packages/after-school-conquest) | *The After-School World Conquest Club* | A suburban high school club plays at conquering the world | Light-novel comedy | A light first person accruing real costs | scaffolded, held |
| [`long-night-voyager`](packages/long-night-voyager) | *The Long Night Voyager* | Generational turnover aboard a failing closed system | Generation-ship hard SF | Engineering limits driving social change | scaffolded, held |
| [`pale-lantern`](packages/pale-lantern) | *The Pale Lantern* | The reliability of memory and testimony | Psychological thriller | Unreliable narration under fair clue control | scaffolded, held |

## Usage

The evidence graph compiles the principle checklists with `@ttsc/evidence`'s `checklist` reference, which no published release carries yet — the newest on the registry is 0.27.0. Until 0.28.0 publishes, bootstrap once from a local [`ttsc`](https://github.com/samchon/ttsc) checkout, whose tarballs the `overrides` block in [`pnpm-workspace.yaml`](pnpm-workspace.yaml) points at:

```bash
# from a ttsc checkout at version 0.28.0
for p in evidence lint ttsc ttsc-win32-x64; do
  (cd packages/$p && pnpm pack --pack-destination /path/to/novels/artifacts)
done
```

Then work from this repository:

```bash
pnpm install

# create a new work package
pnpm create:novel winter-orbit --title "Winter Orbit" --description "A generation-ship mystery"

# compile one work's evidence graph
pnpm --filter @samchon/novel-winter-orbit build

# compile every work from the root
pnpm build
```
