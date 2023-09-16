import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Directive } from '@angular/core';

@Directive({
  selector: '[cdkTrapFocus]',
  standalone: true,
})
export class CdkTrapFocusDirective extends CdkTrapFocus {}
