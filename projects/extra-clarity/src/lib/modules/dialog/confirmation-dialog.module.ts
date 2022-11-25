import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './containers';
import {ClrModalModule} from "@clr/angular";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogService} from "./services";

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ClrModalModule,
  ],
  providers: [DialogService],
})
export class ConfirmationDialogModule { }
