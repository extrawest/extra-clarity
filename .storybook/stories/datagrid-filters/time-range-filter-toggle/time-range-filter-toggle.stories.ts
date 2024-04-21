import { provideAnimations } from '@angular/platform-browser/animations';
import {
  EcAnchorToContentAlign,
  EcContentPosition,
  EcPopoverToggleButtonStatus,
  EcPopoverToggleButtonStyle,
} from '@extrawest/extra-clarity/popover-toggle';
import {
  applicationConfig,
  componentWrapperDecorator,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import {
  EcTimeRangeFilterToggleComponent,
  TIMERANGE_FILTER_TOGGLE_DEFAULTS,
} from '../../../../projects/extra-clarity/time-range-filter-toggle';
import PopoverToggleMetaStory from '../../popover-toggle/popover-toggle.stories';

import { demoPresets } from './helpers/demo-presets';

type Story = StoryObj<EcTimeRangeFilterToggleComponent>;

const SUBCATEGORY_FILTER = 'Passed to EcTimeRangeFilter';
const SUBCATEGORY_TOGGLE = 'Passed to EcPopoverToggle';

// eslint-disable-next-line @typescript-eslint/naming-convention
const MetaStory = {
  title: 'Components/Datagrid Filters/Time Range Filter (External)',
  component: EcTimeRangeFilterToggleComponent,
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
    // Inputs passed to EcTimeRangeFilterComponent
    propertyKey: {
      type: {
        name: 'string',
        required: true,
      },
      table: { subcategory: SUBCATEGORY_FILTER },
    },
    presets: {
      control: { type: 'object' },
      table: { subcategory: SUBCATEGORY_FILTER },
    },
    value: {
      control: { type: 'object' },
      table: { subcategory: SUBCATEGORY_FILTER },
    },
    withCustomRange: {
      table: { subcategory: SUBCATEGORY_FILTER },
    },
    closeOnChange: {
      table: { subcategory: SUBCATEGORY_FILTER },
    },
    widthPx: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: TIMERANGE_FILTER_TOGGLE_DEFAULTS.widthPx,
        },
        subcategory: SUBCATEGORY_FILTER,
      },
    },
    // Inputs passed to EcPopoverToggleComponent
    anchorToContentAlign: {
      table: { subcategory: SUBCATEGORY_TOGGLE },
      control: PopoverToggleMetaStory.argTypes?.anchorToContentAlign?.['control'],
      options: PopoverToggleMetaStory.argTypes?.anchorToContentAlign?.['options'],
    },
    contentPosition: {
      table: { subcategory: SUBCATEGORY_TOGGLE },
      control: PopoverToggleMetaStory.argTypes?.contentPosition?.['control'],
      options: PopoverToggleMetaStory.argTypes?.contentPosition?.['options'],
    },
    btnDisabled: {
      table: { subcategory: SUBCATEGORY_TOGGLE },
    },
    btnSmall: {
      table: { subcategory: SUBCATEGORY_TOGGLE },
    },
    btnStatus: {
      table: { subcategory: SUBCATEGORY_TOGGLE },
      control: PopoverToggleMetaStory.argTypes?.btnStatus?.['control'],
      options: PopoverToggleMetaStory.argTypes?.btnStatus?.['options'],
    },
    btnStyle: {
      table: { subcategory: SUBCATEGORY_TOGGLE },
      control: PopoverToggleMetaStory.argTypes?.btnStyle?.['control'],
      options: PopoverToggleMetaStory.argTypes?.btnStyle?.['options'],
    },
    closeOnClickOutside: {
      table: { subcategory: SUBCATEGORY_TOGGLE },
    },
    closeOnScroll: {
      table: { subcategory: SUBCATEGORY_TOGGLE },
    },
    open: {
      table: { subcategory: SUBCATEGORY_TOGGLE },
    },
    // OUTPUTS
    valueChanged: {
      control: { type: null },
      table: {
        type: {
          summary: `EventEmitter<EcTimeRangeFilterToggleState>`,
        },
      },
    },
    openChange: {
      control: { type: null },
      table: {
        type: {
          summary: `EventEmitter<boolean>`,
        },
      },
    },
    // METHODS
    resetToDefault: {
      control: { type: null },
    },
    setValue: {
      control: { type: null },
    },
    // GETTERS
    state: {
      control: { type: null },
      table: {
        category: 'Getters',
        type: { summary: '{ isActive: boolean; state: EcFilterState<EcTimeRangeFilterValue> }' },
        defaultValue: {
        },
      },
    },
  },
  args: {
    propertyKey: 'timestamp',
    presets: demoPresets,
    withCustomRange: true,
    closeOnChange: false,
    value: undefined,
    widthPx: TIMERANGE_FILTER_TOGGLE_DEFAULTS.widthPx,
    anchorToContentAlign: EcAnchorToContentAlign.StartToStart,
    contentPosition: EcContentPosition.Bottom,
    btnDisabled: false,
    btnSmall: true,
    btnStatus: EcPopoverToggleButtonStatus.Primary,
    btnStyle: EcPopoverToggleButtonStyle.Outline,
    closeOnClickOutside: true,
    closeOnScroll: true,
    open: false,
    withTime: true,
  },
} as Meta<EcTimeRangeFilterToggleComponent>;

export default MetaStory;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ComponentItselfStory: Story = {
  name: 'Story: Component itself',
  decorators: [
    componentWrapperDecorator((story) => `
      <div style="width: 100%">
        <div style="
          max-width: 15rem;
          width: fit-content;
          margin: 2rem auto 0;
        ">
          ${story}
        </div>
      </div>
    `),
  ],
  args: {
  },
};
