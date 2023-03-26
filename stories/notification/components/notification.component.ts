import {Component, Input, TemplateRef} from '@angular/core';
import {NotificationConfig, NotificationService, NotificationType} from "../../../projects/extra-clarity/notification";

@Component({
  selector: 'storybook-notification',
  templateUrl: './notification.component.html',
})
export class NotificationStoryComponent {
  @Input() type: NotificationType;
  @Input() message: string;
  @Input() config: NotificationConfig;

  constructor(private notificationService: NotificationService) {
  }

  onOpenNotification(): void {
    this.notificationService.create(this.type, this.message, this.config);
  }

  onOpenTplNotification(tpl: TemplateRef<any>): void {
    this.notificationService.template(this.type, tpl, this.config);
  }
}
