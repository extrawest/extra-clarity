import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { EcCardComponent, EcCardModule } from '../../../projects/extra-clarity/card';

import { CardContentComponent } from './helpers/card-content.component';

type Story = StoryObj<EcCardComponent>;

export default {
  title: 'Components/Card',
  component: EcCardComponent,
  argTypes: {
    // hide editable controls for outputs (actions)
    // hide default type `EventEmitter` (without generic type)
    reload: {
      control: false,
      table: {
        type: { summary: null },
      },
    },
  },
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
    moduleMetadata({
      declarations: [],
      imports: [
        CardContentComponent,
        EcCardModule,
      ],
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
      >
        <ec-storybook-card-content />
        <ec-card-footer>
          <button class="btn btn-primary btn-sm">Action</button>
        </ec-card-footer>
      </ec-card>
    `,
  }),
} as Meta<EcCardComponent>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CardStory: Story = {
  name: 'Card',
  args: {
    empty: false,
    error: null,
    loading: false,
    title: 'Card Title',
  },
};
