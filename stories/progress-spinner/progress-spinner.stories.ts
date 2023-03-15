import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {CommonModule} from "@angular/common";
import {ProgressSpinnerStoryComponent} from "./components/progress-spinner.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ClarityModule} from "@clr/angular";
import {FormsModule} from "@angular/forms";
import {ProgressSpinnerComponent} from "../../projects/extra-clarity/progress-spinner";

export default {
  title: 'Components/Progress spinner',
  viewMode: 'story',
  decorators: [
    moduleMetadata({
      declarations: [ProgressSpinnerStoryComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        ProgressSpinnerComponent,
        ClarityModule,
        FormsModule,
      ],
    }),
  ],
  parameters: {
    viewMode: 'story',
  },
} as Meta;

export const WithBasicUsage: Story = args => ({
  props: {
    ...args,
  },
  viewMode: 'story',
  template: `
    <storybook-progress-spinner></storybook-progress-spinner>`,
});
WithBasicUsage.storyName = 'Basic usage';
