import {Component, Input} from '@angular/core';
import {ConfirmDialogConfig, DialogService} from "../../projects/extra-clarity/dialog";

@Component({
  selector: 'storybook-confirmation-dialog',
  template: `
    <button
      (click)="onOpen()"
      class="btn btn-primary"
      type="button"
    >
      Open confirmation dialog
    </button>
  `,
})
export class ConfirmationDialogComponent {
  @Input() config: ConfirmDialogConfig;

  constructor(private readonly dialogService: DialogService) {}

  onOpen(): void {
    this.dialogService.confirm({
      ...this.config,
      onAccept: () => alert('accepted'),
      onReject: () => alert('rejected'),
    });
  }
}
