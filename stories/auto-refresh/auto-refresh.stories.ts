import {Parameters, Story} from "@storybook/angular";
import {AutoRefreshModule} from "../../projects/extra-clarity/src";
import {setupStory} from "../../.storybook/helpers/setup-story.helper";

const defaultStory: Story = args => ({
  template: `<lib-auto-refresh
    [period]="period"
    [refreshing]="refreshing"
    [disabled]="disabled"
  ></lib-auto-refresh>`,
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
