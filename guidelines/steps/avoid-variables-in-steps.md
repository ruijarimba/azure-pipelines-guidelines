# AVOID: Using Variables in Steps Templates

Markdown to reference this guideline:

```plaintext
[DO: Use parameters instead of variables in steps templates](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines/guidelines/steps/avoid-using-variables.md)
```

<!-- ## Reason

Using variables in the middle of a steps template should be avoided as it
creates a dependency on that same variable. It's somehow similar to using global
variables in a programming language like Java, which can make the template less
reusable and harder to maintain.

For that reason it's generally recommended to pass values to the template as
parameters, rather than using variables. Using parameters can also make the
inputs to the template more explicit. i.e. it's easier to understand what values
are needed to run the template. -->

## Reason

Using variables directly in steps templates is akin to using global variables in
a programming language like Java or .NET. This practice can lead to:

- **Dependency**: The template becomes less reusable due to the dependency on
the variable.
- **Maintainability**: The code becomes harder to maintain.
- **Readability**: The inputs to the template become less explicit, making it
harder to understand what values are needed to run the template.

## Recommended Approach

It's generally recommended to pass values to the template as
parameters, rather than using variables.

This approach improves the readability and reusability of the code.

## Example

Instead of using the variable directly in the script:

```yaml
steps:
  - script: echo "Hello, $(name)"
    displayName: 'Greet'
```

Pass the value as a parameter:

```yaml
parameters:
  - name: name
    type: string
    displayName: 'Person name'

steps:
  - script: echo "Hello, ${{ parameters.name }}"
    displayName: 'Greet'
```

Optionally, you can set the default value of the parameter to the variable:

```yaml
parameters:
  - name: name
    type: string
    displayName: 'Person name'
    default: $(name)

steps:
  - script: echo "Hello, ${{ parameters.name }}"
    displayName: 'Greet'
```

But as mentioned above, this approach can make the template slightly less
reusable due to the dependency on the variable.
