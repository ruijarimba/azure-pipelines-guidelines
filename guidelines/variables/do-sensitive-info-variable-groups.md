# ✅ DO: Keep sensitive information in variable groups

Keep sensitive information like passwords, tokens, and keys in
[variable groups](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=yaml).

Markdown to this guideline:

```markdown
[DO: Keep sensitive information in variable groups](../../do/keep-sensitive-information-in-variable-groups.md)
```

## Reason

Sensitive information should not be stored into the source code repository. By
storing sensitive information in variable groups, you can keep your secrets
secure and separate from your code.

Also, secret variables in variable groups are
[protected resources](https://learn.microsoft.com/en-us/azure/devops/pipelines/security/resources?view=azure-devops#protected-resources)
. You can add combinations of approvals, checks, and pipeline permissions to
limit access to secret variables in a variable group.

## Note for Azure users

If your Azure DevOps organization is linked to an Azure subscription, store your
secrets in an Azure key vault and
[link it to a variable group](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=yaml#link-secrets-from-an-azure-key-vault),
instead of storing secrets directly in the variable group.

Azure Key Vault provides among other things: auditability;
secret rotation; centralized management; monitoring and alerting (e.g.,
[using Azure Event Grid and Logic Apps to send notifications when secrets are expiring](https://learn.microsoft.com/en-us/azure/key-vault/general/event-grid-logicapps)).
