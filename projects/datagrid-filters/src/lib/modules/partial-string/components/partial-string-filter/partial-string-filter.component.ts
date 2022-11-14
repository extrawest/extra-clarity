import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup
} from '@angular/forms';
import {
  ClrDatagridFilter,
  ClrDatagridFilterInterface,
  ClrPopoverToggleService
} from '@clr/angular';
import {
  debounceTime,
  Subject,
  takeUntil
} from 'rxjs';

/* TODO: Autoreset if input length less then required */

@Component({
  selector: 'app-partial-string-filter',
  templateUrl: './partial-string-filter.component.html',
  styles: [
    `:host ::ng-deep .clr-form-control:first-child {
      margin-top: 0;
    }`,
    `:host ::ng-deep .clr-control-container {
      width: 100%;
    }`,
    `:host ::ng-deep .btn-block {
      margin-top: 1rem;
    }`,
    `:host ::ng-deep input {
      width: 100%;
    }`
  ]
})
export class PartialStringFilterComponent<T> implements ClrDatagridFilterInterface<T>, OnInit, OnDestroy, AfterViewInit {

  @Input() characterLimit = 2;
  @Input() debounceValue = 300;
  @Input() placeholder = 'Filter by string';
  @Input() propertyKey?: string;
  @Input() propertyDisplayName?: string;

  @ViewChild('input') input?: ElementRef<HTMLInputElement>;

  #changes = new Subject<string>();
  #deleted = new EventEmitter();
  #form: UntypedFormGroup;

  constructor(
    private filterContainer: ClrDatagridFilter,
    private smartToggleService: ClrPopoverToggleService
  ) {

    this.#form = new UntypedFormGroup({
      'input': new UntypedFormControl('')
    });

    this.#form.get('input')?.valueChanges
      .pipe(
        takeUntil(this.#deleted),
        debounceTime(this.debounceValue)
      )
      .subscribe(value => {
        const isValidValue = 'string' === typeof value && value.length >= this.characterLimit;
        if (isValidValue) {
          this.#changes.next(value);
        }
      });

    this.filterContainer.setFilter(this);
  }

  ngOnInit(): void {
    if ('undefined' === typeof this.propertyDisplayName) {
      this.propertyDisplayName = this.propertyKey;
    }
  }

  ngAfterViewInit(): void {
    this.smartToggleService.openChange
      .pipe(takeUntil(this.#deleted))
      .subscribe(() => {
        if (this.input) {
          setTimeout(() => {
            this.input?.nativeElement.focus();
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.#deleted.emit();
  }

  isActive(): boolean {
    return !!this.value && !!this.propertyKey;
  }

  accepts(item: T): boolean {

    if (!Object(item).hasOwnProperty(this.propertyKey)) {
      return false;
    }

    const propertyValue = item[this.propertyKey as keyof typeof item];
    if ('string' !== typeof propertyValue) {
      return false;
    }

    const escape = (string: string) => string.replace(
      /[.*+?^${}()|[\]\\]/g, '\\$&'
    );

    const test = new RegExp(
      escape(this.value),
      'i'
    );

    const match = propertyValue.match(test);

    return Array.isArray(match);

  }

  equals(other: ClrDatagridFilterInterface<T, PartialStringFilterComponent<T>['state']>): boolean {
    if (!other) {
      return false;
    }

    return this.state?.property === other.state?.property
      && this.state.value === other.state?.value;
  }

  reset() {
    this.#form.reset();
    this.#changes.next('');
  }

  get form() {
    return this.#form;
  }

  get changes() {
    return this.#changes.asObservable();
  }

  get state() {
    return {
      property: this.propertyKey,
      value: this.value,
    };
  }

  get value() {
    return this.#form.get('input')?.value as string ?? '';
  }

  get isDirty() {
    return this.#form.dirty;
  }

  get isToShort() {
    return this.value.length < this.characterLimit;
  }

}
