import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {AutoRefreshComponent} from "../../projects/extra-clarity/auto-refresh";

export default {
  title: 'Components/Auto refresh',
  decorators: [
    moduleMetadata({
      imports: [AutoRefreshComponent],
    }),
  ],
  parameters: {
    viewMode: 'story',
  },
  args: {
    enabled: false,
    blocked: false,
    period: 5,
    refreshing: false,
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
      [enabled]="enabled"
      [blocked]="blocked"
    ></ec-auto-refresh>
    `,
});
AutoRefreshStory.storyName = 'Auto refresh';
