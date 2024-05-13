# ✅ DO: document pipelines and templates

Document pipelines and templates by adding comments to the top of the corresponding
files describing its purpose, usage, and other relevant information.

Consider documenting parameters and even variables as well, if necessary.

## Markdown to reference this guideline

```plaintext
[DO: document pipelines and templates](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/general/do-documentation.md&version=GBfeature/180-initial-guidelines)
```

## Reason

Comments at the top of the file help to understand the purpose of the pipeline or
template and the context in which it is used at a glance, without the need to
read the entire file.

## Documenting pipelines

Pipelines documentation should ideally include:

- A brief description of what the pipeline does
- The name and URL of the published pipeline in Azure DevOps portal (to avoid
having to search for the pipeline in the Azure DevOps portal)
- Context in which the pipeline is used, including but not limited to:
  - Pull request validation
  - Scheduled execution or trigger
- Any other relevant information such as published/consumed artifacts, etc

```yaml
# This pipeline is used to validate the formatting of Terraform source code
#
# Name: terraform-example-validate-formatting
# https://my-organization.visualstudio.com/myproject/_build?definitionId=123456

name: terraform-example-validate-formatting-$(date:yyyyMMdd-HHmmss)

parameters:
  # ...

jobs:
  # ...
```

## Documenting stage and job templates

Stage and job templates should ideally include:

- A brief description of what the stage or job does
- Any information that might be used outside of the context of template, such as
output variables, artifacts, and other

Example:

```yaml
# Runs Terraform plan for the specified stack and environment
#
# Consumers of this job are expected to provide a variables template such as:
# /pipelines/variables/terraform/{stack-name}/{environment}-variables.yaml
#
# Published artifacts:
# - {{ parameters.planFileArtifactName }}: The Terraform plan output file

parameters:
 # ...

jobs:
  - job: terraform_plan
    displayName: 'Terraform plan'
    steps:
    # ...
```

## Documenting step templates

Step templates should ideally include:

- A brief description of what the step does
- Any information that might be used outside of the context of template, such
as output variables, artifacts, and other

Example:
  
```yaml
# Validates and sets the KUBECONFIG variable for the Kubernetes context.
#
# Output variables:
# - KUBECONFIG is set to the path of the kubeconfig file.

parameters:
  # ...

steps:
  # ...
```

## Documenting variables templates

Variables templates should ideally include:

- A brief description of what the variables are used for

Example:

```yaml
# Terraform stack: storage account
# Region: westeurope
# Environment: prod

variables:
  - template: /pipelines/variables/terraform/remote-state-variables.yaml
  - template: /pipelines/variables/terraform/azure/provider-variables.yaml

  - name: tf_WorkingFolder
    value: $(Pipeline.Workspace)/myself/iac/stacks/azure/storage-account/westeurope/prod
```

## Documenting parameters

Pipeline or template parameters should ideally include:

- A brief description of what the parameter is used for, using the `displayName`
property
- List of properties for complex parameters (set with `type = object`)
- Other relevant information such as default values, allowed values, etc

Example:

```yaml
parameters:
  # An object containing the settings for the Helm chart installation or upgrade:
  # - chartPath: Path to the Helm chart
  # - releaseName: Release name
  # - valuesFiles: Path to the values files
  # - parameters: Helm parameters
  # - timeout: Time to wait for any individual Kubernetes operation (like Jobs for hooks) (default 5m0s)
  # - dryRun: Set when you want to simulate a helm upgrade
  #     - client: Client side dry-run
  #     - server: Server side dry-run
  - name: helmChart
    type: object
    displayName: 'Helm chart settings'
    default: {
      chartPath: '',
      releaseName: '',
      timeout: '5m0s',
      valuesFiles: [],
      parameters: [],
      dryRun: ''
    }

  # An object containing the kubernetes context settings:
  # - namespace: Kubernetes namespace
  # - kubeconfig: Path to the kubeconfig file
  - name: kubernetesContext
    type: object
    displayName: 'Kubernetes context settings'
    default: {
      namespace: '',
      kubeconfig: ''
    }
```

## Related guidelines

- [DO: Use templates everywhere](/guidelines/general/do-use-templates.md)
