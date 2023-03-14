import { ComponentRef, ViewRef } from '@angular/core';
import {NotificationComponent} from './notification.component';
import { take } from 'rxjs/operators';

export class ContentRef {
  constructor(public nodes: any[], public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) {}
}

export class NotificationRef {
  private _resolve: (value?: unknown) => void;

  result: Promise<any>;

  constructor(
    private notificationCmptRef: ComponentRef<NotificationComponent> | null,
    private contentRef: ContentRef | null,
  ) {
    if (notificationCmptRef) {
      notificationCmptRef.instance.closed
        .pipe(take(1))
        .subscribe(() => {
          this.close();
        });
    }

    this.result = new Promise(resolve => {
      this._resolve = resolve;
    });
    this.result.then(null);
  }

  close(): void {
    if (this.notificationCmptRef) {
      this._resolve();
      this.removeModalElements();
    }
  }

  private removeModalElements(): void {
    if (!this.notificationCmptRef) {
      return;
    }

    const notificationNativeEl = this.notificationCmptRef.location.nativeElement;
    notificationNativeEl.parentNode.removeChild(notificationNativeEl);
    this.notificationCmptRef.destroy();

    if (this.contentRef && this.contentRef.viewRef) {
      this.contentRef.viewRef.destroy();
    }

    this.notificationCmptRef = null;
    this.contentRef = null;
  }
}
