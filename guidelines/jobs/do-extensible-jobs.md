# ✅ DO: Create Configurable and Extensible Jobs

When creating job templates to be reused by different teams and/or across
several stages or pipelines, consider adding some or all of the following
parameters:

- Name and display name
- Agent pool
- Timeout and cancel timeout
- Dependencies
- Condition
- Repository to checkout
- pre- and post-steps

## Markdown to reference this guideline

```plaintext
[DO: Create Configurable and Extensible Jobs](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/jobs/do-extensible-jobs.md)
```

## Reason

It's difficult to predict and understand all the scenarios in which a job will
be used:

- Does the job need to run on a specific agent pool?
- How long should the job run before it's automatically cancelled?
- Are there any dependencies that need to be met before the job can run?
- Should the job run only under certain conditions?
- Are there any additional steps that need to be run before or after the main steps?

By configuring some or all of the above parameters, you can make
your jobs more flexible and easier to reuse.

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

- [DO: Document Pipelines and Templates](/guidelines/general/do-documentation.md)
- [DO: Create Configurable and Extensible Steps](/guidelines/steps/do-extensible-steps.md)
- [DO: Use Templates Everywhere](/guidelines/general/do-templates-everywhere.md)
