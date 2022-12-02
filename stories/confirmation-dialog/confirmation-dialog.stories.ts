import {Story, Parameters} from "@storybook/angular";
import {setupStory} from "../../.storybook/helpers/setup-story.helper";
import {ConfirmationDialogComponent} from "./confirmation-dialog.component";
import {DialogModule} from "@extrawest/extra-clarity/dialog";

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
    size: { defaultValue: 'md', control: { type: 'radio', options: ['sm', 'md', 'lg', 'xl'] } },
  },
  args: {
    title: 'Title',
    message: 'Test confirmation dialog message...',
    closable: true,
    closableBackdrop: true,
    rejectBtnHidden: false,
    rejectBtn: {
      label: 'Reject',
      icon: '',
      classes: 'btn-secondary',
    },
    acceptBtn: {
      label: 'Accept',
      icon: '',
      classes: 'btn-primary',
    },
  },
};

const variants: Parameters[] = [];

setupStory(DialogModule, defaultStory, defaultParameters, variants);
