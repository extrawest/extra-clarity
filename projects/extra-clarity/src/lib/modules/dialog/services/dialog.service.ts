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

@Injectable()
export class DialogService {
  constructor(
    private readonly applicationRef: ApplicationRef,
    private readonly injector: EnvironmentInjector,
  ) {}

  public confirm(config: ConfirmDialogConfig): DialogRef {
    return this.open(ConfirmationDialogComponent, config);
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
