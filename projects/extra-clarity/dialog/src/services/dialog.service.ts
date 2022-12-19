import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable, Injector,
  Type
} from '@angular/core';
import {ConfirmDialogConfig, DialogConfig} from "../dialog-config";
import {ConfirmationDialogComponent} from "../containers";
import {DialogRef} from "../dialog-ref";
import { ConfirmType } from '../types/dialog-types';
import {DIALOG_DATA} from "../tokens/dialog-data.token";
import {DIALOG_CONFIG} from "../tokens/dialog-config.token";
import {ConfirmationType} from "../enums/confirmation-type.enum";

@Injectable()
export class DialogService {
  constructor(
    private readonly applicationRef: ApplicationRef,
    private readonly injector: EnvironmentInjector,
  ) {}

  public confirm(config: ConfirmDialogConfig, type?: ConfirmType): DialogRef<ConfirmationDialogComponent, ConfirmationType> {
    return this.open(ConfirmationDialogComponent, { ...config, type } as ConfirmDialogConfig);
  }

  public info(config: ConfirmDialogConfig): DialogRef<ConfirmationDialogComponent, ConfirmationType> {
    return this.confirm(config, 'info');
  }

  public success(config: ConfirmDialogConfig): DialogRef<ConfirmationDialogComponent, ConfirmationType> {
    return this.confirm(config, 'success');
  }

  public danger(config: ConfirmDialogConfig): DialogRef<ConfirmationDialogComponent, ConfirmationType> {
    return this.confirm(config, 'danger');
  }

  public warning(config: ConfirmDialogConfig): DialogRef<ConfirmationDialogComponent, ConfirmationType> {
    return this.confirm(config, 'warning');
  }

  public open<T, C = any, R = any>(component: Type<T>, config?: DialogConfig<C>): DialogRef<T, R> {
    const mergedConfig = { ...(new DialogConfig()), ...config };
    const dialogRef = new DialogRef<T, R>(mergedConfig);
    const containerRef = createComponent(component, {
      environmentInjector: this.injector,
      elementInjector: Injector.create({
        providers: [
          { provide: DIALOG_DATA, useValue: mergedConfig.data },
          { provide: DIALOG_CONFIG, useValue: mergedConfig },
          { provide: DialogRef, useValue: dialogRef },
        ],
        parent: this.injector,
      }),
    });

    dialogRef.containerRef = containerRef;

    this.attachView(containerRef);

    return dialogRef;
  }

  private attachView<T>(componentRef: ComponentRef<T>): void {
    document.body.appendChild(componentRef.location.nativeElement);
    this.applicationRef.attachView(componentRef.hostView);
  }
}
