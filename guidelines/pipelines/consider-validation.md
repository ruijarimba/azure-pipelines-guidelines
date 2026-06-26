# ✅ CONSIDER: Running pipelines in validation mode

Add a parameter or condition to run the pipeline in _validation mode_, skipping deployment or changes.

## Markdown to reference this guideline

```plaintext
[ADOG-PIPELINES-001 — CONSIDER: Running pipelines in validation mode](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/pipelines/consider-validation.md)
```

## Reason

Validation mode skips unneeded stages or jobs, such as checking a pull request without deploying.

## Example

Use a condition to skip the `Deploy` stage during a pull request:

```yaml
stages:
  - stage: Build
    jobs:
      - job: Build
        steps:
          - template: /pipelines/steps/build.yaml
            parameters:
              # ...

  - stage: Deploy
    dependsOn: Build
    condition: and(succeeded(), ne(variables['Build.Reason'], 'PullRequest'))
    jobs:
      - job: Deploy
        steps:
          - template: /pipelines/steps/deploy.yaml
            parameters:
              # ...
```

Use a parameter and conditional insertion to dynamically generate the `Deploy` stage:

```yaml
parameters:
  - name: deployChanges
    displayName: 'Deploy changes?'
    type: boolean
    default: false

stages:
  - stage: Build
    jobs:
      - job: Build
        steps:
          - template: /pipelines/steps/build.yaml
            parameters:
              # ...

  # Deploy stage depends on the deployChanges parameter
  - ${{ if parameters.deployChanges }}:
    - stage: Deploy
      dependsOn: Build
      jobs:
        - job: Deploy
          steps:
            - template: /pipelines/steps/deploy.yaml
              parameters:
                # ...
```

## Related guidelines

- [DO: Create configurable and extensible jobs](/guidelines/jobs/do-extensible-jobs.md)
- [CONSIDER: Adding a validation flag to your job](/guidelines/jobs/consider-validation-flag.md)
