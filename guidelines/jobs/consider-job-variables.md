# ✅ CONSIDER: Declaring variables at the job level

Declare variables at the job level instead of the stage or root level.

## Markdown to reference this guideline

```plaintext
[ADOG-JOBS-003 — CONSIDER: Declaring variables at the job level](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/jobs/consider-job-variables.md)
```

## Reason

Declaring variables at the job level reduces scope, making variables accessible only within the job. This prevents conflicts with variables declared elsewhere, ensuring your jobs run in isolation. You can run the same job in parallel with different configurations without conflict.

It is easier to understand which variables or templates a specific job requires. You can use the same job template in different stages or pipelines without tracking external variable requirements, as the job declares them internally.

## Example

The below job template references a variables template that contains the configuration required for the job to run.

The variables template is based on the stack, region, and environment, which allows you to run the same job template with different configurations.

```yaml
# Run Terraform plan for the specified stack, region and environment

parameters:
  # other parameters here (agent pool, timeout, etc)

  - name: stackName
    type: string
    displayName: 'Stack name (e.g. application gateway)'

  - name: environment
    type: string
    displayName: 'Environment'

  - name: region
    type: string
    displayName: 'Azure region'

jobs:
  - job: terraform_${{ parameters.environment }}
    displayName: 'Run Terraform plan and apply changes'
    variables:
      # Consumers of this job are expected to provide a variables template 
      # using the following folder structure:
      # /pipelines/variables/terraform/{stackName}/{region}/{environment}-variables.yaml
      - template: /pipelines/variables/terraform/${{ parameters.stackName }}/${{ parameters.region }}/${{ parameters.environment }}-variables.yaml@self
    steps:
      - template: /pipelines/steps/terraform/plan-apply-steps.yaml
        parameters:
          authentication:
            azureClientId: ${{ variables.tf_azureClientId }}
            azureClientSecret: ${{ variables.tf_azureClientSecret }}
            azureSubscriptionId: ${{ variables.tf_azureSubscriptionId }}
            azureTenantId: ${{ variables.tf_azureTenantId }}
          remoteState:
            accessKey: ${{ variables.tf_azureStateAccessKey }}
          workingDirectory: ${{ variables.tf_WorkingFolder }}
```

## Related guidelines

- [DO: Reduce variable scope](/guidelines/variables/do-variable-scope.md)
- [AVOID: Using pipeline variables in tasks or steps templates](/guidelines/steps/avoid-pipeline-variables.md)
