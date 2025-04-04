import { Directive } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[dialog-footer]',
  exportAs: 'dialogFooter',
  host: {
    class: 'modal-footer',
  },
  standalone: false,
})
export class DialogFooterDirective {}
