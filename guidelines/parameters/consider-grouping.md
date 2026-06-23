# ✅ CONSIDER: Grouping related parameters

Group related parameters, such as username and password.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Grouping related parameters](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/parameters/consider-grouping.md)
```

## Reason

Grouping related parameters offers these benefits:

- **Intuitiveness**: Related parameters often run together, making grouped templates more intuitive.
- **Manageability**: Keep parameter lists shorter and more manageable.
- **Readability**: Improve the readability of templates with many parameters.
- **Usability**: Simplify passing parameters between templates.

Potential drawbacks:

- **Documentation**: Properly document grouped parameters to clarify usage.

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
    default:
      azureClientId: ''
      azureClientSecret: ''
      azureSubscriptionId: ''
      azureTenantId: ''

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

## Related guidelines

- [DO: Document pipelines and templates](/guidelines/general/do-documentation.md)
- [DO: Minimize the number of parameters in job templates](/guidelines/jobs/do-parameters-short.md)
- [CONSIDER: Align template parameters with the YAML schema](/guidelines/general/consider-schema-compatible-types.md)
