import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ec-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input()
  public title: string;

  @Input()
  public empty: boolean;

  @Input()
  public loading: boolean;

  @Input()
  public error: HttpErrorResponse | null;

  /** `EventEmitter<void>` */
  @Output()
  public reload = new EventEmitter<void>();

  protected onReload(): void {
    this.reload.emit();
  }
}
