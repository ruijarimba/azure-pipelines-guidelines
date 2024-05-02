# DO: Separate configuration from logic

## Reason

When deploying applications, it's a good practice to separate application
configuration from the code deployment.

The same applies to pipelines: separate configuration (i.e. variables) from
logic (steps, jobs, etc) to make your pipelines and related templates easier to reuse and maintain.

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