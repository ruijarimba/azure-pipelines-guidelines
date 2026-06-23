# ✅ DO: Create configurable and extensible jobs

When creating job templates for reuse by different teams, stages, or pipelines, add parameters such as:

- Name and display name
- Agent pool
- Timeout and cancel timeout
- Dependencies
- Condition
- Repository to checkout
- pre- and post-steps

## Markdown to reference this guideline

```plaintext
[DO: Create configurable and extensible jobs](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/jobs/do-extensible-jobs.md)
```

## Reason

You cannot predict all scenarios for a job template:

- Does the job need a specific agent pool?
- How long should the job run before it automatically cancels?
- Are there unmet dependencies before the job runs?
- Should the job run only under certain conditions?
- Do additional steps need to run before or after the main steps?

Adding these parameters makes your jobs flexible and easier to reuse.

## Example

```yaml
# Deploy Helm chart job template

parameters:  
  - name: jobName
    type: string
    displayName: 'Job name'
    default: 'deploy_helm_chart'
  
  - name: jobDisplayName
    type: string
    displayName: 'Job display name'
    default: 'Deploy Helm chart'

  # Optional, agent pool can be set at the pipeline level
  # Intentional simplification: keep this as string to restrict callers
  # to a pool name instead of the full schema `pool` object.
  - name: agentPool
    type: string
    displayName: 'Agent pool'
    default: '$(defaultAgentPool)'

  - name: jobTimeoutInMinutes
    type: number
    displayName: 'Job timeout in minutes'
    default: 10

  - name: cancelTimeoutInMinutes
    type: number
    displayName: 'Cancel timeout in minutes'
    default: 1

  - name: dependsOn
    type: object
    displayName: 'Dependencies'
    default: []

  - name: repository
    type: string
    displayName: 'Repository to checkout'
    default: 'self'

  - name: preSteps
    type: stepList
    displayName: 'Pre-steps'
    default: []

  - name: postSteps
    type: stepList
    displayName: 'Post-steps'
    default: []

  - name: condition
    type: string
    displayName: 'Condition'
    default: ''

  # Other job specific parameters such as environment, etc

jobs:
  - job: ${{ parameters.jobName }}
    displayName: ${{ parameters.jobDisplayName }}
    pool: ${{ parameters.agentPool }}
    timeoutInMinutes: ${{ parameters.jobTimeoutInMinutes }}
    cancelTimeoutInMinutes: ${{ parameters.cancelTimeoutInMinutes }}
    dependsOn: ${{ parameters.dependsOn }}
    ${{ if ne(parameters.condition, '') }}:
      condition: ${{ parameters.condition }}
    variables:
      # reference job specific variables here
      # ...
    steps:
      - checkout: ${{ parameters.repository }}
      - ${{ parameters.preSteps }}
      - template: /pipeline/steps/helm/deploy-chart.yml
        parameters:
          # ....
      - ${{ parameters.postSteps }}
```

## Related guidelines

- [DO: Document pipelines and templates](/guidelines/general/do-documentation.md)
- [DO: Create configurable and extensible steps](/guidelines/steps/do-extensible-steps.md)
- [DO: Set job timeouts](/guidelines/jobs/do-job-timeouts.md)
- [DO: Use templates everywhere](/guidelines/general/do-templates-everywhere.md)
- [CONSIDER: Adding a validation flag to your job](/guidelines/jobs/consider-validation-flag.md)
