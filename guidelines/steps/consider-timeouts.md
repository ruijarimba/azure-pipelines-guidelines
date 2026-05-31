# ✅ CONSIDER: Set task timeouts

Set timeouts for tasks to avoid stalling pipeline runs. Provide reasonable values based on the expected execution time.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Set task timeouts](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/steps/consider-timeouts.md)
```

## Reason

Timeouts release resources when tasks become unresponsive.

Note:

- Avoid overly aggressive timeouts to prevent premature cancellations.
- Alternatively, configure timeouts on the job instead of individual tasks.

## Example

Use `timeoutInMinutes` for integration tests:

```yaml
steps:
  - task: DotNetCoreCLI@2
    displayName: 'Run integration tests'
    timeoutInMinutes: 30 # Time to wait before the task is cancelled
    inputs:
      command: test
      projects: '**/*IntegrationTests/*.csproj'
      arguments: '--configuration ${{ parameters.buildConfiguration }}'
```

## Related guidelines

- [DO: Create configurable and extensible steps](/guidelines/steps/do-extensible-steps.md)
