import { Directive } from '@angular/core';

@Directive({
  selector: 'ec-card-block, [ecCardBlock]',
  host: {
    class: 'card-block',
    style: 'display: block',
  },
})
export class CardBlockDirective {
}
