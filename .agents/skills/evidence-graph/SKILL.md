---
name: evidence-graph
description: Stage, write, diagnose, or review the novel evidence graph. Use for package evidence states, @evidence tags, claims and references, checklists, coverage, exclusions, fingerprints, stale reviews, and ttsc evidence diagnostics.
---

# Evidence Graph

Read `AGENTS.md`, `config/src/createNovelConfig.ts`, the package `lint.config.ts`, and both sides of the evidence edge before editing.

Read the applicable procedure in full:

- [staging.md](staging.md): change `disabled`, `evidence`, or `review`; add evidence to a newly completed layer.
- [review.md](review.md): enter review; write or repair review tags and fingerprints.

```mermaid
flowchart LR
  C["claim host"] -->|"owns"| A["@evidence or @evidenceExclude"]
  A -->|"selects or excludes"| R["reference target"]
  A -->|"review check"| V["review + fingerprint"]
  R -. "target or descendant changes" .-> X["stale review"]
  V -. "becomes" .-> X
```

Each claim population must account for every unit in every configured reference population. Principle checklists are claimed by the Markdown file host; common unit obligations, setting foundations, and cross-layer lineage are claimed by their exact H2, H3, or H4 hosts. A selected host cites only targets it actually uses; omission from another host is not an exclusion. `@evidenceExclude` means that no host in that claim population owes the target, so never cite and exclude the same target within one claim population.

A review verifies an acknowledgement against the current target; its fingerprint becomes stale when the covered target changes.

## Model

- A claim is the population that owes acknowledgement.
- A reference is the population it owes.
- Every claim-reference pair is an independent coverage obligation.
- Lineage references pair every child with one parent and every parent with one child at the same heading level; they allow no exclusion.
- Foundation references allow multiple truthful citations and concrete scope exclusions. An exclusion is population-wide, never per host: a host that simply does not use a target stays silent, and only a target no host in the population owes is excluded — once.
- Checklist references (all principle files) are answered item by item: every file host answers every anchored H2 item with its own citation, a whole-file citation is refused as an aggregate, and one host's answer never discharges another host. Every principle reference refuses exclusions: each item binds wherever its condition applies, the citation asserts that conditional compliance, and a file that cannot honestly assert it is defective rather than excludable.
- `obligations/common.md` is a unit checklist: every settings H2 and every narrative H2, H3, and H4 answers every item directly, and exclusions are refused. Each reason proves the current unit against that item; a stronger sibling never answers for a weak unit.
- Layer obligation files use ordinary coverage: every H2 that materially realizes a distributed role may cite it, so one role may span multiple H2 hosts. The configured reference decides whether exclusion is accepted; even when accepted, it is truthful only if the target admits omission from the complete population. Never cite and exclude the same target within one claim population.

Permissive coverage can compile dishonestly. Do not let one host cite everything, use a blanket exclusion, or rely on a sibling's acknowledgement to hide an omission. A reason such as “this host uses this setting,” “this summary follows the constraint,” or a target-name paraphrase is not evidence: name the host event, decision, limit, or changed state that would become false without the target. For a principle item, name what in this file does what the item requires. If no such operation exists in the host, do not cite it there.

Before a foundation batch, map each reference target to either one concrete host operation or one population-wide concrete exclusion. Do not dump a catalog beneath an H2 merely because its sequence is broadly related. A target used only by a later chapter or scene belongs beneath that H3 or H4, not its H2 summary. Stop and revise the narrative layer when accurate coverage would otherwise require generic reasons.

## Configuration

`config/src` implements the shared claim populations, reference populations, roots, and strictness behind `createNovelConfig`. A package `lint.config.ts` supplies its location and four layer states and may append package- or experiment-specific `claims`. A package may start with `claims: []` and grow its own typed claims only when a real work-specific evidence need appears. Additional claims never replace, copy, filter, or weaken the shared graph. Their caller owns roots, stage switches, review requirements, cardinality, exclusions, and the target documents they reference.

Classify a work rule only after `$novel` [Work-Specific Contract](../novel/work-specific.md) establishes its semantic owner and authority. Evidence config must not recast a direct instruction, move narrative order into settings, turn a one-time role into a checklist, or duplicate a shared item merely to give the rule a package address.

Package Markdown populations use `root: "docs"`; shared principles and obligations use `config/docs` as their root. Classify every package-specific target by evidence behavior:

