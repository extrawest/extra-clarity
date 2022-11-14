import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { PartialStringFilterComponent } from './components/partial-string-filter/partial-string-filter.component';

@NgModule({
  declarations: [
    PartialStringFilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClarityModule
  ],
  exports: [
    PartialStringFilterComponent
  ]
})
export class PartialStringFilterModule { }
