import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutoRefreshGroupComponent} from "./auto-refresh-group.component";
import {AutoRefreshModule} from "@extrawest/extra-clarity/auto-refresh";
import '@cds/core/icon/register.js';
import {ClarityIcons, errorStandardIcon, refreshIcon} from '@cds/core/icon';

ClarityIcons.addIcons(refreshIcon, errorStandardIcon);

@NgModule({
  declarations: [AutoRefreshGroupComponent],
  imports: [
    CommonModule,
    AutoRefreshModule,
  ],
  exports: [AutoRefreshGroupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AutoRefreshGroupModule { }
