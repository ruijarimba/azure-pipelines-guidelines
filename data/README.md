# data

Machine-readable structured data for downstream AI tooling (MCP servers, linters, fixers, and LLM/RAG pipelines).

| File | Description |
| --- | --- |
| `guidelines.json` | The manifest: one structured entry per guideline with a stable ID, severity, YAML scope, tags, detection hints, and fix guidance. This is the primary artifact consumed by downstream tools. |
| `guidelines.jsonl` | Line-delimited export of the manifest, with the full Markdown body of each guideline included. Intended for RAG retrieval and fine-tuning pipelines. |
| `guideline-manifest.schema.json` | JSON Schema (draft 2020-12) that defines and validates the structure of `guidelines.json`. |

## IDs

Each guideline has a stable ID in the format `ADOG-<CATEGORY>-<NNN>`, for example `ADOG-STEPS-001`. IDs are never reused.

## Maintaining this data

Do not edit `guidelines.json` by hand for derived fields. Use the generator script:

```bash
node .github/scripts/build-manifest.mjs sync      # refresh derived fields and regenerate the index
node .github/scripts/build-manifest.mjs validate  # check manifest and Markdown are in sync
```

For the full design, ID scheme, and regeneration runbook, see [docs/ai-integration.md](/docs/ai-integration.md).
