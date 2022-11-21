import {ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable} from '@angular/core';
import {ConfirmationDialogComponent} from "../confirmation-dialog.component";
import {ConfirmationDialogConfig} from "../models";
import {Observable, Subject, take} from "rxjs";
import {ConfirmationType} from "../enums";

@Injectable()
export class ConfirmationDialogService {
  private confirmationSubject$: Subject<ConfirmationType>;
  private componentRef: ComponentRef<ConfirmationDialogComponent>;

  constructor(
    private readonly applicationRef: ApplicationRef,
    private readonly injector: EnvironmentInjector,
  ) {
  }

  public open(config: ConfirmationDialogConfig): Observable<ConfirmationType> {
    this.componentRef = createComponent(ConfirmationDialogComponent, {
      environmentInjector: this.injector,
    });

    this.componentRef.setInput('config', config);

    document.body.appendChild(this.componentRef.location.nativeElement);

    this.applicationRef.attachView(this.componentRef.hostView);

    this.confirmationSubject$ = new Subject<ConfirmationType>();

    this.componentRef.instance.close.subscribe((type) => this.onClose(type));

    return this.confirmationSubject$.asObservable();
  }

  private onClose(value: ConfirmationType): void {
    this.componentRef.destroy();
    this.confirmationSubject$.next(value);
    this.confirmationSubject$.complete();
  }
}
