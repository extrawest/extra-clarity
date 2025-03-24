import { Directive } from '@angular/core';

import { DialogRef } from '../dialog-ref';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[dialog-close]',
  exportAs: 'dialogClose',
  host: {
    '(click)': 'onClick()',
  },
  standalone: false,
})
export class DialogCloseDirective {
  constructor(private readonly dialogRef: DialogRef) {}

  private onClick(): void {
    this.dialogRef.close();
  }
}
