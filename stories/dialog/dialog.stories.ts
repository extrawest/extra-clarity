import {Story, Parameters} from "@storybook/angular";
import {action} from "@storybook/addon-actions";
import {setupStory} from "../../.storybook/helpers/setup-story.helper";
import {DialogModule} from "../../projects/extra-clarity/src";
import {DialogComponent} from "./dialog.component";
import {FormDialogModule} from "./form-dialog/form-dialog.module";

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
