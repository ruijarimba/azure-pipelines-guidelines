# ✅ DO: Ensure Jobs Have a Single Responsibility

Each job should be focused on performing a single, well-defined responsibility.

## Markdown to reference this guideline

```plaintext
[DO: Ensure Jobs Have a Single Responsibility](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/jobs/do-single-responsibility.md&version=GBfeature/180-initial-guidelines)
```

## Reason

Jobs with a clear, well-defined purpose are easier to understand, maintain and
reuse.

## Example

Examples of jobs with a single responsibility include:

- Build job: Responsible for building an application.
- Deploy job: Responsible for deploying an application to a specific environment.
- Docker job: Responsible for building and pushing a Docker image.
- Terraform job: Responsible for applying Terraform configuration.
- Test job: Responsible for running tests (smoke tests, integration tests, etc.).

Please note that single responsibility does not mean that a job should have only
one step. A job can have multiple steps as long as they are related to the same
responsibility, e.g. building and pushing a Docker image.

## Related guidelines

- [DO: Use Templates Everywhere](/guidelines/general/do-templates-everywhere.md)
- [CONSIDER: Adding a Validation Flag to Your Job](/guidelines/jobs/consider-validation-flag.md)
- [CONSIDER: Grouping related jobs into stages](/guidelines/stages/consider-grouping-jobs.md)
