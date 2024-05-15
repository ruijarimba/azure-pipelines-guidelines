# ✅ CONSIDER: Declaring Variables as Read-only

Consider declaring variables as read-only when these are not intended to be
modified after initialization.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Declaring Variables as Read-only](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/variables/consider-read-only-variables.md&version=GBreleases/0.1.0)
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
