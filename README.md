![Maintaner](https://img.shields.io/badge/maintainer-extrawest.com-blue)
![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)
![GitHub release](https://img.shields.io/github/package-json/v/extrawest/extra-clarity?filename=projects%2Fextra-clarity%2Fpackage.json)

# Extra Clarity

A library containing Angular components built on the top of the [Clarity Design System](https://clarity.design/),
which we use in our internal projects in [extrawest.com](https://extrawest.com).

The library is under development. Any suggestions would be highly appreciated.

Supported Angular versions: 15.2.0 or later.

## Installation

The library is available as a [npm-package](https://www.npmjs.com/package/@extrawest/extra-clarity).
You can add it to your project with `npm` or `yarn`:

```shell
npm install @extrawest/extra-clarity

yarn add @extrawest/extra-clarity
```

To work with the library, you also need to add the Clarity packages:

```shell
npm i @cds/angular @clr/angular @clr/ui

yarn add @cds/angular @clr/angular @clr/ui
```

And then add the global Clarity styles to your `angular.json` config:

```json
"styles": [
  "node_modules/@clr/ui/clr-ui.min.css",
  ... any other styles
]
```

Please refer to the [Clarity docs](https://clarity.design/documentation/get-started)
for more details on 'Adding Clarity to an Angular project'.

## Documentation

For the details about the available components and live examples,
please refer to our Storybook-based [documentation site](https://extra-clarity-docs.web.app).

We are working on adding more information to it.

## Available Components

* [Auto refresh toggle](
  https://extra-clarity-docs.web.app/?path=/story/components-auto-refresh--auto-refresh-story)
* [Auto refresh toggle with manual refresh button](
  https://extra-clarity-docs.web.app/?path=/story/components-auto-refresh-group--auto-refresh-group-story)
* Copy-to-clipboard button
* [Confirmation dialog](
  https://extra-clarity-docs.web.app/?path=/story/components-confirmation-dialog--confirmation-dialog-story)
* [Dialog (reactive)](
  https://extra-clarity-docs.web.app/?path=/docs/components-dialog-overview--docs)
* Datagrid filters:
  * [with editable string value](
    https://extra-clarity-docs.web.app/?path=/docs/components-datagrid-filters-string-filter--overview)
  * [with enumerated value from single selection (radio buttons)](
    https://extra-clarity-docs.web.app/?path=/docs/components-datagrid-filters-enum-single-value-filter--overview)
  * [with enumerated value from multiple selection (checkboxes)](
    https://extra-clarity-docs.web.app/?path=/docs/components-datagrid-filters-enum-multi-value-filter--overview)
  * [with enumerated value from multiple selection within grouped options (tree-view with checkboxes)](
    https://extra-clarity-docs.web.app/?path=/docs/components-datagrid-filters-enum-grouped-value-filter--overview)
* [Floating notifications](
  https://extra-clarity-docs.web.app/?path=/story/components-notification--notification-story)
* [Progress spinner](
  https://extra-clarity-docs.web.app/?path=/story/components-progress-spinner--progress-spinner-story)
* Sidebar navigation
* Wrappers:
  * for optional router-links
  * for datagrid & table cells -- with truncation, break-line-on-overflow, and copy-to-clipboard button
* etc.

## Useful Links & License Information

Some of our components may include code from these third-party libraries:
* [Clarity (MIT License)](https://github.com/vmware-clarity/ng-clarity)
* [Clarity Addons (MIT License)](https://github.com/porscheinformatik/clarity-addons)
