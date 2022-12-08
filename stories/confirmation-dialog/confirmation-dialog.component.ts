import {Component, Input} from '@angular/core';
import {filter} from "rxjs";
import {ConfirmationType, ConfirmDialogConfig, DialogService} from "../../projects/extra-clarity/dialog";

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
      .pipe(filter((v) => !!v))
      .subscribe((v: ConfirmationType) => {
        const message = {
          [ConfirmationType.Accept]: 'accepted',
          [ConfirmationType.Reject]: 'rejected',
        }[v];

        alert(message);
      });
  }
}
