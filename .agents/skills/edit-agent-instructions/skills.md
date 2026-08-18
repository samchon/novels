# Skills

Store each domain at `.agents/skills/<name>/SKILL.md`. Match the directory and the frontmatter `name`; use lowercase letters, digits, and hyphens.

Put only `name` and `description` in frontmatter. State both the capability and its trigger in the description, so an agent can route without opening the file.

Make `SKILL.md` a concise shared contract and router. Keep substantial phase instructions in directly linked Markdown files beside it; do not create nested directories, `openai.yaml`, or UI metadata.

A phase document owns one stage of one workflow. When a rule applies to every phase, it belongs in the `SKILL.md` contract instead of each phase document.

Renaming a skill changes its `$name` trigger. Update the directory, the frontmatter, and every `$name` reference in the repository in one change.

Check frontmatter, names, triggers, links, and directory shape in the diff.
