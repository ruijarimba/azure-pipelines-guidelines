# ✅ DO: Organize Variables by Component and Environment

Create a folder structure to organize your variables by functionality,
environment or any other logical grouping that makes sense for your pipelines.

## Markdown to reference this guideline

```plaintext
[DO: Organize Variables by Component and Environment](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/variables/do-organize-variables.md)
```

## Reason

Using a folder strucure with a good naming convention will help you to keep your
variables organized, easy to manage and reuse.

## Example

The following example shows a directory structure for organizing
Terraform-related variables by provider, resource, region and environment:

```plaintext
/pipelines/variables
  /terraform
    /azure
      /app-service
        /norteurope
          dev-variables.yml
          qa-variables.yml
          prod-variables.yml
        /westeurope
          dev-variables.yml
          qa-variables.yml
          prod-variables.yml
      /virtual-network
        /norteurope
          dev-variables.yml
          qa-variables.yml
          prod-variables.yml
        /westeurope
          dev-variables.yml
          qa-variables.yml
          prod-variables.yml
      provider-variables.yml
    remote-state-variables.yml
```

Other templates are used to group common variables that are used across multiple
components, such as `provider-variables.yml` and `remote-state-variables.yml`.

## Related guidelines

- [DO: Use Templates Everywhere](/guidelines/general/do-templates-everywhere.md)
- [DO: Use a Consistent Folder Structure](/guidelines/general/do-folder-structure.md)
- [DO: Separate Configuration From Logic](/guidelines/variables/do-separate-configuration.md)
- [DO NOT: Mix Variables from Different Environments](/guidelines/variables/donot-mix-environments.md)
