import { componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';

import { AutoRefreshGroupComponent, DEFAULT_PERIOD_SEC } from '../../../projects/extra-clarity/auto-refresh-group';

type Story = StoryObj<AutoRefreshGroupComponent>;

export default {
  title: 'Components/Auto Refresh Group',
  component: AutoRefreshGroupComponent,
  decorators: [
    componentWrapperDecorator(story => `<div style="max-width:380px">${story}</div>`),
  ],
  argTypes: {
    period: {
      table: {
        defaultValue: { summary: DEFAULT_PERIOD_SEC },
      },
    },
    // hide editable controls for outputs (actions) - 'control: false'
    // hide default type `EventEmitter` (without generic type) - 'type: { summary: null }',
    refresh: {
      control: false,
      table: {
        type: { summary: null },
      },
    },
    autoRefreshToggled: {
      control: false,
      table: {
        type: { summary: null },
      },
    },
  },
} as Meta<AutoRefreshGroupComponent>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AutoRefreshGroupStory: Story = {
  name: 'Auto Refresh Group',
  args: {
    period: 10,
    useAutoRefresh: true,
    autoRefreshBlocked: false,
    autoRefreshEnabled: true,
    failed: false,
    refreshing: false,
  },
};
