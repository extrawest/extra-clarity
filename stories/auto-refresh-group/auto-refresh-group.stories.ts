import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {AutoRefreshGroupComponent} from "../../projects/extra-clarity/auto-refresh-group";

export default {
  title: 'Components/Auto refresh',
  decorators: [
    moduleMetadata({
      imports: [AutoRefreshGroupComponent],
    }),
  ],
  parameters: {
    viewMode: 'story',
  },
  args: {
    failed: false,
    refreshing: false,
    autoRefreshBlocked: false,
    autoRefreshEnabled: true,
    period: 60,
    useAutoRefresh: true,
  },
} as Meta;

export const AutoRefreshGroupStory: Story = args => ({
  args: {
  },
  props: {
    ...args,
  },
  viewMode: 'story',
  template: `
    <div class="clr-col-3">
      <ec-auto-refresh-group
        [failed]="failed"
        [period]="period"
        [refreshing]="refreshing"
        [autoRefreshBlocked]="autoRefreshBlocked"
        [autoRefreshEnabled]="autoRefreshEnabled"
        [useAutoRefresh]="useAutoRefresh"
      ></ec-auto-refresh-group>
    </div>
  `,
});
AutoRefreshGroupStory.storyName = 'Auto refresh group';
