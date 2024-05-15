# ✅ CONSIDER: Grouping related jobs into stages

Consider organizing related jobs into stages in order to:

- Group them by their purpose or function
- Set dependencies between them
- Define approvals for each group of jobs (i.e., each stage can have its own approval)
- Run a pipeline partially by skipping one or more stages

## Markdown to reference this guideline

```plaintext
[CONSIDER: Grouping related jobs into stages](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/stages/consider-grouping-jobs.md&version=GBfeature/180-initial-guidelines)
```

## Reason

A stage is a logical boundary in the pipeline. It can be used to mark separation
of concerns or environments (for example, Build, QA, and production) or to pause
the pipeline and perform various checks or approvals before proceeding to the
next stage.

Also, you can rerun a stage (successful or not) without rerunning the entire pipeline.

Finally, it allows us to run a pipeline partially by skipping one or more
stages. For example, you can run only the build stage when validating a pull request.

## Related guidelines

TODO: Add related guidelines.
