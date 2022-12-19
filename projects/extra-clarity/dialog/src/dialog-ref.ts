import {Observable, Subject } from "rxjs";
import {DialogConfig} from "./dialog-config";
import {ComponentRef} from "@angular/core";
import {DialogState} from "./enums/dialog-state.enum";

export class DialogRef<T = any, R = any> {
  public containerRef: ComponentRef<T>;

  private state: DialogState = DialogState.OPEN;
  private afterClosed$: Subject<R | undefined> = new Subject();

  constructor(public readonly config: DialogConfig) {}

  public afterClosed(): Observable<R | undefined> {
    return this.afterClosed$.asObservable();
  }

  public close(result?: R): void {
    if (this.state !== DialogState.OPEN) {
      return;
    }

    this.containerRef.destroy();
    this.afterClosed$.next(result);
    this.afterClosed$.complete();

    this.state = DialogState.CLOSED;
  }
}
