# ✅ CONSIDER: Using Absolute Paths to Reference Templates

Consider using absolute paths to reference stages, jobs, steps and variables
templates.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Using Absolute Paths to Reference Templates](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/general/consider-absolute-paths.md)
```

## Reason

Using absolute paths ensures that the template references are always resolved
correctly when moving pipelines or templates to different folders, without the
need to update the paths.

## Example

Using absolute paths to reference templates:

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

- [DO: Use a Consistent Folder Structure](/guidelines/general/do-folder-structure.md)
- [DO: Use Templates Everywhere](/guidelines/general/do-templates-everywhere.md)
