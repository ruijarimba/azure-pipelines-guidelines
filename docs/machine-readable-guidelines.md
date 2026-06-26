# Machine-Readable Guidelines

This guide explains how the guidelines in this repository are made machine-readable so that downstream tools (an MCP server, a linter, an automated fixer, or an LLM/RAG pipeline) can consume them. It also documents how to regenerate or extend the structured data, so this work does not need to be redone from scratch.

The Markdown files under `/guidelines` remain the human-readable source of truth for *content*. A generated manifest adds the structured metadata that machines need.

## What was added

| Artifact | Purpose |
| --- | --- |
| `data/guidelines.json` | The manifest: one structured entry per guideline. Primary machine-readable artifact. |
| `data/guidelines.jsonl` | One JSON object per line (manifest entry plus full Markdown body). For RAG and fine-tuning. |
| `data/guideline-manifest.schema.json` | JSON Schema (draft 2020-12) that validates the manifest. |
| `.github/scripts/build-manifest.mjs` | Zero-dependency Node script that generates, validates, and syncs the manifest and index. |
| `.github/instructions/manifest.md` | Authoring rules for the manifest. |

This repository provides structured content for Azure Pipelines guidelines. The development of any tools that use this content is outside the scope of this project.

## Design decisions

These choices were made deliberately. Keep them unless there is a strong reason to change.

- **Central manifest, no per-file frontmatter.** Metadata lives only in `data/guidelines.json`. The guideline Markdown files are not modified. This keeps the human content clean and the machine data in one place.
- **Stable Rule IDs.** Each guideline has a stable ID in a format common to security and linting tools (e.g., Checkov, TFLint), such as `ADOG-<CATEGORY>-<NNN>` (for example `ADOG-STEPS-001`). IDs are stable and never reused after a guideline is renamed or removed. They are the citation key for linters and LLMs.
- **Derived vs. enriched fields.** Some fields are derived from the Markdown automatically (`id`, `category`, `severity`, `title`, `summary`, `path`, `url`, `related`). Others are hand-authored enrichment (`appliesTo`, `tags`, `detection`, `fix`). The sync script preserves enrichment while refreshing derived fields.
- **No CI.** Generation and validation run locally through the documented script. There is no GitHub Actions workflow.

## ID scheme

Format: `ADOG-<CATEGORY>-<NNN>`

- `ADOG` is the fixed product prefix (Azure DevOps Guidelines).
- `<CATEGORY>` is the uppercase category name: `GENERAL`, `JOBS`, `PARAMETERS`, `PIPELINES`, `STAGES`, `STEPS`, `VARIABLES`.
- `<NNN>` is a zero-padded three-digit sequence, assigned per category in alphabetical filename order at first generation.

Rules:

- An ID is permanent. If a guideline file is renamed, keep its existing ID (the sync script preserves IDs by file path; if you rename a file, copy the old ID into the new entry before running sync, or restore it afterwards).
- Never reuse a retired number. If a guideline is removed, leave a gap.
- New guidelines get the next free number in their category.

### Where the ID appears

The ID lives in the manifest and is also surfaced inside each guideline, in the `## Markdown to reference this guideline` citation block: `[<ID> — <title>](<url>)`. This makes the ID easy to cite in pull request comments. The `validate` command checks that the embedded ID matches the manifest, so the two never drift. Guideline filenames keep their human-readable slugs; the ID is not encoded in the path, which keeps existing links stable.

## Manifest fields

Each entry in `data/guidelines.json` has these fields. See `data/guideline-manifest.schema.json` for the authoritative definition.

### Derived fields (do not hand-edit)

| Field | Source in Markdown |
| --- | --- |
| `severity` | Title/filename prefix: `DO` to `do`, `CONSIDER` to `consider`, `AVOID` to `avoid`, `DO NOT` to `do-not`. |
| `title` | The H1 with the emoji removed. |
| `summary` | The one-line sentence directly under the H1. |
| `path` | Repository-root-relative file path. |
| `url` | The canonical GitHub URL from the "Markdown to reference this guideline" block. |
| `related` | Relative links from the "Related guidelines" section. |
| `category` | The parent folder under `/guidelines`. |

