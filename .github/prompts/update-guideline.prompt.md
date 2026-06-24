---
agent: 'agent' 
description: 'Update an existing Azure Pipelines guideline file and add a CHANGELOG entry'
---

Update an existing guideline file in this repository. Follow the authoring rules in
[guideline.md](../instructions/guideline.md) and [documentation.md](../instructions/documentation.md).

## Steps

1. If the target file or the nature of the change is not clear from the request,
   ask before editing anything.
2. Read the current content of the guideline file before making any changes.
3. Apply the requested changes while preserving all required sections and their
   order as defined in [guideline.md](../instructions/guideline.md).
4. Add an entry for the updated file under the `[Unreleased]` section in
   [CHANGELOG.md](/CHANGELOG.md), following [changelog.md](../instructions/changelog.md).
   If an `[Unreleased]` section does not exist, create one above the most recent
   release.
