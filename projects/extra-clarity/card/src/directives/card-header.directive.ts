import { Directive } from '@angular/core';

@Directive({
  selector: 'ec-card-header, [ecCardHeader]',
  host: {
    class: 'card-header',
  },
})
export class CardHeaderDirective {
}
