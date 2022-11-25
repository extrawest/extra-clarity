import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfirmationDialogConfig} from "../../models";
import {ConfirmationType} from "../../enums";

@Component({
  selector: 'lib-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  @Input() public config: ConfirmationDialogConfig;

  @Output() public close = new EventEmitter<ConfirmationType>();

  public onCancel(): void {
    this.onClose(ConfirmationType.Cancel);
  }

  public onReject(): void {
    this.onClose(ConfirmationType.Reject);
  }

  public onAccept(): void {
    this.onClose(ConfirmationType.Accept);
  }

  private onClose(type: ConfirmationType): void {
    this.close.emit(type);
  }
}
