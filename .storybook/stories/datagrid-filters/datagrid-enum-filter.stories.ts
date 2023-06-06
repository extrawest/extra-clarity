import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { DEFAULT_MIN_WIDTH_PX } from '../../../projects/extra-clarity/datagrid-filters';

import { DatagridEnumFilterDemoComponent } from './helpers/datagrid-enum-filter-demo.component';

type Story = StoryObj<DatagridEnumFilterDemoComponent>;

export default {
  title: 'Components/Datagrid Filters',
  component: DatagridEnumFilterDemoComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
  ],
  argTypes: {
    width: {
      table: {
        defaultValue: { summary: DEFAULT_MIN_WIDTH_PX },
      },
    },
    multiple: {
      table: {
        defaultValue: { summary: false },
      },
    },
    values: {
      table: {
        defaultValue: { summary: '[]' },
        type: { summary: null },
      },
    },
  },
} as Meta<DatagridEnumFilterDemoComponent>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatagridEnumFilterStory: Story = {
  name: 'Enumerated Filter',
  args: {
    propertyDisplayName: 'User Name',
    width: DEFAULT_MIN_WIDTH_PX,
    multiple: false,
    values: [
      {
        label: 'John',
        value: 'John',
        selected: false,
      },
      {
        label: 'Anna',
        value: 'Anna',
      },
      {
        label: 'test2',
        value: 'test2',
      },
    ],
  },
};
