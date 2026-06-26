# ❌ DO NOT: Mix pipelines syntax in script tasks

Do not embed pipeline expressions (`$(...)` or `${{ ... }}`) throughout the body of a script task. Bind them at the boundary instead — either in the task-level `env:` block or as variable assignments at the very top of the script.

## Markdown to reference this guideline

```plaintext
[ADOG-STEPS-010 — DO NOT: Mix pipelines syntax in script tasks](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/steps/donot-mix-syntax.md)
```

## Reason

Embedding pipeline templates variables inline throughout script contents harms readability, maintainability, and testing.

## Recommended approach

Bind pipeline parameters or variables using the task-level `env:` block. This keeps the script body free of pipeline syntax and makes it portable and testable locally without modification.

As a fallback, assign pipeline parameters or variables to native script variables at the top of the script. Use this approach only when the value needs transformation before use, or when it is a simple string guaranteed to contain no special characters.

## Example

Instead of injecting parameters directly in logic:

```yaml
steps:
  - script: |
      EXIT_CODE=0

      if [ -z "${{ parameters.kubeconfig }}" ]; then
        echo "##vso[task.logissue type=error;code=KUBECONFIG;]kubeconfig must be provided."
        EXIT_CODE=$((EXIT_CODE+1))
      fi

      if [ $EXIT_CODE -eq 0 ]; then
        echo "KUBECONFIG: ${{ parameters.kubeconfig }}"
        echo "##vso[task.setvariable variable=KUBECONFIG]${{ parameters.kubeconfig }}"
      else
        echo "##vso[task.logissue type=warning]Validation failed, KUBECONFIG was not set."
      fi

      exit $EXIT_CODE
    displayName: 'Set KUBECONFIG variable'
```

Prefer binding the parameter using the task-level `env:` block. The script body contains only native shell variables:

```yaml
steps:
  - script: |
      EXIT_CODE=0

      if [ -z "$KUBECONFIG" ]; then
        echo "##vso[task.logissue type=error;code=KUBECONFIG;]kubeconfig must be provided."
        EXIT_CODE=$((EXIT_CODE+1))
      fi

      if [ $EXIT_CODE -eq 0 ]; then
        echo "KUBECONFIG: $KUBECONFIG"
        echo "##vso[task.setvariable variable=KUBECONFIG]$KUBECONFIG"
      else
        echo "##vso[task.logissue type=warning]Validation failed, KUBECONFIG was not set."
      fi

      exit $EXIT_CODE
    displayName: 'Set KUBECONFIG variable'
    env:
      KUBECONFIG: ${{ parameters.kubeconfig }}
```

Alternatively, map pipeline parameters or variables to script-level variables at the top of the script:

```yaml
steps:
  - script: |
      EXIT_CODE=0
      KUBECONFIG=${{ parameters.kubeconfig }}

      if [ -z "$KUBECONFIG" ]; then
        echo "##vso[task.logissue type=error;code=KUBECONFIG;]kubeconfig must be provided."
        EXIT_CODE=$((EXIT_CODE+1))
      fi

      if [ $EXIT_CODE -eq 0 ]; then
        echo "KUBECONFIG: $KUBECONFIG"
        echo "##vso[task.setvariable variable=KUBECONFIG]$KUBECONFIG"
      else
        echo "##vso[task.logissue type=warning]Validation failed, KUBECONFIG was not set."
      fi

      exit $EXIT_CODE
    displayName: 'Set KUBECONFIG variable'
```

This approach has limitations:

- **Pipeline syntax in the script body** — the `${{ ... }}` expression sits inside the script, not in the YAML task metadata. Local testing still requires manually substituting those values.
- **Slippery slope** — once `${{ ... }}` appears at the top of the script, it is easy to add more expressions further down, drifting back toward the anti-pattern.
- **Special character hazard** — values containing spaces, quotes, dollar signs, or newlines must be explicitly quoted or escaped to avoid script errors. The `env:` approach handles special characters safely without any escaping.

## Related guidelines

- [DO: Validate step parameters](/guidelines/steps/do-validate-parameters.md)
- [CONSIDER: Setting environment variables at the task level](/guidelines/steps/consider-environment-variables.md)
- [AVOID: Using pipeline variables in tasks or steps templates](/guidelines/steps/avoid-pipeline-variables.md)
