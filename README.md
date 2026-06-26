# Azure YAML pipelines guidelines

A set of coding guidelines to create [Azure YAML pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/key-pipelines-concepts) and related templates that are easy to understand, maintain, extend, and reuse.

For a complete list of guidelines, see the [guideline index](guidelines/README.md).

## Table of Contents

- [Types of recommendations](#types-of-recommendations)
- [Folder structure](#folder-structure)
- [Using the guidelines](#using-the-guidelines)
- [Contributing](#contributing)
- [Motivation](#motivation)
- [Tools and extensions](#tools-and-extensions)
- [Disclaimer](#disclaimer)
- [Buy me a coffee](#buy-me-a-coffee)

## Types of recommendations

Inspired by the [.NET Framework Design Guidelines](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/), the guidelines are organized as simple recommendations prefixed with the terms `Do`, `Consider`, `Avoid`, and `Do not`.

The type of recommendation indicates how strongly it should be followed:

- You should almost always follow a `Do` recommendation.
- On the other hand, `Consider` recommendations should generally be followed, but there are legitimate exceptions to the rule and you shouldn't feel bad about not following the guidance.
- `Avoid` recommendations mention things that are generally not a good idea, but breaking the rule sometimes makes sense.
- And finally, `Do not` recommendations indicate something you should almost never do.

## Folder structure

The guidelines can be found in the `/guidelines` folder and are organized into the following categories:

- `/data`: Machine-readable structured data for downstream tools and processes (e.g., linters, MCP servers, and LLM/RAG pipelines).
- `/docs`: Documentation for contributors and downstream tool authors.
- `/guidelines`: Guideline markdown files, organized by category:
  - `/general`: General recommendations that apply to more than one category.
  - `/jobs`: Jobs-related recommendations.
  - `/parameters`: Parameters-related recommendations.
  - `/pipelines`: Pipelines-related recommendations.
  - `/stages`: Stages-related recommendations.
  - `/steps`: Steps-related recommendations.
  - `/variables`: Variables-related recommendations.

## Using the guidelines

Originally written for human readers, these guidelines are now intended for both people and tools: as of `v1.0.0` the repository publishes stable rule IDs and a machine-readable index to support linters, analyzers, and AI/MCP integrations while preserving human-readable guidance.

Potential usage examples:

- **Learning:** people can use the guidelines to understand good practices for Azure YAML pipelines and templates.
- **PR review (human):** Quote the human-readable recommendation in a review and cite its stable rule ID (for example, `ADOG-STEPS-001`) when requesting changes.
- **Linter / CI:** A linter maps rule IDs from the machine index to diagnostics so CI can fail builds on violations (example: run the [manifest validator script](./.github/scripts/build-manifest.mjs)).
- **Automated fixer:** A fixer looks up a rule ID, applies the transform from the rule metadata, and opens a suggested patch or pull request.
- **AI / MCP integration:** An AI or MCP server retrieves guidance by rule ID from the index to generate suggestions, explain rationale, or author automated fixes for users.

## Contributing

The guidelines in this repository provide recommendations for creating more effective Azure YAML pipelines and templates. Guidelines that are not directly related to coding, such as security best practices, are not included.

Generally speaking, guidelines should be generic and applicable to a wide range of scenarios—no matter if you are building a web app, deploying infrastructure into a cloud provider, deploying a Helm chart, or doing something else.

Each guideline should have its own markdown file in the [appropriate folder](#folder-structure) and have the prefixes as per the [types of recommendations](#types-of-recommendations).

Please see the [CHANGELOG](CHANGELOG.md) for a list of significant changes.

## Motivation

This is the kind of guidelines I wish I had when I started working with Azure YAML pipelines and templates.

I couldn't find anything similar, so I decided to put these together, hoping they will help others to avoid the many, many mistakes I made along the way.

## Tools and extensions

VS Code extensions:

- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint): Markdown/CommonMark linting and style checking for Visual Studio Code.
- [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml): YAML language support, schema validation, and IntelliSense for pipeline files.

Tools:

- Node.js/npm: used for manifest validation and index regeneration (see [Machine-Readable Guidelines](/docs/machine-readable-guidelines.md)).

## Disclaimer

This repository and its content are not sponsored or supported by Microsoft Corporation. The guidelines are based mostly on the author's (limited) experience and opinions. There might be cases, though, where the author has used official Microsoft documentation as a reference.

AI tools were used only for support tasks such as reviewing grammar, improving clarity, and validating information. The recommendations themselves were written by the author.

The author is not responsible for any misuse of these guidelines or any damage that may result from their use. Use them at your own responsibility.

## Buy me a coffee

The work in this repository was done in the author's spare time and is provided free of charge.

Anyway, if you like this repository and find it useful, please consider [purchasing a book 📖](https://www.amazon.co.uk/hz/wishlist/ls/2YS09B7YPFWAJ?ref_=wl_share) or [making a small donation 💰](https://www.paypal.com/donate?hosted_button_id=LEA579SCNQ426) to the author. Or, as an alternative, help make the world a better place by supporting your local charity or helping someone in need!
