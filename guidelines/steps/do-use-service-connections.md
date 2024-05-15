# ✅ DO: Use Service Connections When Possible

Use Service Connections when possible to connect to external services
like Azure, GitHub, Docker, Kubernetes, and many other services.

## Markdown to reference this guideline

```plaintext
[DO: Use Service Connections When Possible](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/steps/do-use-service-connections.md&version=GBmain)
```

## Reason

Service connections provide a secure mechanism to connect to external services
without the need to pass in secret variables to the build directly.

This has the additional benefit of not having to create custom scripts or tasks
to authenticate with the services.

## Example

The following example lists the version of Azure CLI and gets the details of the
subscription, using the service connection provided as a parameter.

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

- [DO: Validate Steps Parameters](/guidelines/steps/do-validate-parameters.md)
- [AVOID: Using Pipeline Variables in Tasks or Steps Templates](/guidelines/steps/avoid-pipeline-variables.md)
