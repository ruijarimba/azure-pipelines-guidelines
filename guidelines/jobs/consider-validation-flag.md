# ✅ CONSIDER: Adding a validation flag to your job

Add a `boolean` parameter to your job to run it in _validation mode_, without deploying or executing any changes.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Adding a validation flag to your job](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/jobs/consider-validation-flag.md)
```

## Reason

Run a pipeline in validation mode to perform basic validation without deploying or executing changes.

Scenarios include:

- Refactoring pipelines and correspondent templates
- Validating a pipeline in pull requests

## Example

Example - running Terraform plan and applying changes:

- `applyChanges: false` - the pipeline runs the plan but doesn't apply any changes to the infrastructure.
- `applyChanges: true` - the pipeline runs the plan and applies the changes to the infrastructure.

Using a validation parameter (`applyChanges`) in a Terraform job:

```yaml
# Runs Terraform plan and (optionaly) apply changes

parameters:
  # other parameters here

  - name: applyChanges
    type: boolean
    displayName: 'Apply changes? Default is false'
    default: false

jobs:
  - job: terraformPlanApply
    displayName: 'Terraform plan/apply'
    steps:
      - template: /pipelines/steps/terraform/plan-apply-steps.yaml
        parameters:
          # other parameters here
          applyChanges: ${{ parameters.applyChanges }}
```

Template `/pipelines/steps/terraform/plan-apply-steps.yaml` uses the `applyChanges` parameter to decide whether to run the `terraform apply` command.

## Related guidelines

- [DO: Create configurable and extensible jobs](/guidelines/jobs/do-extensible-jobs.md)
- [DO: Create configurable and extensible steps](/guidelines/steps/do-extensible-steps.md)
- [CONSIDER: Running pipelines in validation mode](/guidelines/pipelines/consider-validation.md)
