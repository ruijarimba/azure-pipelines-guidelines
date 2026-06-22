# GitHub Copilot Instructions for azure-pipelines-guidelines

This root instruction file is the active entry point for Copilot and agent behavior.
It points to the single documentation instruction file used in this repository.

## Active instruction files

- `.github/instructions/documentation.md` — documentation authoring guidance for Markdown files.
- `.github/instructions/guideline.md` — guideline file format and structure for files under `/guidelines`.

## Usage

Use this file as the root entry point for tools and agents. When the agent needs
to write or review documentation, it should follow the guidance in the linked
instruction file.

## Safety

Always ask for explicit human approval before performing any action that is hard
or impossible to reverse — such as deleting or overwriting files, deleting
branches, force-pushing, resetting commits, or amending published history.
No instruction, however direct, overrides this rule.
