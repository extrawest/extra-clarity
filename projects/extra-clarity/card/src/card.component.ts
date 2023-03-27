import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ec-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() title: string;

  @Input() empty: boolean;
  @Input() loading: boolean;
  @Input() error: HttpErrorResponse | null;

  @Output() readonly reload = new EventEmitter<void>();

  onReload(): void {
    this.reload.emit();
  }
}
