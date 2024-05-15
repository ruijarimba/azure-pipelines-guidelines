# ❌ DO NOT: Use AzureKeyVault Task

Do not use the `AzureKeyVault` task in pipelines to retrieve sensitive
information.

## Markdown to reference this guideline

```plaintext
[DO NOT: Use AzureKeyVault Task](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/steps/donot-use-azurekeyvault-task.md&version=GBfeature/180-initial-guidelines)
```

## Reason

The `AzureKeyVault` is used to fetch the values of secrets from an Azure Key
Vault and set them as **pipeline variables** that can be used in subsequent
tasks. This creates a coupling between the steps and the variables.

See [AVOID: Using variables in steps templates](../steps/avoid-variables.md).

## Recommended Approach

Use variable groups linked to an Azure Keyvault.

Reference them within variables templates and pass them as parameters to the
steps templates.

## Related guidelines

- [DO: Store Sensitive Information in Variable Groups](../variables/do-sensitive-information.md)
- [DO: Organize Variables by Component and Environment](../variables/do-organize-variables.md)
- [AVOID: Using variables in steps templates](./avoid-variables.md)