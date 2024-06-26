# ✅ DO: Run stages in parallel when possible

Run stages that are independent of each other in parallel.

## Markdown to reference this guideline

```plaintext
[DO: Run stages in parallel when possible](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/stages/do-parallel-stages.md)
```

## Reason

When you define multiple stages in a pipeline, by default, they run one after
the other. Running stages in parallel can help to reduce the overall pipeline
execution time.

## Example

Stages running in parallel:

```yaml
stages:
  - stage: FunctionalTest
    jobs:
      - job:
        ...

  - stage: AcceptanceTest
    dependsOn: [] # this removes the implicit dependency on previous stage and causes this to run in parallel
    jobs:
      - job:
        ...
```

## Related guidelines

- [CONSIDER: Grouping related jobs into stages](/guidelines/stages/consider-grouping-jobs.md)
