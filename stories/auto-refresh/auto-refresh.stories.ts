import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {AutoRefreshModule} from "../../projects/extra-clarity/auto-refresh";
import {AutoRefreshGroupModule} from "../../projects/extra-clarity/auto-refresh-group";
import {AutoRefreshGroupComponent} from "./auto-refresh-group.component";

export default {
  title: 'Components/Auto refresh',
  decorators: [
    moduleMetadata({
      declarations: [AutoRefreshGroupComponent],
      imports: [
        AutoRefreshModule,
        AutoRefreshGroupModule,
      ],
    }),
  ],
  args: {
    failed: false,
    period: 5,
    refreshing: false,
    autoRefreshBlocked: false,
    autoRefreshState: false,
    autoRefreshEnabled: true,
    useAutoRefresh: true,
  },
  parameters: {
    viewMode: 'story',
  },
} as Meta;

export const AutoRefreshStory: Story = args => ({
  props: {
    ...args,
  },
  viewMode: 'story',
  template: `
    <ec-auto-refresh
      [period]="period"
      [refreshing]="refreshing"
      [disabled]="disabled"
    ></ec-auto-refresh>
    `,
});
AutoRefreshStory.storyName = 'Auto refresh';

export const AutoRefreshGroupStory: Story = args => ({
  props: {
    ...args,
  },
  viewMode: 'story',
  template: `
    <storybook-auto-refresh-group
      [failed]="failed"
      [period]="period"
      [refreshing]="refreshing"
      [autoRefreshBlocked]="autoRefreshBlocked"
      [autoRefreshState]="autoRefreshState"
      [autoRefreshEnabled]="autoRefreshEnabled"
      [useAutoRefresh]="useAutoRefresh"
    ></storybook-auto-refresh-group>
  `,
  args: {
    failed: false,
    period: 5,
    refreshing: false,
    autoRefreshBlocked: false,
    autoRefreshState: false,
    autoRefreshEnabled: true,
    useAutoRefresh: true,
  },
});
AutoRefreshGroupStory.storyName = 'Auto refresh group';
