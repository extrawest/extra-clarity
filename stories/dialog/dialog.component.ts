import {Component, Input} from '@angular/core';
import {DialogService
} from "../../projects/extra-clarity/src";
import {ConfirmDialogConfig} from "../../projects/extra-clarity/src/lib/modules/dialog/dialog-config";

@Component({
  selector: 'storybook-dialog',
  template: `
    <button
      (click)="onOpen()"
      class="btn btn-primary"
      type="button"
    >
      Open generic dialog
    </button>
  `,
  providers: [DialogService],
})
export class DialogComponent {
  @Input() config: ConfirmDialogConfig;

  constructor(private readonly dialogService: DialogService) {
  }

  onOpen(): void {
    this.dialogService.confirm({
      ...this.config,
    })
      .afterClosed()
      .subscribe();
  }
}
