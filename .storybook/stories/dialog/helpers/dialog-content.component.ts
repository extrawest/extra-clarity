import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ClrInputModule } from '@clr/angular';

import { DialogModule, DialogRef } from '@extrawest/extra-clarity/dialog';

@Component({
  templateUrl: './dialog-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DialogModule, ReactiveFormsModule, ClrInputModule],
})
export class StorybookDialogContentComponent {
  exampleForm = new FormGroup({
    sample: new FormControl('', Validators.required),
  });

  private readonly dialogRef = inject(DialogRef);

  protected onConfirm(): void {
    this.dialogRef.close(this.exampleForm.getRawValue().sample);
  }
}
