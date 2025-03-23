import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';
import { Subject, takeUntil } from 'rxjs';
import { isPromise } from 'rxjs/internal/util/isPromise';

import { ConfirmDialogConfig } from '../../dialog-config';
import { DialogRef } from '../../dialog-ref';
import { ConfirmationType } from '../../enums/confirmation-type.enum';
import { DIALOG_CONFIG } from '../../tokens/dialog-config.token';

@Component({
  templateUrl: './confirmation-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ConfirmationDialogComponent implements OnDestroy, OnInit {
  public acceptBtnState = ClrLoadingState.DEFAULT;

  private readonly destroy$ = new Subject<void>();

  constructor(
    @Inject(DIALOG_CONFIG) public readonly config: ConfirmDialogConfig,
    protected readonly commonStrings: EcCommonStringsService,
    private readonly dialogRef: DialogRef,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.commonStrings.stringsChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

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
