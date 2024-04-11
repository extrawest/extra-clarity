import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ClrInputModule } from '@clr/angular';
import {
  applicationConfig,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';

import {
  BUTTON_DEFAULTS,
  EcButtonCopyToClipboardComponent,
} from '../../../projects/extra-clarity/button-copy-to-clipboard';
import { hideAllControlRows } from '../../helpers';

type Story = StoryObj<EcButtonCopyToClipboardComponent>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const MetaStory = {
  title: 'Components/Button Copy-to-Clipboard',
  component: EcButtonCopyToClipboardComponent,
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
    disabled: {
    },
    heightPx: {
      table: {
        defaultValue: {
          summary: null,
        },
      },
    },
    iconSizePx: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: BUTTON_DEFAULTS.iconSizePx,
        },
      },
    },
    label: {
      type: 'string',
    },
    labelFontSizePx: {
      table: {
        defaultValue: {
          summary: null,
        },
      },
    },
    sizePx: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: BUTTON_DEFAULTS.buttonSizePx,
        },
      },
    },
    textToCopy: {
      type: {
        name: 'string',
        required: true,
      },
    },
    title: {
      table: {
        // set default value explicitly as compodoc shows only a constant name
        defaultValue: {
          summary: BUTTON_DEFAULTS.title,
        },
      },
    },
    widthPx: {
      table: {
        defaultValue: {
          summary: null,
        },
      },
    },
    withAnimation: {
    },
    withBorder: {
    },
    // OUTPUTS
    copied: {
      control: false,
      // override auto generated control type
      table: {
        type: {
          summary: 'EventEmitter<string>',
        },
      },
    },
    failed: {
      control: false,
      // override auto generated control type
      table: {
        type: {
          summary: 'EventEmitter<unknown>',
        },
      },
    },
  },
  args: {
    disabled: false,
    // heightPx: 24,
    iconSizePx: BUTTON_DEFAULTS.iconSizePx,
    label: '',
    // labelFontSizePx: 12,
    sizePx: BUTTON_DEFAULTS.buttonSizePx,
    textToCopy: 'Hello World!',
    title: BUTTON_DEFAULTS.title,
    // widthPx: 24,
    withAnimation: true,
    withBorder: false,
  },
} as Meta<EcButtonCopyToClipboardComponent>;

export default MetaStory;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ButtonItselfStory: Story = {
  name: 'Story: Button itself',
  args: {
    textToCopy: 'Hello World',
    withBorder: true,
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DocsExampleStory: Story = {
  name: 'Story: Example for docs',
  decorators: [
    moduleMetadata({
      imports: [
        EcButtonCopyToClipboardComponent,
        ClrInputModule,
        CommonModule,
        FormsModule,
      ],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <style>
        .clr-form-control {
          margin-top: 0;
          width: 12.5rem;
        }
        input {
          width: 12.5rem;
        }
        .demo-container {
          display: flex;
          gap: .25rem;
        }
      </style>
      <div class="demo-container">
        <clr-input-container>
          <input clrInput [(ngModel)]="text" placeholder="Enter a string to be copied" />
        </clr-input-container>
        <ec-button-copy-to-clipboard [textToCopy]="text" />
      </div>
    `,
  }),
  // hide all controls since the purpose of this story is a hard-coded demo in the docs page
  argTypes: {
    ...hideAllControlRows(MetaStory.argTypes),
  },
  args: {
  },
};
