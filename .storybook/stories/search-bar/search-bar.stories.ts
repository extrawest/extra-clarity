import { provideAnimations } from '@angular/platform-browser/animations';
import {
  applicationConfig,
  componentWrapperDecorator,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { SEARCH_BAR_DEFAULTS, EcSearchBarComponent } from '../../../projects/extra-clarity/search-bar';

type Story = StoryObj<EcSearchBarComponent>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const MetaStory = {
  title: 'Components/Search Bar',
  component: EcSearchBarComponent,
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
    debounceMs: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: SEARCH_BAR_DEFAULTS.debounceTimeMs,
        },
      },
    },
    highlightActive: {
    },
    iconOnFill: {
    },
    label: {
    },
    placeholder: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: SEARCH_BAR_DEFAULTS.placeholder,
        },
      },
    },
    value: {
    },
    // OUTPUTS
    valueChange: {
      control: { type: null },
      table: {
        type: {
          summary: null,
        },
      },
    },
    // METHODS
    clearInput: {
      control: { type: null },
    },
    focusSearchBar: {
      control: { type: null },
    },
  },
  args: {
    debounceMs: SEARCH_BAR_DEFAULTS.debounceTimeMs,
    highlightActive: false,
    iconOnFill: '',
    label: '',
    placeholder: SEARCH_BAR_DEFAULTS.placeholder,
    value: '',
  },
} as Meta<EcSearchBarComponent>;

export default MetaStory;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ComponentItselfStory: Story = {
  name: 'Story: Component Itself',
  decorators: [
    componentWrapperDecorator((story) => `
      <div style="
        border: 1px solid whitesmoke;
        width: 10rem;
      ">
        ${story}
      </div>
    `),
  ],
  args: {
  },
};
