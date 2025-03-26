import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ClrLoadingState } from '@clr/angular';
import { isPromise } from 'rxjs/internal/util/isPromise';

import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';

import { ConfirmDialogConfig } from '../../dialog-config';
import { DialogRef } from '../../dialog-ref';
import { ConfirmationType } from '../../enums/confirmation-type.enum';
import { DIALOG_CONFIG } from '../../tokens/dialog-config.token';

@Component({
  templateUrl: './confirmation-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ConfirmationDialogComponent implements OnInit {
  public acceptBtnState = ClrLoadingState.DEFAULT;

  constructor(
    @Inject(DIALOG_CONFIG) public readonly config: ConfirmDialogConfig,
    protected readonly commonStrings: EcCommonStringsService,
    private readonly destroyRef: DestroyRef,
    private readonly dialogRef: DialogRef,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.commonStrings.stringsChanged$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

  public onReject(): void {
    this.trigger(ConfirmationType.Reject);
  }

  public onAccept(): void {
    this.trigger(ConfirmationType.Accept);
  }

  protected isArrayOfArrays(value: unknown): value is unknown[][] {
    return Array.isArray(value) && value.every((item) => Array.isArray(item));
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
