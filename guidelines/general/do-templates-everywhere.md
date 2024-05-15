# ✅ DO: Use Templates Everywhere

Create and reference templates instead of defining logic or configuration
directly in your pipelines or templates.

## Markdown to reference this guideline

```plaintext
[DO: Use Templates Everywhere](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/general/do-templates-everywhere.md)
```

## Reason

Use templates to to hide complex implementation details and reuse logic and
configuration within or across pipelines.

Logic (aka functionality) templates:

- **Steps**: define a sequence of steps that can be reused across jobs, or
referenced in another steps template.
- **Jobs**: define one or more jobs that can be reused across stages or pipelines.
- **Stages**: define one or more stages that can be reused across pipelines.
- **Base pipelines** (referenced using the `extends` keyword): define a pipeline
template which can be used to create new pipelines with a common structure.

Configuration templates:

- **Variables**: define a set of variables that can be reused across jobs,
stages or pipelines.

Note:

- When reusing templates, be aware of their
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

The above pipeline can be refactored in order to use shared templates as follows:

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
  isReadonly: true

- name: azureDevOpsEnvironment
  value: 'my-environment'
  isReadonly: true
```

```yaml
# /pipelines/variables/docker-variables.yaml

variables:
- name: dockerVersion
  value: '17.09.0-ce'
  isReadonly: true

- name: containerRegistryServiceConnection
  value: 'my-registry-connection'
  isReadonly: true

- name: dockerImageRepository
  value: 'my-repo/my-image'
  isReadonly: true

- name: dockerfilePath
  value: '$(Build.SourcesDirectory)/app/Dockerfile'
  isReadonly: true

- name: dockerTag
  value: '$(Build.BuildId)'
  isReadonly: true
```

```yaml
# /pipelines/jobs/build-push-docker-job.yaml

parameters:
  - name: environment
    type: string
    displayName: Deployment Environment

deployments:
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

- [DO: Document Pipelines and Templates](/guidelines/general/do-documentation.md)
- [DO: Separate Configuration From Logic](/guidelines/variables/do-separate-configuration.md)
- [DO NOT: Hard-code Values in Pipelines and Templates](/guidelines/general/donot-hard-code-values.md)
- [CONSIDER: Using Absolute Paths to Reference Templates](/guidelines/general/consider-absolute-paths.md)
