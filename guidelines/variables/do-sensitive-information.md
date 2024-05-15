# ✅ DO: Store Sensitive Information in Variable Groups

Store sensitive information like passwords, tokens, and keys in
[variable groups](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=yaml).

Markdown to this guideline:

```markdown
[DO: Store Sensitive Information in Variable Groups](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/variables/do-sensitive-information.md&version=GBmaster)
```

## Reason

Sensitive information should not be stored into the source code repository. By
storing sensitive information in variable groups, you can store your secrets
secure and separate from your code.

Also, secret variables in variable groups are
[protected resources](https://learn.microsoft.com/en-us/azure/devops/pipelines/security/resources?view=azure-devops#protected-resources)
. You can add combinations of approvals, checks, and pipeline permissions to
limit access to secret variables in a variable group.

### Note for Azure users

If your Azure DevOps organization is linked to an Azure subscription, store your
secrets in an Azure key vault and
[link it to a variable group](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=yaml#link-secrets-from-an-azure-key-vault),
instead of storing secrets directly in the variable group.

Azure Key Vault provides among other things: auditability;
secret rotation; centralized management; monitoring and alerting (e.g.,
[using Azure Event Grid and Logic Apps to send notifications when secrets are expiring](https://learn.microsoft.com/en-us/azure/key-vault/general/event-grid-logicapps)).

## Example

The variable template below retrieves sensitive information used to authenticate
with a Terraform provider (`azurerm`) and access the Terraform remote state.

```yaml
# /pipelines/variables/terraform/app-gateway/westeurope/prod-variables.yaml

# Terraform stack: application gateway
# Region: westeurope
# Environment: prod

variables:
  # other variables here

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

## Related guidelines

- [DO: Organize Variables by Component and Environment](/guidelines/variables/do-organize-variables.md)
- [DO: Separate Configuration From Logic](/guidelines/variables/do-separate-configuration.md)
- [DO NOT: Use AzureKeyVault Task](/guidelines/steps/donot-use-azurekeyvault-task.md)
- [DO NOT: Mix Variables from Different Environments](/guidelines/variables/donot-mix-environments.md)
- [AVOID: Using variables in steps templates](/guidelines/steps/avoid-variables.md)
