import {Component, Input} from '@angular/core';
import {DialogService
} from "../../projects/extra-clarity/src";
import {ConfirmDialogConfig} from "../../projects/extra-clarity/src/lib/modules/dialog/dialog-config";
import {ConfirmationType} from "../../projects/extra-clarity/src/lib/modules/dialog/enums/confirmation-type.enum";

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
  providers: [DialogService],
})
export class ConfirmationDialogComponent {
  @Input() config: ConfirmDialogConfig;

  constructor(private readonly dialogService: DialogService) {
  }

  onOpen(): void {
    this.dialogService.confirm({
      ...this.config,
    })
      .afterClosed()
      .subscribe((v: ConfirmationType) => {
        const message = {
          [ConfirmationType.Accept]: 'accepted',
          [ConfirmationType.Reject]: 'rejected',
        }[v];

        alert(message);
      });
  }
}
