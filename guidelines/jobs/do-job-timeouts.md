# ✅ DO: Set job timeouts

Markdown to this guideline:

```plaintext
[DO: Configure job timeouts](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/jobs/do-configure-job-timeouts.md)
```

Set job timeouts or add parameters to shared job templates to allow users to
configure them.

Provide reasonable default values, depending on the job's purpose.

## Reason

To avoid taking up resources when your job is unresponsive or waiting too long,
it's a good idea to set a limit on how long your job is allowed to run. Use the
job timeout settings to specify the limit in minutes for running the job.

Don't set timeouts too aggressively, as it may lead to premature job cancellations.

## Example

Consider a job that runs smoke tests and that usually takes 5 minutes to finish.

A limit of 10 or even 15 minutes is acceptable, as it allows jobs that might
take a bit longer to run without being cancelled but is much shorter than the
default 60 minutes.

```yaml
jobs:
- job:
  displayName: 'Run smoke tests'
  timeoutInMinutes: 15 # how long to run the job before automatically cancelling
  cancelTimeoutInMinutes: 1 # how much time to give 'run always even if cancelled tasks' before stopping them
```

## Related guidelines

- [DO: Create configurable and extensible jobs](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/jobs/do-create-extensible-jobs.md)
- [DO: Create configurable and extensible steps](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/steps/do-create-extensible-steps.md)
