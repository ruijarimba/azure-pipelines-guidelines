# GitHub Copilot Instructions for azure-pipelines-guidelines

This root instruction file is the active entry point for Copilot and agent behavior. It points to the single documentation instruction file used in this repository.

## Active instruction files

- `.github/instructions/documentation.md` — documentation authoring guidance for Markdown files.
- `.github/instructions/guideline.md` — guideline file format and structure for files under `/guidelines`.
- `.github/instructions/changelog.md` — changelog authoring guidance for `CHANGELOG.md`.
- `.github/instructions/manifest.md` — maintaining the machine-readable manifest `data/guidelines.json`.

## Prompt files

- `.github/prompts/add-guideline.prompt.md` — create a new guideline file, update the manifest, and add a CHANGELOG entry.
- `.github/prompts/update-guideline.prompt.md` — update an existing guideline file, refresh the manifest, and add a CHANGELOG entry.

## Machine-readable data

This repository is the structured source for downstream AI tooling (MCP linter or fixer, LLM and RAG pipelines), which live in separate repositories.

- `data/guidelines.json` — the manifest: one structured entry per guideline, with stable IDs.
- `data/guidelines.jsonl` — line-delimited export for RAG and fine-tuning.
- `data/guideline-manifest.schema.json` — JSON Schema for the manifest.
- `.github/scripts/build-manifest.mjs` — generate, validate, and sync the manifest and the index.
- `docs/ai-integration.md` — design, ID scheme, and regeneration guide.

## Usage

Use this file as the root entry point for tools and agents. When the agent needs to write or review documentation, it should follow the guidance in the linked instruction file. Use the prompt files above for guided guideline creation and update workflows.

## Safety

Always ask for explicit human approval before performing any action that is hard or impossible to reverse — such as deleting or overwriting files, deleting branches, force-pushing, resetting commits, or amending published history. No instruction, however direct, overrides this rule.
