import { Directive } from '@angular/core';

@Directive({
  selector: 'ec-card-title, [ecCardTitle]',
  host: { class: 'card-title' },
})
export class CardTitleDirective {
}
