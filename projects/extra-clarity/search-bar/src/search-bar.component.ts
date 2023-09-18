import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CdsIconModule } from '@cds/angular';
import { ClarityIcons, searchIcon, windowCloseIcon } from '@cds/core/icon';
import { ClrInputModule } from '@clr/angular';
import { uniqueIdFactory } from '@extrawest/extra-clarity/utils';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'ec-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    ReactiveFormsModule,
    CdsIconModule,
    ClrInputModule,
  ],
})
export class SearchBarComponent implements OnChanges, OnDestroy, OnInit {
  @Input()
  public debounceMs: number = 0;

  @Input()
  public highlightActive: boolean = false;

  @Input()
  public iconOnFill?: string;

  @Input()
  public label?: string;

  @Input()
  public placeholder: string = 'Type to search...';

  @Input()
  public value?: string | null;

  @Output()
  public valueChange: EventEmitter<string> = new EventEmitter();

  @ViewChild('searchInputRef', { static: true })
  protected inputRef?: ElementRef<HTMLInputElement>;

  protected readonly formControl = new FormControl<string>('', { nonNullable: true });
  protected readonly inputId = uniqueIdFactory();

  private readonly destroy$ = new Subject<void>();

  constructor() {
    ClarityIcons.addIcons(searchIcon, windowCloseIcon);
  }

  ngOnChanges(changes: SimpleChanges): void {
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

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(
        tap(value => !value && this.valueChange.emit('')),
        debounceTime(this.debounceMs),
        takeUntil(this.destroy$),
      )
      .subscribe(value => {
        if (value && value === this.formControl.value) {
          this.valueChange.emit(value);
        }
      });

    // TODO: check if this is really needed (why not use the initial ngOnChanges for that?)
    if (this.value) {
      this.valueChange.emit(this.value);
    }
  }

  public clearInput(): void {
    this.formControl.reset();
    this.focusSearchBar();
  }

  public focusSearchBar(): void {
    this.inputRef?.nativeElement.focus();
  }
}
