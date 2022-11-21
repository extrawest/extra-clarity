import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfirmationDialogConfig} from "./models";
import {ConfirmationType} from "./enums";

@Component({
  selector: 'lib-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  @Input() public config: ConfirmationDialogConfig;

  @Output() public close = new EventEmitter<ConfirmationType>();

  public ConfirmationType = ConfirmationType;

  public onClose(type: ConfirmationType): void {
    this.close.emit(type);
  }
}
