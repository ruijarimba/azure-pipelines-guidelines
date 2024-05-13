# ✅ CONSIDER: Adding a validation flag to your job

Consider adding a `boolean` parameter to your job to run it in
_validation mode_, i.e. without actually deploying or executing any changes.

Example 1 - building and pushing a Docker image:

- `validationMode: false` - the pipeline builds and pushes the Docker image to
the registry.
- `validationMode: true` - the pipeline builds the Docker image but doesn't push
it to the registry (or, as an alternative, pushes it to the registry using a
_dummy_ tag).

Example 2 - upgrading a Helm chart:

- `validationMode: false` - the pipeline runs `helm upgrade` command to install
or upgrade the Helm chart.
- `validationMode: true` - the pipeline runs `helm upgrade --dry-run` command,
simulating the install or upgrade of the Helm chart

Example 3 - running Terraform plan and applying changes:

- `validationMode: false` - the pipeline runs the plan and applies the changes
to the infrastructure.
- `validationMode: true` - the pipeline runs the plan but doesn't apply any
changes to the infrastructure.

## Reason

Run a pipeline in validation mode when you want to perform at least a basic
validation of the pipeline, without actually deploying or executing any changes.

Scenarios include (but are not limited to):

- Refactoring pipelines and correspondent templates
- Validating the pipeline in pull requests

## Example

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

TODO: Add related guidelines.
