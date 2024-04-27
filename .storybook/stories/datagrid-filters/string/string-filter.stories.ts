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
  EcStringFilterComponent,
  STRING_FILTER_DEFAULTS,
} from '../../../../projects/extra-clarity/datagrid-filters';
import {
  hideAllControlRows,
  USERS_DATA,
  wrapFilterWithinDatagrid,
} from '../../../helpers';

type Story = StoryObj<EcStringFilterComponent>;

const SUBCATEGORY_VALIDATION = 'Validation';

// eslint-disable-next-line @typescript-eslint/naming-convention
const MetaStory = {
  title: 'Components/Datagrid Filters/String Filter',
  component: EcStringFilterComponent,
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
    caseSensitive: {
    },
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
    helperMessage: {
    },
    placeholder: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: STRING_FILTER_DEFAULTS.placeholder,
        },
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
    value: {
    },
    usePlaceholderAsHelperText: {
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
      // hide auto generated control type
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
    // GETTERS: add explicit controls as compodoc does not generate it
    state: {
      name: 'state',
      description:
        `Get the actual filter state in the same shape as it's emitted to the parent datagrid. ` +
        `<br/> ` +
        `Refer to the <strong>filterValueChanged</strong> output's description for more details.`,
      control: false,
      table: {
        category: 'Getters',
        type: { summary: 'EcFilterState<string>' },
        defaultValue: {
        },
      },
    },
  },
  args: {
    caseSensitive: false,
    debounceTimeMs: STRING_FILTER_DEFAULTS.debounceTimeMs,
    fullMatch: false,
    helperMessage: 'Searching...',
    placeholder: STRING_FILTER_DEFAULTS.placeholder,
    usePlaceholderAsHelperText: false,
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
} as Meta<EcStringFilterComponent>;

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
        EcStringFilterComponent,
      ],
    }),
  ],
  render: (args) => ({
    props: { users: USERS_DATA, ...args },
    template: wrapFilterWithinDatagrid(`
      <ec-string-filter
        [propertyKey]="propertyKey"
        [caseSensitive]="caseSensitive"
        [debounceTimeMs]="debounceTimeMs"
        [fullMatch]="fullMatch"
        [helperMessage]="helperMessage"
        [placeholder]="placeholder"
        [usePlaceholderAsHelperText]="usePlaceholderAsHelperText"
        [serverDriven]="serverDriven"
        [value]="value"
        [widthPx]="widthPx"
        [maxLength]="maxLength"
        [minLength]="minLength"
        [pattern]="pattern"
        [patternErrMsg]="patternErrMsg"
        [validator]="validator"
        (filterValueChanged)="filterValueChanged($event)"
      />
    `, 'name'),
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
    props: { users: USERS_DATA, ...args },
    template: wrapFilterWithinDatagrid(`
      <ec-string-filter
        [propertyKey]="'name'"
        [serverDriven]="false"
        [maxLength]="10"
      />
    `, 'name'),
  }),
  // hide all controls since the purpose of this story is a hard-coded demo in the docs page
  argTypes: {
    ...hideAllControlRows(MetaStory.argTypes),
  },
  args: {
  },
};
