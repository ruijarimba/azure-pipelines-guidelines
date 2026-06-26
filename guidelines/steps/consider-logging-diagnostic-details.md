# ✅ CONSIDER: Logging diagnostic details

Log enough diagnostic details required to troubleshoot issues and failures.

## Markdown to reference this guideline

```plaintext
[ADOG-STEPS-003 — CONSIDER: Logging diagnostic details](https://github.com/ruijarimba/azure-pipelines-guidelines/blob/main/guidelines/steps/consider-logging-diagnostics.md)
```

## Reason

A pipeline step can fail without providing enough information to explain why.

Log the important details for that step, such as input values, state before the change, expected state, and actual state. This helps engineers understand the failure and diagnose the likely cause faster.

## Recommended approach

Enough diagnostic information should be logged to troubleshoot the issue or failure. Ideally, this information should be logged in the same step that fails, so that a human or an AI agent can analyse and identify the likely issue without checking the logs from other steps or jobs.

Some diagnostics are cheap and can run every time, such as the key input values for the step. Other diagnostics like the actual state of a resource or deployment make builds slower, especially when they require extra commands, API calls, or dry-runs. Consider enabling these logs only when debug mode is active, using the `$(System.Debug)` predefined pipeline variable.

## Example

### Debug diagnostics managed within the script

The script checks whether debug mode is enabled and prints extra diagnostic information only when needed.

```yaml
steps:
  - script: |
      set -euo pipefail

      # Always log inputs
      echo "##[group]Inputs"
      echo "##[debug]releaseName=${RELEASE_NAME}"
      echo "##[debug]namespace=${NAMESPACE}"
      echo "##[debug]chartPath=${CHART_PATH}"
      echo "##[debug]valuesFile=${VALUES_FILE}"
      echo "##[endgroup]"

      # Check debug mode inside the script body
      DEBUG_FLAG=""
      if [ "${SYSTEM_DEBUG:-false}" = "true" ]; then
        echo "##[group]State before change"
        helm status "${RELEASE_NAME}" --namespace "${NAMESPACE}" \
          || echo "##[debug]Release not found"
        echo "##[endgroup]"
        DEBUG_FLAG="--debug"
      fi

      helm upgrade --install "${RELEASE_NAME}" "${CHART_PATH}" \
        --namespace "${NAMESPACE}" \
        --values "${VALUES_FILE}" \
        $DEBUG_FLAG
    displayName: 'Deploy Helm chart'
    env:
      RELEASE_NAME: ${{ parameters.releaseName }}
      NAMESPACE: ${{ parameters.namespace }}
      CHART_PATH: ${{ parameters.chartPath }}
      VALUES_FILE: ${{ parameters.valuesFile }}
```

### Debug diagnostics controlled by a task condition

This example uses a task‑level condition to run the diagnostics step only when debug mode is enabled.

```yaml
steps:
  # This whole step runs only when $(System.Debug) is true 
  - script: |
      set -euo pipefail

      echo "##[group]Inputs"
      echo "##[debug]releaseName=${RELEASE_NAME}"
      echo "##[debug]namespace=${NAMESPACE}"
      echo "##[debug]chartPath=${CHART_PATH}"
      echo "##[debug]valuesFile=${VALUES_FILE}"
      echo "##[endgroup]"

      helm diff upgrade "${RELEASE_NAME}" "${CHART_PATH}" \
        --namespace "${NAMESPACE}" \
        --values "${VALUES_FILE}"
    displayName: 'Helm diff (debug mode)'
    condition: eq(variables['System.Debug'], 'true')
    env:
      RELEASE_NAME: ${{ parameters.releaseName }}
      NAMESPACE: ${{ parameters.namespace }}
      CHART_PATH: ${{ parameters.chartPath }}
      VALUES_FILE: ${{ parameters.valuesFile }}

  - script: |
      set -euo pipefail

      # Always log inputs
      echo "##[group]Inputs"
      echo "##[debug]releaseName=${RELEASE_NAME}"
      echo "##[debug]namespace=${NAMESPACE}"
      echo "##[debug]chartPath=${CHART_PATH}"
      echo "##[debug]valuesFile=${VALUES_FILE}"
      echo "##[endgroup]"

      helm upgrade --install "${RELEASE_NAME}" "${CHART_PATH}" \
        --namespace "${NAMESPACE}" \
        --values "${VALUES_FILE}"
    displayName: 'Deploy Helm chart'
    env:
      RELEASE_NAME: ${{ parameters.releaseName }}
      NAMESPACE: ${{ parameters.namespace }}
      CHART_PATH: ${{ parameters.chartPath }}
      VALUES_FILE: ${{ parameters.valuesFile }}
```

## Related guidelines

- [DO: Document pipelines and templates](/guidelines/general/do-documentation.md)
- [DO: Create configurable and extensible steps](/guidelines/steps/do-extensible-steps.md)
- [DO: Validate step parameters](/guidelines/steps/do-validate-parameters.md)
- [CONSIDER: Setting environment variables at the task level](/guidelines/steps/consider-environment-variables.md)

## Useful sources

- [Use predefined variables](https://learn.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops)
- [Logging commands](https://learn.microsoft.com/en-us/azure/devops/pipelines/scripts/logging-commands)
