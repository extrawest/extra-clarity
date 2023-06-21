import { provideAnimations } from '@angular/platform-browser/animations';
import { ClrAlertModule, ClrDatagridModule } from '@clr/angular';
import {
  applicationConfig,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';

import { DatagridCellWrapperComponent } from '../../../projects/extra-clarity/datagrid-cell-wrapper';
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
    btnInline: {
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
    btnInline: false,
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
        [textToCopy]="textToCopy"
        [truncate]="truncate"
        [withCopyBtn]="withCopyBtn"
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
