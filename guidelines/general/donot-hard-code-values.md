# ❌ DO NOT: Hard-code values in pipelines and templates

Do not hard-code values in Azure DevOps pipelines and templates.

## Markdown to reference this guideline

```plaintext
[ADOG-GENERAL-007 — DO NOT: Hard-code values in pipelines and templates](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/general/donot-hard-code-values.md)
```

## Reason

Just like in a regular application, hard-coding values in pipelines and templates causes several issues:

- If you need to change a value, you must change it in multiple places.
- Hard-coded values make the templates less reusable. For example, you might not be able to use the same template across different environments.
- Hard-coded values decrease readability. Readers might not understand what the value represents.

## Recommended approach

Separate logic (steps, jobs, stages) from configuration (environment-specific values) to make your pipelines cleaner and easier to reuse.

Use variables templates to define and group values by environment, region, functionality or any other criteria that makes sense for your scenario and reference them in your pipelines and templates.

## Example

Instead of hard-coding values in your pipelines or templates:

```yaml
# /pipelines/jobs/docker/build-push-image-job.yml

jobs:
  - job: Build
    displayName: Build and publish Docker image
    variables:
      - template: /pipelines/variables/docker-variables.yml
    steps:
      - checkout: self
      - task: DockerInstaller@0
        inputs:
          dockerVersion: '17.09.0-ce'
      # other steps
```

Use variables and/or parameters:

```yaml
# /pipelines/variables/docker-variables.yml

variables:
  dockerVersion: '17.09.0-ce'

  # other variables
```

```yaml
# /pipelines/jobs/docker/build-push-image-job.yml

jobs:
  - job: Build
    displayName: Build and publish Docker image
    variables:
      - template: /pipelines/variables/docker-variables.yml
    steps:
      - checkout: self
      - task: DockerInstaller@0
        inputs:
          dockerVersion: '$(dockerVersion)'
      # other steps
```

## Related guidelines

- [DO: Separate configuration from logic](/guidelines/variables/do-separate-configuration.md)
- [DO: Use templates everywhere](/guidelines/general/do-templates-everywhere.md)
