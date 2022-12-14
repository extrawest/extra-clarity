import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClrModalModule} from "@clr/angular";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogService} from "./services/dialog.service";
import {BaseDialogContainerComponent, ConfirmationDialogComponent} from "./containers";
import { DialogClose } from './directives/dialog-close.directive';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    BaseDialogContainerComponent,
    DialogClose,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ClrModalModule,
  ],
  exports: [DialogClose],
  providers: [DialogService],
})
export class DialogModule { }
