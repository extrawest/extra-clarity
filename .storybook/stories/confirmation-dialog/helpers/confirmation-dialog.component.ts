import { ChangeDetectionStrategy, Component, inject, Input, type TemplateRef } from '@angular/core';

import { type DialogButtonConfig, DialogModule, DialogService } from '../../../../projects/extra-clarity/dialog';

@Component({
  selector: 'ec-storybook-confirmation-dialog',
  template: `
    <button
      (click)="onOpen()"
      class="btn btn-primary"
      type="button"
    >
      Open confirmation dialog
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DialogModule,
  ],
})
export class StorybookConfirmationDialogComponent {
  @Input()
  type?: 'confirm' | 'info' | 'success' | 'warning' | 'danger';

  @Input()
  size?: 'sm' | 'md' | 'lg' | 'xl';

  @Input()
  title: string;

  @Input()
  message?: string;

  @Input()
  closable?: boolean;

  @Input()
  closableBackdrop?: boolean;

  @Input()
  rejectBtnHidden?: boolean;

  @Input()
  rejectBtnLabel?: string;

  @Input()
  acceptBtnLabel?: string;

  @Input()
  acceptBtn?: DialogButtonConfig;

  @Input()
  rejectBtn?: DialogButtonConfig;

  /** `TemplateRef<any>` */
  @Input()
  template?: TemplateRef<unknown>;

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
