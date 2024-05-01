# DO: configure job timeouts

The default job timeout in Azure Pipelines is 60 minutes. This means that if a job doesn't complete within 60 minutes, it will be automatically cancelled by Azure Pipelines.

Many jobs can be completed in a much shorter time, so it's a good idea to set a timeout that is appropriate for the job. This will help prevent jobs from running for too long and consuming resources unnecessarily.

When creating jobs in your pipeline, consider adding a timeout to make sure that the job doesn't run indefinitely. This is important because it helps prevent jobs from running for too long and consuming resources unnecessarily.

Properties to set:

- timeoutInMinutes: how long to run the job before automatically cancelling
- cancelTimeoutInMinutes: how much time to give 'run always even if cancelled
tasks' before killing them
