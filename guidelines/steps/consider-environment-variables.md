# ✅ CONSIDER: Setting Environment Variables at the Task Level

Consider setting environment variables at the task level.

## Reason

Setting environment variables at the task level restricts the scope of these
variables, ensuring they are only accessible within the task.

Additionally, several tools like Terraform, Azure CLI, Azure DevOps CLI, and
others support the use of environment variables that simplify the execution of
the corresponding tasks/scripts.

For example:

- You can set one or more variables to avoid redundant value-setting across
multiple commands.

  Example: `AZURE_STORAGE_XXXX` variables can be set when using
Azure CLI to manage storage accounts

- Similarly, you can set one or more variables for authentication purposes with
a tool or service.

  Example: `ARM_CLIENT_ID` and `ARM_CLIENT_SECRET` variables can be set to
  authenticate with the `azurerm` provider, when using Terraform CLI.

## Example

Creating a task that lists Azure DevOps builds, using the Azure DevOps CLI:

```yaml
- script: |
    TOKEN="${{ parameters.azureDevOpsToken }}"
    
    echo "Trying to login to Azure DevOps"
    echo "$AZURE_DEVOPS_TOKEN" | az devops login --organization $ORG

    echo "Showing the list of builds"
    az pipelines build list
  displayName: 'Show build list'
```

Using the `AZURE_DEVOPS_EXT_PAT` environment variable to authenticate with Azure
DevOps CLI:

```yaml
- script: |
    az pipelines build list
  displayName: 'Show build list'
  env:
    AZURE_DEVOPS_EXT_PAT: ${{ parameters.azureDevOpsToken }}
```
