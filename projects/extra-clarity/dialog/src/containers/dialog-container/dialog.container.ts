import { DOCUMENT, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Inject,
  OnDestroy,
  OnInit,
  computed,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Subscription, SubscriptionLike, filter, fromEvent } from 'rxjs';

import { DialogConfig } from '../../dialog-config';
import { DialogRef } from '../../dialog-ref';
import { DIALOG_CONFIG } from '../../tokens/dialog-config.token';
import { DialogSize } from '../../types/dialog-types';

@Component({
  selector: 'ec-dialog, [dialog]',
  templateUrl: './dialog.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DialogContainer implements OnInit, OnDestroy {
  public readonly size = input<DialogSize>('md');
  public readonly closable = input<boolean>(true);
  public readonly closableBackdrop = input<boolean>(true);

  private locationSubscription: SubscriptionLike = Subscription.EMPTY;

  private isDialogClosable = computed(() => this.config.closable ?? this.closable());

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly dialogRef: DialogRef,
    private readonly location: Location,
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(DIALOG_CONFIG) public readonly config: DialogConfig,
  ) {}

  public ngOnInit(): void {
    fromEvent<KeyboardEvent>(this.documentRef, 'keydown')
      .pipe(
        filter((event) => event.key === 'Escape'),
        filter(() => this.isDialogClosable()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.dialogRef.close());

    this.locationSubscription = this.location.subscribe(() => this.onClose());
  }

  public ngOnDestroy(): void {
    this.locationSubscription.unsubscribe();
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
