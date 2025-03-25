import { provideAnimations } from '@angular/platform-browser/animations';

import {
  type Meta,
  type StoryObj,
  applicationConfig,
  componentWrapperDecorator,
} from '@storybook/angular';

import {
  EcAnchorToContentAlign,
  EcContentPosition,
  EcPopoverToggleButtonStatus,
  EcPopoverToggleButtonStyle,
} from '@extrawest/extra-clarity/popover-toggle';
import {
  EcTimeRangeFilterToggleComponent,
  TIMERANGE_FILTER_TOGGLE_DEFAULTS,
} from '@extrawest/extra-clarity/time-range-filter-toggle';

import { hideAutoGeneratedControlType } from '../../../helpers';
import popoverToggleMeta from '../../popover-toggle/popover-toggle.stories';

import { demoPresets } from './helpers/demo-presets';

type Story = StoryObj<EcTimeRangeFilterToggleComponent>;

const SUBCATEGORY_FILTER = 'Passed to EcTimeRangeFilter';
const SUBCATEGORY_TOGGLE = 'Passed to EcPopoverToggle';

const meta: Meta<EcTimeRangeFilterToggleComponent> = {
  title: 'Components/Datagrid Filters/Time Range Filter (External)',
  component: EcTimeRangeFilterToggleComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    // INPUTS
    labelLocale: {},
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
        defaultValue: { summary: TIMERANGE_FILTER_TOGGLE_DEFAULTS.widthPx.toString() },
        subcategory: SUBCATEGORY_FILTER,
      },
    },
    withTime: {
      table: { subcategory: SUBCATEGORY_FILTER },
    },
    // Inputs passed to EcPopoverToggleComponent
    anchorToContentAlign: {
      table: { subcategory: SUBCATEGORY_TOGGLE },
      control: popoverToggleMeta.argTypes?.anchorToContentAlign?.['control'],
      options: popoverToggleMeta.argTypes?.anchorToContentAlign?.['options'],
    },
    contentPosition: {
      table: { subcategory: SUBCATEGORY_TOGGLE },
      control: popoverToggleMeta.argTypes?.contentPosition?.['control'],
      options: popoverToggleMeta.argTypes?.contentPosition?.['options'],
    },
    btnDisabled: {
      table: { subcategory: SUBCATEGORY_TOGGLE },
    },
    btnSmall: {
      table: { subcategory: SUBCATEGORY_TOGGLE },
    },
    btnStatus: {
      table: { subcategory: SUBCATEGORY_TOGGLE },
      control: popoverToggleMeta.argTypes?.btnStatus?.['control'],
      options: popoverToggleMeta.argTypes?.btnStatus?.['options'],
    },
    btnStyle: {
      table: { subcategory: SUBCATEGORY_TOGGLE },
      control: popoverToggleMeta.argTypes?.btnStyle?.['control'],
      options: popoverToggleMeta.argTypes?.btnStyle?.['options'],
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
      control: false,
      ...hideAutoGeneratedControlType,
    },
    openChange: {
      control: false,
      ...hideAutoGeneratedControlType,
    },
    // METHODS
    resetToDefault: {
      control: false,
    },
    setValue: {
      control: false,
    },
    // GETTERS: add explicit controls as compodoc does not generate it
    state: {
      control: false,
      table: {
        category: 'Getters',
        defaultValue: {},
        type: { summary: '{ isActive: boolean; state: EcFilterState<EcTimeRangeFilterValue> }' },
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
    withTime: true,
    anchorToContentAlign: EcAnchorToContentAlign.StartToStart,
    contentPosition: EcContentPosition.Bottom,
    btnDisabled: false,
    btnSmall: true,
    btnStatus: EcPopoverToggleButtonStatus.Primary,
    btnStyle: EcPopoverToggleButtonStyle.Outline,
    closeOnClickOutside: true,
    closeOnScroll: true,
    open: false,
    labelLocale: 'en-US',
  },
};

export default meta;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ComponentItselfStory: Story = {
  name: 'Story: Component itself',
  decorators: [
    componentWrapperDecorator(
      (story) => `
      <div style="width: 100%">
        <div style="
          max-width: 15rem;
          width: fit-content;
          margin: 2rem auto 0;
        ">
          ${story}
        </div>
      </div>
    `,
    ),
  ],
  args: {},
};
