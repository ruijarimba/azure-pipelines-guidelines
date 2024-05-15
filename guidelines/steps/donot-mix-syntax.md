# ❌ DO NOT: Mix pipelines syntax in script tasks

Use `$(...)` or `${{ ... }}` syntax only at the beginning of the script task,
assigning the values to script variables.

## Markdown to reference this guideline

```plaintext
[DO NOT: Mix pipelines syntax in script tasks](https://ruijarimba.visualstudio.com/ruijarimba/_git/azure-pipelines-guidelines?path=/guidelines/steps/donot-mix-syntax.md&version=GBfeature/180-initial-guidelines)
```

## Reason

Directly using pipeline parameters in the middle of a script task can make the
script harder to read, maintain and test.

## Recommended Approach

If you need to use the value of a pipeline variable or parameter in a script
task, assign it to a script variable at the beginning of the script instead.

This approach improves readability and maintainability. Also, it makes it easier
to test the script outside the pipeline because you just need to change the
script variables assignment, as opposed to replace the values all over the script.

## Example

Instead of using parameters values throughout the script:

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

Assign the pipeline parameters to script variables at the beginning of the
script:

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

## Related guidelines

TODO: Add related guidelines
