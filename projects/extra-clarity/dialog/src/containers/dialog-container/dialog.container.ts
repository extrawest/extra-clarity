import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, SubscriptionLike } from 'rxjs';

import { DialogConfig } from '../../dialog-config';
import { DialogRef } from '../../dialog-ref';
import { DIALOG_CONFIG } from '../../tokens/dialog-config.token';
import { DialogSize } from '../../types/dialog-types';

@Component({
  selector: 'ec-dialog, [dialog]',
  templateUrl: 'dialog.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContainer implements OnInit, OnDestroy {
  @Input() public size: DialogSize = 'md';
  @Input() public closable = true;
  @Input() public closableBackdrop = true;

  private locationSubscription: SubscriptionLike = Subscription.EMPTY;

  constructor(
    private readonly dialogRef: DialogRef,
    private readonly location: Location,
    @Inject(DIALOG_CONFIG) public readonly config: DialogConfig,
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEvent(): void {
    if (this.config.closable ?? this.closable) {
      this.dialogRef.close();
    }
  }

  public ngOnInit(): void {
    this.locationSubscription = this.location.subscribe(() => this.onClose());
  }

  public ngOnDestroy(): void {
    this.locationSubscription.unsubscribe();
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
