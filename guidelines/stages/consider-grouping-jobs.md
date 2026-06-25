# ✅ CONSIDER: Grouping related jobs into stages

Organize related jobs into stages to:

- Group them by purpose or function.
- Set dependencies between groups.
- Define approvals for each stage.
- Run a pipeline partially by skipping stages.

## Markdown to reference this guideline

```plaintext
[ADOG-STAGES-001 — CONSIDER: Grouping related jobs into stages](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/stages/consider-grouping-jobs.md)
```

## Reason

A stage provides a logical boundary in the pipeline. Use it to separate concerns or environments (e.g., Build, QA, and Production), or pause the pipeline for checks or approvals.

Stages allow you to rerun a section (successful or not) without rerunning the entire pipeline. You can also run pipelines partially, such as executing only the build stage for a pull request validation.

## Example

This pipeline builds and deploys an App Service to several environments:

```yaml
stages:
  - stage: Build
    jobs:
      - job: BuildAndPublishDeploymentPackage

  - stage: Dev
    dependsOn: Build
    jobs:
      - job: DeployToDevStagingSlot
      - job: RunIntegrationTests
      - job: SwapDevStagingSlotWithProduction
      - job: RunSmokeTests

  - stage: QA
    dependsOn: Dev
    jobs:
      - job: DeployToQaStagingSlot
      - job: RunIntegrationTests
      - job: SwapQaStagingSlotWithProduction
      - job: RunSmokeTests

  - stage: ProdStaging
    dependsOn: QA
    jobs:
      - job: DeployToProdStagingSlot
      - job: RunSmokeTests

  - stage: ProdSwap
    dependsOn: ProdStaging
    jobs:
      - job: SwapProdStagingSlotWithProduction
      - job: RunSmokeTests
```

## Related guidelines

- [DO: Run stages in parallel when possible](/guidelines/stages/do-parallel-stages.md)
- [DO: Ensure jobs have a single responsibility](/guidelines/jobs/do-single-responsibility.md)
