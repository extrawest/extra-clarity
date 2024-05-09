import { CdkTrapFocus, FocusTrapFactory } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject } from '@angular/core';

@Directive({
  selector: '[cdkTrapFocus]',
  standalone: true,
})
export class CdkTrapFocusDirective extends CdkTrapFocus {
  // NOTE: We provide a constructor with the explicitly called super() to fix a Storybook issue
  // leading to the NG0202 error ɵɵinvalidFactoryDep.

  // This error occurs only in the Angular production mode. Thus to debug the error on the local dev
  // environment, you should add 'enableProdMode()' from '@angular/core' to '/.storybook/preview.ts'

  // More details: https://github.com/storybookjs/storybook/issues/23534

  constructor(
    _elementRef: ElementRef<HTMLElement>,
    _focusTrapFactory: FocusTrapFactory,
    @Inject(DOCUMENT) document: Document,
  ) {
    super(_elementRef, _focusTrapFactory, document);
  }
}
