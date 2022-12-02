import {ChangeDetectionStrategy, Component, Injector, OnInit, Type} from '@angular/core';
import {DIALOG_DATA} from "../../tokens/dialog-data.token";
import {DialogConfig} from "../../dialog-config";
import {DialogRef} from "../../dialog-ref";
import {DIALOG_CONFIG} from "../../tokens/dialog-config.token";

@Component({
  template: `
    <clr-modal
      [clrModalOpen]="true"
      [clrModalClosable]="config.closable!"
      [clrModalStaticBackdrop]="!config.closableBackdrop!"
      [clrModalSize]="config.size!"
      (clrModalOpenChange)="onClose()"
    >
      <div class="modal-title">
        {{ config.title }}
      </div>

      <div class="modal-body">
        <ng-container
          [ngComponentOutlet]="component"
          [ngComponentOutletInjector]="childComponentInjector"
        ></ng-container>
      </div>
    </clr-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseDialogContainerComponent implements OnInit {
  public component: Type<any>;
  public dialogRef: DialogRef;
  public config: DialogConfig;
  public childComponentInjector: Injector;

  constructor(private readonly injector: Injector) {}

  public ngOnInit(): void {
    this.childComponentInjector = this.createChildInjector();
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  private createChildInjector(): Injector {
    return Injector.create({
      providers: [
        { provide: DIALOG_DATA, useValue: this.config.data },
        { provide: DIALOG_CONFIG, useValue: this.config },
        { provide: DialogRef, useValue: this.dialogRef },
      ],
      parent: this.injector,
    });
  }
}
