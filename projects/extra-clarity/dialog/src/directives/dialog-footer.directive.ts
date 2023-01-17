import { Directive } from '@angular/core';

@Directive({
  selector: '[dialog-footer]',
  exportAs: 'dialogFooter',
  host: {
    class: 'modal-footer',
  },
})
export class DialogFooterDirective {}
