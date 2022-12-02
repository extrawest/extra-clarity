import {Parameters, Story} from "@storybook/angular";
import {setupStory} from "../../.storybook/helpers/setup-story.helper";
import {AutoRefreshModule} from "@extrawest/extra-clarity/auto-refresh";

const defaultStory: Story = args => ({
  template: `<ew-auto-refresh
    [period]="period"
    [refreshing]="refreshing"
    [disabled]="disabled"
  ></ew-auto-refresh>`,
  props: {
    ...args,
  },
});

const defaultParameters: Parameters = {
  title: 'Auto refresh',
  args: {
    period: 60,
    refreshing: false,
    disabled: false,
  },
};

const variants: Parameters[] = [];

setupStory(AutoRefreshModule, defaultStory, defaultParameters, variants);
