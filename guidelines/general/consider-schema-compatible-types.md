# ✅ CONSIDER: Align template parameters with the YAML schema

When adding parameters that map to Azure Pipelines YAML fields, use the same name, type, and a schema-compatible default value so templates work naturally without requiring every parameter to be explicitly set.

## Markdown to reference this guideline

```plaintext
[ADOG-GENERAL-003 — CONSIDER: Align template parameters with the YAML schema](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/general/consider-schema-compatible-types.md)
```

## Reason

Azure Pipelines job, stage, and step fields such as `pool`, `dependsOn`, `strategy`, `workspace`, and `variables` accept structured objects in the YAML schema. When template parameters use custom names or simpler types — for example, `agentPool` as a `string` instead of `pool` as an `object` — callers lose access to the full range of valid values and tooling cannot correlate the parameter with the underlying schema field.

Using the schema name and type keeps the template interface predictable and makes the mapping between parameters and pipeline fields immediately obvious. It also allows any schema-valid value to be passed without workarounds such as conditional assignments.

Default values should follow the same principle. For optional fields, use the empty schema-compatible value — `[]` for list fields such as `dependsOn` and `variables`, `{}` for object fields such as `strategy` and `workspace`. This ensures that a caller who omits a parameter gets the same natural behavior as if the field were absent from a regular pipeline definition.

Exceptions are valid when you intentionally want to restrict what callers can set — for example, accepting only a pool name string to prevent callers from specifying demands or a VM image. In these cases, the default value should match the restricted type rather than the schema default.

## Example

### Matching schema names and types

Instead of using custom names or basic types for complex pipeline fields:

```yaml
parameters:
  - name: agentPool          # custom name — does not match schema field 'pool'
    type: string             # string cannot carry demands, vmImage, etc.
    default: 'ubuntu-latest'

  - name: dependsOn          # correct name but wrong type
    type: string             # string cannot hold a list of dependencies
    default: ''

  - name: strategy           # correct name but wrong type
    type: string             # string cannot represent a matrix or parallel strategy
    default: ''

  - name: workspaceClean     # custom name — does not match schema field 'workspace'
    type: string             # exposes only one property instead of the full object
    default: 'outputs'

  - name: jobVariables       # custom name — does not match schema field 'variables'
    type: object
    default: {}

jobs:
  - job: myJob
    pool: ${{ parameters.agentPool }}
    ${{ if ne(parameters.dependsOn, '') }}:
      dependsOn: ${{ parameters.dependsOn }}
    ${{ if ne(parameters.strategy, '') }}:
      strategy: ${{ parameters.strategy }}
    workspace:
      clean: ${{ parameters.workspaceClean }}
    variables: ${{ parameters.jobVariables }}
    steps:
      # ...
```

Use the schema name and `object` type for each complex field instead:

```yaml
parameters:
  - name: pool               # matches schema field name
    type: object             # accepts any valid pool configuration
    default:
      name: $(defaultAgentPool)

  - name: dependsOn          # matches schema field name
    type: object             # accepts a list of job names
    default: []              # schema default: no dependencies, job runs immediately

  - name: strategy           # matches schema field name
    type: object             # accepts matrix, parallel, or runOnce strategies
    default: {}              # schema default: no matrix or parallel strategy

  - name: workspace          # matches schema field name
    type: object             # accepts any valid workspace clean option
    default: {}              # schema default: no workspace clean

  - name: variables          # matches schema field name
    type: object             # accepts any list of variable definitions
    default: []              # schema default: no additional variables defined

jobs:
  - job: myJob
    pool: ${{ parameters.pool }}
    dependsOn: ${{ parameters.dependsOn }}
    strategy: ${{ parameters.strategy }}
    workspace: ${{ parameters.workspace }}
    variables: ${{ parameters.variables }}
    steps:
      # ...
```

### Exception: restricting a parameter to a subset

When you intentionally want to restrict callers — for example, to accept only a pool name and disallow setting demands or a VM image — a `string` type and a descriptive name is valid:

```yaml
parameters:
  - name: agentPool          # intentionally a string: callers can only specify a pool name
    type: string
    default: $(defaultAgentPool)

jobs:
  - job: myJob
    pool:
      name: ${{ parameters.agentPool }}  # wrapped in a pool object at assignment
    steps:
      # ...
```

## Related guidelines

- [DO: Create configurable and extensible jobs](/guidelines/jobs/do-extensible-jobs.md)
- [DO: Create configurable and extensible steps](/guidelines/steps/do-extensible-steps.md)
- [CONSIDER: Use native YAML constructs when possible](/guidelines/general/consider-native-yaml-constructs.md)

## Useful sources

- [YAML schema reference for Azure Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/yaml-schema/)
- [jobs.job definition](https://learn.microsoft.com/en-us/azure/devops/pipelines/yaml-schema/jobs-job?view=azure-pipelines)
