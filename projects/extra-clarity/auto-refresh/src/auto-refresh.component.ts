import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClrCheckboxModule } from '@clr/angular';
import { finalize, map, Observable, repeat, takeWhile, timer } from 'rxjs';

export const DEFAULT_PERIOD_SEC = 60;

@Component({
  selector: 'ec-auto-refresh',
  templateUrl: './auto-refresh.component.html',
  styleUrls: ['./auto-refresh.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClrCheckboxModule,
  ],
})
export class AutoRefreshComponent {
  @Input()
  public refreshing: boolean;

  /** Refreshing period in seconds */
  @Input()
  public set period(value: number) {
    if (value > 0) {
      this._period = value;
    }
  }

  @Input()
  public set enabled(value: boolean) {
    this.toggleControl.patchValue(value);
  }

  @Input()
  public set blocked(value: boolean) {
    if (value) {
      this.toggleControl.disable();
    } else {
      this.toggleControl.enable();
    }
  }

  /**
   * `EventEmitter<void>`
   * */
  @Output()
  public readonly refresh = new EventEmitter<void>();

  /**
   * `EventEmitter<boolean>`
   * */
  @Output()
  public readonly toggle = new EventEmitter<boolean>();

  protected readonly toggleControl = new FormControl<boolean>(false, { nonNullable: true });

  private _period = DEFAULT_PERIOD_SEC;

  protected readonly timer$: Observable<number> = timer(0, 1000)
    .pipe(
      map((seconds) => this._period - seconds),
      takeWhile((seconds) => seconds > 0),
      finalize(() => {
        if (this.toggleControl.value && !this.refreshing) {
          this.refresh.emit();
        }
      }),
      repeat(),
    );

  protected onToggle(): void {
    this.toggle.emit(this.toggleControl.value);
  }
}
