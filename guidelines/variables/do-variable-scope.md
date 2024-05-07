# ✅ DO: set the right variable scope

Use the right scope for your variables in Azure DevOps pipelines.

## Reason

In a pipeline, you can set a variable at various scopes:

- At the root level, to make it available to all jobs in the pipeline.
- At the stage level, to make it available only to a specific stage.
- At the job level, to make it available only to a specific job.

Variables set at the root or stage level are accessible from multiple jobs,
but can make code harder to maintain and lead to unintended side effects, such
as variable conflicts.

To prevent such issues, reduce the scope of your variables as much as possible -
ideally at the job level. This has the aditional benefit of being able to run
the same job in parallel with different configurations.

## Example

Environment-specific variables should be defined at the job level - example:

- `$(azureSubscriptionId)`
- `$(kubeconfigPath)`
- `$(terraformWorkingDirectory)`

Other generic variables (e.g. pipeline-related variables) can be set at the
root or stage level - example:

- `$(defaultAgentPool)`
- `$(azureDevOpsEnvironment)`

Please note that the variable names are for illustrative purposes only - these
should be defined in variables templates instead.

## Related guidelines

- [DO: Use templates everywhere](../general/do-templates-everywhere.md)
- [CONSIDER: Declaring variables at the job level](../../guidelines/jobs/consider-variables-scope.md)