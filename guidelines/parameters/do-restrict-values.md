# ✅ DO: Restrict Parameter Values

Restrict the values of parameters when these have a well-defined set of values.

## Markdown to reference this guideline

```plaintext
[DO: Restrict Parameter Values](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/parameters/do-restrict-values.md)
```

## Reason

Restricting the values of a parameter ensures that only valid values are used
in a pipeline or template.

## Example

Instead of allowing a user to enter any value for the `environment` and `region`
parameters in a pipeline:

```yaml
parameters:
  - name: environment
    type: string
    displayName: 'Environment'

  - name: region
    type: string
    displayName: 'Azure region'
```

Restrict the values of the `environment` and `region` parameters to a
well-defined set of values:

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

- [DO: Validate Steps Parameters](/guidelines/steps/do-validate-parameters.md)
