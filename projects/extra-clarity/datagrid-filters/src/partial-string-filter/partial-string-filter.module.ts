import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrInputModule } from '@clr/angular';
import { PartialStringFilterComponent } from './partial-string-filter.component';

@NgModule({
  declarations: [PartialStringFilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClrInputModule,
  ],
  exports: [PartialStringFilterComponent],
})
export class PartialStringFilterModule { }
