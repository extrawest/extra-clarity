import { ClrDatagridModule } from "@clr/angular";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {PartialStringFilterComponent} from "../../projects/extra-clarity/datagrid-filters";
import { USERS_DATA } from './constants';

export default {
  title: 'Components/Datagrid Filters',
  decorators: [
    moduleMetadata({
      imports: [
        PartialStringFilterComponent,
        ClrDatagridModule,
      ],
    }),
  ],
  argTypes: {
    propertyKey: { defaultValue: 'name', control: { type: 'select', options: ['id', 'name', 'creation'] } },
  },
  args: {
    width: 200,
    minLength: 2,
    debounceTimeMs: 200,
    placeholder: 'Type smthing',
    propertyDisplayName: '',
    fullMatch: false,
  },
  parameters: {
    viewMode: 'story',
  },
} as Meta;

export const PartialStringFilterStory: Story = args => ({
  props: {
    ...args,
    users: USERS_DATA,
  },
  args: {
    test: 123,
  },
  viewMode: 'story',
  template: `
    <clr-datagrid>
      <clr-dg-column>User ID</clr-dg-column>
      <clr-dg-column>
      <ng-container>Name</ng-container>
        <clr-dg-filter>
          <ec-partial-string-filter
            [minLength]="minLength"
            [width]="width"
            [propertyDisplayName]="propertyDisplayName"
            [propertyKey]="propertyKey"
            [fullMatch]="fullMatch"
            [placeholder]="placeholder"
            [debounceTimeMs]="debounceTimeMs"
          ></ec-partial-string-filter>
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
PartialStringFilterStory.storyName = 'Partial string filter';
