# ❌ AVOID: Using Pipeline Variables in Tasks or Steps Templates

Avoid using pipeline variables in steps templates. Use parameters instead.

## Markdown to reference this guideline

```plaintext
[AVOID: Using Pipeline Variables in Tasks or Steps Templates](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/steps/avoid-variables.md&version=GBfeature/180-initial-guidelines)
```

## Reason

Using variables in the middle of a steps template should be avoided as it
creates a dependency on that same variable. It's somehow similar to using global
variables in a programming language like Java, which can make the template less
reusable and harder to maintain.

Parameters have the added benefit of being strongly typed, which can help catch
errors at compile time, rather than at runtime.

## Recommended Approach

Pass values to the template as parameters, rather than using variables.

Other than removing the dependency on the variable, using parameters can also
make the inputs to the template more explicit. i.e. it's easier to understand
what values are needed to run the template.

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
reusable due to the dependency on the variable (in case the parameter is not
set).

Consider using this approach as a first step to refactor the template, in order
to remove the variable dependency.

## Related guidelines

- [DO: Validate Steps Parameters](/guidelines/steps/do-validate-parameters.md)
- [DO: Restrict Parameter Values](/guidelines/parameters/do-restrict-values.md)
- [CONSIDER: Grouping Related Parameters](/guidelines/parameters/consider-grouping.md)
