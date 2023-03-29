import {Component, Input} from '@angular/core';
import {ConfirmDialogConfig, DialogService} from "../../projects/extra-clarity/dialog";

@Component({
  selector: 'storybook-enum-filter',
  template: `
    <clr-datagrid
      (clrDgRefresh)="refresh($event)">
      <clr-dg-column>User ID</clr-dg-column>
      <clr-dg-column>
        Name
        <clr-dg-filter>
          <ec-enumerated-value-filter
            [values]="values"
            [propertyKey]="'name'"
            [multiple]="true"
          ></ec-enumerated-value-filter>
        </clr-dg-filter>
      </clr-dg-column>
      <clr-dg-column>Creation date</clr-dg-column>
      <clr-dg-column>Favorite color</clr-dg-column>

      <clr-dg-row *clrDgItems="let user of users">
        <clr-dg-cell>{{user.id}}</clr-dg-cell>
        <clr-dg-cell>{{user.name}}</clr-dg-cell>
        <clr-dg-cell>{{user.creation | date}}</clr-dg-cell>
        <clr-dg-cell>{{user.color}}</clr-dg-cell>
      </clr-dg-row>

      <clr-dg-footer>{{users.length}} users</clr-dg-footer>
    </clr-datagrid>
  `,
})
export class EnumeratedValueFilterStoryComponent {
  @Input() values: any[];
  @Input() users: any[];

  refresh(state: any): void {
    console.log(state);
  }
}
