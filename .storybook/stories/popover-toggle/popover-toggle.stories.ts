import { provideAnimations } from '@angular/platform-browser/animations';

import { type Meta, type StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';

import {
  EcAnchorToContentAlign,
  EcContentPosition,
  EcDropdownIconPosition,
  EcPopoverToggleButtonStatus,
  EcPopoverToggleButtonStyle,
  EcPopoverToggleComponent,
} from '@extrawest/extra-clarity/popover-toggle';

import { hideAutoGeneratedControlType } from '../../helpers';

type Story = StoryObj<EcPopoverToggleComponent>;

const meta: Meta<EcPopoverToggleComponent> = {
  title: 'Components/Popover Toggle',
  component: EcPopoverToggleComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    // INPUTS
    anchorToContentAlign: {
      control: {
        type: 'select',
        labels: {
          [EcAnchorToContentAlign.StartToStart]: 'StartToStart',
          [EcAnchorToContentAlign.StartToCenter]: 'StartToCenter',
          [EcAnchorToContentAlign.StartToEnd]: 'StartToEnd',
          [EcAnchorToContentAlign.CenterToStart]: 'CenterToStart',
          [EcAnchorToContentAlign.CenterToCenter]: 'CenterToCenter',
          [EcAnchorToContentAlign.CenterToEnd]: 'CenterToEnd',
          [EcAnchorToContentAlign.EndToStart]: 'EndToStart',
          [EcAnchorToContentAlign.EndToCenter]: 'EndToCenter',
          [EcAnchorToContentAlign.EndToEnd]: 'EndToEnd',
        },
      },
      options: [
        EcAnchorToContentAlign.StartToStart,
        EcAnchorToContentAlign.StartToCenter,
        EcAnchorToContentAlign.StartToEnd,
        EcAnchorToContentAlign.CenterToStart,
        EcAnchorToContentAlign.CenterToCenter,
        EcAnchorToContentAlign.CenterToEnd,
        EcAnchorToContentAlign.EndToStart,
        EcAnchorToContentAlign.EndToCenter,
        EcAnchorToContentAlign.EndToEnd,
      ],
    },
    contentPosition: {
      control: {
        type: 'select',
        labels: {
          [EcContentPosition.Bottom]: 'Bottom',
          [EcContentPosition.Top]: 'Top',
          [EcContentPosition.Left]: 'Left',
          [EcContentPosition.Right]: 'Right',
        },
      },
      options: [
        EcContentPosition.Bottom,
        EcContentPosition.Top,
        EcContentPosition.Left,
        EcContentPosition.Right,
      ],
    },
    btnDisabled: {},
    btnSmall: {},
    btnStatus: {
      control: {
        type: 'select',
        labels: {
          [EcPopoverToggleButtonStatus.Danger]: 'Danger',
          [EcPopoverToggleButtonStatus.Info]: 'Info',
          [EcPopoverToggleButtonStatus.Primary]: 'Primary',
          [EcPopoverToggleButtonStatus.Success]: 'Success',
          [EcPopoverToggleButtonStatus.Warning]: 'Warning',
        },
      },
      options: [
        EcPopoverToggleButtonStatus.Danger,
        EcPopoverToggleButtonStatus.Info,
        EcPopoverToggleButtonStatus.Primary,
        EcPopoverToggleButtonStatus.Success,
        EcPopoverToggleButtonStatus.Warning,
      ],
    },
    btnStyle: {
      control: {
        type: 'select',
        labels: {
          [EcPopoverToggleButtonStyle.Flat]: 'Flat',
          [EcPopoverToggleButtonStyle.Solid]: 'Solid',
          [EcPopoverToggleButtonStyle.Outline]: 'Outline',
        },
      },
      options: [
        EcPopoverToggleButtonStyle.Flat,
        EcPopoverToggleButtonStyle.Solid,
        EcPopoverToggleButtonStyle.Outline,
      ],
    },
    closeOnClickOutside: {},
    closeOnScroll: {},
    labelText: {},
    withDropdownIcon: {},
    dropdownIconDirection: {
      control: { type: 'select' },
      options: ['up', 'down', 'left', 'right'],
    },
    dropdownIconPosition: {
      control: {
        type: 'select',
        labels: {
          [EcDropdownIconPosition.Left]: 'Left',
          [EcDropdownIconPosition.Right]: 'Right',
        },
      },
      options: [EcDropdownIconPosition.Left, EcDropdownIconPosition.Right],
    },
    open: {},
    // OUTPUTS
    openChange: {
      control: false,
      ...hideAutoGeneratedControlType,
    },
    // METHODS
    toggleOpen: {
      control: false,
    },
  },
  args: {
    anchorToContentAlign: EcAnchorToContentAlign.StartToStart,
    contentPosition: EcContentPosition.Bottom,
    btnDisabled: false,
    btnSmall: true,
    btnStatus: EcPopoverToggleButtonStatus.Primary,
    btnStyle: EcPopoverToggleButtonStyle.Outline,
    closeOnClickOutside: true,
    closeOnScroll: true,
    labelText: 'show/hide',
    withDropdownIcon: true,
    dropdownIconDirection: 'down',
    dropdownIconPosition: EcDropdownIconPosition.Right,
    open: false,
  },
};

export default meta;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ComponentItselfStory: Story = {
  name: 'Story: Component Itself',
  decorators: [
    moduleMetadata({
      imports: [EcPopoverToggleComponent],
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
  args: {},
};
