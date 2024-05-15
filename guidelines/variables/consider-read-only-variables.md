# ✅ CONSIDER: Declaring Variables as Read-only

Consider declaring variables as read-only when these are not intended to be
modified after initialization.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Declaring Variables as Read-only](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/releases/0.1.0/guidelines/variables/consider-read-only-variables.md)
```

## Reason

Read-only variables can prevent accidental modification and clearly indicate
that the value should not change during pipeline execution.

## Example

```yaml
variables:
  - name: myReadOnlyVar
    value: myValue
    readonly: true
```

## Related guidelines

- [DO: Organize Variables by Component and Environment](/guidelines/variables/do-organize-variables.md)
- [DO: Separate Configuration From Logic](/guidelines/variables/do-separate-configuration.md)
