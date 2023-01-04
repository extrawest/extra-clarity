import { Directive } from '@angular/core';

import { DialogRef } from '../dialog-ref';

@Directive({
  selector: '[dialog-close]',
  exportAs: 'dialogClose',
  host: {
    '(click)': 'onClick()',
  },
})
export class DialogCloseDirective {
  constructor(private readonly dialogRef: DialogRef) {}

  private onClick(): void {
    this.dialogRef.close();
  }
}
