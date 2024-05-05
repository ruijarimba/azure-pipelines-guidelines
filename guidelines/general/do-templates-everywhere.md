# DO: Use templates everywhere

Markdown for this guideline:

```plaintext
[DO: Use templates everywhere](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/general/do-use-templates-everywhere.md)
```

Create and reference templates instead of defining logic or configuration
directly in your pipelines or templates.

## Reason

Don't repeat yourself - use templates to reuse logic and configuration within or
across pipelines.

Logic (aka functionality) templates:

- **Steps**: define a sequence of steps that can be reused across jobs, or
referenced in another steps template.
- **Jobs**: define a job that can be reused across stages or pipelines.
- **Stages**: define a stage that can be reused across pipelines.
- **Base pipelines** (referenced using the `extends` keyword): define a pipeline
template which can be used to create new pipelines with a common structure.

Configuration templates:

- **Variables**: define a set of variables that can be reused across jobs,
stages or pipelines.

Note:

- When reusing templates, be aware of their
[imposed limits](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/templates?view=azure-devops&pivots=templates-includes#imposed-limits).

## Example

ADD BAD EXAMPLE (pipeline without shared templates)

```yaml
# BAD EXAMPLE: pipeline without shared templates
jobs:
  - job: MyJob
    steps:
      - script: echo "Hello, world!"
```

AND GOOD EXAMPLE (pipeline using shared templates)

```yaml
# GOOD EXAMPLE: pipeline using shared templates
extends:
  template: my-pipeline-template.yml
```
