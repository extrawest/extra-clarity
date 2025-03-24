import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  Injector,
  Type,
  createComponent,
} from '@angular/core';

import { ConfirmationDialogComponent } from '../containers';
import { ConfirmDialogConfig, DialogConfig } from '../dialog-config';
import { DialogRef } from '../dialog-ref';
import { ConfirmationType } from '../enums/confirmation-type.enum';
import { DIALOG_CONFIG } from '../tokens/dialog-config.token';
import { DIALOG_DATA } from '../tokens/dialog-data.token';
import { ConfirmType } from '../types/dialog-types';

@Injectable()
export class DialogService {
  constructor(
    private readonly applicationRef: ApplicationRef,
    private readonly injector: EnvironmentInjector,
  ) {}

  public confirm<T, C = any>(
    config: ConfirmDialogConfig<T, C>,
    type?: ConfirmType,
  ): DialogRef<ConfirmationDialogComponent, ConfirmationType> {
    return this.open<ConfirmationDialogComponent, C>(ConfirmationDialogComponent, {
      ...config,
      type,
    } as ConfirmDialogConfig<T, C>);
  }

  public info<T, C = any>(
    config: ConfirmDialogConfig<T, C>,
  ): DialogRef<ConfirmationDialogComponent, ConfirmationType> {
    return this.confirm<T, C>(config, 'info');
  }

  public success<T, C = any>(
    config: ConfirmDialogConfig<T, C>,
  ): DialogRef<ConfirmationDialogComponent, ConfirmationType> {
    return this.confirm<T, C>(config, 'success');
  }

  public danger<T, C = any>(
    config: ConfirmDialogConfig<T, C>,
  ): DialogRef<ConfirmationDialogComponent, ConfirmationType> {
    return this.confirm<T, C>(config, 'danger');
  }

  public warning<T, C = any>(
    config: ConfirmDialogConfig<T, C>,
  ): DialogRef<ConfirmationDialogComponent, ConfirmationType> {
    return this.confirm<T, C>(config, 'warning');
  }

  public open<T, C = any, R = any>(component: Type<T>, config?: DialogConfig<C>): DialogRef<T, R> {
    const mergedConfig = { ...new DialogConfig(), ...config };
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
