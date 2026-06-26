# ✅ DO: Separate configuration from logic

Avoid hard-coding configuration values inside pipeline, step, job, or stage templates.

Use independent variable templates to store configuration profiles instead.

## Markdown to reference this guideline

```plaintext
[ADOG-VARIABLES-004 — DO: Separate configuration from logic](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/variables/do-separate-configuration.md)
```

## Reason

Isolating configuration variables from core operational logic (steps, scripts, jobs) makes pipelines easier to understand and deploy across numerous varying configurations.

## Example

Allocate an explicit `variables` sub-boundary to group configurations:

```plaintext
/pipelines
  /jobs
    ...
  /stages
    ...
  /steps
    ...
  /variables
    ...
  my-pipeline.yml
```

## Related guidelines

- [DO: Use templates everywhere](/guidelines/general/do-templates-everywhere.md)
- [DO: Use a consistent folder structure](/guidelines/general/do-folder-structure.md)
- [DO: Organize variables by component and environment](/guidelines/variables/do-organize-variables.md)
- [CONSIDER: Declaring variables as read-only](/guidelines/variables/consider-read-only-variables.md)
