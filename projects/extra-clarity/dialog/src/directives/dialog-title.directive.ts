import { Directive } from '@angular/core';

@Directive({
  selector: '[dialog-title]',
  exportAs: 'dialogTitle',
  host: {
    class: 'modal-title',
  },
})
export class DialogTitleDirective {}
