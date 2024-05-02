# DO: organize variables by component and environment

Create a folder structure to organize your variables by functionality,
environment or any other logical grouping that makes sense for your project.

This will help you to keep your variables organized, easy to manage and reuse.

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
