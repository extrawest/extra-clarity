import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from "../../projects/extra-clarity/dialog";
import {TestData} from "./data";

@Component({
  template: `
    123
    {{ data.test }}
  `,
})
export class FormDialogComponent {
  exampleForm = new FormGroup({
    sample: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(DIALOG_DATA) private readonly data: TestData,
    private readonly dialogRef: DialogRef,
  ) {}

  onClose(): void {
    this.dialogRef.close(this.exampleForm);
  }
}
