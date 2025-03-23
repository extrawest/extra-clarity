import { Directive } from '@angular/core';

@Directive({
  selector: '[dialog-footer]',
  exportAs: 'dialogFooter',
  host: {
    class: 'modal-footer',
  },
  standalone: false,
})
export class DialogFooterDirective {}
