import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';

import { DialogModule, DialogService } from '../../../../projects/extra-clarity/dialog';

import { StorybookDialogContentComponent } from './dialog-content.component';

@Component({
  selector: 'ec-storybook-dialog',
  template: `
    <button
      (click)="onOpen()"
      class="btn btn-primary"
      type="button"
    >
      Open dialog
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DialogModule,
  ],
})
export class StorybookDialogCallerComponent {
  @Input()
  size?: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @Input()
  closable?: boolean;

  @Input()
  closableBackdrop?: boolean;

  private readonly dialogService = inject(DialogService);

  protected onOpen(): void {
    this.dialogService.open(
      StorybookDialogContentComponent,
      {
        size: this.size,
        closable: this.closable,
        closableBackdrop: this.closableBackdrop,
      },
    )
      .afterClosed()
      .subscribe(result => alert(`The value returned from the dialog is '${result}'`));
  }
}
