# ✅ DO: Run stages in parallel when possible

Run independent stages in parallel.

## Markdown to reference this guideline

```plaintext
[ADOG-STAGES-002 — DO: Run stages in parallel when possible](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/stages/do-parallel-stages.md)
```

## Reason

Pipeline stages run sequentially by default. Running independent stages in parallel reduces overall execution time.

## Example

Run stages in parallel configuration:

```yaml
stages:
  - stage: FunctionalTest
    jobs:
      - job:
        ...

  - stage: AcceptanceTest
    dependsOn: [] # removes the implicit dependency on the previous stage, causing this to run in parallel
    jobs:
      - job:
        ...
```

## Related guidelines

- [CONSIDER: Grouping related jobs into stages](/guidelines/stages/consider-grouping-jobs.md)
- [DO: Ensure jobs have a single responsibility](/guidelines/jobs/do-single-responsibility.md)
