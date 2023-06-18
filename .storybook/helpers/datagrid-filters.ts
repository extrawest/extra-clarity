import {
  type EnumValueFilterOption,
  type EnumValueFilterOptionGroup,
} from '../../projects/extra-clarity/datagrid-filters';

export const linksToClrDatagridDocs = `
> You also may find useful to refer to the original documentation on
[Clarity datagrids](https://clarity.design/documentation/datagrid/custom-filtering) in general,
[server-driven datagrids](https://clarity.design/documentation/datagrid/server-driven),
and [custom filtering](https://clarity.design/documentation/datagrid/custom-filtering).
`;

export const colorEnumOptions: EnumValueFilterOption<string>[] = [
  { value: 'black', label: 'Black' },
  { value: 'blue', label: 'Blue' },
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
];

export const colorGroupedEnumOptions: EnumValueFilterOptionGroup<string>[] = [
  {
    label: 'Grayscale',
    items: [
      { value: 'black', label: 'Black' },
      { value: 'white', label: 'White' },
      { value: 'gray', label: 'Gray' },
      { value: 'silver', label: 'Silver' },
    ],
  },
  {
    label: 'Rainbow',
    items: [
      { value: 'red', label: 'Red' },
      { value: 'orange', label: 'Orange' },
      { value: 'yellow', label: 'Yellow' },
      { value: 'green', label: 'Green' },
      { value: 'blue', label: 'Blue' },
      { value: 'indigo', label: 'Indigo' },
      { value: 'violet', label: 'Violet' },
    ],
  },
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
