# ✅ DO: set the right variable scope

Use the right scope for your variables in Azure DevOps pipelines.

## Markdown to reference this guideline

```plaintext
[DO: Set the right variable scope](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/variables/do-variable-scope.md&version=GBfeature/180-initial-guidelines)
```

## Reason

In a pipeline, you can set a variable at various scopes:

- At the root level, to make it available to all jobs in the pipeline.
- At the stage level, to make it available only to a specific stage.
- At the job level, to make it available only to a specific job.

Variables set at the root or stage level are accessible from multiple jobs,
but can make code harder to maintain and lead to unintended side effects, e.g.
caused by variable conflicts.

To prevent such issues, reduce the scope of your environment-related variables
as much as possible - ideally at the job level. This has the aditional benefit
of being able to run the same job in parallel with different configurations.

Other generic variables (e.g. pipeline-related variables) can be set at the
root or stage level, if it makes sense.

## Example

Environment-related variables should be defined at the job level - example:

- `$(azureSubscriptionId)`
- `$(kubeconfigPath)`
- `$(terraformWorkingDirectory)`

Some generic variables can be set at the root or stage level - example:

- `$(defaultAgentPool)`
- `$(azureDevOpsEnvironment)`

## Related guidelines

- [DO: Use templates everywhere](../general/do-templates-everywhere.md)
- [CONSIDER: Declaring variables at the job level](../../guidelines/jobs/consider-variables-scope.md)
