import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import {ClrModalModule} from "@clr/angular";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ClrModalModule,
  ],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule { }
