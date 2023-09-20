import { provideAnimations } from '@angular/platform-browser/animations';
import {
  applicationConfig,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';

import {
  AnchorToContentAlign,
  ContentPosition,
  DropdownIconPosition,
  PopoverToggleButtonStatus,
  PopoverToggleButtonStyle,
  PopoverToggleComponent,
} from '../../../projects/extra-clarity/popover-toggle';

type Story = StoryObj<PopoverToggleComponent>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const MetaStory = {
  title: 'Components/Popover Toggle',
  component: PopoverToggleComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
  ],
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    // INPUTS
    anchorToContentAlign: {
      control: {
        type: 'select',
        labels: {
          [AnchorToContentAlign.StartToStart]: 'StartToStart',
          [AnchorToContentAlign.StartToCenter]: 'StartToCenter',
          [AnchorToContentAlign.StartToEnd]: 'StartToEnd',
          [AnchorToContentAlign.CenterToStart]: 'CenterToStart',
          [AnchorToContentAlign.CenterToCenter]: 'CenterToCenter',
          [AnchorToContentAlign.CenterToEnd]: 'CenterToEnd',
          [AnchorToContentAlign.EndToStart]: 'EndToStart',
          [AnchorToContentAlign.EndToCenter]: 'EndToCenter',
          [AnchorToContentAlign.EndToEnd]: 'EndToEnd',
        },
      },
      options: [
        AnchorToContentAlign.StartToStart,
        AnchorToContentAlign.StartToCenter,
        AnchorToContentAlign.StartToEnd,
        AnchorToContentAlign.CenterToStart,
        AnchorToContentAlign.CenterToCenter,
        AnchorToContentAlign.CenterToEnd,
        AnchorToContentAlign.EndToStart,
        AnchorToContentAlign.EndToCenter,
        AnchorToContentAlign.EndToEnd,
      ],
    },
    contentPosition: {
      control: {
        type: 'select',
        labels: {
          [ContentPosition.Bottom]: 'Bottom',
          [ContentPosition.Top]: 'Top',
          [ContentPosition.Left]: 'Left',
          [ContentPosition.Right]: 'Right',
        },
      },
      options: [
        ContentPosition.Bottom,
        ContentPosition.Top,
        ContentPosition.Left,
        ContentPosition.Right,
      ],
    },
    btnDisabled: {},
    btnSmall: {},
    btnStatus: {
      control: {
        type: 'select',
        labels: {
          [PopoverToggleButtonStatus.Danger]: 'Danger',
          [PopoverToggleButtonStatus.Info]: 'Info',
          [PopoverToggleButtonStatus.Primary]: 'Primary',
          [PopoverToggleButtonStatus.Success]: 'Success',
          [PopoverToggleButtonStatus.Warning]: 'Warning',
        },
      },
      options: [
        PopoverToggleButtonStatus.Danger,
        PopoverToggleButtonStatus.Info,
        PopoverToggleButtonStatus.Primary,
        PopoverToggleButtonStatus.Success,
        PopoverToggleButtonStatus.Warning,
      ],
    },
    btnStyle: {
      control: {
        type: 'select',
        labels: {
          [PopoverToggleButtonStyle.Flat]: 'Flat',
          [PopoverToggleButtonStyle.Solid]: 'Solid',
          [PopoverToggleButtonStyle.Outline]: 'Outline',
        },
      },
      options: [
        PopoverToggleButtonStyle.Flat,
        PopoverToggleButtonStyle.Solid,
        PopoverToggleButtonStyle.Outline,
      ],
    },
    closeOnClickOutside: {},
    closeOnScroll: {},
    labelText: {},
    withDropdownIcon: {},
    dropdownIconDirection: {
      control: { type: 'select' },
      options: [
        'up',
        'down',
        'left',
        'right',
      ],
    },
    dropdownIconPosition: {
      control: {
        type: 'select',
        labels: {
          [DropdownIconPosition.Left]: 'Left',
          [DropdownIconPosition.Right]: 'Right',
        },
      },
      options: [
        DropdownIconPosition.Left,
        DropdownIconPosition.Right,
      ],
    },
    open: {},
    // OUTPUTS
    openChange: {
      control: { type: null },
      table: {
        type: {
          summary: null,
        },
      },
    },
    // METHODS
    toggleOpen: {
      control: { type: null },
    },
  },
  args: {
    anchorToContentAlign: AnchorToContentAlign.StartToStart,
    contentPosition: ContentPosition.Bottom,
    btnDisabled: false,
    btnSmall: true,
    btnStatus: PopoverToggleButtonStatus.Primary,
    btnStyle: PopoverToggleButtonStyle.Outline,
    closeOnClickOutside: true,
    closeOnScroll: true,
    labelText: 'show/hide',
    withDropdownIcon: true,
    dropdownIconDirection: 'down',
    dropdownIconPosition: DropdownIconPosition.Right,
    open: false,
  },
} as Meta<PopoverToggleComponent>;

export default MetaStory;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ComponentItselfStory: Story = {
  name: 'Story: Component Itself',
  decorators: [
    moduleMetadata({
      imports: [
        PopoverToggleComponent,
      ],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 7rem">
        <ec-popover-toggle
          [anchorToContentAlign]="anchorToContentAlign"
          [contentPosition]="contentPosition"
          [btnDisabled]="btnDisabled"
          [btnSmall]="btnSmall"
          [btnStatus]="btnStatus"
          [btnStyle]="btnStyle"
          [closeOnClickOutside]="closeOnClickOutside"
          [closeOnScroll]="closeOnScroll"
          [labelText]="labelText"
          [withDropdownIcon]="withDropdownIcon"
          [dropdownIconDirection]="dropdownIconDirection"
          [dropdownIconPosition]="dropdownIconPosition"
          [open]="open"
        >
          <div style="max-width: 6rem;">
            Any content, e.g. an external datagrid filter
          </div>
        </ec-popover-toggle>
      </div>
    `,
  }),
  args: {
  },
};
