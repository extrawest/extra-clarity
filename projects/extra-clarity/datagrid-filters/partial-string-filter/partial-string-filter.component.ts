import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ClrDatagridFilter, ClrDatagridFilterInterface, ClrPopoverToggleService} from '@clr/angular';
import {debounceTime, distinctUntilChanged, Observable, Subject, takeUntil} from 'rxjs';

const DEFAULT_MIN_LENGTH = 1;
const DEFAULT_DEBOUNCE_TIME_MS = 300;
const DEFAULT_PLACEHOLDER = 'Type to search...';
const DEFAULT_CONTAINER_WIDTH_PX = 200;

@Component({
  selector: 'ew-partial-string-filter',
  templateUrl: './partial-string-filter.component.html',
  styleUrls: ['./partial-string-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartialStringFilterComponent<T> implements ClrDatagridFilterInterface<T>, OnInit, OnDestroy, AfterViewInit {
  @Input() public minLength = DEFAULT_MIN_LENGTH;
  @Input() public debounceTimeMs = DEFAULT_DEBOUNCE_TIME_MS;
  @Input() public placeholder = DEFAULT_PLACEHOLDER;
  @Input() public propertyKey: string;
  @Input() public propertyDisplayName?: string;
  @Input() public width = DEFAULT_CONTAINER_WIDTH_PX;

  @ViewChild('inputEl') private inputRef: ElementRef<HTMLInputElement>;

  private readonly changesSubject$ = new Subject<string>();

  public control = new FormControl<string>('', {
    nonNullable: true,
    validators: Validators.minLength(this.minLength),
  });

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly clrDatagridFilter: ClrDatagridFilter,
    private readonly clrPopoverToggleService: ClrPopoverToggleService,
  ) {}

  public get changes(): Observable<string> {
    return this.changesSubject$.asObservable();
  }

  public ngOnInit(): void {
    this.clrDatagridFilter.setFilter(this);

    this.control.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(this.debounceTimeMs),
        distinctUntilChanged(),
      )
      .subscribe((value) => {
        this.changesSubject$.next(value);
      });

    if (typeof this.propertyDisplayName === 'undefined') {
      this.propertyDisplayName = this.propertyKey;
    }
  }

  public ngAfterViewInit(): void {
    this.clrPopoverToggleService.openChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.inputRef) {
          setTimeout(() => {
            this.inputRef.nativeElement.focus();
          }, 0);
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public isActive(): boolean {
    return !!this.control.value && !!this.propertyKey;
  }

  public accepts(item: T): boolean {
    console.log('item: ', item);
    if (!this.control.valid) {
      return true;
    }

    if (!Object(item).hasOwnProperty(this.propertyKey)) {
      return false;
    }

    const propertyValue = item[this.propertyKey as keyof typeof item];

    if (typeof propertyValue !== 'string') {
      return false;
    }

    return propertyValue.toLowerCase().indexOf(this.value.toLowerCase()) > -1;
  }

  public onReset() {
    this.control.reset();
    this.changesSubject$.next('');
    this.inputRef.nativeElement.focus();
  }

  public get value(): string {
    return this.control.value;
  }

  public get isTooShort() {
    return this.control.value.length < this.minLength;
  }
}


















// import {
//   AfterViewInit,
//   Component,
//   ElementRef,
//   EventEmitter,
//   Input,
//   OnInit,
//   OnDestroy,
//   ViewChild,
// } from '@angular/core';
// import {
//   UntypedFormControl,
//   UntypedFormGroup
// } from '@angular/forms';
// import {
//   ClrDatagridFilter,
//   ClrDatagridFilterInterface,
//   ClrPopoverToggleService
// } from '@clr/angular';
// import {
//   debounceTime,
//   Subject,
//   takeUntil
// } from 'rxjs';
//
// /* TODO: Autoreset if input length less then required */
//
// @Component({
//   selector: 'app-partial-string-filter-filter-filter',
//   templateUrl: './partial-string-filter-filter.component.html',
//   styles: [
//     `:host ::ng-deep .clr-form-control:first-child {
//       margin-top: 0;
//     }`,
//     `:host ::ng-deep .clr-control-container {
//       width: 100%;
//     }`,
//     `:host ::ng-deep .btn-block {
//       margin-top: 1rem;
//     }`,
//     `:host ::ng-deep input {
//       width: 100%;
//     }`
//   ]
// })
// export class PartialStringFilterComponent<T> implements ClrDatagridFilterInterface<T>, OnInit, OnDestroy, AfterViewInit {
//
//   @Input() characterLimit = 2;
//   @Input() debounceValue = 300;
//   @Input() placeholder = 'Filter by string';
//   @Input() propertyKey?: string;
//   @Input() propertyDisplayName?: string;
//
//   @ViewChild('input') input?: ElementRef<HTMLInputElement>;
//
//   #changes = new Subject<string>();
//   #deleted = new EventEmitter();
//   #form: UntypedFormGroup;
//
//   constructor(
//     private filterContainer: ClrDatagridFilter,
//     private smartToggleService: ClrPopoverToggleService
//   ) {
//
//     this.#form = new UntypedFormGroup({
//       'input': new UntypedFormControl('')
//     });
//
//     this.#form.get('input')?.valueChanges
//       .pipe(
//         takeUntil(this.#deleted),
//         debounceTime(this.debounceValue)
//       )
//       .subscribe(value => {
//         const isValidValue = 'string' === typeof value && value.length >= this.characterLimit;
//         if (isValidValue) {
//           this.#changes.next(value);
//         }
//       });
//
//     this.filterContainer.setFilter(this);
//   }
//
//   ngOnInit(): void {
//     if ('undefined' === typeof this.propertyDisplayName) {
//       this.propertyDisplayName = this.propertyKey;
//     }
//   }
//
//   ngAfterViewInit(): void {
//     this.smartToggleService.openChange
//       .pipe(takeUntil(this.#deleted))
//       .subscribe(() => {
//         if (this.input) {
//           setTimeout(() => {
//             this.input?.nativeElement.focus();
//           });
//         }
//       });
//   }
//
//   ngOnDestroy(): void {
//     this.#deleted.emit();
//   }
//
//   isActive(): boolean {
//     return !!this.value && !!this.propertyKey;
//   }
//
//   accepts(item: T): boolean {
//
//     if (!Object(item).hasOwnProperty(this.propertyKey)) {
//       return false;
//     }
//
//     const propertyValue = item[this.propertyKey as keyof typeof item];
//     if ('string' !== typeof propertyValue) {
//       return false;
//     }
//
//     const escape = (string: string) => string.replace(
//       /[.*+?^${}()|[\]\\]/g, '\\$&'
//     );
//
//     const test = new RegExp(
//       escape(this.value),
//       'i'
//     );
//
//     const match = propertyValue.match(test);
//
//     return Array.isArray(match);
//
//   }
//
//   equals(other: ClrDatagridFilterInterface<T, PartialStringFilterComponent<T>['state']>): boolean {
//     if (!other) {
//       return false;
//     }
//
//     return this.state?.property === other.state?.property
//       && this.state.value === other.state?.value;
//   }
//
//   reset() {
//     this.#form.reset();
//     this.#changes.next('');
//   }
//
//   get form() {
//     return this.#form;
//   }
//
//   get changes() {
//     return this.#changes.asObservable();
//   }
//
//   get state() {
//     return {
//       property: this.propertyKey,
//       value: this.value,
//     };
//   }
//
//   get value() {
//     return this.#form.get('input')?.value as string ?? '';
//   }
//
//   get isDirty() {
//     return this.#form.dirty;
//   }
//
//   get isToShort() {
//     return this.value.length < this.characterLimit;
//   }
//
// }
