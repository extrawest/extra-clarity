import { provideAnimations } from '@angular/platform-browser/animations';
import { ClrAlertModule, ClrDatagridModule } from '@clr/angular';
import {
  applicationConfig,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';

import { BUTTON_DEFAULTS } from '../../../projects/extra-clarity/button-copy-to-clipboard';
import {
  CELL_WRAPPER_DEFAULTS,
  DatagridCellWrapperComponent,
} from '../../../projects/extra-clarity/datagrid-cell-wrapper';
import { hideAllControlRows, wrapWrapperWithinDatagrid } from '../../helpers';

type Story = StoryObj<DatagridCellWrapperComponent>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const MetaStory = {
  title: 'Components/Datagrid Cell Wrapper',
  component: DatagridCellWrapperComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
  ],
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    // STORY PARAMETERS
    cellContent: {
      control: 'text',
      description:
        `A text content for the cells in the first two columns. The first column contains the wrapper,
        and the second one does not (to demonstrate the default datagrid behavior). <br />
        NOTE: This parameter is not a part of the component\'s API! And provided only for interacting with the story.`,
      table: {
        category: 'Story Parameters',
      },
    },
    // INPUTS
    btnDisabled: {
    },
    btnHeightPx: {
      table: {
        defaultValue: {
          summary: null,
        },
      },
    },
    btnIconSizePx: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: BUTTON_DEFAULTS.iconSizePx,
        },
      },
    },
    btnInline: {
    },
    btnLabel: {
      type: 'string',
    },
    btnLabelFontSizePx: {
      table: {
        defaultValue: {
          summary: null,
        },
      },
    },
    btnSizePx: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: BUTTON_DEFAULTS.buttonSizePx,
        },
      },
    },
    btnTitle: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: BUTTON_DEFAULTS.title,
        },
      },
    },
    btnVerticalMargin: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: CELL_WRAPPER_DEFAULTS.verticalMarginRem,
        },
      },
    },
    btnWidthPx: {
      table: {
        defaultValue: {
          summary: null,
        },
      },
    },
    btnWithAnimation: {
    },
    btnWithBorder: {
    },
    textToCopy: {
      type: {
        name: 'string',
      },
    },
    truncate: {
    },
    withCopyBtn: {
    },
    // OUTPUTS
    copied: {
      control: false,
      table: {
        type: {
          summary: 'EventEmitter<string>',
        },
      },
    },
    failed: {
      control: false,
      table: {
        type: {
          summary: 'EventEmitter<unknown>',
        },
      },
    },
  },
  args: {
    cellContent: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    btnDisabled: false,
    // btnHeightPx: 24,
    btnIconSizePx: BUTTON_DEFAULTS.iconSizePx,
    btnInline: false,
    btnLabel: undefined,
    // btnLabelFontSizePx: 12,
    btnSizePx: BUTTON_DEFAULTS.buttonSizePx,
    btnTitle: BUTTON_DEFAULTS.title,
    btnVerticalMargin: CELL_WRAPPER_DEFAULTS.verticalMarginRem,
    // btnWidthPx: 24,
    btnWithAnimation: true,
    btnWithBorder: false,
    truncate: true,
    textToCopy: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    withCopyBtn: true,
  },
} as Meta<DatagridCellWrapperComponent>;

export default MetaStory;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const WithinDatagridStory: Story = {
  name: 'Story: With datagrid',
  decorators: [
    moduleMetadata({
      imports: [
        ClrAlertModule,
        ClrDatagridModule,
        DatagridCellWrapperComponent,
      ],
    }),
  ],
  render: (args) => ({
    props: args,
    template: wrapWrapperWithinDatagrid(`
      <ec-dg-cell-wrapper
        [btnInline]="btnInline"
        [btnVerticalMargin]="btnVerticalMargin"
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
  args: {
  },
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
    ...hideAllControlRows(MetaStory.argTypes),
  },
  args: {
  },
};
