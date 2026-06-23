# ✅ DO: Reduce variable scope

Restrict the scope of variables as much as possible.

## Markdown to reference this guideline

```plaintext
[DO: Reduce variable scope](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/variables/do-variable-scope.md)
```

## Reason

Pipelines let you define variable scopes:

- Root level (all jobs).
- Stage level (localized to stage boundaries).
- Job level (localized to single job boundaries).

Variables set globally are visible everywhere and can collide across concurrently running jobs.

Scope variables locally by defining them at the job level. This makes a job's requirements explicit and lets jobs run in parallel with different configurations without conflict.

Use globally accessible variables only for shared, structural settings such as default pools or environment selectors.

## Example

Keep environment-related variables at the job level:

- `$(azureSubscriptionId)`
- `$(kubeconfigPath)`
- `$(terraformWorkingDirectory)`

Other broad, generic variables can be set at the root or stage level:

- `$(defaultAgentPool)`
- `$(azureDevOpsEnvironment)`

## Related guidelines

- [DO: Use templates everywhere](/guidelines/general/do-templates-everywhere.md)
- [DO: Separate configuration from logic](/guidelines/variables/do-separate-configuration.md)
- [CONSIDER: Declaring variables at the job level](/guidelines/jobs/consider-job-variables.md)
