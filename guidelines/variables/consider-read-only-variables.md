# CONSIDER: declaring variables as read-only

Consider declaring variables as read-only when the variable is not intended to be
modified after initialization.

## Reason

Read-only variables can help prevent accidental modification and clearly
indicate that the variable will not be changed during the execution of the
pipeline.

## Example

```yaml
variables:
  - name: myReadOnlyVar
    value: myValue
    readonly: true
```
