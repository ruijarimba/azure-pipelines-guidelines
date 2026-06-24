---
agent: 'agent' 
description: 'Create a new Azure Pipelines guideline file and add a CHANGELOG entry'
---

Create a new guideline file for this repository. Follow the authoring rules in
[guideline.md](../instructions/guideline.md) and [documentation.md](../instructions/documentation.md).

## Steps

1. If the guideline type, category, topic, or intent is not clear from the
   request, ask before creating any files.
2. Derive the filename from the type prefix and topic using the naming rules in
   [guideline.md](../instructions/guideline.md). Confirm the filename and target
   folder before writing.
3. Create the file under `guidelines/{category}/` with all required sections in
   the correct order.
4. Add an entry for the new file under the `[Unreleased]` section in
   [CHANGELOG.md](/CHANGELOG.md), following [changelog.md](../instructions/changelog.md).
   If an `[Unreleased]` section does not exist, create one above the most recent
   release.
