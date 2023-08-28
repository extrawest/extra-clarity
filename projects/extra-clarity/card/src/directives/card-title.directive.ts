import { Directive } from '@angular/core';

@Directive({
  selector: 'ec-card-title, [ecCardTitle]',
  host: {
    class: 'card-title',
  },
  standalone: true,
})
export class EcCardTitleDirective {
}
