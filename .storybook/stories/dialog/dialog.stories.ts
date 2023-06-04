import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { StorybookDialogCallerComponent } from './helpers/dialog-caller.component';

type Story = StoryObj<StorybookDialogCallerComponent>;

const PARAMETERS_CATEGORY = { table: { category: 'Parameters' } };

export default {
  title: 'Components/Dialog',
  component: StorybookDialogCallerComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
  ],
  argTypes: {
    size: PARAMETERS_CATEGORY,
    closable: PARAMETERS_CATEGORY,
    closableBackdrop: PARAMETERS_CATEGORY,
  },
} as Meta<StorybookDialogCallerComponent>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DialogStory: Story = {
  name: 'Dialog',
  args: {
    // see the 'DialogConfig' class for more details
    size: 'md',
    closable: true,
    closableBackdrop: true,
  },
};
