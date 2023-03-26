import {TemplateRef} from "@angular/core";

export type NotificationPosition = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';

export type NotificationType = 'warning' | 'danger' | 'info' | 'success';

export enum NotificationAnimationState {
  enterTop = 'enterTop',
  enterRight = 'enterRight',
  enterBottom = 'enterBottom',
  enterLeft = 'enterLeft',
}

export interface NotificationConfig<T = {}> {
  duration?: number;
  closable?: boolean;
  pauseOnHover?: boolean;
  autoClose?: boolean;
  data?: T;
  position?: NotificationPosition;
  onClose?: () => void;
}

export interface NotificationData {
  id?: string;
  message?: string;
  template?: TemplateRef<{}>
  type?: NotificationType;
  config?: NotificationConfig;
}
