import { Directive } from '@angular/core';

@Directive({
  selector: 'ec-card-block, [ecCardBlock]',
  host: {
    class: 'card-block',
  },
  standalone: true,
})
export class EcCardBlockDirective {
}
