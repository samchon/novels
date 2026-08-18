---
name: edit-agent-skills
description: Write or revise concise repository skill instructions. Use whenever a SKILL.md or its linked phase documents are created, moved, split, renamed, or edited.
---

# Edit Agent Skills

- Store each domain at `.agents/skills/<name>/SKILL.md`. Match the directory and frontmatter `name`; use lowercase letters, digits, and hyphens.
- Put only `name` and `description` in frontmatter. State both capability and trigger in the description.
- Make `SKILL.md` a concise shared contract and router. Keep substantial phase instructions in directly linked Markdown files beside it.
- Do not create nested directories, `openai.yaml`, UI metadata, scripts, assets, examples, or unreferenced files.
- Keep each rule in one owning file. Link to canonical repository files instead of copying their contents.
- Preserve necessary context, decisions, workflow, and failure guards. Remove repetition, filler, ceremony, and conclusions that add no instruction.
- Use short paragraphs with one job. Prefer direct rules and compact lists over dense prose.
- Inspect the diff. Check frontmatter, names, triggers, links, and directory shape.
- Run the installed skill validator and `git diff --check` before finishing.
