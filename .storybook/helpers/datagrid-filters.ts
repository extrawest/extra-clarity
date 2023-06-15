import { type EnumFilterOption } from '../../projects/extra-clarity/datagrid-filters';

export const colorEnumOptions: EnumFilterOption<string>[] = [
  { value: 'black', label: 'Black' },
  { value: 'blue', label: 'Blue' },
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
];

export const USERS_DATA = [
  { id: 1, name: 'John', createdAt: Date.now(), color: 'black' },
  { id: 2, name: 'Sarah', createdAt: Date.now(), color: 'white' },
  { id: 3, name: 'James', createdAt: Date.now(), color: 'red' },
  { id: 4, name: 'Anna', createdAt: Date.now(), color: 'blue' },
];

export const wrapFilterWithinDatagrid = (
  filterTemplate: string,
  filterProperty: 'color' | 'name',
): string => {
  const getColumnTemplate = (property: string, label: string): string => {
    return filterProperty !== property
      ? (`<clr-dg-column> ${label} </clr-dg-column>`)
      : (`
      <clr-dg-column>
        ${label}
        <clr-dg-filter>
          ${filterTemplate}
        </clr-dg-filter>
      </clr-dg-column>
      `);
  };

  return `
    <clr-datagrid>
      <clr-dg-placeholder>
        No data found for the selected filter settings
      </clr-dg-placeholder>

      ${getColumnTemplate('id', 'User ID')}
      ${getColumnTemplate('name', 'Name')}
      ${getColumnTemplate('createdAt', 'Creation date')}
      ${getColumnTemplate('color', 'Favorite color')}

      <clr-dg-row *clrDgItems="let user of users" [clrDgItem]="user">
        <clr-dg-cell>{{ user.id }}</clr-dg-cell>
        <clr-dg-cell>{{ user.name }}</clr-dg-cell>
        <clr-dg-cell>{{ user.createdAt | date }}</clr-dg-cell>
        <clr-dg-cell>{{ user.color }}</clr-dg-cell>
      </clr-dg-row>

      <clr-dg-footer>{{ users.length }} users</clr-dg-footer>
    </clr-datagrid>
  `;
};
