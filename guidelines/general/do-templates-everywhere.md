# ✅ DO: Use templates everywhere

Create and reference templates instead of defining logic or configuration directly in your pipelines or templates.

## Markdown to reference this guideline

```plaintext
[ADOG-GENERAL-006 — DO: Use templates everywhere](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/general/do-templates-everywhere.md)
```

## Reason

Use templates to hide complex implementation details and reuse logic and configuration across pipelines.

Logic templates:

- **Steps**: define steps to reuse across jobs or reference in another steps template.
- **Jobs**: define jobs to reuse across stages or pipelines.
- **Stages**: define stages to reuse across pipelines.
- **Base pipelines** (using the `extends` keyword): define a pipeline template to create new pipelines with a common structure.

Configuration templates:

- **Variables**: define variables to reuse across jobs, stages, or pipelines.

Note:

- When reusing templates, observe their
[imposed limits](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/templates?view=azure-devops&pivots=templates-includes#imposed-limits).

## Example

Consider the following pipeline:

```yaml
# /pipelines/my-azure-pipeline.yml

pool: Default

variables:
  containerRegistryServiceConnection: 'my-registry-connection'
  imageRepository: 'my-repo/my-image'
  dockerfilePath: '$(Build.SourcesDirectory)/app/Dockerfile'
  tag: '$(Build.BuildId)'

stages:
  - stage: Build
    displayName: Build and publish Docker image
    jobs:
      - deployment: Build
        displayName: Build and publish Docker image
        environment: 'my-environment'
        strategy:
          runOnce:
            deploy:
              steps:
                - checkout: self

                - task: DockerInstaller@0
                  inputs:
                    dockerVersion: '17.09.0-ce'

                - task: Docker@2
                  displayName: Build and publish image to Container Registry
                  inputs:
                    command: buildAndPush
                    containerRegistry: $(containerRegistryServiceConnection)
                    repository: $(imageRepository)
                    dockerfile: $(dockerfilePath)
                    tags: |
                      $(Build.BuildId)
```

You can refactor this pipeline to use shared templates:

```yaml
# /pipelines/my-azure-pipeline.yml

variables:
  - template: /pipelines/variables/common-variables.yaml

pool: 
  name: $(agentPool)

stages:
  - stage: Build
    displayName: Build and publish Docker image
    jobs:
      - template: /pipelines/jobs/build-push-docker-job.yaml
        parameters:
          environment: $(azureDevOpsEnvironment)
```

```yaml
# /pipelines/variables/common-variables.yaml

variables:
- name: agentPool
  value: 'Default'
  readonly: true

- name: azureDevOpsEnvironment
  value: 'my-environment'
  readonly: true
```

```yaml
# /pipelines/variables/docker-variables.yaml

variables:
- name: dockerVersion
  value: '17.09.0-ce'
  readonly: true

- name: containerRegistryServiceConnection
  value: 'my-registry-connection'
  readonly: true

- name: dockerImageRepository
  value: 'my-repo/my-image'
  readonly: true

- name: dockerfilePath
  value: '$(Build.SourcesDirectory)/app/Dockerfile'
  readonly: true

- name: dockerTag
  value: '$(Build.BuildId)'
  readonly: true
```

```yaml
# /pipelines/jobs/build-push-docker-job.yaml

parameters:
  - name: environment
    type: string
    displayName: Deployment Environment

jobs:
  - deployment: Build
    displayName: Build and publish Docker image
    environment: ${{ parameters.environment }}
    variables:
      - template: /pipelines/variables/docker-variables.yaml
    strategy:
      runOnce:
        deploy:
          steps:
            - checkout: self
            - template: /pipelines/steps/build-push-docker-steps.yaml
              parameters:
                dockerVersion: $(dockerVersion)
                serviceConnection: $(containerRegistryServiceConnection)
                imageRepository: $(dockerImageRepository)
                dockerfilePath: $(dockerfilePath)
                tag: $(dockerTag)
```

```yaml
# /pipelines/steps/build-push-docker-steps.yaml

parameters:
  - name: dockerVersion
    type: string
    displayName: Docker Version

  - name: serviceConnection
    type: string
    displayName: Container Registry Service Connection

  - name: imageRepository
    type: string
    displayName: Image Repository

  - name: dockerfilePath
    type: string
    displayName: Dockerfile Path

  - name: tag
    type: string
    displayName: Docker Image Tag

steps:
  - task: DockerInstaller@0
    displayName: Install Docker
    inputs:
      dockerVersion: '${{ parameters.dockerVersion }}'

  - task: Docker@2
    displayName: Build and publish image to Container Registry
    inputs:
      command: buildAndPush
      containerRegistry: '${{ parameters.serviceConnection }}'
      repository: '${{ parameters.imageRepository }}'
      dockerfile: '${{ parameters.dockerfilePath }}'
      tags: |
        ${{ parameters.tag }}
```

## Related guidelines

- [DO: Document pipelines and templates](/guidelines/general/do-documentation.md)
- [DO: Separate configuration from logic](/guidelines/variables/do-separate-configuration.md)
- [DO NOT: Hard-code values in pipelines and templates](/guidelines/general/donot-hard-code-values.md)
- [CONSIDER: Use absolute paths to reference templates](/guidelines/general/consider-absolute-paths.md)
