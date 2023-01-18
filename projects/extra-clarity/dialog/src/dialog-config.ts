import {TemplateRef, Type} from '@angular/core';

import { DialogButtonConfig } from './models/dialog-button-config.model';
import { ConfirmType, DialogSize } from './types/dialog-types';

type OnClickCallback = () => void | Promise<void>;

export class DialogConfig<T = any> {
  size?: DialogSize = 'md';
  closable?: boolean = true;
  closableBackdrop?: boolean = true;
  data?: T;
}

export class ConfirmDialogConfig<T = any, C = any> extends DialogConfig<C> {
  title: string;
  type?: ConfirmType;
  message?: string;
  template?: TemplateRef<T>;
  component?: Type<T>;
  acceptBtn?: DialogButtonConfig;
  acceptBtnLabel?: string;
  rejectBtn?: DialogButtonConfig;
  rejectBtnLabel?: string;
  rejectBtnHidden?: boolean;
  onAccept?: OnClickCallback;
  onReject?: OnClickCallback;
}
