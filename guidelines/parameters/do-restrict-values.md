# ✅ DO: Restrict parameter values

Restrict the values of parameters when they have a well-defined set.

## Markdown to reference this guideline

```plaintext
[DO: Restrict parameter values](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/parameters/do-restrict-values.md)
```

## Reason

Restricting a parameter's values ensures pipelines or templates only use valid data.

## Example

Instead of allowing any value for the `environment` and `region` parameters:

```yaml
parameters:
  - name: environment
    type: string
    displayName: 'Environment'

  - name: region
    type: string
    displayName: 'Azure region'
```

Restrict the parameters to a well-defined set of values:

```yaml
parameters:
  - name: environment
    type: string
    displayName: 'Environment'
    default: 'dev'
    values:
      - 'dev'
      - 'staging'
      - 'prod'

  - name: region
    type: string
    displayName: 'Azure region'
    default: 'eastus'
    values:
      - 'eastus'
      - 'westus'
      - 'westeurope'
```

## Related guidelines

- [DO: Validate steps parameters](/guidelines/steps/do-validate-parameters.md)
