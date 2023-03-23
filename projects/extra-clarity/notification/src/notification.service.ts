import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef, createComponent, EnvironmentInjector,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
} from '@angular/core';
import { take } from 'rxjs/operators';

import { ContentRef, NotificationRef } from './notification-ref';
import { NotificationComponent } from './notification.component';

export interface NotificationOptions {
  timeout?: number;
  notificationType?: string;
  dismissable?: boolean;
  progressbar?: boolean;
  ngTemplateOutletContext?: Record<string, unknown>;
}

@Injectable()
export class NotificationService {
  private elements = new Set<NotificationComponent>();

  constructor(
    private readonly environmentInjector: EnvironmentInjector,
    private readonly injector: Injector,
    private readonly applicationRef: ApplicationRef,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  open(content: TemplateRef<unknown> | string, options: NotificationOptions = {}): NotificationRef {
    const contentRef = this._getContentRef(content, options);
    const notificationCmptRef: ComponentRef<NotificationComponent> = this.attachWindowComponent(
      this.document.body,
      contentRef,
    );
    const notificationRef: NotificationRef = new NotificationRef(notificationCmptRef, contentRef);

    this._applyWindowOptions(notificationCmptRef.instance, options);
    notificationCmptRef.instance.closed
      .pipe(take(1))
      .subscribe(this._afterClose.bind(this, notificationCmptRef.instance));

    notificationCmptRef.instance.heightInitalized.then(() =>
      this.elements.forEach(el => {
        if (el !== notificationCmptRef.instance) {
          el.moveDown(notificationCmptRef.instance.height);
        }
      }),
    );
    this.elements.add(notificationCmptRef.instance);

    return notificationRef;
  }

  private _afterClose(notification: NotificationComponent): void {
    this.elements.delete(notification);

    this.elements.forEach(el => {
      if (el.translate > notification.translate) {
        el.moveUp(notification.height);
      }
    });
  }

  private _getContentRef(content: TemplateRef<unknown> | string, options: NotificationOptions): ContentRef {
    if (content instanceof TemplateRef) {
      // @ts-ignore
      return this._createFromTemplateRef(content, options.ngTemplateOutletContext);
    } else if (typeof content === 'string') {
      return this._createFromString(content);
    }

    return new ContentRef([]);
  }

  private _createFromTemplateRef(content: TemplateRef<unknown>, context: Record<string, unknown>): ContentRef {
    const viewRef = content.createEmbeddedView(context);
    this.applicationRef.attachView(viewRef);
    return new ContentRef([viewRef.rootNodes], viewRef);
  }

  private _createFromString(content: string): ContentRef {
    const component = this.document.createTextNode(`${content}`);
    return new ContentRef([[component]]);
  }

  private attachWindowComponent(containerEl: HTMLElement, contentRef: ContentRef): ComponentRef<NotificationComponent> {
    const containerRef = createComponent(NotificationComponent, {
      elementInjector: this.injector,
      environmentInjector: this.environmentInjector,
      projectableNodes: contentRef.nodes,
    });
    this.applicationRef.attachView(containerRef.hostView);
    containerEl.appendChild(containerRef.location.nativeElement);
    return containerRef;
  }

  private _applyWindowOptions(notificationInstance: NotificationComponent, options: NotificationOptions): void {
    if (options.timeout != undefined && options.timeout != null) {
      notificationInstance.timeout = options.timeout;
    }
    if (options.notificationType != undefined && options.notificationType != null) {
      notificationInstance.notificationType = options.notificationType;
    }
    if (options.dismissable != undefined && options.dismissable != null) {
      notificationInstance.dismissable = options.dismissable;
    }
    if (options.progressbar != undefined && options.progressbar != null) {
      notificationInstance.progressbar = options.progressbar;
    }
  }
}
