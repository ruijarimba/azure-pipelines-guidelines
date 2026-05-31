# ❌ DO NOT: Use AzureKeyVault task

Do not run the `AzureKeyVault` task to pull secrets into pipeline variables.

## Markdown to reference this guideline

```plaintext
[DO NOT: Use AzureKeyVault task](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/steps/donot-use-azurekeyvault-task.md)
```

## Reason

The `AzureKeyVault` task converts vault secrets into **pipeline variables**. These global variables deeply couple steps together.

See [AVOID: Using pipeline variables in tasks or steps templates](/guidelines/steps/avoid-pipeline-variables.md).

## Recommended approach

Link an Azure Key Vault to a pipeline variable group. Source secrets from variables templates mapping to those groups, and pass them as step template parameters.

## Related guidelines

- [DO: Store sensitive information in variable groups](/guidelines/variables/do-sensitive-information.md)
- [DO: Organize variables by component and environment](/guidelines/variables/do-organize-variables.md)
- [DO: Separate configuration from logic](/guidelines/variables/do-separate-configuration.md)
- [AVOID: Using pipeline variables in tasks or steps templates](/guidelines/steps/avoid-pipeline-variables.md)
