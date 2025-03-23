import { Directive } from '@angular/core';

@Directive({
  selector: '[dialog-content]',
  exportAs: 'dialogContent',
  standalone: false,
})
export class DialogContentDirective {}
