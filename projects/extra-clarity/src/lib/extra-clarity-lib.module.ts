import { NgModule } from '@angular/core';
import {ConfirmationDialogModule} from "./modules/dialog";

const MODULES = [
  ConfirmationDialogModule,
]

@NgModule({
  imports: [
    ...MODULES,
  ],
  exports: [
    ...MODULES,
  ],
})
export class ExtraClarityLibModule { }
