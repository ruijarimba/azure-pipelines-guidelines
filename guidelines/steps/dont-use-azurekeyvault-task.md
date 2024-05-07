# ❌ DO NOT: use AzureKeyVault task

Markdown to this guideline:

```plaintext
[DO NOT: Use AzureKeyVault task](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/steps/dont-use-azurekeyvault-task.md)
```

Do not use the `AzureKeyVault` task in pipelines.

## Reason

The `AzureKeyVault` is used to fetch the values of secrets from an Azure Key
Vault and set them as **pipeline variables** that can be used in subsequent
tasks. This creates a coupling between the steps and the variables.

See [AVOID: Using variables in steps templates](../steps/avoid-variables.md).

## Recommended Approach

Use variable groups linked to an Azure Keyvault.

Reference them within
variables templates and pass them as parameters to the steps templates.

## Related guidelines

- [DO: Keep sensitive information in variable groups](../variables/do-sensitive-info-variable-groups.md)
- [DO: organize variables by component and environment](../variables/do-organize-variables.md)
- [AVOID: Using variables in steps templates](./avoid-variables.md)
