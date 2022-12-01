import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormDialogComponent} from "./form-dialog.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ClarityModule} from "@clr/angular";

@NgModule({
  declarations: [FormDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClarityModule,
  ],
})
export class FormDialogModule { }
