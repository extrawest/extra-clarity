import { provideRouter, RouterLink } from '@angular/router';
import {
  applicationConfig,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';

import { RouterLinkWrapperComponent } from '../../../projects/extra-clarity/router-link-wrapper';
import { hideAllControlRows } from '../../helpers';

type Story = StoryObj<RouterLinkWrapperComponent>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const MetaStory = {
  title: 'Components/Router Link Wrapper',
  component: RouterLinkWrapperComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([
          { path: '**', children: [], canActivate: [() => false] },
        ]),
      ],
    }),
  ],
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    // INPUTS
    enabled: {
      type: {
        name: 'boolean',
        required: true,
      },
      // override auto generated control type
      table: {
        type: {
          summary: 'unknown',
        },
      },
    },
    fwdRouterLink: {
      type: {
        name: 'other',
        value: '',
        required: true,
      },
    },
    queryParams: {
    },
  },
  args: {
    enabled: true,
    fwdRouterLink: '/',
    queryParams: undefined,
  },
} as Meta<RouterLinkWrapperComponent>;

export default MetaStory;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const WrapperItselfStory: Story = {
  name: 'Story: Wrapper itself',
  decorators: [
    moduleMetadata({
      imports: [
        RouterLinkWrapperComponent,
      ],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <ec-router-link
        [enabled]="enabled"
        [fwdRouterLink]="fwdRouterLink"
        [queryParams]="queryParams"
      >
        Link label
      </ec-router-link>
    `,
  }),
  args: {
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DocsExampleStory: Story = {
  name: 'Story: Example for docs',
  decorators: [
    moduleMetadata({
      imports: [
        RouterLink,
        RouterLinkWrapperComponent,
      ],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <ec-router-link [enabled]="true" [fwdRouterLink]="['/about']">
        Enabled link within the wrapper
      </ec-router-link>
      <br />
      <ec-router-link [enabled]="false" [fwdRouterLink]="['/about']">
        Disabled link within the wrapper
      </ec-router-link>
      <br />
      <a [routerLink]="['/about']">
        Enabled link without the wrapper
      </a>
      <br />
      <a [routerLink]="null">
        Disabled link without the wrapper
      </a>
    `,
  }),
  // hide all controls since the purpose of this story is a hard-coded demo in the docs page
  argTypes: {
    ...hideAllControlRows(MetaStory.argTypes),
  },
  args: {
  },
};
