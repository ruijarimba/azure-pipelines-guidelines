# ✅ CONSIDER: Running Pipelines in Validation Mode

Consider adding a parameter to your pipeline or use conditions to run it in
_validation mode_, i.e. without actually deploying or executing any changes.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Running Pipelines in Validation Mode](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/pipelines/consider-validation.md&version=GBmain)
```

## Reason

Running a pipeline in validation mode allows you to skip stages or jobs that
are not required in some scenarios, such as running it as part of a pull request
validation.

## Example

Using a condition to skip the `Deploy` stage, when running the pipeline as part
of a pull request:

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
    condition: and(succeeded(), eq(variables['Build.Reason'], 'PullRequest'))
    jobs:
      - job: Deploy
        steps:
          - template: /pipelines/steps/deploy.yaml
            parameters:
              # ...
```

Using a parameter and conditional insertion to dynamically generate the
`Deploy` stage:

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

- [CONSIDER: Adding a Validation Flag to Your Job](/guidelines/jobs/consider-validation-flag.md)
