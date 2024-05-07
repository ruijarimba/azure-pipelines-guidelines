# ✅ DO: Create configurable and extensible steps

Markdown to this guideline:

```plaintext
[DO: Create configurable and extensible steps](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/steps/do-create-extensible-steps.md)
```

When creating steps templates to be reused by different people and/or across
several jobs, consider adding some or all of the following parameters:

- `condition`: condition expression to determine whether to run the steps
- `continueOnError`: Continue running even on failure?
- `enabled`: Run this task when the job runs?
- `timeoutInMinutes`: Time to wait for this task to complete before the server
kills it
- `retryCountOnTaskFailure`: Number of retries if the task fails

## Reason

It's difficult to predict and understand all the scenarios in which a template will
be used:

- Should the steps run only under certain conditions?
- Should the steps continue running if one of the tasks fails?
- Should the steps be enabled or disabled?
- How long should the steps run before they're automatically cancelled?

By configuring some or all of the above parameters, you can make
your steps templates more flexible and easier to reuse.

## Example

TODO: Add example

## Related guidelines

TODO: Add related guidelines

- guidelines\jobs\do-create-extensible-jobs.md

