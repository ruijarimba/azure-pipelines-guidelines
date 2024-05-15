# ✅ CONSIDER: Adding a Validation Flag to Your Job

Consider adding a `boolean` parameter to your job to run it in
_validation mode_, i.e. without actually deploying or executing any changes.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Adding a Validation Flag to Your Job](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/releases/0.1.0/guidelines/jobs/consider-validation-flag.md)
```

## Reason

Run a pipeline in validation mode when you want to perform at least a basic
validation of the pipeline, without actually deploying or executing any changes.

Scenarios include (but are not limited to):

- Refactoring pipelines and correspondent templates
- Validating a pipeline in pull requests

## Example

Example - running Terraform plan and applying changes:

- `applyChanges: false` - the pipeline runs the plan but doesn't apply any
changes to the infrastructure.
- `applyChanges: true` - the pipeline runs the plan and applies the changes
to the infrastructure.

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

Template `/pipelines/steps/terraform/plan-apply-steps.yaml` would then use the
`applyChanges` parameter to decide whether to run the `terraform apply` command
or not.

## Related guidelines

- [DO: Create Configurable and Extensible Jobs](/guidelines/jobs/do-extensible-jobs.md)
- [DO: Create Configurable and Extensible Steps](/guidelines/steps/do-extensible-steps.md)
- [CONSIDER: Running Pipelines in Validation Mode](/guidelines/pipelines/consider-validation.md)
