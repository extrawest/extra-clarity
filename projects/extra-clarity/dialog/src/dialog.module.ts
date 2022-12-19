import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClrModalModule} from "@clr/angular";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogService} from "./services/dialog.service";
import {DialogContainer, ConfirmationDialogComponent} from "./containers";
import {DialogCloseDirective, DialogContentDirective, DialogFooterDirective, DialogTitleDirective} from "./directives";

const DIRECTIVES = [
  DialogCloseDirective,
  DialogTitleDirective,
  DialogContentDirective,
  DialogFooterDirective,
]

@NgModule({
  declarations: [
    ...DIRECTIVES,
    ConfirmationDialogComponent,
    DialogContainer,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ClrModalModule,
  ],
  exports: [
    ...DIRECTIVES,
    DialogContainer,
  ],
  providers: [DialogService],
})
export class DialogModule { }
