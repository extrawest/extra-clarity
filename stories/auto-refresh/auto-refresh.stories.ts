// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/angular/types-6-0';
import {moduleMetadata} from "@storybook/angular";
import {AutoRefreshComponent, AutoRefreshModule
} from "../../projects/extra-clarity/src";

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Auto refresh',
  component: AutoRefreshComponent,
  decorators: [
    moduleMetadata({
      imports: [AutoRefreshModule],
    }),
  ],
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template = ({  }) => ({
  props: {

  },
  component: AutoRefreshComponent
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
