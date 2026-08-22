# Work-Specific Contract

Run this pass before bulk settings authorship and whenever research or later writing reveals a new work rule. It discovers the contract; the adopted rule lives in its semantic owner, not in this skill or a status note.

## Inputs and authority

Collect the user's explicit directives, package seed and assets, existing documents and Git history, subject and genre research, and choices available inside the owner's creative authority. Preserve a direct directive's meaning rather than a shortened paraphrase.

- A user-confirmed rule is binding. Record it as user-confirmed and do not weaken, replace, or remove it without user approval.
- An owner proposal becomes binding only after the owner adopts it within granted authority and records it as a work decision. Never present it as a user decision.
- A fact derived from a source or asset retains that provenance and the settings fact status required by [settings.md](settings.md).

If directives conflict with one another, shared instructions, established canon, or the authorized scope, stop the affected authorship. Identify the conflicting owners and downstream impact, then obtain the decision from the authority that can change them.

## Discovery

Audit the axes relevant to this work:

- delivery form, audience, title or naming, and content boundaries;
- narrative order, entry, ending, chronology, chapter pattern, and other formal devices;
- narrator, focal access, tense, distance, reliability, and information limits;
- diction, syntax, rhythm, punctuation, imagery, dialogue, typography, and embedded text forms;
- subject- or genre-specific authenticity, representation, research, and failure risks;
- recurring motifs, assets, transformations, prohibitions, and deliberate departures from defaults.

Add an axis when the work needs it; create no rule merely to fill the list. Convert labels such as “lyrical,” “cinematic,” or “intense” into observable choices, applicable conditions, intended effects, and representative failures before adopting them.

## Subject-Specific Principle Pass

When the work's subject or genre creates a recurring authenticity, representation, research, or form risk across files, decide whether it needs a package-local principle checklist. Derive candidates from direct user rules, subject research, known genre failures, and concrete defects or near misses observed in the work. An observed error is regression evidence for the package, not permission to hardcode that work into a shared principle.

For each candidate, define one observable condition, its authority, applicability, intended effect, success boundary, representative failure, and supporting sources. Select its file population deliberately:

- a condition shared by settings and all narrative layers belongs in package `docs/principles/common.md`;
- a condition shared only by storylines, scenarios, and manuscripts belongs in package `docs/principles/narratives.md`;
- a condition unique to one authored layer belongs in that layer's package principle file.

Separate factual integrity from narrative realization. For example, a historical work may need settings-inclusive rules for source attribution, corroboration, disputed standing, and bounded precision, while focal access, documentary voice, period dialogue, distributed agency, and the representation of cost belong only to narrative files. Do not force narrative style onto settings or let a narrative principle excuse a false fact.

Compare every candidate literally with the shared principles and common unit obligations. If a shared item already asks the complete question, do not duplicate it; record the work's answer in its authored owner. Otherwise create the package target and activate its exact file population through additive, stage-aligned checklist claims by following `$evidence-graph` [Configuration](../evidence-graph/SKILL.md#configuration). A prose guideline without its claim is not an enforced principle.

## Canonical owner

Give every adopted rule one owner:

| Meaning | Owner |
| --- | --- |
| World fact, agent, relationship, capability, constraint, or work-wide canon | An independent `docs/settings` H2 |
| Condition each selected file must satisfy | `docs/principles/common.md`, `narratives.md`, or the owning layer file |
| Role that one or more units in a complete layer population must realize | `docs/obligations/<owning-layer>.md` |
| Relationship already owned by settings or an authored narrative unit | That existing target, selected by an added claim only when the shared graph does not already express it |
| Independent target with different evidence behavior | A descriptive plural or collective `docs/<family>` |
| Candidate that may be universal but is not yet proven | `.wiki` research until it passes the shared admission test |

Narrative order, reveal placement, and chapter instructions are not settings facts. A recurring style rule is not a distributed role, and a role required once is not a file checklist. Do not copy one rule across settings, principles, and obligations. When an existing shared item already asks the complete question, record only this work's concrete answer in the appropriate authored owner.

Do not create a catch-all work-specific contract file. Split its rules among the semantic owners above.

In a settings H2, qualify a user directive as `**Status:** Work decision — user-confirmed.` In a package-local target, state whether its authority is user confirmation or an owner decision, its exact applicability, intended effect, success boundary, and representative failure. Cite research that supports the choice without disguising the research as the authority that chose it.

## Activation and revision

Create each package-local target and its additive `lint.config.ts` claim in the same coherent change. Follow `$evidence-graph` for family naming, populations, checklist or ordinary coverage, exclusions, cardinality, owning stage, and review. A target that is not selected by a claim is not enforced.

Before leaving settings `disabled`, account for every explicit directive and every adopted rule in its canonical owner. At that gate, `claims: []` is valid only when a literal audit finds no independent package target; it is not evidence that the audit occurred.

Later discoveries revise the earliest true owner. Preserve user authority, assess every affected host and descendant, propagate the change, and renew stale reviews before resuming the blocked work.
