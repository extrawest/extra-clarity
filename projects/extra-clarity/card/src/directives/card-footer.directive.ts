import { Directive } from '@angular/core';

@Directive({
  selector: 'ec-card-footer, [ecCardFooter]',
  host: {
    class: 'card-footer',
    style: 'display: block',
  },
})
export class CardFooterDirective {
}
