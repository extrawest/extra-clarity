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
  DatagridStringFilterComponent,
  STRING_FILTER_DEFAULTS,
} from '../../../../projects/extra-clarity/datagrid-filters';
import { hideAllControlRows, hideAutoGeneratedControlType } from '../../../helpers/arg-types';
import { USERS_DATA } from '../helpers/mocks';

type Story = StoryObj<DatagridStringFilterComponent>;

const SUBCATEGORY_VALIDATION = 'Validation';

// eslint-disable-next-line @typescript-eslint/naming-convention
const MetaStory = {
  title: 'Components/Datagrid Filters/String Filter',
  component: DatagridStringFilterComponent,
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
    debounceTimeMs: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: STRING_FILTER_DEFAULTS.debounceTimeMs,
        },
      },
    },
    fullMatch: {
    },
    placeholder: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: STRING_FILTER_DEFAULTS.placeholder,
        },
      },
    },
    propertyDisplayName: {
    },
    propertyKey: {
      type: {
        name: 'string',
        required: true,
      },
    },
    serverDriven: {
      type: {
        name: 'boolean',
        required: true,
      },
    },
    value: {
    },
    widthPx: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: STRING_FILTER_DEFAULTS.widthPx,
        },
      },
    },
    // INPUTS - Validation subcategory
    maxLength: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: STRING_FILTER_DEFAULTS.maxLength,
        },
        subcategory: SUBCATEGORY_VALIDATION,
      },
    },
    minLength: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: STRING_FILTER_DEFAULTS.minLength,
        },
        subcategory: SUBCATEGORY_VALIDATION,
      },
    },
    pattern: {
      // set type: 'text' explicitly to show an empty input field without double quotes
      control: { type: 'text' },
      table: {
        subcategory: SUBCATEGORY_VALIDATION,
      },
    },
    patternErrMsg: {
      table: {
        subcategory: SUBCATEGORY_VALIDATION,
      },
    },
    validator: {
      // add selector for enum values
      options: [undefined, 'email', 'pattern', 'uuid'],
      control: { type: 'radio' },
      table: {
        subcategory: SUBCATEGORY_VALIDATION,
      },
    },
    // OUTPUTS
    filterValueChanged: {
      control: false,
      ...hideAutoGeneratedControlType,
    },
    // METHODS
    resetToDefault: {
      control: { type: null },
    },
    // GETTERS: add explicit controls as compodoc does not generate it
    filterValue: {
      name: 'filterValue',
      description: 'Get the actual filter value as a string',
      control: false,
      table: {
        category: 'Getters',
        type: { summary: 'string' },
        defaultValue: {
        },
      },
    },
    state: {
      name: 'state',
      description: 'Get the actual filter state in the same shape as it\'s emitted to the parent datagrid',
      control: false,
      table: {
        category: 'Getters',
        type: { summary: 'FilterState<string>' },
        defaultValue: {
        },
      },
    },
  },
  args: {
    debounceTimeMs: STRING_FILTER_DEFAULTS.debounceTimeMs,
    fullMatch: false,
    placeholder: STRING_FILTER_DEFAULTS.placeholder,
    propertyDisplayName: '',
    propertyKey: '',
    serverDriven: true,
    value: '',
    widthPx: STRING_FILTER_DEFAULTS.widthPx,
    maxLength: STRING_FILTER_DEFAULTS.maxLength,
    minLength: STRING_FILTER_DEFAULTS.minLength,
    pattern: '',
    patternErrMsg: '',
    validator: undefined,
  },
} as Meta<DatagridStringFilterComponent>;

export default MetaStory;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FilterItselfStory: Story = {
  name: 'Story: Filter itself',
  decorators: [
    componentWrapperDecorator((story) => `
      <div style="
        max-width: fit-content;
        border: 1px solid whitesmoke
      ">
        ${story}
      </div>
    `),
  ],
  args: {
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
        DatagridStringFilterComponent,
      ],
    }),
  ],
  render: (args) => ({
    props: { users: USERS_DATA, ...args },
    template: wrapFilterWithinDatagrid(`
      <ec-datagrid-string-filter
        [propertyKey]="propertyKey"
        [serverDriven]="serverDriven"
        [debounceTimeMs]="debounceTimeMs"
        [fullMatch]="fullMatch"
        [placeholder]="placeholder"
        [propertyDisplayName]="propertyDisplayName"
        [value]="value"
        [widthPx]="widthPx"
        [maxLength]="maxLength"
        [minLength]="minLength"
        [pattern]="pattern"
        [patternErrMsg]="patternErrMsg"
        [validator]="validator"
        (filterValueChanged)="filterValueChanged($event)"
      />
    `),
  }),
  args: {
    propertyKey: 'name',
    serverDriven: false,
    maxLength: 10,
    minLength: 2,
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DocsExampleStory: Story = {
  name: 'Story: Example for docs',
  decorators: WithinDatagridStory.decorators,
  render: (args) => ({
    props: { users: USERS_DATA },
    template: wrapFilterWithinDatagrid(`
      <ec-datagrid-string-filter
        [propertyKey]="'name'"
        [serverDriven]="false"
        [maxLength]="10"
      />
    `),
  }),
  // hide all controls since the purpose of this story is a hard-coded demo in the docs page
  argTypes: {
    ...hideAllControlRows(MetaStory.argTypes),
  },
  args: {
  },
};

const wrapFilterWithinDatagrid = (filterTemplate: string): string => `
  <clr-datagrid>
    <clr-dg-column> User ID </clr-dg-column>
    <clr-dg-column>
      <ng-container> Name </ng-container>
      <clr-dg-filter>
        ${filterTemplate}
      </clr-dg-filter>
    </clr-dg-column>
    <clr-dg-column> Creation date </clr-dg-column>
    <clr-dg-column> Favorite color </clr-dg-column>

    <clr-dg-row *clrDgItems="let user of users" [clrDgItem]="user">
      <clr-dg-cell>{{ user.id }}</clr-dg-cell>
      <clr-dg-cell>{{ user.name }}</clr-dg-cell>
      <clr-dg-cell>{{ user.createdAt | date }}</clr-dg-cell>
      <clr-dg-cell>{{ user.color }}</clr-dg-cell>
    </clr-dg-row>

    <clr-dg-footer>{{ users.length }} users</clr-dg-footer>
  </clr-datagrid>
`;
