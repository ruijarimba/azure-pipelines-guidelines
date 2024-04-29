# DO: use a consistent folder structure

✔️ **Do** use a consistent folder structure for the pipelines and templates in
different projects and repositories.

Markdown to reference this guideline:

```plaintext
[DO: use a consistent folder structure](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/general/do-use-consistent-folder-structure.md)
```

## Why

Using a consistent folder structureh helps to organize the pipeline files in a
logical way, in this case by template type. This makes it easier to navigate the
project and understand the structure at a glance.

Also, it ensures consistency across different projects and repositories. This
means that anyone familiar with one project can easily understand and navigate
other projects.

## Examples

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

You can optionally add subfolders to the `/jobs`, `/stages`, `/steps`, and
`/variables` folders to further organize the templates - for example:

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
