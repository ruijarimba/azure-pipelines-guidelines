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

Link an Azure Key Vault to a pipeline variable group, reference that group from a variables template, and pass only the required secrets as explicit step template parameters.

## Example

Use variable-group linkage and pass only the required secret as an explicit parameter:

```yaml
# /pipelines/variables/app/prod-variables.yml

variables:
  # 'app-secrets-prod' is a variable group linked to an Azure Key Vault
  - group: app-secrets-prod

  - name: apiKey
    value: $(api-key)   # secret sourced from the linked Key Vault
```

```yaml
# /pipelines/jobs/deploy-job.yml

jobs:
  - job: deploy
    variables:
      - template: /pipelines/variables/app/prod-variables.yml
    steps:
      - template: /pipelines/steps/deploy-steps.yml
        parameters:
          apiKey: $(apiKey)   # passed explicitly, not consumed as a global pipeline variable
```

## Related guidelines

- [DO: Store sensitive information in variable groups](/guidelines/variables/do-sensitive-information.md)
- [DO: Organize variables by component and environment](/guidelines/variables/do-organize-variables.md)
- [DO: Separate configuration from logic](/guidelines/variables/do-separate-configuration.md)
- [AVOID: Using pipeline variables in tasks or steps templates](/guidelines/steps/avoid-pipeline-variables.md)
