# ✅ DO: Separate configuration from logic

Don't hard-code values in your pipelines or steps, jobs or stages templates.

Instead, create and reference variable templates to store configuration values.

## Markdown to reference this guideline

```plaintext
[DO: Separate configuration from logic](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/variables/do-separate-configuration.md&version=GBfeature/180-initial-guidelines)
```

## Reason

When deploying applications, it's a good practice to separate application
configuration from the code deployment.

The same applies to pipelines: separate configuration (i.e. variables) from
logic (steps, jobs, etc) to make your pipelines and related templates easier to
manage and reuse in different scenarios.

## Example

Use a dedidated folder to store your variables, such as `/pipelines/variables`

```plaintext
/pipelines
  /jobs
    ...
  /stages
    ...
  /steps
    ...
  /variables
    ...
  my-pipeline.yml
```

## Related guidelines

- [DO: organize variables by component and environment](../variables/do-organize-variables.md)
- [DO NOT: Hard-code Values in Pipelines and Templates](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/general/donot-hard-code-values.md)
- [DO: Use Templates Everywhere](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/general/do-use-templates-everywhere.md)
- [DO: Use parameters instead of variables in steps templates](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/steps/avoid-using-variables.md)
