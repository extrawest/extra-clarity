import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsModule } from '@clr/angular';

import { ClrNumericField } from './numeric-field';
import { ClrMaxNumeric, ClrMinNumeric } from './numeric-field-validators';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrFormsModule,
    FormsModule,
  ],
  declarations: [
    ClrNumericField,
    ClrMaxNumeric,
    ClrMinNumeric,
  ],
  exports: [
    ClrNumericField,
    ClrMaxNumeric,
    ClrMinNumeric,
  ],
})
export class ClrNumericFieldModule {}
