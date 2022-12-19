import {ChangeDetectionStrategy, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {ConfirmDialogConfig} from "../../dialog-config";
import {DialogRef} from "../../dialog-ref";
import {DIALOG_CONFIG} from "../../tokens/dialog-config.token";
import {DialogSize} from "../../types/dialog-types";
import {DialogFooterDirective} from "../../directives";

@Component({
  selector: 'ew-dialog, [dialog]',
  template: `
    <clr-modal
      [clrModalOpen]="true"
      [clrModalClosable]="config.closable ?? closable"
      [clrModalStaticBackdrop]="!config.closableBackdrop ?? !closableBackdrop"
      [clrModalSize]="config.size!"
      (clrModalOpenChange)="onClose()"
    >
      <div class="modal-title">
        <ng-container *ngIf="!config.title; else titleTpl">
          <ng-content select="[dialog-title]"></ng-content>
        </ng-container>
        <ng-template #titleTpl>{{ config.title }}</ng-template>
      </div>

      <div class="modal-body">
        <ng-content></ng-content>
      </div>

      <div *ngIf="!footer" class="modal-footer">
        <ng-content select="[dialog-footer]"></ng-content>
      </div>
    </clr-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContainer implements OnInit {
  @Input() size: DialogSize;
  @Input() closable: boolean = true;
  @Input() closableBackdrop: boolean = true;

  @ViewChild(DialogFooterDirective) public footer: DialogFooterDirective;

  constructor(
    private readonly dialogRef: DialogRef,
    @Inject(DIALOG_CONFIG) public readonly config: ConfirmDialogConfig,
  ) {}

  public ngOnInit(): void {
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
