import {NotificationAnimationState, NotificationConfig, NotificationPosition} from "./typings";

export const NOTIFICATION_DEFAULT_CONFIG: NotificationConfig = {
  position: 'topRight',
  duration: 3000,
  closable: true,
  autoClose: true,
  pauseOnHover: true,
}

export const NOTIFICATION_ANIMATION_STATE_CONFIG: Record<NotificationPosition, NotificationAnimationState> = {
  ['top']: NotificationAnimationState.enterTop,
  ['bottom']: NotificationAnimationState.enterBottom,
  ['topLeft']: NotificationAnimationState.enterLeft,
  ['bottomLeft']: NotificationAnimationState.enterLeft,
  ['topRight']: NotificationAnimationState.enterRight,
  ['bottomRight']: NotificationAnimationState.enterRight,
}
