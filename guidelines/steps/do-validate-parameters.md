# ✅ DO: Validate Steps Parameters

Steps templates should validate their parameters and fail the pipeline if any
is invalid.

## Markdown to reference this guideline

```plaintext
[DO: Validate Steps Parameters](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/releases/0.1.0/guidelines/steps/do-validate-parameters.md)
```

## Reason

Detect and report errors as soon as they occur, rather than allowing them to
propagate and potentially cause more significant issues later in the pipeline.

## Example

Using a template to check if the input parameters are not empty and do not
contain unexpanded variables:

```yaml
- template: /pipelines/steps/validate-input-steps.yaml
  parameters:
    inputs:
      - name: 'myValidParameter'
        value: 'validValue'
      - name: 'myNonExpandedParameter'
        value: '$(nonExistentVariable)'
      - name: 'myEmptyParameter'
        value: ''
    printValues: false
```

`/pipelines/steps/validate-input-steps.yaml` template:

```yaml
# Validate input steps
#
# The task will fail if one of the following conditions are met 
# in one or more of the inputs to validate:
# - The input is empty
# - The input contains an unexpanded variable such as $(nonExistentVariable)

# An array of inputs to validate, each containing the following properties:
# - name: The name of the input to validate
# - value: The value of the input to validate
#
# Example:
# inputs:
#   - name: 'myValidParameter'
#     value: 'validValue'
#   - name: myNonExpandedParameter
#     value: '$(nonExistentVariable)'
#   - name: 'myEmptyParameter'
#     value: ''
parameters:
  - name: inputs
    displayName: 'An array of key-value pairs of input data to validate'
    type: object

  # A boolean value that specifies whether to print the values of the inputs.
  # Use it for troubleshooting purposes only, as it may expose sensitive information.
  - name: printValues
    displayName: 'A boolean value that specifies whether to print the values of the inputs'
    type: boolean
    default: false

  # The condition to run the task
  # Default value is always() so that all validation errors are
  # displayed in the same run of the pipeline, as opposed to stopping
  # the pipeline on the first error.
  - name: condition
    displayName: 'The condition to run the task'
    type: string
    default: 'always()'

steps:
  - ${{ each input in parameters.inputs }}:
    - script: |
        echo "Validating input: ${NAME}"

        if [ "${PRINT}" = "true" ]; then
          echo "Value: '$VALUE'"
        fi

        if [ -z "${VALUE}" ]; then
          MESSAGE="Input ${NAME} is empty"
          echo "${MESSAGE}"
          echo "##vso[task.logissue type=error]${MESSAGE}"
          exit 1
        fi

        if [[ "${VALUE}" =~ ^\$\(.+\)$ ]]; then
          MESSAGE="Input ${NAME} seems to contain an unexpanded variable: ${VALUE}"
          echo "${MESSAGE}"
          echo "##vso[task.logissue type=error]${MESSAGE}"
          exit 2
        fi

        echo "${NAME} seems to be valid"
      displayName: 'Validate input: ${{ input.name }}'
      condition: ${{ parameters.condition }}
      env:
        NAME: ${{ input.name }}
        VALUE: ${{ input.value }}
        PRINT: ${{ lower(parameters.printValues) }}
```

Please note that the above template can (and should!) be extended to include
additional validation rules, such as:

- Validating a range
- Validating an IP address
- Validating an URL

And so on.

## Related guidelines

- [DO: Restrict Parameter Values](/guidelines/parameters/do-restrict-values.md)
- [CONSIDER: Grouping Related Parameters](/guidelines/parameters/consider-grouping.md)
- [AVOID: Using Variables in Scripts](/guidelines/steps/avoid-pipeline-variables.md)
