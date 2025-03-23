import { provideAnimations } from '@angular/platform-browser/animations';
import { ClrAlertModule, ClrDatagridModule } from '@clr/angular';
import { applicationConfig, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { BUTTON_DEFAULTS } from '../../../projects/extra-clarity/button-copy-to-clipboard';
import {
  CELL_WRAPPER_DEFAULTS,
  EcDatagridCellWrapperComponent,
} from '../../../projects/extra-clarity/datagrid-cell-wrapper';
import {
  hideAllControlRows,
  hideAutoGeneratedControlType,
  noNumericDefaultValue,
  wrapWrapperWithinDatagrid,
} from '../../helpers';

type ComponentWithAdditionalControls = EcDatagridCellWrapperComponent & { cellContent: string };

type Story = StoryObj<ComponentWithAdditionalControls>;

const CELL_CONTENT_DEFAULT_VALUE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const meta: Meta<ComponentWithAdditionalControls> = {
  title: 'Components/Datagrid Cell Wrapper',
  component: EcDatagridCellWrapperComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    // STORY PARAMETERS
    cellContent: {
      control: 'text',
      description: `A text content for the cells in the first two columns. The first column contains the wrapper,
        and the second one does not (to demonstrate the default datagrid behavior). <br />
        NOTE: This parameter is not a part of the component\'s API! And provided only for interacting with the story.`,
      table: {
        category: 'Story Parameters',
      },
    },
    // INPUTS
    btnDisabled: {},
    btnHeightPx: { ...noNumericDefaultValue },
    btnIconSizePx: {
      table: {
        defaultValue: { summary: BUTTON_DEFAULTS.iconSizePx.toString() },
      },
    },
    btnInline: {},
    btnLabel: {},
    btnLabelFontSizePx: { ...noNumericDefaultValue },
    btnSizePx: {
      table: {
        defaultValue: { summary: BUTTON_DEFAULTS.buttonSizePx.toString() },
      },
    },
    btnTitle: {
      table: {
        defaultValue: { summary: BUTTON_DEFAULTS.title },
      },
    },
    btnTopOffsetRem: {
      table: {
        defaultValue: { summary: CELL_WRAPPER_DEFAULTS.btnTopOffsetRem.toString() },
      },
    },
    btnWidthPx: { ...noNumericDefaultValue },
    btnWithAnimation: {},
    btnWithBorder: {},
    textToCopy: {},
    truncate: {},
    withCopyBtn: {},
    // OUTPUTS
    copied: {
      control: false,
      ...hideAutoGeneratedControlType,
    },
    failed: {
      control: false,
      ...hideAutoGeneratedControlType,
    },
  },
  args: {
    cellContent: CELL_CONTENT_DEFAULT_VALUE,
    btnDisabled: false,
    // btnHeightPx: 24,
    btnIconSizePx: BUTTON_DEFAULTS.iconSizePx,
    btnInline: false,
    btnLabel: undefined,
    // btnLabelFontSizePx: 12,
    btnSizePx: BUTTON_DEFAULTS.buttonSizePx,
    btnTitle: BUTTON_DEFAULTS.title,
    btnTopOffsetRem: CELL_WRAPPER_DEFAULTS.btnTopOffsetRem,
    // btnWidthPx: 24,
    btnWithAnimation: true,
    btnWithBorder: false,
    truncate: true,
    textToCopy: CELL_CONTENT_DEFAULT_VALUE,
    withCopyBtn: true,
  },
};

export default meta;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const WithinDatagridStory: Story = {
  name: 'Story: With datagrid',
  decorators: [
    moduleMetadata({
      imports: [ClrAlertModule, ClrDatagridModule, EcDatagridCellWrapperComponent],
    }),
  ],
  render: (args) => ({
    props: args,
    template: wrapWrapperWithinDatagrid(`
      <ec-dg-cell-wrapper
        [btnInline]="btnInline"
        [btnTopOffsetRem]="btnTopOffsetRem"
        [textToCopy]="textToCopy"
        [truncate]="truncate"
        [withCopyBtn]="withCopyBtn"
        [btnDisabled]="btnDisabled"
        [btnHeightPx]="btnHeightPx"
        [btnIconSizePx]="btnIconSizePx"
        [btnLabel]="btnLabel"
        [btnLabelFontSizePx]="btnLabelFontSizePx"
        [btnSizePx]="btnSizePx"
        [btnTitle]="btnTitle"
        [btnWidthPx]="btnWidthPx"
        [btnWithAnimation]="btnWithAnimation"
        [btnWithBorder]="btnWithBorder"
        (copied)="copied($event)"
        (failed)="failed($event)"
      >
        {{ cellContent }}
      </ec-dg-cell-wrapper>
    `),
  }),
  args: {},
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DocsExampleStory: Story = {
  name: 'Story: Example for docs',
  decorators: WithinDatagridStory.decorators,
  render: (args) => ({
    props: args,
    template: wrapWrapperWithinDatagrid(`
      <ec-dg-cell-wrapper
        [truncate]="true"
        [withCopyBtn]="true"
        [btnInline]="true"
        [textToCopy]="cellContent"
      >
        {{ cellContent }}
      </ec-dg-cell-wrapper>
    `),
  }),
  // hide all controls since the purpose of this story is a hard-coded demo in the docs page
  argTypes: {
    ...hideAllControlRows(meta.argTypes),
  },
  args: {},
};
