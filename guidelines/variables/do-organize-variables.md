# ✅ DO: Organize variables by component and environment

Organize your variables into folders by functionality, environment, or any logical partition that fits your project.

## Markdown to reference this guideline

```plaintext
[DO: Organize variables by component and environment](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/variables/do-organize-variables.md)
```

## Reason

A clean and well-named directory structure simplifies variable management, reuse, and discoverability.

## Example

Use nested folders to scope variables. For example, group Terraform variables by provider, resource, region, and environment:

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

Use standalone files like `provider-variables.yml` and `remote-state-variables.yml` to store shared variables in a clear, logical way.

## Related guidelines

- [DO: Use templates everywhere](/guidelines/general/do-templates-everywhere.md)
- [DO: Use a consistent folder structure](/guidelines/general/do-folder-structure.md)
- [DO: Separate configuration from logic](/guidelines/variables/do-separate-configuration.md)
- [DO NOT: Mix variables from different environments](/guidelines/variables/donot-mix-environments.md)
