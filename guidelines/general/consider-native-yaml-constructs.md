# ✅ CONSIDER: Use native YAML constructs when possible

Prefer YAML‑native constructs to express values, logic, and scripts in a clear, consistent, and platform‑agnostic way.

## Markdown to reference this guideline

```plaintext
[CONSIDER: Use native YAML constructs when possible](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/general/consider-native-yaml-constructs.md)
```

## Reason

Using native YAML features such as [block scalars (multiline strings)](https://yaml-multiline.info/) avoids OS‑specific syntax differences such as line continuations, quoting rules, and escaping across Bash, PowerShell, and CMD. This reduces parsing issues and ensures the pipeline works correctly on different platforms.

It also eliminates the need for long, hard‑to‑scan lines in variables, scripts, and conditions, resulting in cleaner and more maintainable templates.

## Example

### Variables

Instead of placing long values on a single line:

```yaml
trigger: none

variables:
  HTTP_PROXY: http://proxy.mycompany.com:8080
  HTTPS_PROXY: http://proxy.mycompany.com:8080
  NO_PROXY: localhost,127.0.0.1,.mycompany.com
```

Use block scalars to keep the value readable and avoid long inline strings:

```yaml
trigger: none

variables:
  HTTP_PROXY: http://proxy.mycompany.com:8080
  HTTPS_PROXY: http://proxy.mycompany.com:8080
  NO_PROXY: >-
    localhost,
    127.0.0.1,
    .mycompany.com
```

### Conditions

Instead of a long condition on one line:

```yaml
jobs:
  - job: myJob
    condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
```

Use YAML block syntax so conditions are easier to read and edit:

```yaml
jobs:
  - job: myJob
    condition: |
      and(
        succeeded(),
        eq(variables['Build.SourceBranch'], 'refs/heads/main')
      )
```

### Scripts

Instead of using OS-specific line continuations in a script:

```yaml
steps:
  - script: |
      az storage blob delete \
        -c $(container) \
        -n $(blob)
    displayName: Delete blob
```

Use a folded block scalar so the script body is written naturally:

```yaml
steps:
  - script: >-
      az storage blob delete
      -c $(container)
      -n $(blob)
    displayName: Delete blob
```

## Related guidelines

- [DO: Document pipelines and templates](/guidelines/general/do-documentation.md)
- [DO NOT: Hard-code values in pipelines and templates](/guidelines/general/donot-hard-code-values.md)

## Useful sources

- [How do I break a string in YAML over multiple lines?](https://stackoverflow.com/questions/3790454/how-do-i-break-a-string-in-yaml-over-many-lines)