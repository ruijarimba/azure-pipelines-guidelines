# Changelog

All notable changes to the guidelines will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

- Add an `AVOID:` guideline warning against setting hidden runtime state with `##vso[task.setvariable]` inside reusable templates. Recommend using template parameters for declared inputs and output variables only when a value must be produced at runtime.

- Add a `CONSIDER:` guideline for using output variables for explicit cross-job or cross-stage data flow. Recommend `isOutput=true` and named producing steps so downstream jobs and stages consume computed values through declared dependencies instead of hidden global state.

## [1.0.0] - 2026-06-26

This release marks the guidelines as **stable**. Each guideline now has a **[permanent ID](docs/machine-readable-guidelines.md#id-scheme)** such as `ADOG-STEPS-005` so it can be easily referenced in reviews, documentation, and automated checks.

The guidelines were originally intended for humans, and they still are. This release adds structured index files and machine‑readable metadata to support future integration with tools such as linters, analyzers, and AI systems (including MCP servers) that can review pipeline code and help identify or correct problems in an automated manner.

### Added

- Each guideline now shows a short, stable rule code in its "Markdown to reference this guideline" section, making it easy to cite the exact rule when reviewing pull requests.
- Added a [structured data file](/data/guidelines.json) that records every guideline with its rule code, severity, scope, and hints for detecting and fixing violations. This is the foundation for tools that can automatically check pipelines against the guidelines. See the [Machine-Readable Guidelines](/docs/machine-readable-guidelines.md) for technical details.

## [0.3.0] - 2026-06-25

### Added

#### General guidelines

- [CONSIDER: Use schema-compatible names and types for template parameters](/guidelines/general/consider-schema-compatible-types.md)
- [CONSIDER: Use native YAML constructs when possible](/guidelines/general/consider-native-yaml-constructs.md)

#### Jobs guidelines

- [CONSIDER: Explicitly declare checkout in jobs](/guidelines/jobs/consider-explicit-checkout.md)

#### Steps guidelines

- [CONSIDER: Logging diagnostic details](/guidelines/steps/consider-logging-diagnostics.md)

## [0.2.0] - 2026-05-31

### Changed

- Simplified and clarified guideline wording across multiple files to align with updated documentation standards.
- Fix inline JSON-style YAML examples in guidelines

### Added

- Added GitHub Copilot instruction files for documentation guidance

## [0.1.0] - 2024-05-15

Initial release of the guidelines.

### Added

#### General guidelines

- [CONSIDER: Use absolute paths to reference templates](/guidelines/general/consider-absolute-paths.md)
- [DO: Document pipelines and templates](/guidelines/general/do-documentation.md)
- [DO: Use a consistent folder structure](/guidelines/general/do-folder-structure.md)
- [DO: Use templates everywhere](/guidelines/general/do-templates-everywhere.md)
- [DO NOT: Hard-code values in pipelines and templates](/guidelines/general/donot-hard-code-values.md)

#### Jobs guidelines

- [CONSIDER: Grouping job tasks into a single template](/guidelines/jobs/consider-grouping-tasks.md)
- [CONSIDER: Declaring variables at the job level](/guidelines/jobs/consider-job-variables.md)
- [CONSIDER: Adding a validation flag to your job](/guidelines/jobs/consider-validation-flag.md)
- [DO: Create configurable and extensible jobs](/guidelines/jobs/do-extensible-jobs.md)
- [DO: Set job timeouts](/guidelines/jobs/do-job-timeouts.md)
- [DO: Minimize the number of parameters in job templates](/guidelines/jobs/do-parameters-short.md)
- [DO: Ensure jobs have a single responsibility](/guidelines/jobs/do-single-responsibility.md)

#### Parameters guidelines

- [CONSIDER: Grouping related parameters](/guidelines/parameters/consider-grouping.md)
- [DO: Restrict parameter values](/guidelines/parameters/do-restrict-values.md)

#### Pipelines guidelines

- [CONSIDER: Running pipelines in validation mode](/guidelines/pipelines/consider-validation.md)

#### Stages guidelines

- [CONSIDER: Grouping related jobs into stages](/guidelines/stages/consider-grouping-jobs.md)
- [DO: Run stages in parallel when possible](/guidelines/stages/do-parallel-stages.md)

#### Steps guidelines

- [AVOID: Using pipeline variables in tasks or steps templates](/guidelines/steps/avoid-pipeline-variables.md)
- [CONSIDER: Setting environment variables at the task level](/guidelines/steps/consider-environment-variables.md)
- [CONSIDER: Logging diagnostic details](/guidelines/steps/consider-logging-diagnostic-details.md)
- [CONSIDER: Configuring retries in tasks](/guidelines/steps/consider-retries.md)
- [CONSIDER: Set task timeouts](/guidelines/steps/consider-timeouts.md)
- [DO: Create configurable and extensible steps](/guidelines/steps/do-extensible-steps.md)
- [DO: Use service connections when possible](/guidelines/steps/do-use-service-connections.md)
- [DO: Validate step parameters](/guidelines/steps/do-validate-parameters.md)
- [DO NOT: Mix pipelines syntax in script tasks](/guidelines/steps/donot-mix-syntax.md)
- [DO NOT: Use AzureKeyVault task](/guidelines/steps/donot-use-azurekeyvault-task.md)

#### Variables guidelines

- [CONSIDER: Declaring variables as read-only](/guidelines/variables/consider-read-only-variables.md)
- [DO: Organize variables by component and environment](/guidelines/variables/do-organize-variables.md)
- [DO: Store sensitive information in variable groups](/guidelines/variables/do-sensitive-information.md)
- [DO: Separate configuration from logic](/guidelines/variables/do-separate-configuration.md)
- [DO: Reduce variable scope](/guidelines/variables/do-variable-scope.md)
- [DO NOT: Mix variables from different environments](/guidelines/variables/donot-mix-environments.md)
