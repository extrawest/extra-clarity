import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsModule } from '@clr/angular';

import { NumericField } from './numeric-field';
import { MaxNumeric, MinNumeric } from './numeric-field-validators';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrFormsModule,
    FormsModule,
  ],
  declarations: [
    NumericField,
    MaxNumeric,
    MinNumeric,
  ],
  exports: [
    NumericField,
    MaxNumeric,
    MinNumeric,
  ],
})
export class NumericFieldModule {}
