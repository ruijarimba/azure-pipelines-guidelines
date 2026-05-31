# ❌ DO NOT: Mix variables from different environments

Do not weave multi-environmental configurations identically within a single variable template.

## Markdown to reference this guideline

```plaintext
[DO NOT: Mix variables from different environments](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/variables/donot-mix-environments.md)
```

## Reason

Mixing configuration constants inside the same template creates complex conditional maintenance, breeding hidden errors when modifying unrelated states.

## Recommended approach

Use separate variable templates for each environment.

This keeps environment settings clear and prevents one environmentâ€™s variables from affecting another.

## Example

Instead of mixing variables from different environments inline:

```yaml
# /pipelines/variables/terraform/azure/provider-variables.yml
parameters:
  - name: environment
    displayName: Environment
    type: string

variables:
  - ${{ if eq(parameters.environment, 'development') }}:
    - group: tf-azure-authentication-dev

    - name: tf_azureClientId
      value: $(terraform-sp-client-id)
    
    - name: tf_azureClientsecret
      value: $(terraform-sp-client-secret)
    
    - name: tf_azureSubscriptionId
      value: $(terraform-sp-subscription-id)
    
    - name: tf_azureTenantId
      value: $(terraform-sp-tenant-id)

  - ${{ if eq(parameters.environment, 'qa') }}:
    - group: tf-azure-authentication-qa

    - name: tf_azureClientId
      value: $(terraform-sp-client-id)
    
    - name: tf_azureClientsecret
      value: $(terraform-sp-client-secret)
    
    - name: tf_azureSubscriptionId
      value: $(terraform-sp-subscription-id)
    
    - name: tf_azureTenantId
      value: $(terraform-sp-tenant-id)

  - ${{ if eq(parameters.environment, 'production') }}:
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

Extract the templates using explicit configurations:

```yaml
# /pipelines/variables/terraform/azure/provider-variables-development.yml

variables:
  - group: tf-azure-authentication-dev

  - name: tf_azureClientId
    value: $(terraform-sp-client-id)
  
  - name: tf_azureClientsecret
    value: $(terraform-sp-client-secret)
  
  - name: tf_azureSubscriptionId
    value: $(terraform-sp-subscription-id)
  
  - name: tf_azureTenantId
    value: $(terraform-sp-tenant-id)
```

```yaml
# /pipelines/variables/terraform/azure/provider-variables-qa.yml

variables:
  - group: tf-azure-authentication-qa

  - name: tf_azureClientId
    value: $(terraform-sp-client-id)
  
  - name: tf_azureClientsecret
    value: $(terraform-sp-client-secret)
  
  - name: tf_azureSubscriptionId
    value: $(terraform-sp-subscription-id)
  
  - name: tf_azureTenantId
    value: $(terraform-sp-tenant-id)
```

```yaml
# /pipelines/variables/terraform/azure/provider-variables-production.yml

variables:
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

## Related guidelines

- [DO: Organize variables by component and environment](/guidelines/variables/do-organize-variables.md)
- [DO: Use templates everywhere](/guidelines/general/do-templates-everywhere.md)
- [DO: Use a consistent folder structure](/guidelines/general/do-folder-structure.md)
- [DO: Separate configuration from logic](/guidelines/variables/do-separate-configuration.md)
