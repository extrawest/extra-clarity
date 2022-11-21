import { NgModule } from '@angular/core';
import {ConfirmationDialogModule} from "./modules/confirmation-dialog";

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
