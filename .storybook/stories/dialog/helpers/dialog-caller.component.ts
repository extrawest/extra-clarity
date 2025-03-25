import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';

import { DialogModule, DialogService } from '@extrawest/extra-clarity/dialog';

import { StorybookDialogContentComponent } from './dialog-content.component';

@Component({
  selector: 'ec-storybook-dialog',
  template: `
    <button (click)="onOpen()" class="btn btn-primary" type="button">Open dialog</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DialogModule],
})
export class StorybookDialogCallerComponent {
  @Input()
  public size?: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @Input()
  public closable?: boolean;

  @Input()
  public closableBackdrop?: boolean;

  private readonly dialogService = inject(DialogService);

  protected onOpen(): void {
    this.dialogService
      .open(StorybookDialogContentComponent, {
        size: this.size,
        closable: this.closable,
        closableBackdrop: this.closableBackdrop,
      })
      .afterClosed()
      .subscribe((result) => alert(`The value returned from the dialog is '${result}'`));
  }
}
