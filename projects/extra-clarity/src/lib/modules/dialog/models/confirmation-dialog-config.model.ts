import {DialogButton} from "./dialog-button.model";
import {Size} from "../../../types/size.type";

export interface ConfirmationDialogConfig {
  title: string;
  message: string;
  acceptBtn?: DialogButton;
  rejectBtn?: DialogButton;
  rejectBtnHidden?: boolean;
  showCloseButton?: boolean;
  size?: Size;
}
