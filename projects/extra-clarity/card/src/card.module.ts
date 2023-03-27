import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardComponent } from './card.component';
import { CardBlockDirective, CardFooterDirective, CardHeaderDirective, CardTitleDirective } from './directives';
import {ProgressSpinnerComponent} from "../../progress-spinner";

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
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export class CardModule { }