### Enriched fields (hand-authored)

| Field | Meaning |
| --- | --- |
| `appliesTo` | YAML elements the guideline governs: `pipeline`, `stage`, `job`, `step`, `task`, `variables`, `parameters`, `template`, `general`. |
| `tags` | Lowercase keywords for grouping and semantic search. |
| `detection` | Heuristics a linter can use to flag a likely violation. Each has a `kind` (`regex`, `yaml-path`, or `heuristic`), an optional `pattern`, an `appliesTo` subset, and a `message`. |
| `fix` | Remediation guidance: `summary`, `autofixable` flag, ordered `steps`, and `exampleRef` (the Markdown section with the canonical good pattern). |

### Severity to lint level

Suggested mapping for a downstream linter:

| Severity | Lint level |
| --- | --- |
| `do` | error |
| `do-not` | error |
| `avoid` | warning |
| `consider` | info |

## Detection hints are heuristics

The `detection` entries describe **what to look for**, not a finished rule engine. This repository does not run linting. A downstream tool decides how to apply each hint:

- `regex` hints match against raw YAML text.
- `yaml-path` hints describe a path or key condition in parsed YAML.
- `heuristic` hints are natural-language rules best evaluated by an LLM or a custom check.

Treat hints as starting points and tune precision in the consuming tool.

## How to regenerate or extend

All commands run from the repository root and require only Node.js (no `npm install`).

```bash
# Validate that the manifest and Markdown are in sync (read-only).
node .github/scripts/build-manifest.mjs validate

# Refresh derived fields, assign IDs to new guidelines, regenerate the
# index table in guidelines/README.md, and rewrite the JSONL export.
node .github/scripts/build-manifest.mjs sync

# Only rebuild data/guidelines.jsonl from the current manifest.
node .github/scripts/build-manifest.mjs jsonl
```

`sync` preserves hand-authored enrichment (`appliesTo`, `tags`, `detection`, `fix`) by matching on file path, and only updates derived fields.

### Adding a new guideline

1. Create the Markdown file under `guidelines/<category>/` following `.github/instructions/guideline.md`.
2. Run `node .github/scripts/build-manifest.mjs sync`. This assigns the next free ID and adds a skeleton entry.
3. Fill in the enrichment fields (`appliesTo`, `tags`, `detection`, `fix`) in `data/guidelines.json`.
4. Run `node .github/scripts/build-manifest.mjs validate` and confirm it passes.

### Editing an existing guideline

1. Edit the Markdown.
2. Run `sync` to refresh derived fields, then `validate`.
3. Update enrichment in the manifest if the change affects scope, detection, or fixes.

## Using the data downstream

### MCP linter and fixer

- Load `data/guidelines.json`.
- Filter by `severity`, `category`, or `appliesTo` to select relevant rules for a given YAML element.
- Apply `detection` hints to flag candidate violations; surface the `message`, the guideline `id`, and `url`.
- For remediation, use `fix.steps` and point users to the guideline's `exampleRef` section for the canonical good pattern.

### LLM and RAG

- `data/guidelines.jsonl` is ready for chunked retrieval: each line is a self-contained record with metadata plus the full Markdown body.
- Each guideline is already a single focused document, which makes per-guideline chunking natural.
- Use the stable `id` as the citation key so model output can reference specific guidelines.

## Regenerating this whole setup

If you need to rebuild this integration from scratch (for example in a fork), the steps are:

1. Add `data/guideline-manifest.schema.json` (the manifest schema).
2. Add `.github/scripts/build-manifest.mjs` (parser, validator, sync, JSONL export).
3. Run `sync` to generate `data/guidelines.json` with derived fields and freshly assigned IDs.
4. Author enrichment (`appliesTo`, `tags`, `detection`, `fix`) for each entry.
5. Add the index markers to `guidelines/README.md` and run `sync` to populate the table.
6. Add `.github/instructions/manifest.md` and update the guideline/prompt instructions so future edits keep the manifest in sync.

This guide plus the schema and script are enough to reproduce the work without re-deriving the format.
