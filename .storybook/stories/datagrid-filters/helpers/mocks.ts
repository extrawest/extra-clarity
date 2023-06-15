import { type EnumFilterOption } from '../../../../projects/extra-clarity/datagrid-filters';

export const USERS_DATA = [
  { id: 1, name: 'John', createdAt: Date.now(), color: 'black' },
  { id: 2, name: 'Sarah', createdAt: Date.now(), color: 'white' },
  { id: 3, name: 'James', createdAt: Date.now(), color: 'red' },
  { id: 4, name: 'Anna', createdAt: Date.now(), color: 'blue' },
];

export const colorEnumOptions: EnumFilterOption<string>[] = [
  {
    value: 'black',
    label: 'Black',
  },
  {
    value: 'blue',
    label: 'Blue',
  },
  {
    value: 'red',
    label: 'Red',
  },
  {
    value: 'green',
    label: 'Green',
  },
];
