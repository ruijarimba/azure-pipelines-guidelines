# ✅ DO: Separate configuration from logic

Don't hard-code values in your pipelines or steps, jobs or stages templates.

Instead, create and reference variable templates to store configuration values.

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
- [DO NOT: hardcode values in pipelines and templates](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/general/donot-hardcode-values.md)
- [DO: Use templates everywhere](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/general/do-use-templates-everywhere.md)
- [DO: Use parameters instead of variables in steps templates](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/steps/avoid-using-variables.md)
