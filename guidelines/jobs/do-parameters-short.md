# ✅ DO: Minimize the Number of Parameters in Job Templates

When defining job templates in Azure DevOps pipelines, keep the number of
**environment-related** parameters as short as possible.

Environment-related parameters might include, but are not limited to:

- Environment name (e.g., `dev`, `qa`, `prod`)
- Deployment type (e.g., `blue` or `green`)
- Region (e.g., `westeurope`, `northeurope`)

## Markdown to reference this guideline

```plaintext
[DO: Minimize the Number of Parameters in Job Templates](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/jobs/do-parameters-short.md&version=GBfeature/180-initial-guidelines)
```

## Reason

Limiting the number of environment-related parameters makes the jobs
easier to manage and understand. It reduces complexity, as there are fewer
parameters to keep track of and change, in case the job template needs to be refactored.

Also, we can ensure consistency across different jobs by using the same set of
parameters, even if they are used for different purposes and with different
configurations.

```yaml
# Pipeline that uses the same set of parameters across different jobs

parameters:
  # other parameters here (agent pool, job timeout, etc)

  - name: environment
    type: string
    displayName: 'Environment'

  - name: region
    type: string
    displayName: 'Azure region'

jobs:
  - template: /pipelines/jobs/kubernetes/create-cluster-job.yaml
    parameters:
      # other parameters here (agent pool, job timeout, etc)
      environment: ${{ parameters.environment }}
      region: ${{ parameters.region }}

  - template: /pipelines/jobs/kubernetes/configure-cluster-job.yaml
    parameters:
      # other parameters here (agent pool, job timeout, etc)
      environment: ${{ parameters.environment }}
      region: ${{ parameters.region }}

  - template: /pipelines/jobs/kubernetes/deploy-istio-job.yaml
    parameters:
      # other parameters here (agent pool, job timeout, etc)
      environment: ${{ parameters.environment }}
      region: ${{ parameters.region }}

  - template: /pipelines/jobs/kubernetes/deploy-prometheus-job.yaml
    parameters:
      # other parameters here (agent pool, job timeout, etc)
      environment: ${{ parameters.environment }}
      region: ${{ parameters.region }}
  
  # Other jobs that use the same set of parameters
```

## Example

In the following job template, all the configuration required must be passed as
parameters (8 parameters in total):

```yaml
# Run Terraform plan for the specified stack, region and environment

parameters:
  # other parameters here (agent pool, job timeout, etc)

  - name: stackName
    type: string
    displayName: 'Stack name (e.g. application gateway)'

  - name: environment
    type: string
    displayName: 'Environment'

  - name: region
    type: string
    displayName: 'Azure region'
 
  - name: azureClientId
    type: string
    displayName: 'Azure client ID'

  - name: azureClientSecret
    type: string
    displayName: 'Azure client secret'
  
  - name: azureSubscriptionId
    type: string
    displayName: 'Azure subscription ID'
  
  - name: azureTenantId
    type: string
    displayName: 'Azure tenant ID'

  - name: remoteStateAccessKey
    type: string
    displayName: 'Remote state access key'

jobs:
  - job: terraform_${{ parameters.environment }}
    displayName: 'Run Terraform plan and apply changes'
    steps:
      - template: /pipelines/steps/terraform/plan-apply-steps.yaml
        parameters:
          authentication:
            azureClientId: ${{ parameters.azureClientId }}
            azureClientsecret: ${{ parameters.azureClientSecret }}
            azureSubscriptionId: ${{ parameters.azureSubscriptionId }}
            azureTenantId: ${{ parameters.azureTenantId }}
          remoteState:
            accessKey: ${{ parameters.remoteStateAccessKey }}
          workingDirectory: '$(Pipeline.Workspace)/infra/config/${{ parameters.stackName }}/${{ parameters.region }}/${{ parameters.environment }}'

  # Other job specific parameters such as environment, etc
```

The above template can be refactored in order to use just less environment-related
parameters instead - `stackName`, `environment` and `region` are enough to
identify the context in which the job is running.

Based on these parameters we can reference a variables template that contains
the rest of the configuration such as:

```yaml
# /pipelines/variables/terraform/app-gateway/westeurope/prod-variables.yaml

# Terraform stack: application gateway
# Region: westeurope
# Environment: prod

variables:
  - name: tf_WorkingFolder
    value: $(Pipeline.Workspace)/infra/config/app-gateway/westeurope/prod

  ############################ Terraform remote state

  - group: tf-azure-remote-state-prod

  - name: tf_azureStateAccessKey
    value: $(terraform-state-storage-access-key-1)

  ############################ Azure authentication

  - group: tf-azure-authentication-prod

  - name: tf_azureClientId
    value: $(terraform-sp-client-id)
  
  - name: tf_azureClientsecret
    value: $(terraform-sp-client-secret)
  
  - name: tf_azureSubscriptionId
    value: $(terraform-sp-subscription-id)
  
  - name: tf_azureTenantId
    value: $(terraform-sp-tenant-id)
```

Finally, the job template can be refactored as follows:

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

TODO: Add related guidelines.
