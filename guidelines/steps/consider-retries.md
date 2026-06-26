# ✅ CONSIDER: Configuring retries in tasks

Configure the number of retries if a task faces transient failures.

## Markdown to reference this guideline

```plaintext
[ADOG-STEPS-005 — CONSIDER: Configuring retries in tasks](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/steps/consider-retries.md)
```

## Reason

Retries help when tasks fail due to transient network issues or timeouts.

Tasks to retry:

- Installer tasks fetching files from the internet.
- Tasks using package managers (e.g., NuGet or npm).

Tasks to NOT retry:

- Build, compilation, or testing tasks.
- Deployment tasks.

## Example

Use `retryCountOnTaskFailure` to specify maximum retries:

```yaml
steps:
  - task: NuGetRestore@1
    inputs:
      solution: ${{ parameters.solution }}
      nugetConfigPath: ${{ parameters.nugetConfigPath }}
    retryCountOnTaskFailure: 3
```

Here, the `NuGetRestore@1` task retries up to 3 times before failing.

## Related guidelines

- [DO: Create configurable and extensible steps](/guidelines/steps/do-extensible-steps.md)
- [CONSIDER: Set task timeouts](/guidelines/steps/consider-timeouts.md)
