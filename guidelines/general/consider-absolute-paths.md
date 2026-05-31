# ✅ CONSIDER: Use absolute paths to reference templates

Use absolute paths to reference stages, jobs, steps and variables
templates.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Use absolute paths to reference templates](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/general/consider-absolute-paths.md)
```

## Reason

When you use absolute paths, Azure Pipelines resolves template references correctly if you move pipelines or templates to different folders. You do not need to update the paths.

## Example

The following example uses absolute paths to reference templates:

```yaml
parameters:
  - name: environment
    type: string
    displayName: 'Environment'
    default: 'dev'
    values:
      - 'dev'
      - 'staging'
      - 'prod'

variables:
  - template: /pipelines/variables/common-variables.yaml

jobs:
  - job: deployHelmChart
    displayName: 'Deploy Helm chart'
    variables:
      - template: /pipelines/variables/helm/my-chart/${{ parameters.environment }}-variables.yaml
    steps:
      - checkout: self
      - template: /pipelines/steps/helm/deploy-helm-chart.yaml
        parameters:
          # ...
```

## Related guidelines

- [DO: Use a consistent folder structure](/guidelines/general/do-folder-structure.md)
- [DO: Use templates everywhere](/guidelines/general/do-templates-everywhere.md)
