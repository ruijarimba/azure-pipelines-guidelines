# ❌ DO NOT: hard-code values in pipelines and templates

Do not hard-code values in Azure DevOps pipelines and templates.

```plaintext
[DO NOT: hard-code values in pipelines and templates](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/general/donot-hard-code-values.md)
```

## Reason

Just like in a regular application, hard-coding values in pipelines and templates
is not a good practice for several reasons:

- If a value needs to be changed, it must be changed in multiple places.
- Hard-coded values make the templates less reusable e.g. it might not be
possible to use the same template in different contexts, e.g. different
environments
- Hard-coded values decrease readability. It might not be clear what the value represents.

## Recommended Approach

Separate logic (steps, jobs, stages) from configuration (environment-specific
values) to make your pipelines cleaner and easier to reuse.

Use variables templates to define and group values by environment, region,
functionality or any other criteria that makes sense for your scenario and
reference them in your pipelines and templates.

## Related guidelines

TODO: Add related guidelines.
