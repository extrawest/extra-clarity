import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { ProgressSpinnerDemoComponent } from './helpers/progress-spinner-demo.component';

type Story = StoryObj<ProgressSpinnerDemoComponent>;

const meta: Meta<ProgressSpinnerDemoComponent> = {
  title: 'Components/Progress Spinner',
  component: ProgressSpinnerDemoComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};
export default meta;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProgressSpinnerStory: Story = {
  name: 'Basic Usage',
  args: {},
};
