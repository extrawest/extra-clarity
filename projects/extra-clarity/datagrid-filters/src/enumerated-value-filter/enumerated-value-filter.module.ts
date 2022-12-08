import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EnumeratedValueFilterComponent } from './enumerated-value-filter.component';
import { ClrRadioModule } from '@clr/angular';

@NgModule({
  declarations: [EnumeratedValueFilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClrRadioModule,
  ],
  exports: [EnumeratedValueFilterComponent],
})
export class EnumeratedValueFilterModule { }
