import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {delayWhen, finalize, map, of, repeat, take, timer} from "rxjs";
import {FormControl} from "@angular/forms";

const DEFAULT_PERIOD_SEC = 10;

@Component({
  selector: 'lib-auto-refresh',
  templateUrl: './auto-refresh.component.html',
  styleUrls: ['./auto-refresh.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoRefreshComponent {
  @Input() public period: number = DEFAULT_PERIOD_SEC;
  @Input() public refreshing: boolean;
  @Input() public disabled: boolean = false;

  @Output() refresh = new EventEmitter<void>();
  @Output() toggle = new EventEmitter<boolean>();

  public readonly toggleControl = new FormControl<boolean>(!this.disabled, { nonNullable: true });

  public readonly timer$ = timer(0, 1000)
    .pipe(
      map((seconds) => this.period - seconds - 1),
      take(this.period),
      delayWhen(() => of(this.refreshing)),
      finalize(() => this.refresh.emit()),
      repeat(),
    );

  public onToggle(): void {
    this.toggle.emit(this.toggleControl.value);
  }
}
