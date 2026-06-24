# Azure Pipelines Coding Guidelines index

A complete list of the guideline files in this repository, organized by category.

Use this page as a reference when you want to browse all recommendations in one place.

## General

| Recommendation | Summary |
| --- | --- |
| [✅ CONSIDER: Use absolute paths to reference templates](/guidelines/general/consider-absolute-paths.md) | Use absolute paths to reference stages, jobs, steps and variables templates. |
| [✅ CONSIDER: Use native YAML constructs when possible](/guidelines/general/consider-native-yaml-constructs.md) | Prefer YAML‑native constructs to express values, logic, and scripts in a clear, consistent, and platform‑agnostic way. |
| [✅ CONSIDER: Align template parameters with the YAML schema](/guidelines/general/consider-schema-compatible-types.md) | When adding parameters that map to Azure Pipelines YAML fields, use the same name, type, and a schema-compatible default value so templates work naturally without requiring every parameter to be explicitly set. |
| [✅ DO: Document pipelines and templates](/guidelines/general/do-documentation.md) | Document pipelines and templates. Add comments to the top of pipeline and template files. Describe the purpose, usage, and other relevant information clearly for both people and tools. |
| [✅ DO: Use a consistent folder structure](/guidelines/general/do-folder-structure.md) | Organize pipelines and templates logically and consistently across different projects and repositories. |
| [✅ DO: Use templates everywhere](/guidelines/general/do-templates-everywhere.md) | Create and reference templates instead of defining logic or configuration directly in your pipelines or templates. |
| [❌ DO NOT: Hard-code values in pipelines and templates](/guidelines/general/donot-hard-code-values.md) | Do not hard-code values in Azure DevOps pipelines and templates. |

## Jobs

| Recommendation | Summary |
| --- | --- |
| [✅ CONSIDER: Explicitly declare checkout in jobs](/guidelines/jobs/consider-explicit-checkout.md) | Explicitly set `checkout` in every job to make source code checkout behavior clear and stable. |
| [✅ CONSIDER: Grouping job tasks into a single template](/guidelines/jobs/consider-grouping-tasks.md) | Group job tasks into a single steps template, rather than using multiple steps templates in a job. |
| [✅ CONSIDER: Declaring variables at the job level](/guidelines/jobs/consider-job-variables.md) | Declare variables at the job level instead of the stage or root level. |
| [✅ CONSIDER: Adding a validation flag to your job](/guidelines/jobs/consider-validation-flag.md) | Add a `boolean` parameter to your job to run it in _validation mode_, without deploying or executing any changes. |
| [✅ DO: Create configurable and extensible jobs](/guidelines/jobs/do-extensible-jobs.md) | When creating job templates for reuse by different teams, stages, or pipelines, add parameters such as: |
| [✅ DO: Set job timeouts](/guidelines/jobs/do-job-timeouts.md) | Set job timeouts or add parameters to shared job templates to let users configure them. |
| [✅ DO: Minimize the number of parameters in job templates](/guidelines/jobs/do-parameters-short.md) | When defining job templates in Azure DevOps pipelines, keep the number of **environment-related** parameters as short as possible. |
| [✅ DO: Ensure jobs have a single responsibility](/guidelines/jobs/do-single-responsibility.md) | Focus each job on a single, well-defined responsibility. |

## Parameters

| Recommendation | Summary |
| --- | --- |
| [✅ CONSIDER: Grouping related parameters](/guidelines/parameters/consider-grouping.md) | Group related parameters, such as username and password. |
| [✅ DO: Restrict parameter values](/guidelines/parameters/do-restrict-values.md) | Restrict the values of parameters when they have a well-defined set. |

## Pipelines

| Recommendation | Summary |
| --- | --- |
| [✅ CONSIDER: Running pipelines in validation mode](/guidelines/pipelines/consider-validation.md) | Add a parameter or condition to run the pipeline in _validation mode_, skipping deployment or changes. |

## Stages

| Recommendation | Summary |
| --- | --- |
| [✅ CONSIDER: Grouping related jobs into stages](/guidelines/stages/consider-grouping-jobs.md) | Organize related jobs into stages to: |
| [✅ DO: Run stages in parallel when possible](/guidelines/stages/do-parallel-stages.md) | Run independent stages in parallel. |

## Steps

| Recommendation | Summary |
| --- | --- |
| [❌ AVOID: Using pipeline variables in tasks or steps templates](/guidelines/steps/avoid-pipeline-variables.md) | Avoid pipeline variables in steps templates. Use parameters instead. |
| [✅ CONSIDER: Setting environment variables at the task level](/guidelines/steps/consider-environment-variables.md) | Set environment variables at the task level. |
| [✅ CONSIDER: Logging diagnostic details](/guidelines/steps/consider-logging-diagnostic-details.md) | Log enough diagnostic details required to troubleshoot issues and failures. |
| [✅ CONSIDER: Logging diagnostic details](/guidelines/steps/consider-logging-diagnostics.md) | Log enough diagnostic details required to troubleshoot issues and failures. |
| [✅ CONSIDER: Configuring retries in tasks](/guidelines/steps/consider-retries.md) | Configure the number of retries if a task faces transient failures. |
| [✅ CONSIDER: Set task timeouts](/guidelines/steps/consider-timeouts.md) | Set timeouts for tasks to avoid stalling pipeline runs. Provide reasonable values based on the expected execution time. |
| [✅ DO: Create configurable and extensible steps](/guidelines/steps/do-extensible-steps.md) | When building reusable templates, add these control parameters: |
| [✅ DO: Use service connections when possible](/guidelines/steps/do-use-service-connections.md) | Use Service Connections to authenticate with external services (Azure, GitHub, Docker, Kubernetes, etc.). |
| [✅ DO: Validate step parameters](/guidelines/steps/do-validate-parameters.md) | Validate step parameters in templates. Fail the pipeline if a parameter is invalid. |
| [❌ DO NOT: Mix pipelines syntax in script tasks](/guidelines/steps/donot-mix-syntax.md) | Do not embed pipeline expressions (`$(...)` or `${{ ... }}`) throughout the body of a script task. Bind them at the boundary instead — either in the task-level `env:` block or as variable assignments at the very top of the script. |
| [❌ DO NOT: Use AzureKeyVault task](/guidelines/steps/donot-use-azurekeyvault-task.md) | Do not run the `AzureKeyVault` task to pull secrets into pipeline variables. |

## Variables

| Recommendation | Summary |
| --- | --- |
| [✅ CONSIDER: Declaring variables as read-only](/guidelines/variables/consider-read-only-variables.md) | Mark variables as `readonly` when they shouldn't change after you initialize them. |
| [✅ DO: Organize variables by component and environment](/guidelines/variables/do-organize-variables.md) | Organize your variables into folders by functionality, environment, or any logical partition that fits your project. |
| [✅ DO: Store sensitive information in variable groups](/guidelines/variables/do-sensitive-information.md) | Store passwords, tokens, and keys inside [variable groups](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=yaml). |
| [✅ DO: Separate configuration from logic](/guidelines/variables/do-separate-configuration.md) | Avoid hard-coding configuration values inside pipeline, step, job, or stage templates. |
| [✅ DO: Reduce variable scope](/guidelines/variables/do-variable-scope.md) | Restrict the scope of variables as much as possible. |
| [❌ DO NOT: Mix variables from different environments](/guidelines/variables/donot-mix-environments.md) | Do not define variables for multiple environments inside a single variable template. |

