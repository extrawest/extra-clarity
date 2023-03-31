import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {CommonModule} from "@angular/common";
import {NotificationStoryComponent} from "./components/notification.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ClarityModule} from "@clr/angular";
import {FormsModule} from "@angular/forms";
import {NotificationModule} from "../../projects/extra-clarity/notification/src/notification.module";

export default {
  title: 'Components/Notification',
  viewMode: 'story',
  decorators: [
    moduleMetadata({
      declarations: [NotificationStoryComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        NotificationModule,
        ClarityModule,
        FormsModule,
      ],
    }),
  ],
  argTypes: {
    type: { defaultValue: 'info', control: { type: 'select', options: ['info', 'success', 'warning', 'danger'] } },
    position: { defaultValue: 'top', control: { type: 'select', options: ['top', 'topLeft', 'topRight', 'bottom', 'bottomLeft', 'bottomRight'] } },
  },
  args: {
    message: 'Notification message...',
    pauseOnHover: true,
    autoClose: true,
    closable: true,
    duration: 3000,
  },
  parameters: {
    viewMode: 'story',
  },
} as Meta;

export const WithBasicUsage: Story = args => ({
  props: {
    config: {
      ...args,
    },
    ...args,
  },
  viewMode: 'story',
  template: `<storybook-notification [type]="type" [message]="message" [config]="config"></storybook-notification>`,
});
WithBasicUsage.storyName = 'Basic usage';
