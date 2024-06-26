# Azure YAML pipelines guidelines

A set of coding guidelines to create
[Azure YAML pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/key-pipelines-concepts)
and related templates that are easy to understand, maintain, extend and reuse.

Current version: `0.1.0` (see the [CHANGELOG](CHANGELOG.md))

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

Inspired by the
[.NET Framework Design Guidelines](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/)
, the guidelines are organized as simple recommendations prefixed with the terms
`Do`, `Consider`, `Avoid`, and `Do not`.

The type of recommendation indicates how strongly it should be followed:

- You should almost always follow a `Do` recommendation
- On the other hand, `Consider` recommendations should generally be followed, but
there are legitimate exceptions to the rule and you shouldn't feel bad about
not following the guidance
- `Avoid` recommendations mention things that are generally not a good idea, but
breaking the rule sometimes makes sense
- And finally, `Do not` recommendations indicate something you should almost
never do.

## Folder structure

The guidelines can be found in the `/guidelines` folder and are organized into
the following categories:

- `/general`: General recommendations that apply to more than one category.
- `/jobs`: Jobs-related recommendations.
- `/parameters`: Parameters-related recommendations.
- `/pipelines`: Pipelines-related recommendations.
- `/stages`: Stages-related recommendations.
- `/steps`: Steps-related recommendations.
- `/variables`: Variables-related recommendations.

## Using the guidelines

The guidelines can be used in different ways:

- As a learning resource to understand good practices for YAML pipelines.
- As a reference when creating new pipelines, helping to standardize the
structure and ensure consistency across different pipelines and templates.
- As a reference during code reviews and pull requests to ensure consistency and
quality (copy/paste the markdown code in each guideline when reviewing pull requests!).

## Contributing

The guidelines in this repository provide recommendations for creating more
effective Azure YAML pipelines and templates. Guidelines that are not directly
related to coding, such as security best practices, are not included.

Generally speaking, guidelines should be generic and applicable to a wide range
of scenarios - no matter if you are building a web app, deploying infrastructure
into a cloud provider, deploying a Helm chart or doing something else.

Each guideline should have its own markdown file in the
[appropriate folder](#folder-structure) and have the prefixes as per
the [types of recommendations](#types-of-recommendations).

Please see the [CHANGELOG](CHANGELOG.md) for a list of significant changes.

## Motivation

This is the kind of guidelines I wish I had when I started working with Azure
YAML pipelines and templates.

I couldn't find anything similar so I decided to put these together, hoping they
will help others to avoid the many, many mistakes I made along the way.

## Tools and extensions

VS Code extensions:

- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
: Markdown/CommonMark linting and style checking for Visual Studio Code

## Disclaimer

This repository and its content are not sponsored or supported by Microsoft
Corporation. The guidelines are based mostly on the author's
(limited) experience and opinions. There might be cases though where the author
has used official Microsoft documentation as a reference.

The author is not responsible for any misuse of these guidelines or any damage
that may result from their use. Use them at your own responsibility.

## Buy me a coffee

The work in this repository was done in the author's spare time and is provided
free of charge.

Anyway, if you like this repository and find it useful, please consider
[purchasing a book 📖](https://www.amazon.co.uk/hz/wishlist/ls/2YS09B7YPFWAJ?ref_=wl_share)
or
[making a small donation 💰](https://www.paypal.com/donate?hosted_button_id=LEA579SCNQ426)
to the author. Or, as an alternative, help make the world a better place by
supporting your local charity or helping someone in need!

Your support is greatly appreciated!
