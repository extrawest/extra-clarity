import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {CommonModule} from "@angular/common";
import {CardStoryComponent} from "./components/card.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CardModule} from "../../projects/extra-clarity/card";
import {ClarityModule} from "@clr/angular";

export default {
  title: 'Components/Card',
  viewMode: 'story',
  decorators: [
    moduleMetadata({
      declarations: [CardStoryComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        CardModule,
        ClarityModule,
      ],
    }),
  ],
  parameters: {
    viewMode: 'story',
  },
  args: {
    title: 'Card title',
    loading: false,
    empty: false,
    error: false,
  },
} as Meta;

export const WithBasicUsage: Story = args => ({
  props: {
    ...args,
  },
  viewMode: 'story',
  template: `
    <storybook-card
      [title]="title"
      [loading]="loading"
      [empty]="empty"
      [error]="error"
    ></storybook-card>`,
});
WithBasicUsage.storyName = 'Basic usage';
