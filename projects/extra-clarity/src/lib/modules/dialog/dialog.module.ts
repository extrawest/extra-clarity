import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClrModalModule} from "@clr/angular";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogService} from "./services/dialog.service";
import {BaseDialogContainerComponent, ConfirmationDialogComponent} from "./containers";

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    BaseDialogContainerComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ClrModalModule,
  ],
  providers: [DialogService],
})
export class DialogModule { }
