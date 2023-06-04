import { CommonModule } from '@angular/common';
import { type HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ClrDatagridModule } from '@clr/angular';

import { USERS_MOCK } from './card-content.mocks';

@Component({
  selector: 'ec-storybook-card-content',
  templateUrl: './card-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ClrDatagridModule,
  ],
})
export class CardContentComponent {
  @Input() title: string;
  @Input() empty: boolean;
  @Input() loading: boolean;
  @Input() error: HttpErrorResponse | null;

  protected readonly users = USERS_MOCK;
}
