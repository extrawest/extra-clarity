import { componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';

import { EcAutoRefreshGroupComponent, DEFAULT_PERIOD_SEC } from '../../../projects/extra-clarity/auto-refresh-group';

type Story = StoryObj<EcAutoRefreshGroupComponent>;

const meta: Meta<EcAutoRefreshGroupComponent> = {
  title: 'Components/Auto Refresh Group',
  component: EcAutoRefreshGroupComponent,
  decorators: [
    componentWrapperDecorator(story => `<div style="max-width:380px">${story}</div>`),
  ],
  argTypes: {
    locale: {
    },
    period: {
      table: {
        defaultValue: { summary: DEFAULT_PERIOD_SEC.toString() },
      },
    },
    // hide editable controls for outputs (actions) - 'control: false'
    // hide default type `EventEmitter` (without generic type) - 'type: { summary: '' }',
    refresh: {
      control: false,
      table: {
        type: { summary: '' },
      },
    },
    autoRefreshToggled: {
      control: false,
      table: {
        type: { summary: '' },
      },
    },
  },
};

export default meta;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AutoRefreshGroupStory: Story = {
  name: 'Auto Refresh Group',
  args: {
    locale: '',
    period: 10,
    useAutoRefresh: true,
    autoRefreshBlocked: false,
    autoRefreshEnabled: true,
    failed: false,
    refreshing: false,
  },
};
