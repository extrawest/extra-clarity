import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {CommonModule} from "@angular/common";
import {NotificationStoryComponent} from "./components/notification.component";
import {NotificationComponent, NotificationService} from "../../projects/extra-clarity/notification";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ClarityModule} from "@clr/angular";
import {FormsModule} from "@angular/forms";

export default {
  title: 'Components/Notification',
  viewMode: 'story',
  decorators: [
    moduleMetadata({
      declarations: [NotificationStoryComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        NotificationComponent,
        ClarityModule,
        FormsModule,
      ],
      providers: [NotificationService],
    }),
  ],
  parameters: {
    viewMode: 'story',
  },
} as Meta;

export const WithBasicUsage: Story = args => ({
  props: {
    config: {
      ...args,
    },
  },
  viewMode: 'story',
  template: `<storybook-notification></storybook-notification>`,
});
WithBasicUsage.storyName = 'Basic usage';
