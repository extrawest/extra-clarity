import {Component, Input} from '@angular/core';
import {FormDialogComponent} from "./form-dialog/form-dialog.component";
import {DialogConfig, DialogService} from "@extrawest/extra-clarity/dialog";

@Component({
  selector: 'storybook-dialog',
  template: `
    <button
      (click)="onOpen()"
      class="btn btn-primary"
      type="button"
    >
      Open dialog
    </button>
  `,
  providers: [DialogService],
})
export class DialogComponent {
  @Input() config: DialogConfig;

  constructor(private readonly dialogService: DialogService) {}

  public onOpen(): void {
    this.dialogService.open(FormDialogComponent, {
      ...this.config,
    })
      .afterClosed()
      .subscribe((v) => console.log(v));
  }
}
