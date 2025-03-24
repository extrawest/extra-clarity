import { provideAnimations } from '@angular/platform-browser/animations';

import { type Meta, type StoryObj, applicationConfig } from '@storybook/angular';

import { StorybookDialogCallerComponent } from './helpers/dialog-caller.component';

type Story = StoryObj<StorybookDialogCallerComponent>;

const PARAMETERS_CATEGORY = { table: { category: 'Parameters' } };

const meta: Meta<StorybookDialogCallerComponent> = {
  title: 'Components/Dialog',
  component: StorybookDialogCallerComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {
    size: PARAMETERS_CATEGORY,
    closable: PARAMETERS_CATEGORY,
    closableBackdrop: PARAMETERS_CATEGORY,
  },
};

export default meta;

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
