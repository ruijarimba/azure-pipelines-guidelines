# ✅ DO: Document pipelines and templates

Document pipelines and templates. Add comments to the top of pipeline and template files. Describe the purpose, usage, and other relevant information.

Consider documenting parameters and variables as well, if necessary.

## Markdown to reference this guideline

```plaintext
[DO: Document pipelines and templates](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/general/do-documentation.md)
```

## Reason

File-level comments help readers understand the pipeline or template quickly. They provide context without requiring the reader to read the entire file.

## Document pipelines

Pipeline documentation should include:

- A brief description of what the pipeline does
- The name and URL of the published pipeline in Azure DevOps portal (to avoid
having to search for the pipeline in the Azure DevOps portal)
- Context in which the pipeline is used, including but not limited to:
  - Pull request validation
  - Scheduled execution or trigger
- Other relevant information, such as published or consumed artifacts

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

Stage and job templates should include:

- A brief description of what the stage or job does
- Any information that might be useful outside of the context of the template,
such as output variables or artifacts

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

## Document step templates

Step templates should include:

- A brief description of what the step does
- Any information that might be useful outside of the context of the template, such as output variables or artifacts

Example:
  
```yaml
# Validates and sets the KUBECONFIG variable for the Kubernetes context.
#
# Output variables:
# - $(setContext.KUBECONFIG) is set to the path of the kubeconfig file.

parameters:
  # ...

steps:
  # ...
```

## Document variables templates

Variables templates should include:

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

## Document parameters

Pipeline or template parameters should include:

- A brief description of what the parameter is used for, using the `displayName`
property
- List of properties for complex parameters (set with `type = object`)
- Other relevant information, such as default values or allowed values

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
    default:
      chartPath: ''
      releaseName: ''
      timeout: '5m0s'
      valuesFiles: []
      parameters: []
      dryRun: ''

  # An object containing the kubernetes context settings:
  # - namespace: Kubernetes namespace
  # - kubeconfig: Path to the kubeconfig file
  - name: kubernetesContext
    type: object
    displayName: 'Kubernetes context settings'
    default:
      namespace: ''
      kubeconfig: ''
```

## Related guidelines

- [DO: Use templates everywhere](/guidelines/general/do-templates-everywhere.md)
