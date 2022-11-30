// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/angular/types-6-0';
import {moduleMetadata} from "@storybook/angular";
import {
  ProcessingButtonComponent, ProcessingButtonModule
} from "../../projects/extra-clarity/src";

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Processing button',
  component: ProcessingButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ProcessingButtonModule],
    }),
  ],
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template = ({  }) => ({
  props: {

  },
  component: ProcessingButtonComponent,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
