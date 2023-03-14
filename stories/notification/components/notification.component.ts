import {Component, TemplateRef} from '@angular/core';
import {NotificationService} from "../../../projects/extra-clarity/notification";

@Component({
  selector: 'storybook-notification',
  templateUrl: './notification.component.html',
})
export class NotificationStoryComponent {
  constructor(private readonly notificationService: NotificationService) {}

  onClose(): void {
    console.log('notification closed');
  }

  showAlert(): void {
    alert('Button was clicked');
  }

  openInfo(content: TemplateRef<unknown> | string): void {
    this.notificationService
      .open(content, { timeout: 100000, notificationType: 'info', dismissable: true, progressbar: true })
      .result.then(this.onClose);
  }

  openWarning(content: TemplateRef<unknown>): void {
    this.notificationService
      .open(content, {
        timeout: 20000,
        notificationType: 'warning',
        dismissable: true,
        progressbar: true,
        ngTemplateOutletContext: { variable1: 123, variable2: 456 },
      })
      .result.then(this.onClose);
  }

  openSuccess(content: TemplateRef<unknown>): void {
    this.notificationService
      .open(content, { timeout: 30000, notificationType: 'success', dismissable: true, progressbar: true })
      .result.then(this.onClose);
  }

  openDanger(content: TemplateRef<unknown>): void {
    this.notificationService
      .open(content, { timeout: 40000, notificationType: 'danger', dismissable: true, progressbar: true })
      .result.then(this.onClose);
  }
}
