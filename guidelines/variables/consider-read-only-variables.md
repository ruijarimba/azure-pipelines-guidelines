# ✅ CONSIDER: Declaring variables as read-only

Mark variables as `readonly` when they shouldn't change after you initialize them.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Declaring variables as read-only](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/variables/consider-read-only-variables.md)
```

## Reason

Read-only constraints prevent accidental modification and communicate design intent.

## Example

```yaml
variables:
  - name: myReadOnlyVar
    value: myValue
    readonly: true
```

## Related guidelines

- [DO: Reduce variable scope](/guidelines/variables/do-variable-scope.md)
- [DO: Organize variables by component and environment](/guidelines/variables/do-organize-variables.md)
- [DO: Separate configuration from logic](/guidelines/variables/do-separate-configuration.md)
