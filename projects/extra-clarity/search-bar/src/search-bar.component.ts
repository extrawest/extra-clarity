import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ClarityIcons, searchIcon, windowCloseIcon } from '@cds/core/icon';
import { ClrIconModule, ClrInputModule } from '@clr/angular';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';

import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';
import { uniqueIdFactory } from '@extrawest/extra-clarity/utils';

export const SEARCH_BAR_DEFAULTS = {
  debounceTimeMs: 0,
  placeholder: 'Type to search...',
};

@Component({
  selector: 'ec-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, ClrIconModule, ClrInputModule],
})
export class EcSearchBarComponent implements OnChanges, OnInit {
  /**
   * Debounce delay for the input field in milliseconds, i.e. a delay between entering the last
   * character and emitting the entered value to the `valueChange` output.
   * Ignored on clearing the input field.
   */
  @Input()
  public debounceMs: number = SEARCH_BAR_DEFAULTS.debounceTimeMs;

  /**
   * Whether to set background-color to light-blue when any value is entered
   */
  @Input()
  public highlightActive: boolean = false;

  /**
   * Shape of an alternative `cds-icon` to show in place of the default search-icon
   * when any value is entered.
   *
   * This icon must be registered within the project using `ClarityIcons.addIcon()`.
   */
  @Input()
  public iconOnFill?: string;

  /** Whether the input field is disabled (blocked) */
  @Input()
  public isDisabled = false;

  /**
   * An optional text label to show before the search bar
   */
  @Input()
  public label?: string;

  /**
   * Placeholder for the empty input field
   */
  @Input()
  public placeholder: string;

  /**
   * A value to be set as the entered value on this input change. `undefined` will be ignored.
   */
  @Input()
  public value?: string;

  /**
   * Emits the entered value on every change after the `debounceMs` delay if configured.
   *
   * `EventEmitter<string>`
   */
  @Output()
  public valueChange = new EventEmitter<string>();

  protected readonly inputRef = viewChild.required<ElementRef<HTMLInputElement>>('searchInputRef');

  protected readonly formControl = new FormControl<string>('', {
    nonNullable: true,
  });
  protected readonly inputId = uniqueIdFactory();

  private readonly unobserve$ = new Subject<void>();

  constructor(
    protected commonStrings: EcCommonStringsService,
    private changeDetectorRef: ChangeDetectorRef,
    private destroyRef: DestroyRef,
  ) {
    ClarityIcons.addIcons(searchIcon, windowCloseIcon);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const debounceMsChange = changes['debounceMs'];
    if (debounceMsChange && !debounceMsChange.isFirstChange()) {
      this.observeValueChanges();
    }

    if (changes['isDisabled']) {
      if (this.isDisabled) {
        this.formControl.disable({ emitEvent: false });
      } else {
        this.formControl.enable({ emitEvent: false });
      }
    }

    const valueChange = changes['value'];
    if (!valueChange || this.value === undefined) {
      return;
    }

    // manual emitting - to bypass debouncing in formControl.valueChanges.pipe()
    this.formControl.setValue(this.value ?? '', { emitEvent: false });
    if (!valueChange.isFirstChange()) {
      this.valueChange.emit(this.formControl.value);
    }
  }

  ngOnInit(): void {
    this.observeValueChanges();

    this.commonStrings.stringsChanged$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetectorRef.markForCheck());

    // TODO: check if this is really needed (why not use the initial ngOnChanges for that?)
    if (this.value) {
      this.valueChange.emit(this.value);
    }
  }

  /**
   * Clean up the input to an empty string, and focus it.
   */
  public clearInput(): void {
    this.formControl.reset();
    this.focusSearchBar();
  }

  /**
   * Focus the input element (put the cursor into it).
   */
  public focusSearchBar(): void {
    this.inputRef().nativeElement.focus();
  }

  private observeValueChanges(): void {
    this.unobserve$.next();

    this.formControl.valueChanges
      .pipe(
        tap((value) => !value && this.valueChange.emit('')),
        debounceTime(this.debounceMs),
        takeUntil(this.unobserve$),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        if (value && value === this.formControl.value) {
          this.valueChange.emit(value);
        }
      });
  }
}
