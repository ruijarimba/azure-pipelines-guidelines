# ✅ CONSIDER: Use native YAML constructs when possible

Use native YAML formatting constructs, such as block scalars (`>` or `|`), for multi-line strings where appropriate.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Use native YAML constructs when possible](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/general/consider-native-yaml-constructs.md)
```

## Reason

Native YAML formatting features avoid operating system-specific line continuations (such as `\` for Linux/Bash, `^` for Windows/CMD, or `` ` `` for PowerShell). Relying on native YAML syntax prevents cross-platform compatibility issues, reduces parsing errors, and resolves complex escaping or quoting issues.

It also prevents exceedingly long lines for variables and conditions, making the pipeline code simpler, cleaner, and OS-agnostic.

## Example

Instead of using OS-specific line continuations and putting long variables or conditions on a single line:

```yaml
trigger: none

# variables declared as part of the pipeline definition for simplicity purposes only - use variable templates instead 
variables:
  # Long strings on a single line
  HTTP_PROXY: http://proxy.mycompany.com:8080
  HTTPS_PROXY: http://proxy.mycompany.com:8080
  NO_PROXY: localhost,127.0.0.1,.mycompany.com

jobs:
  - job: myJob
    # Complex condition on a single line
    condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
    steps:
      # OS-specific line continuations (\)
      - script: |
          az storage blob delete \
            -c mycontainer \
            -n MyBlob
        displayName: Delete blob
```

Use folded block scalars (`>-`) to cleanly break long strings, conditions, and format scripts without OS-specific line continuations:

```yaml
trigger: none

# variables declared as part of the pipeline definition for simplicity purposes only - use variable templates instead
variables:
  HTTP_PROXY: http://proxy.mycompany.com:8080
  HTTPS_PROXY: http://proxy.mycompany.com:8080
  NO_PROXY: >-
    localhost,
    127.0.0.1,
    .mycompany.com

jobs:
  - job: myJob
    # Long conditions can span multiple lines for better readability
    condition: |
      and(
        succeeded(),
        eq(variables['Build.SourceBranch'], 'refs/heads/main')
      )
    steps:
      # YAML folded block scalars (`>-`) replace OS-specific line continuations (\ or ^)
      - script: >-
          az storage blob delete
          -c mycontainer
          -n MyBlob
        displayName: Delete blob
```

## Related guidelines

- [DO: Document pipelines and templates](/guidelines/general/do-documentation.md)
- [DO: Use templates everywhere](/guidelines/general/do-templates-everywhere.md)
- [CONSIDER: Declaring variables as read-only](/guidelines/variables/consider-read-only-variables.md)

## Useful sources

For more details and examples on YAML multiline constructs, check out:

- [YAML Multiline Strings](https://yaml-multiline.info/)
- [How do I break a string in YAML over multiple lines? (StackOverflow)](https://stackoverflow.com/q/3790454)
