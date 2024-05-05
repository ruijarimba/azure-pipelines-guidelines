# ✅ CONSIDER: Grouping related parameters

Markdown to reference this guideline:

```plaintext
[CONSIDER: Grouping related parameters](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/parameters/consider-grouping-related-parameters.md)
```

Consider grouping related parameters, such as username and password.

## Reason

Grouping related parameters offers several benefits:

- **Intuitiveness**: Related parameters are often used together, making the
template more intuitive when grouped.
- **Manageability**: It keeps the parameter list shorter and more manageable.
- **Readability**: It improves the readability of templates, especially those
with many parameters.
- **Usability**: It simplifies passing parameters between templates.

However, there are also potential drawbacks:

- **Documentation**: Grouped parameters must be properly documented to clarify
their usage.

## Example

Instead of defining related parameters separately:

```yaml
parameters:
  - name: azureClientId
    type: string
    displayName: 'The client ID of the Service Principal.'
  
  - name: azureClientSecret
    type: string
    displayName: 'The client secret of the Service Principal.'
  
  - name: azureSubscriptionId
    type: string
    displayName: 'The subscription ID that should be used.'
  
  - name: azureTenantId
    type: string
    displayName: 'The tenant ID of the Service Principal.'
  
  # Other parameters here

steps:
  # other steps here

  - script: terraform plan
    displayName: 'Terraform plan'
    env:
      ARM_CLIENT_ID: ${{ parameters.azureClientId }}
      ARM_CLIENT_SECRET: ${{ parameters.azureClientSecret }}
      ARM_SUBSCRIPTION_ID: ${{ parameters.azureSubscriptionId }}
      ARM_TENANT_ID: ${{ parameters.azureTenantId }}
```

Group the related parameters together:

```yaml
parameters:
  # An object containing the authentication details for the Terraform azurerm provider
  #
  # Properties:
  # azureClientId: The client ID of the Service Principal.
  # azureClientSecret: The client secret of the Service Principal.
  # azureSubscriptionId: The subscription ID that should be used.
  # azureTenantId: The tenant ID of the Service Principal.
  - name: azureAuthentication
    type: object
    displayName: 'azurerm provider authentication details'
    default: {
      azureClientId: '',
      azureClientSecret: '',
      azureSubscriptionId: '',
      azureTenantId: ''
    }

  # Other parameters here

steps:
  # other steps here

  - script: terraform plan
    displayName: 'Terraform plan'
    env:
      ARM_CLIENT_ID: ${{ parameters.azureAuthentication.azureClientId }}
      ARM_CLIENT_SECRET: ${{ parameters.azureAuthentication.azureClientSecret }}
      ARM_SUBSCRIPTION_ID: ${{ parameters.azureAuthentication.azureSubscriptionId }}
      ARM_TENANT_ID: ${{ parameters.azureAuthentication.azureTenantId }}
```

## Related

- [DO: document pipelines and templates](/guidelines/general/do-document-pipelines-templates.md)
