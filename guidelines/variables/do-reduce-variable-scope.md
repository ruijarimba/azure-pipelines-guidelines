# ✅ DO: Reduce variable scope

Reduce the scope of your variables as much as possible.

## Reason

In a pipeline, you can set a variable at various scopes:

- At the root level, to make it available to all jobs in the pipeline.
- At the stage level, to make it available only to a specific stage.
- At the job level, to make it available only to a specific job


Variables set at the root or stage level are accessible from multiple jobs,
which can make code harder to maintain and lead to unintended side effects, such
as variable conflicts.

To prevent such issues, reduce the scope of your variables as much as possible -
ideally at the job level. This has the aditional benefit of being able to run
the same job in parallel with different configurations.

It is acceptable to set pipeline-related variables (`agentPool`,
`azureDevOpsEnvironment`, etc) at the root or stage
level. But try to keep them to a minimum.
