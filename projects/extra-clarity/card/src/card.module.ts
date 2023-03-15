import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrSpinnerModule } from '@clr/angular';

import { CardComponent } from './card.component';
import { CardBlockDirective, CardFooterDirective, CardHeaderDirective, CardTitleDirective } from './directives';

const COMPONENTS = [
  CardComponent,
  CardHeaderDirective,
  CardTitleDirective,
  CardBlockDirective,
  CardFooterDirective,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    ClrSpinnerModule,
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export class CardModule { }
