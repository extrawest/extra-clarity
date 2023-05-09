import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrAlertModule, ClrIconModule } from '@clr/angular';

import { NotificationComponent, NotificationContainerComponent } from './components';

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
