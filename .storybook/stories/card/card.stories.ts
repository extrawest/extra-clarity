import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { EcCardComponent, EcCardModule } from '../../../projects/extra-clarity/card';

import { CardContentComponent } from './helpers/card-content.component';

type Story = StoryObj<EcCardComponent>;

const meta: Meta<EcCardComponent> = {
  title: 'Components/Card',
  component: EcCardComponent,
  argTypes: {
    // hide editable controls for outputs (actions)
    // hide default type `EventEmitter` (without generic type)
    reload: {
      control: false,
      table: {
        type: { summary: '' },
      },
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
    moduleMetadata({
      declarations: [],
      imports: [CardContentComponent, EcCardModule],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <ec-card
        [title]="title"
        [empty]="empty"
        [error]="error"
        [loading]="loading"
        [spinnerSize]="spinnerSize"
      >
        <ec-storybook-card-content />
        <ec-card-footer>
          <button class="btn btn-primary btn-sm">Action</button>
        </ec-card-footer>
      </ec-card>
    `,
  }),
};

export default meta;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CardStory: Story = {
  name: 'Card',
  args: {
    empty: false,
    error: null,
    loading: false,
    title: 'Card Title',
    spinnerSize: 'md',
  },
};
