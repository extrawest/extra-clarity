import {Story, moduleMetadata, Meta} from "@storybook/angular";
import {ConfirmationDialogComponent} from "./confirmation-dialog.component";
import {DialogModule} from "../../projects/extra-clarity/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export default {
  title: 'Components/Confirmation Dialog',
  decorators: [
    moduleMetadata({
      declarations: [ConfirmationDialogComponent],
      imports: [
        BrowserAnimationsModule,
        DialogModule,
      ],
    }),
  ],
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
  parameters: {
    viewMode: 'story',
  },
} as Meta;

export const ConfirmationDialog: Story = args => ({
  props: {
    config: {
      ...args,
    },
  },
  template: `<storybook-confirmation-dialog [config]="config"></storybook-confirmation-dialog>`,
});
ConfirmationDialog.storyName = 'Basic usage';
