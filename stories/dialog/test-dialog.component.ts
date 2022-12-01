import {Component, Input} from '@angular/core';
import {DialogService
} from "../../projects/extra-clarity/src";
import {ConfirmDialogConfig} from "../../projects/extra-clarity/src/lib/modules/dialog/dialog-config";
import {DialogRef} from "../../projects/extra-clarity/src/lib/modules/dialog/dialog-ref";

@Component({
  selector: 'storybook-confirmation-dialog',
  template: `
    <button
      (click)="onClose()"
      class="btn btn-primary"
      type="button"
    >
      Open confirmation dialog
    </button>
  `,
})
export class TestDialogComponent {
  @Input() config: ConfirmDialogConfig;

  constructor(
    private readonly dialogRef: DialogRef,
  ) {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
