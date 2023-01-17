import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';

import {DialogConfig} from '../../dialog-config';
import { DialogRef } from '../../dialog-ref';
import { DIALOG_CONFIG } from '../../tokens/dialog-config.token';
import { DialogSize } from '../../types/dialog-types';

@Component({
  selector: 'ec-dialog, [dialog]',
  templateUrl: 'dialog.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContainer {
  @Input() public size: DialogSize = 'md';
  @Input() public closable = true;
  @Input() public closableBackdrop = true;

  constructor(
    private readonly dialogRef: DialogRef,
    @Inject(DIALOG_CONFIG) public readonly config: DialogConfig,
  ) {}

  public onClose(): void {
    this.dialogRef.close();
  }
}
