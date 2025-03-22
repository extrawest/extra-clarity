import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ClrDatagridModule } from '@clr/angular';
import {
  applicationConfig,
  componentWrapperDecorator,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';

import {
  EcEnumGroupedValueFilterComponent,
  EcShowSelected,
  ENUM_GROUPED_VALUE_FILTER_DEFAULTS,
} from '../../../../projects/extra-clarity/datagrid-filters';
import {
  colorGroupedEnumOptions,
  hideAllControlRows,
  USERS_DATA,
  wrapFilterWithinDatagrid,
} from '../../../helpers';

type Story = StoryObj<EcEnumGroupedValueFilterComponent<unknown>>;

const meta: Meta<EcEnumGroupedValueFilterComponent<unknown>> = {
  title: 'Components/Datagrid Filters/Enum Grouped-Value Filter',
  component: EcEnumGroupedValueFilterComponent,
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
    customLabelTpl: {
      control: false,
      table: {
        type: { summary: '' },
      },
    },
    expandedAll: {
    },
    loading: {
    },
    matchSelected: {
    },
    maxHeightPx: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: { summary: ENUM_GROUPED_VALUE_FILTER_DEFAULTS.maxHeightPx.toString() },
      },
    },
    options: {
      type: {
        required: true,
        name: 'other',
        value: '[]',
      },
    },
    propertyKey: {
      type: {
        name: 'string',
        required: true,
      },
    },
    searchBarForAmount: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: { summary: ENUM_GROUPED_VALUE_FILTER_DEFAULTS.searchBarForAmount.toString() },
      },
    },
    serverDriven: {
    },
    showSelectedAmount: {
      control: {
        type: 'radio',
        labels: ['Never', 'Always', 'WithSearchbar'],
      },
      options: [EcShowSelected.Never, EcShowSelected.Always, EcShowSelected.WithSearchbar],
    },
    stretchLabels: {
    },
    title: {
      // set type: 'text' explicitly to show an empty input field without double quotes
      control: { type: 'text' },
    },
    value: {
      control: { type: 'object' },
    },
    widthPx: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: { summary: ENUM_GROUPED_VALUE_FILTER_DEFAULTS.widthPx.toString() },
      },
    },
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
        type: { summary: 'EcFilterState<E[]>' },
        defaultValue: {
        },
      },
    },
  },
  args: {
    expandedAll: false,
    loading: false,
    matchSelected: 'any',
    maxHeightPx: ENUM_GROUPED_VALUE_FILTER_DEFAULTS.maxHeightPx,
    options: [],
    propertyKey: '',
    searchBarForAmount: ENUM_GROUPED_VALUE_FILTER_DEFAULTS.searchBarForAmount,
    serverDriven: true,
    showSelectedAmount: EcShowSelected.WithSearchbar,
    stretchLabels: false,
    title: '',
    value: undefined,
    widthPx: ENUM_GROUPED_VALUE_FILTER_DEFAULTS.widthPx,
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
    options: colorGroupedEnumOptions,
    propertyKey: 'color',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const WithinDatagridStory: Story = {
  name: 'Story: With datagrid',
  decorators: [
    moduleMetadata({
      imports: [
        ClrDatagridModule,
        CommonModule,
        EcEnumGroupedValueFilterComponent,
      ],
    }),
  ],
  render: (args) => ({
    props: { users: USERS_DATA, ...args },
    template: wrapFilterWithinDatagrid(`
      <ec-enum-grouped-value-filter
        [options]="options"
        [propertyKey]="propertyKey"
        [customLabelTpl]="customLabelTpl"
        [expandedAll]="expandedAll"
        [loading]="loading"
        [matchSelected]="matchSelected"
        [maxHeightPx]="maxHeightPx"
        [searchBarForAmount]="searchBarForAmount"
        [serverDriven]="serverDriven"
        [showSelectedAmount]="showSelectedAmount"
        [stretchLabels]="stretchLabels"
        [title]="title"
        [value]="value"
        [widthPx]="widthPx"
        (filterValueChanged)="filterValueChanged($event)"
      />
    `, 'color'),
  }),
  args: {
    propertyKey: 'color',
    serverDriven: false,
    options: colorGroupedEnumOptions,
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DocsExampleStory: Story = {
  name: 'Story: Example for docs',
  decorators: WithinDatagridStory.decorators,
  render: (args) => ({
    props: { users: USERS_DATA, ...args },
    template: wrapFilterWithinDatagrid(`
      <ec-enum-grouped-value-filter
        [options]="[
          {
            label: 'Grayscale',
            items: [
              { value: 'black', label: 'Black' },
              { value: 'white', label: 'White' },
              { value: 'gray', label: 'Gray' },
              { value: 'silver', label: 'Silver' },
            ],
          },
          {
            label: 'Rainbow',
            items: [
              { value: 'red', label: 'Red' },
              { value: 'orange', label: 'Orange' },
              { value: 'yellow', label: 'Yellow' },
              { value: 'green', label: 'Green' },
              { value: 'blue', label: 'Blue' },
              { value: 'indigo', label: 'Indigo' },
              { value: 'violet', label: 'Violet' },
            ],
          },
        ]"
        [propertyKey]="'color'"
        [serverDriven]="false"
      />
    `, 'color'),
  }),
  // hide all controls since the purpose of this story is a hard-coded demo in the docs page
  argTypes: {
    ...hideAllControlRows(meta.argTypes),
  },
  args: {
  },
};
