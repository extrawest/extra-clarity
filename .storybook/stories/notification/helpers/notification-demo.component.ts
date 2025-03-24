import { ChangeDetectionStrategy, Component, Input, type TemplateRef, inject } from '@angular/core';

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
  imports: [NotificationModule],
})
export class NotificationDemoComponent {
  @Input()
  public type: 'warning' | 'danger' | 'info' | 'success';

  @Input()
  public message: string;

  /** Duration in ms */
  @Input()
  public duration: number;

  @Input()
  public closable?: boolean;

  @Input()
  public pauseOnHover?: boolean;

  @Input()
  public autoClose?: boolean;

  @Input()
  public position?: 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';

  private readonly notificationService = inject(NotificationService);

  protected onOpenNotification(): void {
    this.notificationService.create(this.type, this.message, this.config);
  }

  protected onOpenTplNotification(tpl: TemplateRef<unknown>): void {
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
