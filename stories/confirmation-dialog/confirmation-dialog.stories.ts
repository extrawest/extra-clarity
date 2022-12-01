import {Story, Parameters} from "@storybook/angular";
import {action} from "@storybook/addon-actions";
import {setupStory} from "../../.storybook/helpers/setup-story.helper";
import {DialogModule} from "../../projects/extra-clarity/src";
import {ConfirmationDialogComponent} from "./confirmation-dialog.component";

const defaultStory: Story = args => ({
  template: `<storybook-confirmation-dialog [config]="config"></storybook-confirmation-dialog>`,
  moduleMetadata: {
    declarations: [ConfirmationDialogComponent],
  },
  props: {
    config: {
      ...args,
    },
  },
});

const defaultParameters: Parameters = {
  title: 'Dialog/Confirmation Dialog',
  argTypes: {
    // inputs
    clrModalLabelledById: { defaultValue: '' },
    closable: { defaultValue: true, control: { type: 'checkbox', value: true } },
    size: { defaultValue: 'md', control: { type: 'radio', options: ['sm', 'md', 'lg', 'xl'] } },

    // // outputs
    // clrModalAlternateClose: { control: { disable: true } },
    // clrModalOpenChange: { control: { disable: true } },
  },
  args: {
    // story helpers
    title: 'Modal Title',
    message: 'Test confirmation confirmation-dialog message...',

    // outputs
    clrModalAlternateClose: action('clrModalAlternateClose'),
    clrModalOpenChange: action('clrModalOpenChange'),
  },
};

const variants: Parameters[] = [];

setupStory(DialogModule, defaultStory, defaultParameters, variants);
