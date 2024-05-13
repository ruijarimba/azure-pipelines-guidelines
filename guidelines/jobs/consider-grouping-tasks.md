# ✅ CONSIDER: Grouping job tasks into a single template

Consider grouping job tasks into a single steps template, as opposed to using
multiple steps templates in a job.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Grouping job tasks into a single template](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/jobs/consider-grouping-tasks.md&version=GBfeature/180-initial-guidelines)
```

## Reason

Encapsulating tasks into a single steps template provides a better abstraction
and makes the job easier to read and maintain.

Additionally, this approach facilitates the reuse of the steps template across
multiple jobs if needed.

## Example

Instead of using multiple steps templates in a job:

```yaml
jobs:
  - job: terraform_plan_apply
    variables:
      # reference the required job variables here
    steps:
      - template: /pipelines/steps/terraform/install.yml
        parameters:
          # ...

      - template: /pipelines/steps/terraform/init.yml
        parameters:
          # ...

      - template: /pipelines/steps/terraform/validate.yml
        parameters:
          # ...

      - template: /pipelines/steps/terraform/plan.yml
        parameters:
          # ...

      - template: /pipelines/steps/terraform/apply.yml
        parameters:
          # ...
```

Use a single steps template that encapsulates all the tasks:

```yaml
jobs:
  - job: terraform_plan_apply
    variables:
      # reference the required job variables here
    steps:
      - template: /pipelines/steps/terraform/plan-apply.yml
        parameters:
          # ...
```

Where `/pipelines/steps/terraform/plan-apply.yml` contains the tasks for
installing Terraform, initializing Terraform, performing validation, running the
plan, and applying the changes.

## Related guidelines

- [DO: Use templates everywhere](../general/do-templates-everywhere.md)
- [DO: Use a consistent folder structure](../general/do-folder-structure.md)
- [DO: Ensure jobs have a single responsibility](../jobs/do-single-responsibility.md)
