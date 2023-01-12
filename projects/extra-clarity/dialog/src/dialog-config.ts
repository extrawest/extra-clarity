import { TemplateRef } from '@angular/core';

import { DialogButtonConfig } from './models/dialog-button-config.model';
import { ConfirmType, DialogSize } from './types/dialog-types';

type OnClickCallback = () => (false | void | {}) | Promise<false | void | {}>;

export class DialogConfig<T = any> {
  size?: DialogSize = 'md';
  closable?: boolean = true;
  closableBackdrop?: boolean = true;
  data?: T;
}

export class ConfirmDialogConfig extends DialogConfig {
  title: string;
  type?: ConfirmType;
  message?: string;
  template?: TemplateRef<any>;
  acceptBtn?: DialogButtonConfig;
  rejectBtn?: DialogButtonConfig;
  rejectBtnHidden?: boolean;
  onAccept?: OnClickCallback;
  onReject?: OnClickCallback;
}
