# Changelog

All notable changes to the guidelines will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

- Add a `CONSIDER:` guideline advising that template parameter types should match Azure Pipelines YAML schema types for common task and job options such as `condition`, `timeoutInMinutes`, `dependsOn`, `strategy`, and other pipeline fields. This will keep custom templates consistent with the official pipeline schema and make validation and reuse more reliable.

- Add a `CONSIDER:` guideline for debug-mode execution. Recommend that tasks or jobs running in debug mode emit extra diagnostic detail, including input values, state before a change, expected state, and actual state, so troubleshooting information is sufficient for a human or AI agent to identify the likely issue without needing data from other steps or jobs.

- Add an `AVOID:` guideline warning against setting hidden runtime state with `##vso[task.setvariable]` inside reusable templates. Recommend using template parameters for declared inputs and output variables only when a value must be produced at runtime.

- Add a `CONSIDER:` guideline for using output variables for explicit cross-job or cross-stage data flow. Recommend `isOutput=true` and named producing steps so downstream jobs and stages consume computed values through declared dependencies instead of hidden global state.

## [0.3.0] - 2026-06-22

### Added

- Added [CONSIDER: Use native YAML constructs when possible](/guidelines/general/consider-native-yaml-constructs.md)

- Added [CONSIDER: Explicitly declare checkout in jobs](/guidelines/jobs/consider-explicit-checkout.md)

## [0.2.0] - 2026-05-31

### Changed

- Simplified and clarified guideline wording across multiple files to align with updated documentation standards.
- Fix inline JSON-style YAML examples in guidelines

### Added

- Added GitHub Copilot instruction files for documentation guidance

## [0.1.0] - 2024-05-15

### Added

- Initial release of the guidelines.
