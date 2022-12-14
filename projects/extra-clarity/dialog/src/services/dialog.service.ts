import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
  Type
} from '@angular/core';
import {ConfirmDialogConfig, DialogConfig} from "../dialog-config";
import {BaseDialogContainerComponent, ConfirmationDialogComponent} from "../containers";
import {DialogRef} from "../dialog-ref";
import { ConfirmType } from '../types/dialog-types';

@Injectable()
export class DialogService {
  constructor(
    private readonly applicationRef: ApplicationRef,
    private readonly injector: EnvironmentInjector,
  ) {}

  public confirm(config: ConfirmDialogConfig, type?: ConfirmType): DialogRef {
    return this.open(ConfirmationDialogComponent, { ...config, type } as ConfirmDialogConfig);
  }

  public info(config: ConfirmDialogConfig): DialogRef {
    return this.confirm(config, 'info');
  }

  public success(config: ConfirmDialogConfig): DialogRef {
    return this.confirm(config, 'success');
  }

  public danger(config: ConfirmDialogConfig): DialogRef {
    return this.confirm(config, 'danger');
  }

  public warning(config: ConfirmDialogConfig): DialogRef {
    return this.confirm(config, 'warning');
  }

  public open<T>(component: Type<T>, config?: DialogConfig): DialogRef {
    const mergedConfig = { ...(new DialogConfig()), ...config };
    const containerRef = this.createComponent(BaseDialogContainerComponent);
    const containerInstance = containerRef.instance;
    const dialogRef = new DialogRef(mergedConfig, containerRef);

    containerInstance.component = component;
    containerInstance.config = mergedConfig;
    containerInstance.dialogRef = dialogRef;

    this.attachView(containerRef);

    return dialogRef;
  }

  private createComponent<T>(component: Type<T>): ComponentRef<T> {
    return createComponent(component, {
      environmentInjector: this.injector,
    });
  }

  private attachView<T>(componentRef: ComponentRef<T>): void {
    document.body.appendChild(componentRef.location.nativeElement);
    this.applicationRef.attachView(componentRef.hostView);
  }
}
