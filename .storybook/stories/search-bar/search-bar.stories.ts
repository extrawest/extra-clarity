import { provideAnimations } from '@angular/platform-browser/animations';
import {
  applicationConfig,
  componentWrapperDecorator,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import {
  EcSearchBarComponent,
  SEARCH_BAR_DEFAULTS,
} from '../../../projects/extra-clarity/search-bar';

type Story = StoryObj<EcSearchBarComponent>;

const meta: Meta<EcSearchBarComponent> = {
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
        defaultValue: { summary: SEARCH_BAR_DEFAULTS.debounceTimeMs.toString() },
      },
    },
    highlightActive: {
    },
    iconOnFill: {
    },
    isDisabled: {
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
      control: false,
      table: {
        type: { summary: '' },
      },
    },
    // METHODS
    clearInput: {
      control: false,
    },
    focusSearchBar: {
      control: false,
    },
  },
  args: {
    debounceMs: SEARCH_BAR_DEFAULTS.debounceTimeMs,
    highlightActive: false,
    iconOnFill: '',
    isDisabled: false,
    label: '',
    placeholder: SEARCH_BAR_DEFAULTS.placeholder,
    value: '',
  },
};

export default meta;

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
