# ✅ CONSIDER: configuring retries in tasks

Consider configuring the number of times that the task should be retried, if it
fails.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Configuring retries in tasks](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/steps/consider-retries.md&version=GBfeature/180-initial-guidelines)
```

## Reason

Retries are useful when you have tasks that might fail due to transient issues,
such as network problems or timeouts.

Examples of tasks where you might want to configure retries:

- Installer tasks that download files from the internet
- Tasks that use package managers, such as NuGet or npm

Examples of tasks where you might NOT want to configure retries:

- Tasks that build, compile, or test your code
- Tasks that deploy your code

## Example

Use the task property
[retryCountOnTaskFailure](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/tasks?view=azure-devops&tabs=yaml#number-of-retries-if-task-failed)
to specify the number of retries if a task fails:

```yaml
steps:
  - task: NuGetRestore@1
    inputs:
      solution: ${{ parameters.solution }}
      nugetConfigPath: ${{ parameters.nugetConfigPath }}
    retryCountOnTaskFailure: 3
```

In this example, the `NuGetRestore@1` task will be retried up to 3 times if it fails.

## Related guidelines

- [DO: Create Configurable and Extensible Steps](/guidelines/steps/do-configurable-steps.md)
