import {Observable, Subject } from "rxjs";
import {DialogConfig} from "./dialog-config";
import {BaseDialogContainerComponent} from "./containers";
import {ComponentRef} from "@angular/core";
import {DialogState} from "./enums/dialog-state.enum";

export class DialogRef<T = any> {
  private state: DialogState = DialogState.OPEN;
  private afterClosed$: Subject<T | undefined> = new Subject();

  constructor(
    private readonly config: DialogConfig,
    private readonly containerRef: ComponentRef<BaseDialogContainerComponent>,
  ) {}

  public afterClosed(): Observable<T | undefined> {
    return this.afterClosed$.asObservable();
  }

  public close(result?: T): void {
    if (this.state !== DialogState.OPEN) {
      return;
    }

    this.containerRef.destroy();
    this.afterClosed$.next(result);
    this.afterClosed$.complete();

    this.state = DialogState.CLOSED;
  }
}
