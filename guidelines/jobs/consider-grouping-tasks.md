# ✅ CONSIDER: Grouping Job Tasks Into a Single Template

Consider grouping job tasks into a single steps template, as opposed to using
multiple steps templates in a job.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Grouping Job Tasks Into a Single Template](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/releases/0.1.0/guidelines/jobs/consider-grouping-tasks.md)
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

- [DO: Use Templates Everywhere](/guidelines/general/do-templates-everywhere.md)
- [DO: Ensure jobs have a single responsibility](/guidelines/jobs/do-single-responsibility.md)
