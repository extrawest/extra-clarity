import { ChangeDetectionStrategy, Component, inject, Input, type TemplateRef } from '@angular/core';

import {
  type NotificationConfig,
  NotificationModule,
  NotificationService,
} from '../../../../projects/extra-clarity/notification';

@Component({
  selector: 'ec-storybook-notification-demo',
  templateUrl: './notification-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NotificationModule,
  ],
})
export class NotificationDemoComponent {
  @Input()
  type: 'warning' | 'danger' | 'info' | 'success';

  @Input()
  message: string;

  /** Duration in ms */
  @Input()
  duration: number;

  @Input()
  closable?: boolean;

  @Input()
  pauseOnHover?: boolean;

  @Input()
  autoClose?: boolean;

  @Input()
  position?: 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';

  private readonly notificationService = inject(NotificationService);

  protected onOpenNotification(): void {
    this.notificationService.create(this.type, this.message, this.config);
  }

  protected onOpenTplNotification(tpl: TemplateRef<{}>): void {
    this.notificationService.template(this.type, tpl, this.config);
  }

  private get config(): NotificationConfig {
    return {
      autoClose: this.autoClose,
      closable: this.closable,
      duration: this.duration,
      pauseOnHover: this.pauseOnHover,
      position: this.position,
    };
  }
}
