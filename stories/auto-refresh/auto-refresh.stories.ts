import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {AutoRefreshModule} from "../../projects/extra-clarity/auto-refresh";
import {AutoRefreshGroupModule} from "../../projects/extra-clarity/auto-refresh-group";

export default {
  title: 'Components/Auto refresh',
  decorators: [
    moduleMetadata({
      imports: [
        AutoRefreshModule,
        AutoRefreshGroupModule,
      ],
    }),
  ],
  args: {
    period: 60,
    refreshing: false,
    disabled: false,
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
  template: `<ew-auto-refresh
    [period]="period"
    [refreshing]="refreshing"
    [disabled]="disabled"
  ></ew-auto-refresh>`,
});
AutoRefreshStory.storyName = 'Auto refresh';

export const AutoRefreshGroupStory: Story = args => ({
  props: {
    ...args,
  },
  viewMode: 'story',
  template: `
    <ew-auto-refresh-group
      [period]="period"
      [refreshing]="refreshing"
      [autoRefreshDisabled]="disabled"
    ></ew-auto-refresh-group>
  `,
});
AutoRefreshGroupStory.storyName = 'Auto refresh group';
