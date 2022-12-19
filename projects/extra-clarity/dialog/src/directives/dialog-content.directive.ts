import { Directive } from '@angular/core';

@Directive({
  selector: '[dialog-content]',
  exportAs: 'dialogContent',
})
export class DialogContentDirective {}
