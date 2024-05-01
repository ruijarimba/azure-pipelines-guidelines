# DO: job must do one and only one thing

## Reason

Single responsibility principle is a software design principle that states that
a class should have only one reason to change. This principle can be applied to
jobs in Azure DevOps pipelines as well. A job should have only one reason to
change, which means it should do one and only one thing.

Advantages of following this principle include:

- **Readability**: It's easier to understand what the job does.
- **Maintainability**: It's easier to maintain the job because it's focused on
  doing one thing.
- **Reusability**: The job can be reused in other pipelines without having to
  change it.

