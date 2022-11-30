import { NgModule } from '@angular/core';
import { AutoRefreshModule } from './modules';
import {DialogModule} from "./modules/dialog";

const MODULES = [
  AutoRefreshModule,
  DialogModule,
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
