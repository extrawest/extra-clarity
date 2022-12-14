import {DialogButtonConfig} from "./models/dialog-button-config.model";
import { ConfirmType, DialogSize } from "./types/dialog-types";

type OnClickCallback = () => (false | void | {}) | Promise<false | void | {}>;

export class BaseDialogConfig {
  title: string;
  size?: DialogSize;
  closable?: boolean = true;
  closableBackdrop?: boolean = true;
}

export class DialogConfig<T = any> extends BaseDialogConfig {
  data?: T;
}

export class ConfirmDialogConfig extends BaseDialogConfig {
  message: string;
  acceptBtn?: DialogButtonConfig;
  rejectBtn?: DialogButtonConfig;
  rejectBtnHidden?: boolean;
  onAccept?: OnClickCallback;
  onReject?: OnClickCallback;
  type?: ConfirmType;
}
