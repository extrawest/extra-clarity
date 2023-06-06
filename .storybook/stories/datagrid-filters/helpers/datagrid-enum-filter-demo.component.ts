import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClrDatagridModule } from '@clr/angular';

import { EnumeratedValueFilterComponent, type EnumFilterValue } from '../../../../projects/extra-clarity/datagrid-filters';

import { USERS_DATA } from './mocks';

@Component({
  selector: 'ec-datagrid-enum-filter-demo',
  templateUrl: './datagrid-enum-filter-demo.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ClrDatagridModule,
    EnumeratedValueFilterComponent,
  ],
})
export class DatagridEnumFilterDemoComponent {
  @Input()
  width: number;

  @Input()
  propertyDisplayName: string;

  @Input()
  multiple: boolean;

  /** `Array<{ label: string | number; value: any; selected?: boolean; }>` */
  @Input()
  values: EnumFilterValue[];

  protected users = USERS_DATA;
}
