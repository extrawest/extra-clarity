import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdsIconModule } from '@cds/angular';
import { ProgressSpinnerComponent } from '@extrawest/extra-clarity/progress-spinner';

import { CardComponent } from './card.component';
import {
  CardBlockDirective,
  CardFooterDirective,
  CardHeaderDirective,
  CardTitleDirective,
} from './directives';

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
    ProgressSpinnerComponent,
    CdsIconModule,
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export class CardModule { }
