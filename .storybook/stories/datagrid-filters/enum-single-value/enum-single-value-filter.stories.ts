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
  EcEnumSingleValueFilterComponent,
  EcShowSelected,
  ENUM_SINGLE_VALUE_FILTER_DEFAULTS,
} from '../../../../projects/extra-clarity/datagrid-filters';
import {
  colorEnumOptions,
  hideAllControlRows,
  hideAutoGeneratedControlType,
  USERS_DATA,
  wrapFilterWithinDatagrid,
} from '../../../helpers';

type Story = StoryObj<EcEnumSingleValueFilterComponent<unknown>>;

const meta: Meta<EcEnumSingleValueFilterComponent<unknown>> = {
  title: 'Components/Datagrid Filters/Enum Single-Value Filter',
  component: EcEnumSingleValueFilterComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    // INPUTS
    categories: {
      type: {
        name: 'other',
        value: '[]',
      },
    },
    closeOnChange: {},
    customLabelTpl: {
      control: false,
      ...hideAutoGeneratedControlType,
    },
    loading: {},
    maxHeightPx: {
      table: {
        defaultValue: { summary: ENUM_SINGLE_VALUE_FILTER_DEFAULTS.maxHeightPx.toString() },
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
        defaultValue: { summary: ENUM_SINGLE_VALUE_FILTER_DEFAULTS.searchBarForAmount.toString() },
      },
    },
    serverDriven: {},
    showSelectedValue: {
      control: {
        type: 'radio',
        labels: ['Never', 'Always', 'WithSearchbar'],
      },
      options: [EcShowSelected.Never, EcShowSelected.Always, EcShowSelected.WithSearchbar],
    },
    stretchLabels: {},
    title: {
      // set type: 'text' explicitly to show an empty input field without double quotes
      control: { type: 'text' },
    },
    value: {
      control: { type: 'object' },
    },
    widthPx: {
      table: {
        defaultValue: { summary: ENUM_SINGLE_VALUE_FILTER_DEFAULTS.widthPx.toString() },
      },
    },
    // OUTPUTS
    filterValueChanged: {
      control: false,
      ...hideAutoGeneratedControlType,
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
    // GETTERS: add explicit controls as compodoc does not generate it
    state: {
      control: false,
      description:
        `Get the actual filter state in the same shape as it's emitted to the parent datagrid. ` +
        `<br/> ` +
        `Refer to the <strong>filterValueChanged</strong> output's description for more details.`,
      table: {
        category: 'Getters',
        defaultValue: {},
        type: { summary: 'EcFilterState<E | null>' },
      },
    },
  },
  args: {
    categories: [],
    closeOnChange: false,
    loading: false,
    maxHeightPx: ENUM_SINGLE_VALUE_FILTER_DEFAULTS.maxHeightPx,
    options: [],
    propertyKey: '',
    searchBarForAmount: ENUM_SINGLE_VALUE_FILTER_DEFAULTS.searchBarForAmount,
    serverDriven: true,
    showSelectedValue: EcShowSelected.WithSearchbar,
    stretchLabels: false,
    title: '',
    value: undefined,
    widthPx: ENUM_SINGLE_VALUE_FILTER_DEFAULTS.widthPx,
  },
};

export default meta;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FilterItselfStory: Story = {
  name: 'Story: Filter itself',
  decorators: [
    componentWrapperDecorator(
      (story) => `
      <div style="
        max-width: fit-content;
        border: 1px solid whitesmoke;
      ">
        ${story}
      </div>
    `,
    ),
  ],
  args: {
    options: colorEnumOptions,
    propertyKey: 'color',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const WithinDatagridStory: Story = {
  name: 'Story: With datagrid',
  decorators: [
    moduleMetadata({
      imports: [ClrDatagridModule, CommonModule, EcEnumSingleValueFilterComponent],
    }),
  ],
  render: (args) => ({
    props: { users: USERS_DATA, ...args },
    template: wrapFilterWithinDatagrid(
      `
      <ec-enum-single-value-filter
        [options]="options"
        [propertyKey]="propertyKey"
        [categories]="categories"
        [closeOnChange]="closeOnChange"
        [customLabelTpl]="customLabelTpl"
        [loading]="loading"
        [maxHeightPx]="maxHeightPx"
        [searchBarForAmount]="searchBarForAmount"
        [serverDriven]="serverDriven"
        [showSelectedValue]="showSelectedValue"
        [stretchLabels]="stretchLabels"
        [title]="title"
        [value]="value"
        [widthPx]="widthPx"
        (filterValueChanged)="filterValueChanged($event)"
      />
    `,
      'color',
    ),
  }),
  args: {
    propertyKey: 'color',
    serverDriven: false,
    options: colorEnumOptions,
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DocsExampleStory: Story = {
  name: 'Story: Example for docs',
  decorators: WithinDatagridStory.decorators,
  render: (args) => ({
    props: { users: USERS_DATA, ...args },
    template: wrapFilterWithinDatagrid(
      `
      <ec-enum-single-value-filter
        [options]="[
          { value: 'black', label: 'Black' },
          { value: 'red', label: 'Red' },
          { value: 'green', label: 'Green' },
          { value: 'blue', label: 'Blue' },
        ]"
        [propertyKey]="'color'"
        [serverDriven]="false"
      />
    `,
      'color',
    ),
  }),
  // hide all controls since the purpose of this story is a hard-coded demo in the docs page
  argTypes: {
    ...hideAllControlRows(meta.argTypes),
  },
  args: {},
};
