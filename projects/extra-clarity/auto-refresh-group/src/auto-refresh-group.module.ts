import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutoRefreshGroupComponent} from "./auto-refresh-group.component";
import {ClrIconModule} from "@clr/angular";
import {AutoRefreshModule} from "@extrawest/extra-clarity/auto-refresh";
import '@cds/core/icon/register.js';


@NgModule({
  declarations: [AutoRefreshGroupComponent],
  imports: [
    CommonModule,
    ClrIconModule,
    AutoRefreshModule,
  ],
  exports: [AutoRefreshGroupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AutoRefreshGroupModule { }
