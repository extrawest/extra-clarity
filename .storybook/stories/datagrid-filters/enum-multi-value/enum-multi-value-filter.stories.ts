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
  ENUM_MULTI_VALUE_FILTER_DEFAULTS,
  EnumMultiValueFilterComponent,
} from '../../../../projects/extra-clarity/datagrid-filters';
import {
  colorEnumOptions,
  hideAllControlRows,
  USERS_DATA,
  wrapFilterWithinDatagrid,
} from '../../../helpers';

type Story = StoryObj<EnumMultiValueFilterComponent<unknown>>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const MetaStory = {
  title: 'Components/Datagrid Filters/Enum Multi-Value Filter',
  component: EnumMultiValueFilterComponent,
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
        type: {
          summary: 'TemplateRef<unknown>',
        },
      },
    },
    loading: {
    },
    matchSelected: {
    },
    maxHeightPx: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: ENUM_MULTI_VALUE_FILTER_DEFAULTS.maxHeightPx,
        },
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
    serverDriven: {
    },
    showSelectedAmount: {
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
        defaultValue: {
          summary: ENUM_MULTI_VALUE_FILTER_DEFAULTS.widthPx,
        },
      },
    },
    withSearchBar: {
    },
    // OUTPUTS
    filterValueChanged: {
      control: false,
      table: {
        type: {
          summary: null,
        },
      },
    },
    // METHODS
    clearSelection: {
      control: { type: null },
    },
    isActive: {
      control: { type: null },
    },
    resetToDefault: {
      control: { type: null },
    },
    setValue: {
      control: { type: null },
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
        type: { summary: 'FilterState<E[] | null>' },
        defaultValue: {
        },
      },
    },
  },
  args: {
    loading: false,
    matchSelected: 'any',
    maxHeightPx: ENUM_MULTI_VALUE_FILTER_DEFAULTS.maxHeightPx,
    options: [],
    propertyKey: '',
    serverDriven: true,
    showSelectedAmount: false,
    stretchLabels: false,
    title: '',
    value: undefined,
    widthPx: ENUM_MULTI_VALUE_FILTER_DEFAULTS.widthPx,
    withSearchBar: false,
  },
} as Meta<EnumMultiValueFilterComponent<unknown>>;

export default MetaStory;

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
    options: colorEnumOptions,
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
        EnumMultiValueFilterComponent,
      ],
    }),
  ],
  render: (args) => ({
    props: { users: USERS_DATA, ...args },
    template: wrapFilterWithinDatagrid(`
      <ec-enum-multi-value-filter
        [options]="options"
        [propertyKey]="propertyKey"
        [customLabelTpl]="customLabelTpl"
        [loading]="loading"
        [matchSelected]="matchSelected"
        [maxHeightPx]="maxHeightPx"
        [serverDriven]="serverDriven"
        [showSelectedAmount]="showSelectedAmount"
        [stretchLabels]="stretchLabels"
        [title]="title"
        [value]="value"
        [widthPx]="widthPx"
        [withSearchBar]="withSearchBar"
        (filterValueChanged)="filterValueChanged($event)"
      />
    `, 'color'),
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
    template: wrapFilterWithinDatagrid(`
      <ec-enum-multi-value-filter
        [options]="[
          { value: 'black', label: 'Black' },
          { value: 'red', label: 'Red' },
          { value: 'green', label: 'Green' },
          { value: 'blue', label: 'Blue' },
        ]"
        [propertyKey]="'color'"
        [serverDriven]="false"
      />
    `, 'color'),
  }),
  // hide all controls since the purpose of this story is a hard-coded demo in the docs page
  argTypes: {
    ...hideAllControlRows(MetaStory.argTypes),
  },
  args: {
  },
};
