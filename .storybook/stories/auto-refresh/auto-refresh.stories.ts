import type { Meta, StoryObj } from '@storybook/angular';

import { AutoRefreshComponent, DEFAULT_PERIOD_SEC } from '../../../projects/extra-clarity/auto-refresh';

type Story = StoryObj<AutoRefreshComponent>;

export default {
  title: 'Components/Auto refresh',
  component: AutoRefreshComponent,
  argTypes: {
    period: {
      table: {
        defaultValue: { summary: DEFAULT_PERIOD_SEC },
      },
    },
    // hide editable controls for outputs (actions)
    // hide default type `EventEmitter` (without generic type)
    refresh: {
      control: false,
      table: {
        type: { summary: null },
      },
    },
    toggle: {
      control: false,
      table: {
        type: { summary: null },
      },
    },
  },
} as Meta<AutoRefreshComponent>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AutoRefreshStory: Story = {
  name: 'Auto refresh',
  args: {
    period: 5,
    blocked: false,
    enabled: false,
    refreshing: false,
  },
};
