import { Directive } from '@angular/core';

@Directive({
  selector: '[dialog-footer]',
  exportAs: 'dialogFooter',
})
export class DialogFooterDirective {}
