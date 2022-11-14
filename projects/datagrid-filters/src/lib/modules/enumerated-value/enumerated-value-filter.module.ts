import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { EnumeratedValueFilterComponent } from './components/enumerated-value-filter/enumerated-value-filter.component';

@NgModule({
  declarations: [
    EnumeratedValueFilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClarityModule
  ],
  exports: [
    EnumeratedValueFilterComponent
  ]
})
export class EnumeratedValueFilterModule { }
