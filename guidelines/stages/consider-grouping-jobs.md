# ✅ CONSIDER: Grouping related jobs into stages

Markdown to reference this guideline:

```plaintext
[CONSIDER: Grouping related jobs into stages](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/stages/consider-grouping-jobs.md)
```

Consider organizing related jobs into stages in order to:

- Group them by their purpose or function.
- Set dependencies between them.
- Define approvals for each group of jobs (i.e., each stage can have its own approval).

## Reason

A stage is a logical boundary in the pipeline. It can be used to mark separation
of concerns (for example, Build, QA, and production) or to pause the pipeline
and perform various checks or approvals before proceeding to the next stage.

Also, you can rerun a stage (successful or not) without rerunning the entire pipeline.

Finally, it allows you to skip the execution of one or more stages, which can be
useful when you want to run only a subset of the pipeline.
