import {Story, Parameters} from "@storybook/angular";
import {action} from "@storybook/addon-actions";
import {setupStory} from "../../.storybook/helpers/setup-story.helper";
import {DialogModule} from "../../projects/extra-clarity/src";
import {DialogComponent} from "./dialog.component";

const defaultStory: Story = args => ({
  // template: `
  //   <button type="button" class="btn btn-primary" (click)="clrModalOpen = true">Open Dialog</button>
  // `,
  template: `<storybook-dialog [config]="config"></storybook-dialog>`,
  moduleMetadata: {
    declarations: [DialogComponent],
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

    // // outputs
    // clrModalAlternateClose: { control: { disable: true } },
    // clrModalOpenChange: { control: { disable: true } },

    // // methods
    // fadeDone: { control: { disable: true }, table: { disable: true } },
    // open: { control: { disable: true }, table: { disable: true } },
    // close: { control: { disable: true }, table: { disable: true } },
    // // story helpers
    // createArray: { control: { disable: true }, table: { disable: true } },
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
