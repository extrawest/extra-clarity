import {Component, TemplateRef} from '@angular/core';
import {NotificationService} from "../../../projects/extra-clarity/notification";

@Component({
  selector: 'storybook-notification',
  templateUrl: './notification.component.html',
})
export class NotificationStoryComponent {
  clrExampleTimeout = 2000;
  clrExampleType = 'info';
  clrExampleDismissable = true;
  clrExampleProgressbar = true;

  constructor(private notificationService: NotificationService) {
  }

  onClose(): void {
    console.log('notification closed');
  }

  openNotify(content: any, options: any): void {
    this.notificationService.open(content, options).result.then(this.onClose);
  }

  openString(): void {
    this.notificationService.open('This is a string message', { progressbar: true, dismissable: true });
  }

  log() {
    console.log('log from notification');
  }
}
