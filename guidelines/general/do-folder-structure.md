# ✅ DO: Use a consistent folder structure

Organize pipelines and templates logically and consistently across different projects and repositories.

## Markdown to reference this guideline

```plaintext
[ADOG-GENERAL-005 — DO: Use a consistent folder structure](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/general/do-folder-structure.md)
```

## Reason

A consistent folder structure organizes pipeline files predictably, such as by template type. This makes it easier to navigate the project, understand the structure at a glance, and ensure consistency across different projects and repositories. Anyone familiar with one project can easily understand and navigate others.

## Example folder structures

```plaintext
/pipelines
  /jobs
    my-job.yml
    another-job.yml
  /stages
    my-stage.yml
    another-stage.yml
  /steps
    my-step.yml
    another-step.yml
  /variables
    common-variables.yml
    dev-variables.yml
    qa-variables.yml
    prod-variables.yml
  my-pipeline.yml
  another-pipeline.yml
  base-pipeline.yml
```

Each folder serves a specific purpose:

- `/pipelines`: Contains the main pipeline files and base pipeline templates,
if any.
  - `/jobs`: Contains jobs templates.
  - `/stages`: Contains stages templates.
  - `/steps`: Contains steps templates.
  - `/variables`: Contains variables templates.

You can optionally add subfolders to the `/jobs`, `/stages`, `/steps`, and `/variables` folders to further organize the templates - for example:

```plaintext
/pipelines
  /jobs
    /helm
      my-api-job.yml
    /terraform
      app-gateway-job.yml
      vnet-job.yml
  /variables
    /helm
      common-variables.yml
      dev-variables.yml
      qa-variables.yml
      prod-variables.yml
    /terraform
      /shared
        remote-state-variables.yml
        authentication-variables.yml
      /stacks
        /app-gateway
          common-variables.yml
          dev-variables.yml
          qa-variables.yml
          prod-variables.yml
        /vnet
          common-variables.yml
          dev-variables.yml
          qa-variables.yml
          prod-variables.yml
```

## Related guidelines

- [DO: Use templates everywhere](/guidelines/general/do-templates-everywhere.md)
- [DO: Separate configuration from logic](/guidelines/variables/do-separate-configuration.md)
- [CONSIDER: Use absolute paths to reference templates](/guidelines/general/consider-absolute-paths.md)
