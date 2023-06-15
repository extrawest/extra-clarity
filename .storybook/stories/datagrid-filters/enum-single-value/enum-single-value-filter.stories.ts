import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ClrDatagridModule } from '@clr/angular';
import {
  applicationConfig,
  componentWrapperDecorator,
  type Meta, moduleMetadata,
  type StoryObj,
} from '@storybook/angular';

import {
  ENUM_SINGLE_VALUE_FILTER_DEFAULTS,
  EnumSingleValueFilterComponent,
} from '../../../../projects/extra-clarity/datagrid-filters';
import { hideAllControlRows } from '../../../helpers/arg-types';
import { colorEnumOptions, USERS_DATA } from '../helpers/mocks';

type Story = StoryObj<EnumSingleValueFilterComponent<unknown>>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const MetaStory = {
  title: 'Components/Datagrid Filters/Enum Single-Value Filter',
  component: EnumSingleValueFilterComponent,
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
    maxHeightPx: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: ENUM_SINGLE_VALUE_FILTER_DEFAULTS.maxHeightPx,
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
    showSelectedValue: {
    },
    title: {
      // set type: 'text' explicitly to show an empty input field without double quotes
      control: { type: 'text' },
    },
    value: {
      control: { type: 'text' },
      type: {
        name: 'string',
      },
    },
    widthPx: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: ENUM_SINGLE_VALUE_FILTER_DEFAULTS.widthPx,
        },
      },
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
    isActive: {
      control: { type: null },
    },
    resetToDefault: {
      control: { type: null },
    },
    setValue: {
      control: { type: null },
    },
    unselectAll: {
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
        type: { summary: 'FilterState<E | null>' },
        defaultValue: {
        },
      },
    },
  },
  args: {
    loading: false,
    maxHeightPx: ENUM_SINGLE_VALUE_FILTER_DEFAULTS.maxHeightPx,
    options: [],
    propertyKey: '',
    serverDriven: true,
    showSelectedValue: false,
    title: '',
    value: undefined,
    widthPx: ENUM_SINGLE_VALUE_FILTER_DEFAULTS.widthPx,
  },
} as Meta<EnumSingleValueFilterComponent<unknown>>;

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
        EnumSingleValueFilterComponent,
      ],
    }),
  ],
  render: (args) => ({
    props: { users: USERS_DATA, ...args },
    template: wrapFilterWithinDatagrid(`
      <ec-enum-single-value-filter
        [options]="options"
        [propertyKey]="propertyKey"
        [customLabelTpl]="customLabelTpl"
        [loading]="loading"
        [maxHeightPx]="maxHeightPx"
        [serverDriven]="serverDriven"
        [showSelectedValue]="showSelectedValue"
        [title]="title"
        [value]="value"
        [widthPx]="widthPx"
        (filterValueChanged)="filterValueChanged($event)"
      />
    `),
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
    `),
  }),
  // hide all controls since the purpose of this story is a hard-coded demo in the docs page
  argTypes: {
    ...hideAllControlRows(MetaStory.argTypes),
  },
  args: {
    options: colorEnumOptions,
  },
};

const wrapFilterWithinDatagrid = (filterTemplate: string): string => `
  <clr-datagrid>
    <clr-dg-placeholder>
      No data found for the selected filter settings
    </clr-dg-placeholder>

    <clr-dg-column> User ID </clr-dg-column>
    <clr-dg-column> Name </clr-dg-column>
    <clr-dg-column> Creation date </clr-dg-column>
    <clr-dg-column>
      Favorite color
      <clr-dg-filter>
        ${filterTemplate}
      </clr-dg-filter>
    </clr-dg-column>

    <clr-dg-row *clrDgItems="let user of users" [clrDgItem]="user">
      <clr-dg-cell>{{ user.id }}</clr-dg-cell>
      <clr-dg-cell>{{ user.name }}</clr-dg-cell>
      <clr-dg-cell>{{ user.createdAt | date }}</clr-dg-cell>
      <clr-dg-cell>{{ user.color }}</clr-dg-cell>
    </clr-dg-row>

    <clr-dg-footer>{{ users.length }} users</clr-dg-footer>
  </clr-datagrid>
`;
