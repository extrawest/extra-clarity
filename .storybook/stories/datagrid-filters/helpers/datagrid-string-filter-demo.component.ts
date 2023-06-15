import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClrDatagridModule } from '@clr/angular';

import { PartialStringFilterComponent } from '../../../../projects/extra-clarity/datagrid-filters';
import { USERS_DATA } from '../../../helpers';

@Component({
  selector: 'ec-datagrid-string-filter-demo',
  templateUrl: './datagrid-string-filter-demo.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ClrDatagridModule,
    PartialStringFilterComponent,
  ],
})
export class DatagridStringFilterDemoComponent {
  @Input()
  minLength: number;

  @Input()
  width: number;

  @Input()
  propertyDisplayName: string;

  @Input()
  fullMatch: boolean;

  @Input()
  placeholder: string;

  @Input()
  debounceTimeMs: number;

  protected users = USERS_DATA;
}
