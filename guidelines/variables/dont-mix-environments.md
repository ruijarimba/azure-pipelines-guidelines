# ❌ DO NOT: Mix Variables from Different Environments

Do not mix variables from different environments in the same template.

## Markdown to reference this guideline

```plaintext
[DO NOT: Mix Variables from Different Environments](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/variables/dont-mix-environments.md&version=GBfeature/180-initial-guidelines)
```

## Reason

Mixing variables from different environments in the same template makes it
harder to isolate and manage specific settings for different environments, which
can lead to confusion and errors and consequently make templates harder to
maintain.

## Recommended Approach

Use separate variables templates for each environment instead.

Having dedicated files for each environment makes it easier to understand and
manage configurations. Developers can quickly identify which settings are
specific to each environment, reducing confusion and making maintenance more
straightforward.

Also, keeping environment-specific settings separate allows for better version
control management. Changes to configurations in one environment won't
inadvertently affect others, leading to cleaner version history and easier
rollback if needed.

## Example

Instead of mixing variables from different environments:

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

Use separate variables templates for each environment:

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
