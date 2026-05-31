# ✅ CONSIDER: Setting environment variables at the task level

Set environment variables at the task level.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Setting environment variables at the task level](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/steps/consider-environment-variables.md)
```

## Reason

Task-level environment variables limit variable scope to the specific task.

Many tools like Terraform, Azure CLI, and Azure DevOps CLI integrate directly with environment variables, simplifying script execution:

- Reuse values across multiple commands (e.g., `AZURE_STORAGE_XXXX` for Azure CLI storage management).
- Authenticate seamlessly with services (e.g., `ARM_CLIENT_ID` and `ARM_CLIENT_SECRET` for the Terraform `azurerm` provider).

Values containing special characters such as spaces, quotes, or dollar signs are passed to the script as-is â€” no quoting or escaping needed.

## Example

Instead of inline authentication logic:

```yaml
- script: |
    TOKEN="${{ parameters.azureDevOpsToken }}"
    
    echo "Trying to login to Azure DevOps"
    echo "$TOKEN" | az devops login --organization $ORG

    echo "Showing the list of builds"
    az pipelines build list
  displayName: 'Show build list'
```

Use the environment variable:

```yaml
- script: |
    az pipelines build list
  displayName: 'Show build list'
  env:
    AZURE_DEVOPS_EXT_PAT: ${{ parameters.azureDevOpsToken }}
```

## Related guidelines

- [DO: Validate steps parameters](/guidelines/steps/do-validate-parameters.md)
- [DO NOT: Mix pipelines syntax in script tasks](/guidelines/steps/donot-mix-syntax.md)
- [AVOID: Using pipeline variables in tasks or steps templates](/guidelines/steps/avoid-pipeline-variables.md)
