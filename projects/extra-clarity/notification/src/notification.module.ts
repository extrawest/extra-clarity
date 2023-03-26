import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent, NotificationContainerComponent } from './components';
import {ClrAlertModule, ClrIconModule} from "@clr/angular";

@NgModule({
  declarations: [
    NotificationComponent,
    NotificationContainerComponent,
  ],
  imports: [
    CommonModule,
    ClrAlertModule,
    ClrIconModule,
  ],
})
export class NotificationModule { }
