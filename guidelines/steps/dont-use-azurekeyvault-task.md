# DO NOT: use AzureKeyVault task

## Reason

Using the AzureKeyVault task in pipelines is a bad practice because it makes the pipeline less flexible and harder to maintain. Instead, use variables and templates to define values that can be reused across different pipelines and templates.

## Recommended Approach

## Related guidelines

- [DO: Keep sensitive information in variable groups](../../do/keep-sensitive-information-in-variable-groups.md)
- [DO: Use parameters instead of variables in steps templates](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/steps/avoid-using-variables.md)


- [DO NOT: hardcode values in pipelines and templates](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/general/donot-hardcode-values.md)
- [DO NOT: Mix pipelines syntax in script tasks](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/steps/dont-mix-pipelines-syntax-in-scripts.md)
- [DO: Create templates for everything](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/general/do-create-templates-for-everything.md)
- [DO: Use parameters instead of variables in steps templates](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/steps/avoid-using-variables.md)