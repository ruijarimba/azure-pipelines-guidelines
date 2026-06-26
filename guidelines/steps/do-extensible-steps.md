# ✅ DO: Create configurable and extensible steps

When building reusable templates, add these control parameters:

- `condition`: Expression determining if steps should run.
- `continueOnError`: Continue if failure occurs.
- `enabled`: Run this task when the job runs.
- `retryCountOnTaskFailure`: Number of times to retry on failure.
- `timeoutInMinutes`: Maximum runtime before killing the task.

## Markdown to reference this guideline

```plaintext
[ADOG-STEPS-007 — DO: Create configurable and extensible steps](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/steps/do-extensible-steps.md)
```

## Reason

You cannot predict all usages for a shared template:

- Do steps apply only under certain conditions?
- Should the pipeline continue if the task fails?
- Do you need to easily disable a step?
- How long should the task wait before cancellation?

Exposing these controls improves template flexibility.

## Example

Provide default configuration parameters in steps templates:

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

- [DO: Create configurable and extensible jobs](/guidelines/jobs/do-extensible-jobs.md)
- [DO: Use templates everywhere](/guidelines/general/do-templates-everywhere.md)
- [CONSIDER: Configuring retries in tasks](/guidelines/steps/consider-retries.md)
- [CONSIDER: Set task timeouts](/guidelines/steps/consider-timeouts.md)
