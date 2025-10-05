import { Directive } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[dialog-content]',
  exportAs: 'dialogContent',
  host: {
    class: 'modal-body',
  },
  standalone: false,
})
export class DialogContentDirective {}
