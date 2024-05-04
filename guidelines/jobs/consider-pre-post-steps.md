# ✅ CONSIDER: Adding pre- and post-steps to your template

Adding pre- and post-steps to your template allow users to execute
additional steps before and after the main steps of the template if required,
such as setting up environment variables, or cleaning up resources.

Markdown to reference this guideline:

```plaintext
[CONSIDER: adding pre- and post-steps to your template](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/jobs/consider-pre-and-post-steps.md)
```

## Example

```yaml
# Hello world job, with optional pre- and post-steps

parameters:
  - name: agentPool
    type: string
    displayName: 'Agent pool'

  - name: personName
    displayName: 'Person name'
    type: string

  - name: preSteps
    type: stepList
    displayName: 'Pre-steps'
    default: []

  - name: postSteps
    type: stepList
    displayName: 'Post-steps'
    default: []

jobs:
  - job: hello_world
    displayName: 'Hello world job'
    pool: ${{ parameters.agentPool }}
    steps:
      - ${{ parameters.preSteps }}
      - script: echo "Hello, ${{ parameters.personName }}"
        displayName: 'Greet person'
      - ${{ parameters.postSteps }}
```

Using the template:

```yaml
jobs:
  - template: hello-world.yml
    parameters:
      agentPool: 'MyAgentPool'
      personName: 'Alice'
      preSteps:
        - script: echo 'Setting up environment'
          displayName: 'Setup'
      postSteps:
        - script: echo 'Cleaning up resources'
          displayName: 'Cleanup'
```
