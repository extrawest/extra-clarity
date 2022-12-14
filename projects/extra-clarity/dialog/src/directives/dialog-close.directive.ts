import { Directive } from "@angular/core";
import { DialogRef } from "../dialog-ref";

@Directive({
  selector: '[dialog-close]',
  exportAs: 'dialogClose',
  host: {
    '(click)': 'onClick()',
  },
})
export class DialogClose {
  constructor(private readonly dialogRef: DialogRef) {}

  private onClick() {
    this.dialogRef.close();
  }
}