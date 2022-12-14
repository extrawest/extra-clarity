import { CommonModule } from '@angular/common';
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
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClrDatagridFilter, ClrDatagridFilterInterface, ClrInputModule, ClrPopoverToggleService } from '@clr/angular';
import { debounceTime, distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';

const DEFAULT_MIN_LENGTH = 1;
const DEFAULT_DEBOUNCE_TIME_MS = 300;
const DEFAULT_PLACEHOLDER = 'Type to search...';
const DEFAULT_CONTAINER_WIDTH_PX = 200;

@Component({
  selector: 'ec-partial-string-filter',
  standalone: true,
  templateUrl: './partial-string-filter.component.html',
  styleUrls: ['./partial-string-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClrInputModule,
  ],
})
export class PartialStringFilterComponent<T> implements ClrDatagridFilterInterface<T>, OnInit, OnDestroy, AfterViewInit {
  @Input() public minLength = DEFAULT_MIN_LENGTH;
  @Input() public debounceTimeMs = DEFAULT_DEBOUNCE_TIME_MS;
  @Input() public placeholder = DEFAULT_PLACEHOLDER;
  @Input() public propertyKey: string;
  @Input() public propertyDisplayName: string;
  @Input() public width = DEFAULT_CONTAINER_WIDTH_PX;
  @Input() public serverDriven: boolean;
  @Input() public fullMatch: boolean;
  @Input() public set value(v) {
    this.control.patchValue(v);
  }

  public readonly control = new FormControl<string>('', {
    nonNullable: true,
    validators: Validators.minLength(this.minLength),
  });

  @ViewChild('inputEl') private inputRef: ElementRef<HTMLInputElement>;

  private readonly changesSubject$ = new Subject<string>();
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
    if (this.serverDriven) {
      return false;
    }

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

    if (this.fullMatch) {
      return propertyValue.toLowerCase() === this.value.toLowerCase();
    }

    return propertyValue.toLowerCase().indexOf(this.value.toLowerCase()) !== -1;
  }

  public onReset(): void {
    this.control.reset();
    this.changesSubject$.next('');
    this.inputRef.nativeElement.focus();
  }

  public get value(): string {
    return this.control.value;
  }

  public get isTooShort(): boolean {
    return this.control.value.length < this.minLength;
  }
}
