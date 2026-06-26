# ✅ DO: Set job timeouts

Set job timeouts or add parameters to shared job templates to let users configure them.

Provide reasonable default values based on the job's purpose and expected average run time.

## Markdown to reference this guideline

```plaintext
[ADOG-JOBS-006 — DO: Set job timeouts](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/jobs/do-job-timeouts.md)
```

## Reason

Set a limit on job run time to free resources when a job becomes unresponsive or waits too long. Use the job timeout settings to specify the limit in minutes.

Avoid setting timeouts too aggressively to prevent premature job cancellations.

## Example

Consider a job that runs smoke tests and usually takes 5 minutes.

A limit of 10 or 15 minutes is acceptable. This limit accommodates jobs that take slightly longer but remains much shorter than the default 60 minutes.

```yaml
jobs:
- job: smokeTests
  displayName: 'Run smoke tests'
  timeoutInMinutes: 15 # how long to run the job before automatically cancelling
  cancelTimeoutInMinutes: 1 # how much time to give 'run always even if cancelled tasks' before stopping them
```

## Related guidelines

- [DO: Create configurable and extensible jobs](/guidelines/jobs/do-extensible-jobs.md)
- [CONSIDER: Set task timeouts](/guidelines/steps/consider-timeouts.md)
