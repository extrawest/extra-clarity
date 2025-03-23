import { ChangeDetectionStrategy, Component, inject, Input, type TemplateRef } from '@angular/core';

import {
  type DialogButtonConfig,
  DialogModule,
  DialogService,
} from '../../../../projects/extra-clarity/dialog';

@Component({
  selector: 'ec-storybook-confirmation-dialog',
  template: `
    <button (click)="onOpen()" class="btn btn-primary" type="button">
      Open confirmation dialog
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DialogModule],
})
export class StorybookConfirmationDialogComponent {
  @Input()
  public type?: 'confirm' | 'info' | 'success' | 'warning' | 'danger';

  @Input()
  public size?: 'sm' | 'md' | 'lg' | 'xl';

  @Input()
  public title: string;

  @Input()
  public message?: string;

  @Input()
  public closable?: boolean;

  @Input()
  public closableBackdrop?: boolean;

  @Input()
  public rejectBtnHidden?: boolean;

  @Input()
  public rejectBtnLabel?: string;

  @Input()
  public acceptBtnLabel?: string;

  @Input()
  public acceptBtn?: DialogButtonConfig;

  @Input()
  public rejectBtn?: DialogButtonConfig;

  /** `TemplateRef<unknown>` */
  @Input()
  public template?: TemplateRef<unknown>;

  private readonly dialogService = inject(DialogService);

  protected onOpen(): void {
    this.dialogService.confirm(
      {
        onAccept: () => alert('accepted'),
        onReject: () => alert('rejected'),
        size: this.size,
        title: this.title,
        message: this.message,
        closable: this.closable,
        closableBackdrop: this.closableBackdrop,
        acceptBtnLabel: this.acceptBtnLabel,
        rejectBtnLabel: this.rejectBtnLabel,
        rejectBtnHidden: this.rejectBtnHidden,
        acceptBtn: this.acceptBtn,
        rejectBtn: this.rejectBtn,
        template: this.template,
      },
      this.type,
    );
  }
}
