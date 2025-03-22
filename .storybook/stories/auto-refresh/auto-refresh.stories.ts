import type { Meta, StoryObj } from '@storybook/angular';

import { EcAutoRefreshComponent, DEFAULT_PERIOD_SEC } from '../../../projects/extra-clarity/auto-refresh';

type Story = StoryObj<EcAutoRefreshComponent>;

const meta: Meta<EcAutoRefreshComponent> = {
  title: 'Components/Auto Refresh',
  component: EcAutoRefreshComponent,
  argTypes: {
    period: {
      table: {
        defaultValue: { summary: DEFAULT_PERIOD_SEC.toString() },
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
};

export default meta;

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
