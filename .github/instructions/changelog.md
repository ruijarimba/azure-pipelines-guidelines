---
description: 'Changelog authoring guidance for CHANGELOG.md'
applyTo: 'CHANGELOG.md'
---

# Writing changelog entries

This instruction file explains how to write and structure entries in `CHANGELOG.md`.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

Follow these rules when adding or updating changelog content.

## Release section format

- Always add new or edited files under a release section.
- Use the release headline format: `## [X.Y.Z] - YYYY-MM-DD`.
- New entries in the future should be added to the current version section or a new upcoming version if the release is not yet published.

## Entry format for new guideline files

When adding a new guideline file, use a concise entry that includes only the guideline name and a relative link to the corresponding file.

Example:

- [CONSIDER: Explicitly declare checkout in jobs](/guidelines/jobs/consider-explicit-checkout.md)

## Entry format for updated guideline files

When updating an existing guideline file, include the guideline name, a relative file link, and a very brief, vague description of the change.

Example:

- Updated [CONSIDER: Use native YAML constructs when possible](/guidelines/general/consider-native-yaml-constructs.md) — clarified the reason and examples for cross-platform line handling.

## Link style

- Use relative links only. Do not use full URLs in changelog entries.
- Use markdown link syntax for guideline files.

## Optional sections

- Use `### Added`, `### Changed`, `### Deprecated`, `### Removed`, `### Fixed`, `### Security`, and other standard Keep a Changelog headings as needed.
- Do not use custom section names such as `### Planned`.
- Do not add release notes outside a release section.

## Grouping guideline entries by category

- When a release includes guideline additions, group them by category under `### Added` using subheadings such as `#### General guidelines`, `#### Jobs guidelines`, `#### Steps guidelines`, and so on.
