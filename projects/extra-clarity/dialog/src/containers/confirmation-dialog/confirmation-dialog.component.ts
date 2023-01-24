import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { isPromise } from 'rxjs/internal/util/isPromise';

import { ConfirmDialogConfig } from '../../dialog-config';
import { DialogRef } from '../../dialog-ref';
import { ConfirmationType } from '../../enums/confirmation-type.enum';
import { DIALOG_CONFIG } from '../../tokens/dialog-config.token';

@Component({
  templateUrl: './confirmation-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  public acceptBtnState = ClrLoadingState.DEFAULT;

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
    this.acceptBtnState = ClrLoadingState.LOADING;

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
