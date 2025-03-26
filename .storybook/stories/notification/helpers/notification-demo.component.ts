import { ChangeDetectionStrategy, Component, TemplateRef, inject, input } from '@angular/core';

import {
  NotificationConfig,
  NotificationModule,
  NotificationPosition,
  NotificationService,
  NotificationType,
} from '@extrawest/extra-clarity/notification';

@Component({
  selector: 'ec-storybook-notification-demo',
  templateUrl: './notification-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NotificationModule],
})
export class NotificationDemoComponent {
  public readonly type = input.required<NotificationType>();
  public readonly message = input.required<string>();
  /** Duration in ms */
  public readonly duration = input<number>();
  public readonly closable = input<boolean>();
  public readonly pauseOnHover = input<boolean>();
  public readonly autoClose = input<boolean>();
  public readonly position = input<NotificationPosition>();

  private readonly notificationService = inject(NotificationService);

  protected onOpenNotification(): void {
    this.notificationService.create(this.type(), this.message(), this.config);
  }

  protected onOpenTplNotification(tpl: TemplateRef<unknown>): void {
    this.notificationService.template(this.type(), tpl, this.config);
  }

  private get config(): NotificationConfig {
    return {
      autoClose: this.autoClose(),
      closable: this.closable(),
      duration: this.duration(),
      pauseOnHover: this.pauseOnHover(),
      position: this.position(),
    };
  }
}
