import {
  type EcEnumValueFilterOption,
  type EcEnumValueFilterOptionGroup,
} from '@extrawest/extra-clarity/datagrid-filters';

export const linksToClrDatagridDocs = `
> You also may find useful to refer to the original documentation on
[Clarity datagrids](https://clarity.design/documentation/datagrid) in general,
[server-driven datagrids](https://clarity.design/documentation/datagrid/code/server-driven),
and [custom filtering](https://clarity.design/documentation/datagrid/code/custom-filtering).
`;

export const colorEnumOptions: EcEnumValueFilterOption<string>[] = [
  { value: 'black', label: 'Black' },
  { value: 'blue', label: 'Blue' },
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
];

export const colorGroupedEnumOptions: EcEnumValueFilterOptionGroup<string>[] = [
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

const MS_IN_ONE_HOUR = 1000 * 60 * 60;
const MS_IN_ONE_DAY = MS_IN_ONE_HOUR * 24;

// spread over time so that the time-range filter's presets tell the rows apart
export const USERS_DATA = [
  { id: 1, name: 'John', createdAt: Date.now(), color: 'black' },
  { id: 2, name: 'Sarah', createdAt: Date.now() - 3 * MS_IN_ONE_HOUR, color: 'white' },
  { id: 3, name: 'James', createdAt: Date.now() - 30 * MS_IN_ONE_HOUR, color: 'red' },
  { id: 4, name: 'Anna', createdAt: Date.now() - 10 * MS_IN_ONE_DAY, color: 'blue' },
];

export const wrapFilterWithinDatagrid = (
  filterTemplate: string,
  filterProperty: 'color' | 'createdAt' | 'name',
): string => {
  const getColumnTemplate = (property: string, label: string): string => {
    return filterProperty !== property
      ? `<clr-dg-column> ${label} </clr-dg-column>`
      : `
      <clr-dg-column>
        ${label}
        <clr-dg-filter>
          ${filterTemplate}
        </clr-dg-filter>
      </clr-dg-column>
      `;
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

      <clr-dg-row *clrDgItems="let user of users">
        <clr-dg-cell>{{ user.id }}</clr-dg-cell>
        <clr-dg-cell>{{ user.name }}</clr-dg-cell>
        <clr-dg-cell>{{ user.createdAt | date }}</clr-dg-cell>
        <clr-dg-cell>{{ user.color }}</clr-dg-cell>
      </clr-dg-row>

      <clr-dg-footer>{{ users.length }} users</clr-dg-footer>
    </clr-datagrid>
  `;
};
