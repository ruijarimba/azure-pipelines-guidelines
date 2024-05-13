# ✅ CONSIDER: Declare variables at the job level

Consider declaring variables at the job level instead of the stage or root level.

```plaintext
[CONSIDER: Declaring variables at the job level](../../guidelines/jobs/consider-variables-scope.md)
```

## Reason

Declaring variables at the job level reduces the scope of the variables, making
them accessible only within the job. This helps to avoid conflicts with other
variables declared elsewhere, ensuring that your jobs run in isolation.
Additionally, you can run the same job in parallel with different configurations
without affecting each other.

From a maintenance perspective, it's also easier to understand which variables
or templates are required for a specific job. Also, you can use the same job
template in different stages or pipelines without
worrying about which variables or templates need to be referenced, as they are
declared within the job.

## Example

The below job template references a variables template that contains the
configuration required for the job to run.

The variables template is based on the stack, region, and environment, which
allows you to run the same job template with different configurations.

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
            azureClientsecret: ${{ variables.tf_azureClientSecret }}
            azureSubscriptionId: ${{ variables.tf_azureSubscriptionId }}
            azureTenantId: ${{ variables.tf_azureTenantId }}
          remoteState:
            accessKey: ${{ variables.tf_azureStateAccessKey }}
          workingDirectory: ${{ variables.tf_WorkingFolder }}
```

## Related guidelines

- [DO: Reduce variable scope](../../variables/do-reduce-variable-scope.md)
- [DO: Use templates everywhere](../../general/do-templates-everywhere.md)
- [DO: Use a consistent folder structure](../../general/do-folder-structure.md)
- [DO: Separate configuration from logic](../../variables/do-separate-configuration.md)
- [DO: Use variables templates](../../variables/do-use-variables-templates.md)
