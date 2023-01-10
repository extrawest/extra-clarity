import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ClrLoadingButtonModule, ClrLoadingModule, ClrModalModule} from '@clr/angular';

import { ConfirmationDialogComponent, DialogContainer } from './containers';
import { DialogCloseDirective, DialogContentDirective, DialogFooterDirective, DialogTitleDirective } from './directives';
import { DialogService } from './services/dialog.service';

const DIRECTIVES = [
  DialogCloseDirective,
  DialogTitleDirective,
  DialogContentDirective,
  DialogFooterDirective,
];

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
    ClrLoadingModule,
    ClrLoadingButtonModule,
  ],
  exports: [
    ...DIRECTIVES,
    DialogContainer,
  ],
  providers: [DialogService],
})
export class DialogModule { }
