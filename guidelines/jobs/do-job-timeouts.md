# ✅ DO: Set Job Timeouts

Set Job Timeouts or add parameters to shared job templates to allow users to
configure them.

Provide reasonable default values, depending on the job's purpose and the
expected or average run time.

## Markdown to reference this guideline

```plaintext
[DO: Set Job Timeouts](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/jobs/do-job-timeouts.md&version=GBfeature/180-initial-guidelines)
```

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

- [DO: Create Configurable and Extensible Jobs](/guidelines/jobs/do-extensible-jobs.md)
- [CONSIDER: Set Task Timeouts](/guidelines/steps/consider-timeouts.md)
