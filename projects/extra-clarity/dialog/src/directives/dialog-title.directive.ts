import { Directive } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[dialog-title]',
  exportAs: 'dialogTitle',
  host: {
    class: 'modal-title',
  },
  standalone: false,
})
export class DialogTitleDirective {}
