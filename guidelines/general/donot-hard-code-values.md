# ❌ DO NOT: Hard-code Values in Pipelines and Templates

Do not hard-code values in Azure DevOps pipelines and templates.

## Markdown to reference this guideline

```plaintext
[DO NOT: Hard-code Values in Pipelines and Templates](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/general/donot-hard-code-values.md&version=GBfeature/180-initial-guidelines)
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

- [DO: Separate configuration from logic](../variables/do-separate-configuration.md)
- [DO: Use Templates Everywhere](../general/do-use-templates-everywhere.md)
