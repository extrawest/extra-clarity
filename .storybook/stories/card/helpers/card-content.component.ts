import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ClrDatagridModule } from '@clr/angular';

import { USERS_MOCK } from './card-content.mocks';

@Component({
  selector: 'ec-storybook-card-content',
  templateUrl: './card-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ClrDatagridModule],
})
export class CardContentComponent {
  protected readonly users = USERS_MOCK;
}