- Put work-specific checklist conditions that every selected host answers item by item under `docs/principles`. The shared unit-completion checklist already lives at `config/docs/obligations/common.md`.
- Put roles distributed across a configured host population under `docs/obligations`.
- Point an additional cross-layer relationship at the existing authored settings or narrative artifacts when those artifacts already own the target. If an independent target is neither a checklist nor a distributed role, put it under a descriptive third family named with a plural or collective lower-kebab-case noun under `docs/<family>`; do not hide its semantics in a generic directory such as `contracts` or `misc`.

Name a principle file `common.md`, `narratives.md`, or for its selected layer (`settings.md`, `storylines.md`, `scenarios.md`, or `manuscripts.md`). Shared obligations use `common.md` for the unit checklist and the owning layer filename for distributed roles. In a third family, use the owning layer filename when the whole file is layer-scoped; otherwise use a descriptive lower-kebab-case filename. Contract and reference-target filenames take no numeric prefix, and every addressable item is an anchored H2. Keep authored settings and narrative filenames in their existing `001-slug.md` sequence. Create no empty target file or family, and activate every package target only through that package's added claim.

Package-local principle and obligation claims follow the stage and review state of their host layer. A principle uses file hosts and H2 references with `checklist: true` and no exclusion. A distributed role uses the owning layer's H2 hosts, ordinary H2 coverage, and the exclusion rule justified by that target; a required work rule normally permits none. Declare these mechanics in `lint.config.ts` rather than prose, and never leave an active target on a different stage from the hosts that answer it.

Targets are stable logical addresses such as `settings/...`, `principles/...`, and `obligations/...`, independent of filesystem distance. The novel phase documents specify which shared checklists, obligations, setting references, and lineage references attach at each H2/H3/H4 level; their target content stays in its canonical document.

## Tags

Place file-level principle checklist answers in one HTML comment before the document's first H1: every file answers `principles/common.md` and its own layer's principle file, and each narrative file also answers `principles/narratives.md`, one line per anchored H2 item. Directly below every settings H2 and narrative H2/H3/H4, answer every `obligations/common.md` item. Place setting, distributed-role obligation, lineage, and configured package-claim tags under the exact H2, H3, or H4 they justify unless that claim deliberately selects file hosts:

```text
@evidence path/file.md#anchor Why the host uses or realizes the target.
@evidenceExclude path/file.md#anchor Why no host in the complete claim population owes the target.
@evidenceReview path/file.md#anchor #fingerprint What was checked.
@evidenceExcludeReview path/file.md#anchor #fingerprint What was checked.
```

- The acknowledgement explains the relationship; the review records a separate check.
- In `review`, every acknowledgement — including each principle item answer — carries the fingerprint of its own target, so editing one principle item expires only the answers to that item. The literal literary review still rechecks principle application beyond what any fingerprint proves.
- Write review tags only during `review`.
- Resolve targets inside the configured reference root. Use `settings/...`, `storylines/...`, `scenarios/...`, `manuscripts/...`, shared `principles/...` or `obligations/...`, and any package-local root declared by its claim; do not prefix a target with `docs/`.
- Give every cited Markdown heading a stable `{#anchor}`.

## Diagnostics

The compiler reports a symptom, not the required patch. A clean graph never authorizes a false statement or a weaker work. Do not optimize for removal of the diagnostic.

For every diagnostic:

1. stop the current claim batch and any downstream work behind its gate;
2. read the complete diagnostic, host, target with selected descendants, applicable config, and necessary upstream and downstream context;
3. state the intended semantic relationship without relying on the existing tag;
4. enumerate and compare plausible defects in the target, host, hierarchy, evidence statement or placement, claim population or config, and compiler;
5. fix the earliest actual owner and every affected dependant;
6. reread the repaired scopes literally, then write evidence or resume the batch.

Match the repair to the defect. Rewrite missing, false, shallow, or contradictory content. Split, move, rename, merge, or replace a target whose heading, ownership, or semantic scope is wrong. Correct a tag only when the content relationship already holds. Change config or compiler behavior only when its intended population, cardinality, stage, or implementation is itself wrong. If local edits would preserve a defective premise or structure, discard and rebuild the affected H2, file, layer, or evidence document from a correct outline.

Never use a false or exaggerated reason, copied acknowledgement or review, blanket exclusion, unrelated filler, path or heading shuffle, stage reduction, weakened population or cardinality, disabled review, invented fingerprint, package-wrapper monkey patch, or factory exception to silence a diagnostic. If `obligations/common.md#evidence-content-conformance` is false, follow its halt rule before retaining any acknowledgement.

Complete each claim batch before its applicable package gate. [Staging](staging.md) defines transition gates; `AGENTS.md` defines the final repository gates.
