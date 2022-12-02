import {Component} from '@angular/core';
import {ClarityModule, ClrInputModule} from "@clr/angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogRef} from "@extrawest/extra-clarity/dialog";

@Component({
  template: `
    <form clrForm clrLayout="vertical" [formGroup]="exampleForm">
      <clr-input-container>
        <label>Input label</label>
        <input clrInput type="text" formControlName="sample" />
        <clr-control-helper>Helper text that shows while it is pristine and valid</clr-control-helper>
        <clr-control-error>Error message that appears after focus is lost and control is invalid</clr-control-error>
      </clr-input-container>

      <button class="btn btn-primary" type="button" style="margin-top: 24px; float: right;" (click)="onClose()">Close</button>
    </form>
  `,
  imports: [ClrInputModule, ClarityModule]
})
export class FormDialogComponent {
  exampleForm = new FormGroup({
    sample: new FormControl('', Validators.required),
  });

  constructor(
    private readonly dialogRef: DialogRef,
  ) {}

  onClose(): void {
    this.dialogRef.close(this.exampleForm);
  }
}
