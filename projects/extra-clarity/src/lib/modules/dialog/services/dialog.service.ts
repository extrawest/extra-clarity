import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
  Type
} from '@angular/core';
import {ConfirmationDialogComponent} from "../containers";
import {ConfirmationDialogConfig} from "../models";
import {Observable, Subject} from "rxjs";
import {ConfirmationType} from "../enums";

@Injectable()
export class DialogService {
  private confirmationSubject$: Subject<ConfirmationType>;

  constructor(
    private readonly applicationRef: ApplicationRef,
    private readonly injector: EnvironmentInjector,
  ) {}

  public confirm(config: ConfirmationDialogConfig): Observable<ConfirmationType> {
    const componentRef = this.createComponent(ConfirmationDialogComponent);

    componentRef.setInput('config', config);

    this.attachView(componentRef);

    this.confirmationSubject$ = new Subject<ConfirmationType>();

    componentRef.instance.close.subscribe((type) => {
      this.destroyComponent(componentRef);
      this.emitConfirmValue(type);
    });

    return this.confirmationSubject$.asObservable();
  }

  public open<T>(component: Type<T>): void {
    // const componentRef = this.createComponent(component);
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

  private destroyComponent<T>(componentRef: ComponentRef<T>): void {
    componentRef.destroy();
  }

  private emitConfirmValue(value: ConfirmationType): void {
    this.confirmationSubject$.next(value);
    this.confirmationSubject$.complete();
  }
}
