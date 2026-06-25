# ✅ DO: Ensure jobs have a single responsibility

Focus each job on a single, well-defined responsibility.

## Markdown to reference this guideline

```plaintext
[ADOG-JOBS-008 — DO: Ensure jobs have a single responsibility](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/jobs/do-single-responsibility.md)
```

## Reason

Jobs with a clear purpose are easier to understand, maintain, and reuse.

## Example

Examples of single-responsibility jobs include:

- Build job: Builds an application.
- Deploy job: Deploys an application to a specific environment.
- Docker job: Builds and pushes a Docker image.
- Terraform job: Applies Terraform configuration.
- Test job: Runs tests (smoke tests, integration tests).

Single responsibility does not restrict a job to one step. A job can contain multiple steps related to the same responsibility, such as building and pushing a Docker image.

## Related guidelines

- [DO: Use templates everywhere](/guidelines/general/do-templates-everywhere.md)
- [CONSIDER: Adding a validation flag to your job](/guidelines/jobs/consider-validation-flag.md)
- [CONSIDER: Grouping related jobs into stages](/guidelines/stages/consider-grouping-jobs.md)
