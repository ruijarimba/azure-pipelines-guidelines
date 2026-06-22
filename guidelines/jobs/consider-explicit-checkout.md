# ✅ CONSIDER: Explicitly declare checkout in jobs

Explicitly set `checkout` in every job to make source code checkout behavior clear and stable.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Explicitly declare checkout in jobs](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/jobs/consider-explicit-checkout.md)
```

## Reason

Refactoring a job from a `job` to a `deployment` or vice versa can silently change the default checkout behavior, which can break the pipeline in unexpected ways, such as failing to build code due to missing source files.

Declaring `checkout` explicitly keeps the intent clear and ensures stable, predictable behavior.

## Example

Instead of relying on implicit checkout defaults:

```yaml
jobs:
  - job: Build
    steps:
      # job defaults to checking out the repo unless you override it
      # checkout: self

      - script: dotnet build
        displayName: Build

  - deployment: Deploy
    environment: prod
    strategy:
      runOnce:
        deploy:
          steps:
            # deployment jobs default to no checkout unless declared
            # checkout: none

            - script: ./deploy.sh
              displayName: Deploy
```

Use explicit checkout declarations instead:

```yaml
jobs:
  - job: Build
    steps:
      # explicitly checking out the code
      - checkout: self

      - script: dotnet build
        displayName: Build

  - deployment: Deploy
    environment: prod
    strategy:
      runOnce:
        deploy:
          steps:
            # explicitly declaring no checkout for deployment job
            - checkout: none

            - script: ./deploy.sh
              displayName: Deploy
```

## Related guidelines

- [DO: Document pipelines and templates](/guidelines/general/do-documentation.md)
- [DO: Ensure jobs have a single responsibility](/guidelines/jobs/do-single-responsibility.md)
- [CONSIDER: Running pipelines in validation mode](/guidelines/pipelines/consider-validation.md)

## Useful sources

- [Azure Pipelines checkout step definition](https://learn.microsoft.com/en-us/azure/devops/pipelines/yaml-schema/steps-checkout?view=azure-devops)
