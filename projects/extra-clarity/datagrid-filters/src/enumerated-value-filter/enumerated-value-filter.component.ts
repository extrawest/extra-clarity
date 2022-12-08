import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ClrDatagridFilter, ClrDatagridFilterInterface} from '@clr/angular';
import {Observable, Subject, takeUntil} from 'rxjs';

const DEFAULT_MIN_LENGTH = 200;

@Component({
  selector: 'ew-enumerated-value-filter',
  templateUrl: './enumerated-value-filter.component.html',
  styleUrls: ['./enumerated-value-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnumeratedValueFilterComponent<T extends { [key: string]: string | number }> implements ClrDatagridFilterInterface<T>, OnInit, OnDestroy {
  @Input() width = DEFAULT_MIN_LENGTH;
  @Input() values: Array<string | number> = [];
  @Input() propertyKey: string;
  @Input() propertyDisplayName?: string;

  public readonly control = new FormControl<string | number>('');

  private readonly destroy$ = new Subject<void>();
  private readonly changesSubject$ = new Subject<string | number | null>();

  constructor(
    private readonly clrDatagridFilter: ClrDatagridFilter,
  ) {}

  public get changes(): Observable<string | number | null> {
    return this.changesSubject$.asObservable();
  }

  public ngOnInit(): void {
    this.clrDatagridFilter.setFilter(this);

    this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.changesSubject$.next(value));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get value() {
    return this.control.value;
  }

  public isActive(): boolean {
    return !!this.propertyKey && !!this.value;
  }

  public accepts(item: T): boolean {
    if (!Object(item).hasOwnProperty(this.propertyKey)) {
      return false;
    }

    const propertyValue = item[this.propertyKey as keyof typeof item];

    if (typeof this.value !== typeof propertyValue) {
      return false;
    }

    return propertyValue === this.value;
  }

  public onReset() {
    this.control.reset();
  }
}
