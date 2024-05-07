# ❌ DO NOT: use AzureKeyVault task

Markdown to this guideline:

```plaintext
[DO NOT: Use AzureKeyVault task](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/steps/dont-use-azurekeyvault-task.md)
```

Do not use the `AzureKeyVault` task in pipelines.

## Reason

The `AzureKeyVault` is used to fetch the values of secrets from the vault and
set them as **pipeline variables** that can be used in subsequent tasks, which
creates a coupling between the steps and the variables.

See [DO: Avoid using variables](../steps/avoid-variables.md).

## Recommended Approach

Use variable groups linked to an Azure Keyvault.

Reference them within
variables templates and pass them as parameters to the steps templates.

## Related guidelines

TODO: Add related guidelines