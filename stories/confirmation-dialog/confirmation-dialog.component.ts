import {Component, Input} from '@angular/core';
import {
  ConfirmationDialogConfig,
  ConfirmationDialogService,
  ConfirmationType
} from "../../projects/extra-clarity-lib/src";

@Component({
  selector: 'storybook-button',
  template: `
    <button
      (click)="onOpen()"
      class="btn btn-primary"
      type="button"
    >
      Open confirmation dialog
    </button>
  `,
  providers: [ConfirmationDialogService],
})
export class ConfirmationDialogComponent {

  @Input() public config: ConfirmationDialogConfig;

  constructor(
    private readonly confirmationDialogService: ConfirmationDialogService,
  ) {
  }

  onOpen(): void {
    this.confirmationDialogService.open({
      title: 'Test',
      message: 'Test message',
    }).subscribe((value) => alert(this.getConfirmationMessage(value)));
  }

  private getConfirmationMessage(type: ConfirmationType): string {
    switch (type) {
      case ConfirmationType.Accept: return 'Accepted';
      case ConfirmationType.Reject: return 'Rejected';
      case ConfirmationType.Cancel: return 'Canceled';
    }
  }


}
