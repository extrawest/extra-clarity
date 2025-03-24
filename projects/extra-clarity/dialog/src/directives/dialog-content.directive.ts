import { Directive } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[dialog-content]',
  exportAs: 'dialogContent',
  standalone: false,
})
export class DialogContentDirective {}
