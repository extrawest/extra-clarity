import { RouterLink, provideRouter } from '@angular/router';

import { type Meta, type StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';

import { EcRouterLinkWrapperComponent } from '@extrawest/extra-clarity/router-link-wrapper';

import { hideAllControlRows } from '../../helpers';

type Story = StoryObj<EcRouterLinkWrapperComponent>;

const meta: Meta<EcRouterLinkWrapperComponent> = {
  title: 'Components/Router Link Wrapper',
  component: EcRouterLinkWrapperComponent,
  decorators: [
    applicationConfig({
      providers: [provideRouter([{ path: '**', children: [], canActivate: [() => false] }])],
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
    queryParams: {},
  },
  args: {
    enabled: true,
    fwdRouterLink: '/',
    queryParams: undefined,
  },
};

export default meta;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const WrapperItselfStory: Story = {
  name: 'Story: Wrapper itself',
  decorators: [
    moduleMetadata({
      imports: [EcRouterLinkWrapperComponent],
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
  args: {},
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DocsExampleStory: Story = {
  name: 'Story: Example for docs',
  decorators: [
    moduleMetadata({
      imports: [RouterLink, EcRouterLinkWrapperComponent],
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
    ...hideAllControlRows(meta.argTypes),
  },
  args: {},
};
