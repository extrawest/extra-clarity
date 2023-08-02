import type { Meta, StoryObj } from '@storybook/angular';

import { AutoRefreshComponent, DEFAULT_PERIOD_SEC } from '../../../projects/extra-clarity/auto-refresh';

type Story = StoryObj<AutoRefreshComponent>;

export default {
  title: 'Components/Auto Refresh',
  component: AutoRefreshComponent,
  argTypes: {
    period: {
      table: {
        defaultValue: { summary: DEFAULT_PERIOD_SEC },
      },
    },
    // hide editable controls for outputs (actions)
    refresh: {
      control: false,
      table: {
        type: { summary: 'EventEmitter<void>' },
      },
    },
    toggle: {
      control: false,
      table: {
        type: { summary: 'EventEmitter<boolean>' },
      },
    },
  },
} as Meta<AutoRefreshComponent>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AutoRefreshStory: Story = {
  name: 'Auto Refresh',
  args: {
    period: 5,
    blocked: false,
    enabled: false,
    refreshing: false,
  },
};
