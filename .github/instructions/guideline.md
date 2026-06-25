---
description: 'Guideline authoring format for /guidelines files'
applyTo: 'guidelines/**/*.md'
---

# Writing guideline files

This instruction file explains how to write and structure guideline files under the `/guidelines` folder.

Follow this guidance when you create or update a guideline file. The [documentation.md](documentation.md) instruction file also applies to guideline files and covers prose style and language. Use both together.

Each guideline file covers one concept. Do not combine unrelated topics in the same file.

Every guideline also has an entry in the machine-readable manifest `data/guidelines.json`. After creating or renaming a guideline file, run `node .github/scripts/build-manifest.mjs sync` and then add the hand-authored enrichment fields. See [manifest.md](manifest.md) and [ai-integration.md](/docs/ai-integration.md).

## File naming

Use kebab-case. Start the filename with the recommendation prefix:

- `do-` for `DO` guidelines
- `donot-` for `DO NOT` guidelines
- `consider-` for `CONSIDER` guidelines
- `avoid-` for `AVOID` guidelines

Examples: `do-job-timeouts.md`, `consider-read-only-variables.md`, `donot-mix-syntax.md`, `avoid-pipeline-variables.md`

## Recommendation prefix and emoji

Start the H1 title with the matching emoji and prefix:

| Prefix | Emoji | When to use |
|---|---|---|
| `DO` | ✅ | Something the reader should almost always do |
| `CONSIDER` | ✅ | Something to follow in most cases, with legitimate exceptions |
| `AVOID` | ❌ | Something generally not a good idea, but breaking the rule sometimes makes sense |
| `DO NOT` | ❌ | Something the reader should almost never do |

## Required sections

Every guideline file must include the following sections in this order:

1. **H1 title** — see above
2. **One-line summary** — a single sentence immediately below the H1 that
   states *what* the reader should do. Keep it short and direct. This tells
   readers the rule; the `## Reason` section tells them *why*. Do not duplicate
   the Reason content here.
3. `## Markdown to reference this guideline` — a fenced `plaintext` code block
   containing the full GitHub URL, for use when citing the guideline in pull
   request comments. Place this immediately after the one-line summary. The
   display text must be the guideline ID, an em dash, then the H1 title without
   the emoji: `<ID> — <PREFIX>: Title`. The ID must match the entry in
   `data/guidelines.json` (run the manifest script to assign it).
   URL format: `https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/{category}/{filename}.md`
4. `## Reason` — explains *why* the guideline matters; keep it to 1–3 short
   paragraphs. Do not repeat the one-line summary.
5. `## Example` — one or more YAML code blocks demonstrating the guideline;
   see the example section rules below
6. `## Related guidelines` — a short list of related guideline links; see the
   link format rules below

## Optional sections

- `## Recommended approach` — place this between `## Reason` and `## Example`;
  use it in all `DO NOT` and `AVOID` guidelines to direct readers toward the
  preferred alternative; optional for `DO` and `CONSIDER` guidelines. Existing
  guidelines may not have this section; add it when creating new `DO NOT` or
  `AVOID` guidelines, or when updating existing ones.
- `## Useful sources` — place this after `## Related guidelines`; use it
  sparingly, only when an external reference (official docs, widely-known
  guides) meaningfully extends the guidance

## Example section rules

Where there is a natural anti-pattern to show, use the "Instead of" / "Use" pair pattern. This is the standard example style across all guidelines:

```
Instead of doing X:

[YAML code block showing the anti-pattern]

Use Y instead:

[YAML code block showing the recommended approach]
```

When there is no natural anti-pattern (for example, a guideline that simply adds a new attribute), show only the recommended YAML block with a brief introductory sentence.

When a guideline covers multiple distinct scenarios, use `###` sub-headings inside the `## Example` section to separate them. Each sub-heading should name the scenario, not repeat the guideline title.

Use fenced `yaml` code blocks for all examples. Add short inline comments to the good example block when they help clarify what the code demonstrates.

## Related guidelines link format

Use relative paths only. Do not use full GitHub URLs in this section.

Format:

```markdown
- [PREFIX: Title of the guideline](/guidelines/folder/file.md)
```

Example:

```markdown
## Related guidelines

- [DO: Use templates everywhere](/guidelines/general/do-templates-everywhere.md)
- [DO NOT: Hard-code values in pipelines and templates](/guidelines/general/donot-hard-code-values.md)
```

Include up to 5 links. Choose guidelines that are directly related to the topic, not just loosely connected ones. In some rare cases, a guideline may have no related guidelines; in that case, omit this section.

## Complete structure example

~~~markdown
# ✅ CONSIDER: Example guideline title

One-line summary sentence here.

## Markdown to reference this guideline

```plaintext
[ADOG-CATEGORY-001 — CONSIDER: Example guideline title](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/category/consider-example.md)
```

## Reason

Explanation of why this guideline matters.

## Recommended approach

(Optional — use for DO NOT and AVOID guidelines only)

What to do instead, explained in 1–3 sentences.

## Example

Instead of doing X:

```yaml
# anti-pattern example
```

Use Y instead:

```yaml
# recommended example with inline comments where helpful
```

## Related guidelines

- [DO: Related guideline one](/guidelines/category/do-related.md)
- [CONSIDER: Related guideline two](/guidelines/category/consider-related.md)

## Useful sources

(Optional — omit unless an external reference adds meaningful value)

- [Reference title](https://example.com)
~~~
