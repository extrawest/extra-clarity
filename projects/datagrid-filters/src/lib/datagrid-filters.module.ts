import { NgModule } from '@angular/core';
import {
  EnumeratedValueFilterModule,
  PartialStringFilterModule,
} from './modules';

@NgModule({
  exports: [
    EnumeratedValueFilterModule,
    PartialStringFilterModule,
  ]
})
export class DatagridFiltersModule { }
