# ❌ AVOID: Using pipeline variables in tasks or steps templates

Avoid pipeline variables in steps templates. Use parameters instead.

## Markdown to reference this guideline

```plaintext
[AVOID: Using pipeline variables in tasks or steps templates](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/steps/avoid-pipeline-variables.md)
```

## Reason

Referencing variables inside a steps template creates a direct dependency, acting like a global variable. This makes the template harder to maintain and less reusable.

Parameters provide strong typing, helping you catch errors at compile time instead of at runtime.

## Recommended approach

Pass values to the template as explicit parameters. This removes dependencies and makes the template requirements clearer.

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

Optionally, set the default parameter value to the variable:

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

Use this option as a first step when refactoring templates to eliminate variable dependencies, though it slightly limits reusability since it falls back to the variable.

## Related guidelines

- [DO: Validate step parameters](/guidelines/steps/do-validate-parameters.md)
- [DO: Restrict parameter values](/guidelines/parameters/do-restrict-values.md)
- [CONSIDER: Grouping related parameters](/guidelines/parameters/consider-grouping.md)
