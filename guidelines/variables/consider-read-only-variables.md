# ✅ CONSIDER: declaring variables as read-only

Consider declaring variables as read-only when these are not intended to be
modified after initialization.

## Reason

Read-only variables can:

- Help prevent accidental modification
- Make it clear that the value is not supposed to be changed during the
execution of the pipeline.

## Example

```yaml
variables:
  - name: myReadOnlyVar
    value: myValue
    readonly: true
```

## Related guidelines

TODO: add related guidelines
