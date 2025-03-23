![Maintaner](https://img.shields.io/badge/maintainer-extrawest.com-blue)
![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)
![GitHub release](https://img.shields.io/github/package-json/v/extrawest/extra-clarity?filename=projects%2Fextra-clarity%2Fpackage.json)

# Extra Clarity

A library containing Angular components built on the top of the [Clarity Design System](https://clarity.design/),
which we use in our internal projects in [extrawest.com](https://extrawest.com).

The library is under development. Any suggestions would be highly appreciated.

## Installation

The library is available as an [npm-package](https://www.npmjs.com/package/@extrawest/extra-clarity):

```shell
npm install @extrawest/extra-clarity
```

To work with the library, you also need to add the Clarity packages:

```shell
npm i @cds/core @clr/angular @clr/ui
```

And then add the global Clarity styles to your `angular.json` config:

```json
"styles": [
  "node_modules/@cds/core/global.min.css",
  "node_modules/@cds/core/styles/theme.dark.min.css",
  "node_modules/@clr/ui/clr-ui.min.css"
  ... any other styles
]
```

and add the `cds-theme="light"` attribute to the body element in your main HTML file:

```html
<body cds-theme="light" />
```

Please refer to the [Clarity docs](https://clarity.design/pages/developing#adding-clarity-to-an-existing-angular-application)
for more details on 'Adding Clarity to an Existing Angular Application'.

## Supported Versions

| Extra-Clarity | Angular               | Clarity |
| :------------ | :-------------------- | :------ |
| 18.x          | 18 \|\| 19            | ^17.3   |
| 17.x          | ^17.3 \|\| 18 \|\| 19 | 17      |

## Documentation

For the details about the available components and live examples,
please refer to our Storybook-based [documentation site](https://extra-clarity-docs.web.app).

We are working on adding more information to it.

## Available Components

- [Auto refresh toggle](https://extra-clarity-docs.web.app/?path=/story/components-auto-refresh--auto-refresh-story)
- [Auto refresh toggle with manual refresh button](https://extra-clarity-docs.web.app/?path=/story/components-auto-refresh-group--auto-refresh-group-story)
- [Copy-to-clipboard button](https://extra-clarity-docs.web.app/?path=/docs/components-button-copy-to-clipboard--overview)
- [Confirmation dialog](https://extra-clarity-docs.web.app/?path=/story/components-confirmation-dialog--confirmation-dialog-story)
- [Dialog (reactive)](https://extra-clarity-docs.web.app/?path=/docs/components-dialog-overview--docs)
- [Datagrid cell wrapper (with truncation and the copy-to-clipboard button](https://extra-clarity-docs.web.app/?path=/docs/components-datagrid-cell-wrapper--overview)
- Datagrid filters:
  - [with editable string value](https://extra-clarity-docs.web.app/?path=/docs/components-datagrid-filters-string-filter--overview)
  - [with enumerated value from single selection (radio buttons)](https://extra-clarity-docs.web.app/?path=/docs/components-datagrid-filters-enum-single-value-filter--overview)
  - [with enumerated value from multiple selection (checkboxes)](https://extra-clarity-docs.web.app/?path=/docs/components-datagrid-filters-enum-multi-value-filter--overview)
  - [with enumerated value from multiple selection within grouped options (tree-view with checkboxes)](https://extra-clarity-docs.web.app/?path=/docs/components-datagrid-filters-enum-grouped-value-filter--overview)
  - [with time range selection (from presets or manually with date-time pickers)](https://extra-clarity-docs.web.app/?path=/docs/components-datagrid-filters-time-range-filter--overview)
- [Floating notifications](https://extra-clarity-docs.web.app/?path=/story/components-notification--notification-story)
- [Popover toggle](https://extra-clarity-docs.web.app/?path=/docs/components-popover-toggle--overview)
- [Progress spinner](https://extra-clarity-docs.web.app/?path=/story/components-progress-spinner--progress-spinner-story)
- [Router link wrapper](https://extra-clarity-docs.web.app/?path=/docs/components-router-link-wrapper--overview)
- [Search bar](https://extra-clarity-docs.web.app/?path=/docs/components-search-bar--overview)
- [Sidebar navigation](https://extra-clarity-docs.web.app/?path=/docs/components-sidebar-navigation--overview)
- etc.

## License

[MIT License](../../LICENSE)

## Third-party libraries

Some of our components may include code from these third-party libraries:

- [Clarity (MIT License)](https://github.com/vmware-clarity/ng-clarity)
- [Clarity Addons (MIT License)](https://github.com/porscheinformatik/clarity-addons)
