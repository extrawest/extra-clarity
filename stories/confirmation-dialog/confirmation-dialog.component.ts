import {Component, Input} from '@angular/core';
import {
  ConfirmationDialogConfig,
  ConfirmationType, DialogService
} from "../../projects/extra-clarity/src";

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
  providers: [DialogService],
})
export class ConfirmationDialogComponent {

  @Input() public config: ConfirmationDialogConfig;

  constructor(
    private readonly dialogService: DialogService,
  ) {
  }

  onOpen(): void {
    this.dialogService.confirm({
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
