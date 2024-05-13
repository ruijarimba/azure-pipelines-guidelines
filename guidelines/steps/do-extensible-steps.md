# ✅ DO: Create configurable and extensible steps

When creating steps templates to be reused by different people and/or across
several jobs, consider adding some or all of the following parameters:

- `condition`: condition expression to determine whether to run the steps
- `continueOnError`: Continue running even on failure?
- `enabled`: Run this task when the job runs?
- `retryCountOnTaskFailure`: Number of retries if the task fails
- `timeoutInMinutes`: Time to wait for this task to complete before the server
kills it

## Markdown to reference this guideline

```plaintext
[DO: Create configurable and extensible steps](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/steps/do-extensible-steps.md&version=GBfeature/180-initial-guidelines)
```

## Reason

It's difficult to predict and understand all the scenarios in which a template will
be used:

- Should the steps run only under certain conditions?
- Should the steps continue running if one of the tasks fails?
- Should the steps be enabled or disabled?
- How long should the steps run before they're automatically cancelled?

By configuring some or all of the above parameters, you can make
your steps templates more flexible and easier to reuse.

## Example

Example of a steps template with configurable parameters:

```yaml
# /pipelines/steps/build-push-docker-steps.yaml

parameters:
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

  # Task control parameters

  - name: condition
    type: string
    default: 'succeeded()'

  - name: continueOnError
    type: boolean
    default: false

  - name: enabled
    type: boolean
    default: true

  - name: timeoutInMinutes
    type: number
    default: 30

  - name: retryCountOnTaskFailure
    type: number
    default: 2

steps:
  - task: Docker@2
    displayName: Build and publish image to Container Registry
    enabled: ${{ parameters.enabled }}
    condition: ${{ parameters.condition }}
    continueOnError: ${{ parameters.continueOnError }}
    timeoutInMinutes: ${{ parameters.timeoutInMinutes }}
    retryCountOnTaskFailure: ${{ parameters.retryCountOnTaskFailure }}
    inputs:
      command: buildAndPush
      containerRegistry: '${{ parameters.serviceConnection }}'
      repository: '${{ parameters.imageRepository }}'
      dockerfile: '${{ parameters.dockerfilePath }}'
      tags: |
        ${{ parameters.tag }}
```

## Related guidelines

TODO: Add related guidelines

- guidelines\jobs\do-create-extensible-jobs.md
