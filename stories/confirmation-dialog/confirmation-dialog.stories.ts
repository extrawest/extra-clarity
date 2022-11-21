// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";
import {moduleMetadata} from "@storybook/angular";
import {ConfirmationDialogModule} from "../../projects/extra-clarity-lib/src";

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Example/Confirmation dialog',
  component: ConfirmationDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [ConfirmationDialogModule],
    })
  ]
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<ConfirmationDialogComponent> = (args: ConfirmationDialogComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
};
