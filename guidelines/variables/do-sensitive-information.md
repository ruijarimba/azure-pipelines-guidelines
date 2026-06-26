# ✅ DO: Store sensitive information in variable groups

Store passwords, tokens, and keys inside [variable groups](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=yaml).

## Markdown to reference this guideline

```plaintext
[ADOG-VARIABLES-003 — DO: Store sensitive information in variable groups](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/variables/do-sensitive-information.md)
```

## Reason

Do not commit sensitive facts or tokens into source control. Storing secrets inside variable groups keeps implementations secure and cleanly decoupled.

Variable groups are also [protected resources](https://learn.microsoft.com/en-us/azure/devops/pipelines/security/resources?view=azure-devops#protected-resources). You govern them using approvals, checks, and isolated security pipeline permissions.

### Note for Azure users

If Azure DevOps is linked to an Azure subscription, link external Key Vault secrets into the library variable group instead of embedding them natively: [link it to a variable group](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=yaml#link-secrets-from-an-azure-key-vault).

Azure Key Vault grants:

- Auditability and lifecycle rotation.
- Centralized enterprise control.
- Event Grid integrations and alert logic rules (e.g., [using Azure Event Grid and Logic Apps to send notifications when secrets are expiring](https://learn.microsoft.com/en-us/azure/key-vault/general/event-grid-logicapps)).

## Example

Extract remote state variables using library groups to fulfill Terraform `azurerm` authentication requirements securely:

```yaml
# /pipelines/variables/terraform/app-gateway/westeurope/prod-variables.yaml

# Terraform stack: application gateway
# Region: westeurope
# Environment: prod

variables:
  # other variables here

  ############################ Azure authentication

  - group: tf-azure-authentication-prod

  - name: tf_azureClientId
    value: $(terraform-sp-client-id)
  
  - name: tf_azureClientSecret
    value: $(terraform-sp-client-secret)
  
  - name: tf_azureSubscriptionId
    value: $(terraform-sp-subscription-id)
  
  - name: tf_azureTenantId
    value: $(terraform-sp-tenant-id)

  ############################ Terraform remote state

  - group: tf-azure-remote-state-prod

  - name: tf_azureStateAccessKey
    value: $(terraform-state-storage-access-key-1)
```

## Related guidelines

- [DO: Organize variables by component and environment](/guidelines/variables/do-organize-variables.md)
- [DO: Separate configuration from logic](/guidelines/variables/do-separate-configuration.md)
- [DO NOT: Use AzureKeyVault task](/guidelines/steps/donot-use-azurekeyvault-task.md)
- [DO NOT: Mix variables from different environments](/guidelines/variables/donot-mix-environments.md)
- [AVOID: Using pipeline variables in tasks or steps templates](/guidelines/steps/avoid-pipeline-variables.md)
