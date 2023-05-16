import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ClrCheckboxModule, ClrDatagridFilterInterface, ClrRadioModule } from '@clr/angular';
import { Subject } from 'rxjs';

import { EnumFilterOption, FilterState } from '../interfaces/filter-state.interface';

const DEFAULT_MAX_HEIGHT_PX = 300;
const DEFAULT_WIDTH_PX = 200;

@Component({
  selector: 'ec-enum-single-filter',
  templateUrl: './enum-single-filter.component.html',
  styleUrls: ['./enum-single-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ClrRadioModule,
    ClrCheckboxModule,
  ],
})
export class EnumSingleFilterComponent<T, E>
implements ClrDatagridFilterInterface<T, FilterState<E>>, OnChanges, OnDestroy, OnInit {
  @Input() heightPx: number = DEFAULT_MAX_HEIGHT_PX;
  @Input() widthPx: number = DEFAULT_WIDTH_PX;

  @Input() propertyKey = '';
  @Input() title?: string;
  @Input() showSelectedValue = false;
  @Input() customLabelTpl?: TemplateRef<unknown>;

  @Input() loading = false;
  @Input() options: EnumFilterOption<E>[] = [];
  @Input() selectValue: E | null | undefined;

  @Output() selectionChanged = new EventEmitter<FilterState<E>>();

  configErrors?: string[];
  defaultValue?: E;
  hasCustomDefaultState = false;
  isStateDefault = true;
  selectedValue?: E;

  readonly changes = new Subject<void>();

  private readonly destroy$ = new Subject<void>();

  get shownSelectedValue(): string {
    if (this.selectedValue === undefined) {
      return 'none';
    }
    const selectedOption = this.options.find(option => option.value === this.selectedValue);
    return selectedOption?.label || String(this.selectedValue);
  }

  get state(): FilterState<E> {
    return {
      property: this.propertyKey,
      value: this.selectedValue,
    };
  }

  accepts(item: T): boolean {
    return false;
  }

  isActive(): boolean {
    return !!this.propertyKey && !this.isStateDefault;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.onOptionsChange();
      return;
    }

    if (changes['selectValues'] && this.selectValue !== undefined) {
      this.forceSelection(this.selectValue);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.configErrors = this.checkInputsValidity();
  }

  onInputChange(inputValue: E): void {
    this.updateSelectedValue(inputValue);
  }

  resetToDefault(): void {
    this.updateSelectedValue(this.defaultValue);
  }

  trackByValue(index: number, option: EnumFilterOption<E>): E {
    return option.value;
  }

  unselectAll(): void {
    this.updateSelectedValue(undefined);
  }

  private isValueAllowed(value: E): boolean {
    return this.options.some(option => option.value === value);
  }

  private checkInputsValidity(): string[] | undefined {
    if (this.propertyKey) {
      return;
    }
    return ['[propertyKey] is required'];
  }

  private forceSelection(selectValue: E | null): void {
    if (selectValue === null || !this.isValueAllowed(selectValue)) {
      this.resetToDefault();
      return;
    }
    this.updateSelectedValue(selectValue);
  }

  private onOptionsChange(): void {
    const optionsSelectedByDefault = this.options.filter(option => option.selectedByDefault);

    this.defaultValue = optionsSelectedByDefault.length === 1
      ? optionsSelectedByDefault[0].value
      : undefined;

    this.hasCustomDefaultState = this.defaultValue !== undefined;

    if (this.selectValue === undefined) {
      this.resetToDefault();
      return;
    }

    this.forceSelection(this.selectValue);
  }

  private updateSelectedValue(
    newSelectedValue: E | undefined,
    params: { emit: boolean } = { emit: true },
  ): void {
    if (newSelectedValue === this.selectedValue) {
      return;
    }
    this.selectedValue = newSelectedValue;
    this.isStateDefault = this.selectedValue === this.defaultValue;
    if (params.emit) {
      this.selectionChanged.emit(this.state);
      this.changes.next();
    }
  }
}
