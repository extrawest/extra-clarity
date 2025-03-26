import { ChangeDetectionStrategy, Component, TemplateRef, inject, input } from '@angular/core';

import { DialogButtonConfig, DialogModule, DialogService } from '@extrawest/extra-clarity/dialog';

@Component({
  selector: 'ec-storybook-confirmation-dialog',
  template: `
    <button (click)="onOpen()" class="btn btn-primary" type="button">
      Open confirmation dialog
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DialogModule],
})
export class StorybookConfirmationDialogComponent {
  public readonly type = input<'confirm' | 'info' | 'success' | 'warning' | 'danger'>();
  public readonly size = input<'sm' | 'md' | 'lg' | 'xl'>();
  public readonly title = input<string>();
  public readonly message = input<string>();
  public readonly closable = input<boolean>();
  public readonly closableBackdrop = input<boolean>();
  public readonly rejectBtnHidden = input<boolean>();
  public readonly rejectBtnLabel = input<string>();
  public readonly acceptBtnLabel = input<string>();
  public readonly acceptBtn = input<DialogButtonConfig>();
  public readonly rejectBtn = input<DialogButtonConfig>();
  /** `TemplateRef<unknown>` */
  public readonly template = input<TemplateRef<unknown>>();

  private readonly dialogService = inject(DialogService);

  protected onOpen(): void {
    this.dialogService.confirm(
      {
        onAccept: () => alert('accepted'),
        onReject: () => alert('rejected'),
        size: this.size(),
        title: this.title() ?? '',
        message: this.message(),
        closable: this.closable(),
        closableBackdrop: this.closableBackdrop(),
        acceptBtnLabel: this.acceptBtnLabel(),
        rejectBtnLabel: this.rejectBtnLabel(),
        rejectBtnHidden: this.rejectBtnHidden(),
        acceptBtn: this.acceptBtn(),
        rejectBtn: this.rejectBtn(),
        template: this.template(),
      },
      this.type(),
    );
  }
}
