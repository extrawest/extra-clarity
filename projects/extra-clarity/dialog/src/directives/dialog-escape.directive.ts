import { Directive, HostListener } from '@angular/core';

import { DialogRef } from '../dialog-ref';

@Directive({
  selector: '[dialog-escape]',
  exportAs: 'dialogEscape',
})
export class DialogEscapeDirective {
  constructor(private readonly dialogRef: DialogRef) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEvent(): void {
    this.dialogRef.close();
  }
}
