import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsModule } from '@clr/angular';

import { NumericFieldDirective } from './numeric-field';
import { MaxNumericDirective, MinNumericDirective } from './numeric-field-validators';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrFormsModule,
    FormsModule,
  ],
  declarations: [
    NumericFieldDirective,
    MaxNumericDirective,
    MinNumericDirective,
  ],
  exports: [
    NumericFieldDirective,
    MaxNumericDirective,
    MinNumericDirective,
  ],
})
export class NumericFieldModule {}
