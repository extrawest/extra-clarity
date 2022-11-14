import { Component, Input, EventEmitter, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ClrDatagridFilterInterface } from '@clr/angular';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-enumerated-value-filter',
  templateUrl: './enumerated-value-filter.component.html',
  styles: [
    `:host ::ng-deep .p2.filter-title {
      margin-top: 0;
    }`
  ]
})
export class EnumeratedValueFilterComponent<T> implements ClrDatagridFilterInterface<T>, OnDestroy {

  @Input() debounceValue = 300;
  @Input() values: readonly (string | number | symbol)[] = [];
  @Input() propertyKey?: string;
  @Input() propertyDisplayName?: string;

  #exclusive = false;
  @Input()
  set exclusive(value: boolean) {
    this.#exclusive = value;
  }

  get exclusive() {
    return this.#exclusive;
  }

  #changes: Subject<(typeof this.values)[number]> = new Subject();
  #deleted = new EventEmitter();
  #form: UntypedFormGroup;

  constructor() {
    this.#form = new UntypedFormGroup({
      'input': new UntypedFormControl('')
    });

    this.#form.get('input')?.valueChanges
      .pipe(
        takeUntil(this.#deleted),
        debounceTime(this.debounceValue)
      )
      .subscribe(value => this.#changes.next(value));

  }

  ngOnDestroy(): void {
    this.#deleted.emit();
  }

  reset() {
    this.#form.reset();
  }

  get changes() {
    return this.#changes.asObservable();
  }

  get form() {
    return this.#form;
  }

  get state() {
    return {
      property: this.propertyKey,
      value: this.value,
    };
  }

  get isDirty() {
    return this.#form.dirty;
  }

  get value() {
    return this.#form.get('input')?.value;
  }

  isActive(): boolean {
    return !!this.propertyKey && !!this.value;
  }

  accepts(item: T): boolean {

    if (!Object(item).hasOwnProperty(this.propertyKey)) {
      return false;
    }

    const propertyValue = item[this.propertyKey as keyof typeof item];
    if (typeof this.value !== typeof propertyValue) {
      return false;
    }

    return propertyValue === this.value;

  }

  equals(other: ClrDatagridFilterInterface<T, EnumeratedValueFilterComponent<T>['state']>): boolean {
    if (!other) {
      return false;
    }

    return this.state?.property === other.state?.property
      && this.state.value === other.state?.value;
  }

}
