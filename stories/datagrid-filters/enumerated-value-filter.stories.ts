import { ClrDatagridModule } from "@clr/angular";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {
  EnumeratedValueFilterComponent
} from "../../projects/extra-clarity/datagrid-filters";
import { USERS_DATA } from './constants';

export default {
  title: 'Components/Datagrid Filters',
  decorators: [
    moduleMetadata({
      imports: [
        EnumeratedValueFilterComponent,
        ClrDatagridModule,
      ],
    }),
  ],
  argTypes: {
    propertyKey: { defaultValue: 'name', control: { type: 'select', options: ['id', 'name', 'creation'] } },
  },
  args: {
    width: 200,
    values: [{
      label: 'John',
      value: 'John',
      selected: true,
    }, {
      label: 'Anna',
      value: 'Anna',
    }, {
      label: 'test2',
      value: 'test2',
    }],
    propertyDisplayName: '',
    multiple: false,
  },
  parameters: {
    viewMode: 'story',
  },
} as Meta;

export const EnumeratedValueFilterStory: Story = args => ({
  props: {
    ...args,
    users: USERS_DATA,
  },
  viewMode: 'story',
  template: `
    <clr-datagrid>
      <clr-dg-column>User ID</clr-dg-column>
      <clr-dg-column>
        Name
        <clr-dg-filter>
          <ec-enumerated-value-filter
            [values]="values"
            [width]="width"
            [propertyKey]="'name'"
            [multiple]="multiple"
            [propertyDisplayName]="propertyDisplayName"
          ></ec-enumerated-value-filter>
        </clr-dg-filter>
      </clr-dg-column>
      <clr-dg-column>Creation date</clr-dg-column>
      <clr-dg-column>Favorite color</clr-dg-column>

      <clr-dg-row *clrDgItems="let user of users" [clrDgItem]="element">
        <clr-dg-cell>{{user.id}}</clr-dg-cell>
        <clr-dg-cell>{{user.name}}</clr-dg-cell>
        <clr-dg-cell>{{user.creation | date}}</clr-dg-cell>
        <clr-dg-cell>{{user.color}}</clr-dg-cell>
      </clr-dg-row>

      <clr-dg-footer>{{users.length}} users</clr-dg-footer>
    </clr-datagrid>
  `,
});
EnumeratedValueFilterStory.storyName = 'Enumerated value filter';
