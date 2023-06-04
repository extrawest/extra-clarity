import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { NOTIFICATION_DEFAULT_CONFIG } from '../../../projects/extra-clarity/notification/src/constants';

import { NotificationDemoComponent } from './helpers/notification-demo.component';

type Story = StoryObj<NotificationDemoComponent>;

const PARAMETERS_CATEGORY = 'Parameters';

export default {
  title: 'Components/Notification',
  component: NotificationDemoComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
  ],
  argTypes: {
    position: {
      table: {
        category: PARAMETERS_CATEGORY,
        defaultValue: { summary: NOTIFICATION_DEFAULT_CONFIG.position },
      },
    },
    pauseOnHover: {
      table: {
        category: PARAMETERS_CATEGORY,
        defaultValue: { summary: NOTIFICATION_DEFAULT_CONFIG.pauseOnHover },
      },
    },
    duration: {
      table: {
        category: PARAMETERS_CATEGORY,
        defaultValue: { summary: NOTIFICATION_DEFAULT_CONFIG.duration },
      },
    },
    closable: {
      table: {
        category: PARAMETERS_CATEGORY,
        defaultValue: { summary: NOTIFICATION_DEFAULT_CONFIG.closable },
      },
    },
    autoClose: {
      table: {
        category: PARAMETERS_CATEGORY,
        defaultValue: { summary: NOTIFICATION_DEFAULT_CONFIG.autoClose },
      },
    },
    message: {
      table: {
        category: PARAMETERS_CATEGORY,
      },
    },
    type: {
      control: { type: 'select' },
      table: {
        category: PARAMETERS_CATEGORY,
      },
    },
  },
} as Meta<NotificationDemoComponent>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NotificationStory: Story = {
  name: 'Basic Usage',
  args: {
    message: 'Notification message...',
    pauseOnHover: true,
    autoClose: true,
    closable: true,
    duration: 3000,
    type: 'info',
    position: 'top',
  },
};
