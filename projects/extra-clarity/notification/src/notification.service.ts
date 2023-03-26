import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
  TemplateRef
} from '@angular/core';
import {NotificationContainerComponent} from "./components";
import {NotificationConfig, NotificationData, NotificationType} from "./typings";

let notificationId = 0;

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private container?: ComponentRef<NotificationContainerComponent>;

  constructor(
    private readonly applicationRef: ApplicationRef,
    private readonly injector: EnvironmentInjector,
  ) {}

  success(message: string, config?: NotificationConfig): void {
    this.createInstance({ type: 'success', message }, config);
  }

  danger(message: string, config?: NotificationConfig): void {
    this.createInstance({ type: 'danger', message }, config);
  }

  info(message: string, config?: NotificationConfig): void {
    this.createInstance({ type: 'info', message }, config);
  }

  warning(message: string, config?: NotificationConfig): void {
    this.createInstance({ type: 'danger', message }, config);
  }

  template(type: NotificationType, template: TemplateRef<{}>, config?: NotificationConfig): void {
    this.createInstance({ type, template }, config);
  }

  create(type: NotificationType, message: string, config?: NotificationConfig): void {
    this.createInstance({ type, message }, config);
  }

  private createInstance(data: NotificationData, config?: NotificationConfig): void {
    if (!this.container) {
      this.container = this.createNotificationContainer();
    }

    this.container.instance.create({
      ...data,
      id: this.generateNotificationId(),
      config,
    });
  }

  private createNotificationContainer(): ComponentRef<NotificationContainerComponent> {
    const container = createComponent(NotificationContainerComponent, {
      environmentInjector: this.injector,
    });

    document.body.appendChild(container.location.nativeElement);
    this.applicationRef.attachView(container.hostView);

    return container;
  }

  private generateNotificationId(): string {
    return `notification-${ notificationId++ }`;
  }
}
