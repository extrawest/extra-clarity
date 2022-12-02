import {Story, Parameters} from "@storybook/angular";
import {setupStory} from "../../.storybook/helpers/setup-story.helper";
import {DialogComponent} from "./dialog.component";
import {FormDialogModule} from "./form-dialog/form-dialog.module";
import {DialogModule} from "@extrawest/extra-clarity/dialog";

const defaultStory: Story = args => ({
  template: `<storybook-dialog [config]="config"></storybook-dialog>`,
  moduleMetadata: {
    declarations: [DialogComponent],
    imports: [FormDialogModule],
  },
  props: {
    config: {
      ...args,
    },
  },
});

const defaultParameters: Parameters = {
  title: 'Dialog/Dialog',
  argTypes: {
    size: { defaultValue: 'md', control: { type: 'radio', options: ['sm', 'md', 'lg', 'xl'] } },
  },
  args: {
    title: 'Title',
    closable: true,
    closableBackdrop: true,
  },
};

const variants: Parameters[] = [];

setupStory(DialogModule, defaultStory, defaultParameters, variants);
