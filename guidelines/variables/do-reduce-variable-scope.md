# ✅ DO: Reduce variable scope



Global variables are accessible from anywhere in your pipeline, which can make code harder to maintain and lead to unintended side effects, in case of variable conflicts.
. To prevent this, reduce the scope of your variables as much as possible - ideally at the job level.

This will help you avoid conflicts with other variables and run your jobs in isolation, or run your jobs in parallel without affecting each other.

```yaml
jobs:
  - job: MyJob
    steps:
      - script: |
          $myVariable = "Hello, world!"
          Write-Host "My variable is $myVariable"
```