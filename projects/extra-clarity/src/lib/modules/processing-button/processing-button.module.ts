import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessingButtonComponent } from './processing-button.component';
import {ClrLoadingButtonModule, ClrLoadingModule} from "@clr/angular";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [ProcessingButtonComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ClrLoadingButtonModule,
    ClrLoadingModule,
  ],
  exports: [ProcessingButtonComponent],
})
export class ProcessingButtonModule { }
