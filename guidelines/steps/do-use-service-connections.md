# ✅ DO: Use service connections when possible

Use Service Connections to authenticate with external services (Azure, GitHub, Docker, Kubernetes, etc.).

## Markdown to reference this guideline

```plaintext
[DO: Use service connections when possible](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/steps/do-use-service-connections.md)
```

## Reason

Service connections securely handle credentials without exposing secrets inside the pipeline variables. They also eliminate the need to maintain custom authentication scripts.

## Example

List the Azure CLI version and retrieve subscription details using a service connection parameter:

```yaml
- task: AzureCLI@2
  displayName: Azure CLI
  inputs:
    azureSubscription: ${{ parameters.azureSubscription }}
    scriptType: ps
    scriptLocation: inlineScript
    inlineScript: |
      az --version
      az account show
```

## Related guidelines

- [DO: Validate steps parameters](/guidelines/steps/do-validate-parameters.md)
- [AVOID: Using pipeline variables in tasks or steps templates](/guidelines/steps/avoid-pipeline-variables.md)
