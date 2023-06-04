import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { StorybookConfirmationDialogComponent } from './helpers/confirmation-dialog.component';

type Story = StoryObj<StorybookConfirmationDialogComponent>;

const PARAMETERS_CATEGORY = { table: { category: 'Parameters' } };

export default {
  title: 'Components/Confirmation Dialog',
  component: StorybookConfirmationDialogComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
  ],
  argTypes: {
    type: PARAMETERS_CATEGORY,
    size: PARAMETERS_CATEGORY,
    title: PARAMETERS_CATEGORY,
    message: PARAMETERS_CATEGORY,
    closable: PARAMETERS_CATEGORY,
    closableBackdrop: PARAMETERS_CATEGORY,
    rejectBtnHidden: PARAMETERS_CATEGORY,
    rejectBtn: PARAMETERS_CATEGORY,
    acceptBtn: PARAMETERS_CATEGORY,
    acceptBtnLabel: PARAMETERS_CATEGORY,
    rejectBtnLabel: PARAMETERS_CATEGORY,
    template: PARAMETERS_CATEGORY,
  },
} as Meta<StorybookConfirmationDialogComponent>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfirmationDialogStory: Story = {
  name: 'Confirmation Dialog',
  args: {
    // see the 'ConfirmDialogConfig' class for more details
    type: 'confirm',
    size: 'md',
    title: 'Title',
    message: 'Test confirmation dialog message...',
    closable: true,
    closableBackdrop: true,
    rejectBtnHidden: false,
    rejectBtn: {
      label: 'Reject',
      icon: '',
      classes: 'btn-secondary',
    },
    acceptBtn: {
      label: 'Accept',
      icon: '',
      classes: 'btn-primary',
    },
    acceptBtnLabel: '',
    rejectBtnLabel: '',
  },
  argTypes: {
    template: {
      // hide editable control
      // hide default type `TemplateRef` (without generic type)
      control: false,
      table: {
        type: { summary: null },
      },
    },
  },
};
