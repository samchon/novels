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

Shared roles live in [`config/docs/obligations`](config/docs/obligations). Settings H2s account for delivery scope, work promise, and reader access; storyline H2s assign the reader's entry and ending and any prologue or epilogue role. A role may be realized by several H2s or excluded once when the complete owning population has no such role. Packages may append typed claims for evidence contracts unique to one work or experiment, but those claims only extend the shared graph.

A compiling work is not a finished work: after all layers pass review, repeated literal full-work reviews continue until two consecutive rounds find nothing.

## Workspace

| Path | Role |
| --- | --- |
| [`config`](config) | Shared private package: the evidence-graph factory ([`createNovelConfig.ts`](config/src/createNovelConfig.ts)), principles, obligations, typed custom-claim API, templates, and package generator. |
| `packages/*` | One novel work per package. |
| [`AGENTS.md`](AGENTS.md) | The shared writing and evidence contract. |
| [`.agents/skills`](.agents/skills) | Repository skills: `novel`, `evidence-graph`, `benchmark`, `edit-agent-instructions`. |

## Works

No novel work package is currently present. Create the next work with `pnpm create:novel` after its scope is authorized.

## Usage

```bash
pnpm install

# create a new work package
pnpm create:novel winter-orbit

# compile one work's evidence graph
pnpm --filter @samchon/novel-winter-orbit build

# compile every work from the root
pnpm build
```
