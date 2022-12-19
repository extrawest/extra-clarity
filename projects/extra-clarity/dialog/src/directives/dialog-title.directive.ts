import { Directive } from '@angular/core';

@Directive({
  selector: '[dialog-title]',
  exportAs: 'dialogTitle',
})
export class DialogTitleDirective {}
