import { provideAnimations } from '@angular/platform-browser/animations';
import {
  applicationConfig,
  componentWrapperDecorator,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import {
  EcTimeRangeFilterComponent,
  TIMERANGE_FILTER_DEFAULTS,
} from '../../../../projects/extra-clarity/datagrid-filters';

import { demoPresets } from './helpers/demo-presets';

type Story = StoryObj<EcTimeRangeFilterComponent>;

const meta: Meta<EcTimeRangeFilterComponent> = {
  title: 'Components/Datagrid Filters/Time Range Filter',
  component: EcTimeRangeFilterComponent,
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
    closeOnChange: {},
    presets: {
      control: { type: 'object' },
    },
    propertyKey: {
      type: {
        name: 'string',
        required: true,
      },
    },
    serverDriven: {},
    value: {
      control: { type: 'object' },
    },
    widthPx: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: { summary: TIMERANGE_FILTER_DEFAULTS.widthPx.toString() },
      },
    },
    withCustomRange: {},
    // OUTPUTS
    filterValueChanged: {
      control: false,
      table: {
        type: { summary: '' },
      },
    },
    // METHODS
    clearSelection: {
      control: false,
    },
    isActive: {
      control: false,
    },
    resetToDefault: {
      control: false,
    },
    setValue: {
      control: false,
    },
    // GETTERS
    state: {
      name: 'state',
      description:
        `Get the actual filter state in the same shape as it's emitted to the parent datagrid. ` +
        `<br/> ` +
        `Refer to the <strong>filterValueChanged</strong> output's description for more details.`,
      control: false,
      table: {
        category: 'Getters',
        type: { summary: 'EcFilterState<EcTimeRangeFilterValue>' },
        defaultValue: {
        },
      },
    },
  },
  args: {
    closeOnChange: false,
    serverDriven: true,
    value: undefined,
    widthPx: TIMERANGE_FILTER_DEFAULTS.widthPx,
  },
};

export default meta;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FilterItselfStory: Story = {
  name: 'Story: Filter itself',
  decorators: [
    componentWrapperDecorator((story) => `
      <div style="
        max-width: fit-content;
        border: 1px solid whitesmoke;
      ">
        ${story}
      </div>
    `),
  ],
  args: {
    presets: demoPresets,
    propertyKey: 'timestamp',
    withCustomRange: true,
  },
};
