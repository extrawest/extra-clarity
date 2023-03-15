import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {CommonModule} from "@angular/common";
import {NumericFieldStoryComponent} from "./components/numeric-field.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ClarityModule} from "@clr/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NumericFieldModule} from "../../projects/extra-clarity/numeric-field";

export default {
  title: 'Components/Numeric field',
  viewMode: 'story',
  decorators: [
    moduleMetadata({
      declarations: [NumericFieldStoryComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        NumericFieldModule,
        ClarityModule,
        FormsModule,
        ReactiveFormsModule,
      ],
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
  template: `<storybook-numeric-field></storybook-numeric-field>`,
});
WithBasicUsage.storyName = 'Basic usage';
