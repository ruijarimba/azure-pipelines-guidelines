# ✅ DO: Use service connections when possible

Use Service Connections when possible to connect to external services
like Azure, GitHub, Docker, Kubernetes, and many other services.

## Reason

Service connections provide a secure mechanism to connect to external services
without the need to pass in secret variables to the build directly.

This has the additional benefit of not having to create custom scripts or tasks
to authenticate with the services.

## Example

The following example lists the version of Azure CLI and gets the details of the
subscription, using the `dev-subscription` service connection.

```yaml
- task: AzureCLI@2
  displayName: Azure CLI
  inputs:
    azureSubscription: dev-subscription
    scriptType: ps
    scriptLocation: inlineScript
    inlineScript: |
      az --version
      az account show
```

## Related guidelines

TODO: Add related guidelines
