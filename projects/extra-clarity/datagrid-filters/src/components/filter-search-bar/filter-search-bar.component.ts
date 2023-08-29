import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CdsIconModule } from '@cds/angular';
import { ClarityIcons, searchIcon, windowCloseIcon } from '@cds/core/icon';
import { ClrInputModule } from '@clr/angular';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ec-filter-search-bar',
  templateUrl: './filter-search-bar.component.html',
  styleUrls: ['./filter-search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CdsIconModule,
    ClrInputModule,
  ],
})
export class FilterSearchBarComponent implements OnDestroy, OnInit {
  protected searchInput = new FormControl<string>('', { nonNullable: true });

  @Output()
  private valueChange = new EventEmitter<string>();

  @ViewChild('searchInputRef')
  private searchInputRef?: ElementRef<HTMLInputElement>;

  private readonly destroy$ = new Subject<void>();

  constructor() {
    ClarityIcons.addIcons(searchIcon, windowCloseIcon);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.valueChange.emit(value));
  }

  public focusSearchBar(): void {
    this.searchInputRef?.nativeElement.focus();
  }

  protected clearSearchBar(): void {
    this.searchInput.reset();
    this.focusSearchBar();
  }
}
