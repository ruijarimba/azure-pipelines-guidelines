# Changelog

All notable changes to the guidelines will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

- Add an `AVOID:` guideline warning against setting hidden runtime state with `##vso[task.setvariable]` inside reusable templates. Recommend using template parameters for declared inputs and output variables only when a value must be produced at runtime.

- Add a `CONSIDER:` guideline for using output variables for explicit cross-job or cross-stage data flow. Recommend `isOutput=true` and named producing steps so downstream jobs and stages consume computed values through declared dependencies instead of hidden global state.

## [0.3.0] - 2026-06-22

### Added

General guidelines:

- Added [CONSIDER: Use schema-compatible names and types for template parameters](/guidelines/general/consider-schema-compatible-types.md)
- Added [CONSIDER: Use native YAML constructs when possible](/guidelines/general/consider-native-yaml-constructs.md)

Jobs guidelines:

- Added [CONSIDER: Explicitly declare checkout in jobs](/guidelines/jobs/consider-explicit-checkout.md)

Steps guidelines:

- Added [CONSIDER: Logging diagnostic details](/guidelines/steps/consider-logging-diagnostics.md)

## [0.2.0] - 2026-05-31

### Changed

- Simplified and clarified guideline wording across multiple files to align with updated documentation standards.
- Fix inline JSON-style YAML examples in guidelines

### Added

- Added GitHub Copilot instruction files for documentation guidance

## [0.1.0] - 2024-05-15

### Added

- Initial release of the guidelines.
