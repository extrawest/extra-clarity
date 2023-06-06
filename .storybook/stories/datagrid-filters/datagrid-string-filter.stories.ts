import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import {
  DEFAULT_CONTAINER_WIDTH_PX,
  DEFAULT_DEBOUNCE_TIME_MS,
  DEFAULT_MIN_LENGTH,
  DEFAULT_PLACEHOLDER,
} from '../../../projects/extra-clarity/datagrid-filters';

import { DatagridStringFilterDemoComponent } from './helpers/datagrid-string-filter-demo.component';

type Story = StoryObj<DatagridStringFilterDemoComponent>;

export default {
  title: 'Components/Datagrid Filters',
  component: DatagridStringFilterDemoComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
  ],
  argTypes: {
    minLength: {
      table: {
        defaultValue: { summary: DEFAULT_MIN_LENGTH },
      },
    },
    debounceTimeMs: {
      table: {
        defaultValue: { summary: DEFAULT_DEBOUNCE_TIME_MS },
      },
    },
    width: {
      table: {
        defaultValue: { summary: DEFAULT_CONTAINER_WIDTH_PX },
      },
    },
    placeholder: {
      table: {
        defaultValue: { summary: DEFAULT_PLACEHOLDER },
      },
    },
  },
} as Meta<DatagridStringFilterDemoComponent>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatagridStringFilterStory: Story = {
  name: 'String Filter',
  args: {
    minLength: DEFAULT_MIN_LENGTH,
    debounceTimeMs: DEFAULT_DEBOUNCE_TIME_MS,
    width: DEFAULT_CONTAINER_WIDTH_PX,
    placeholder: DEFAULT_PLACEHOLDER,
    fullMatch: false,
    propertyDisplayName: 'User Name',
  },
};
