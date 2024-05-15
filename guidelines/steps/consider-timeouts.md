# ✅ CONSIDER: Set Task Timeouts

Consider setting tasks timeouts.

Provide reasonable timeout values, depending on the task's purpose.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Set Task Timeouts](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/steps/consider-timeouts.md&version=GBreleases/0.1.0)
```

## Reason

To avoid taking up resources when your task is unresponsive or waiting too long,
 it's a good idea to set a limit on how long your task is allowed to run.

Note:

- Don't set timeouts too aggressively, as it may lead to premature task cancellations.
- As an alternative, consider configuring the timeout for the job that contains
the task, rather than for the task itself.

## Example

Using the `timeoutInMinutes` for a task that runs integration tests:

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

- [DO: Create Configurable and Extensible Steps](/guidelines/steps/do-extensible-steps.md)
