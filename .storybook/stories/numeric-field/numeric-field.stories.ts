import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { NumericFieldDemoComponent } from './helpers/numeric-field-demo.component';

type Story = StoryObj<NumericFieldDemoComponent>;

export default {
  title: 'Components/Numeric Field',
  component: NumericFieldDemoComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
  ],
} as Meta<NumericFieldDemoComponent>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NumericFieldStory: Story = {
  name: 'Basic Usage',
  args: {
  },
};
