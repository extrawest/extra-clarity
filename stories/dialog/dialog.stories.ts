import {Story, moduleMetadata, Meta} from "@storybook/angular";
import {DialogComponent} from "./components/dialog.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ClarityModule} from "@clr/angular";
import {CommonModule} from "@angular/common";
import {FormDialogComponent} from "./components/form-dialog.component";
import { DialogModule } from "../../projects/extra-clarity/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export default {
  title: 'Components/Dialog',
  viewMode: 'story',
  decorators: [
    moduleMetadata({
      declarations: [
        FormDialogComponent,
        DialogComponent,
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ClarityModule,
        DialogModule,
      ],
    }),
  ],
  argTypes: {
    size: { defaultValue: 'md', control: { type: 'radio', options: ['sm', 'md', 'lg', 'xl'] } },
  },
  args: {
    title: 'Title',
    closable: true,
    closableBackdrop: true,
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
  },
  viewMode: 'story',
  template: `<storybook-dialog [config]="config"></storybook-dialog>`,
});
WithBasicUsage.storyName = 'Basic usage';
