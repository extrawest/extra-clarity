import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ConfirmationType} from "../../enums/confirmation-type.enum";
import {ConfirmDialogConfig} from "../../dialog-config";
import {DialogRef} from "../../dialog-ref";
import {DIALOG_CONFIG} from "../../../tokens/dialog-config.token";
import {isPromise} from "rxjs/internal/util/isPromise";

@Component({
  selector: 'lib-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  constructor(
    @Inject(DIALOG_CONFIG) public readonly config: ConfirmDialogConfig,
    private readonly dialogRef: DialogRef,
  ) {}

  public onReject(): void {
    this.trigger(ConfirmationType.Reject);
  }

  public onAccept(): void {
    this.trigger(ConfirmationType.Accept);
  }

  private async trigger(action: ConfirmationType): Promise<void> {
    const trigger = {
      [ConfirmationType.Accept]: this.config.onAccept,
      [ConfirmationType.Reject]: this.config.onReject,
    }[action];

    if (typeof trigger === 'function') {
      const result = trigger();

      if (isPromise(result)) {
        await result;
      }
    }

    this.close(action);
  }

  private close(result: ConfirmationType): void {
    this.dialogRef.close(result);
  }
}
