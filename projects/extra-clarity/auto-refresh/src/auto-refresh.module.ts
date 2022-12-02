import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoRefreshComponent } from './auto-refresh.component';
import {ClrCheckboxModule} from "@clr/angular";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AutoRefreshComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClrCheckboxModule,
  ],
  exports: [AutoRefreshComponent],
})
export class AutoRefreshModule { }
