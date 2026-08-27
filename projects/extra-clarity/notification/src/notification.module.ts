import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClrAlertModule, ClrIcon } from '@clr/angular';

import { NotificationComponent, NotificationContainerComponent } from './components';

@NgModule({
  declarations: [NotificationComponent, NotificationContainerComponent],
  imports: [CommonModule, ClrAlertModule, ClrIcon],
})
export class NotificationModule {}
