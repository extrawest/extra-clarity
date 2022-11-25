// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/angular/types-6-0';
import {moduleMetadata} from "@storybook/angular";
import {
  ConfirmationDialogModule,
  DialogService
} from "../../projects/extra-clarity/src";
import {Component, Input} from "@angular/core";
import {
  DialogButton
} from "../../projects/extra-clarity/src/lib/modules/dialog/models/dialog-button.model";
import {Size} from "../../projects/extra-clarity/src/lib/types/size.type";
import {ConfirmationDialogComponent} from "./confirmation-dialog.component";

@Component({
  selector: "app-dialog-story",
  template: `
    123
		<button class="btn btn-primary" (click)="openDialog()">Open Modal</button>
	`
})
class ConfirmationDialogStory {
  @Input() title: string;
  @Input() message: string;
  @Input() acceptBtn: DialogButton;
  @Input() rejectBtn: DialogButton;
  @Input() rejectBtnHidden: boolean;
  @Input() closable: boolean;
  @Input() size: Size;
  @Input() showCloseButton: boolean;

  constructor(private readonly dialogService: DialogService) {}

  openDialog() {
    this.dialogService.confirm({
      title: this.title,
      message: this.message,
      acceptBtn: this.acceptBtn,
      rejectBtn: this.rejectBtn,
      rejectBtnHidden: this.rejectBtnHidden,
      size: this.size,
      showCloseButton: this.showCloseButton
    });
  }
}

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Confirmation dialog',
  component: ConfirmationDialogStory,
  decorators: [
    moduleMetadata({
      imports: [ConfirmationDialogModule],
    }),
  ],
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template = ({  }) => ({
  props: {

  },
  component: ConfirmationDialogComponent
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
