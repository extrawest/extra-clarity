import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ClrVerticalNav, ClrVerticalNavModule } from '@clr/angular';
import {
  applicationConfig,
  componentWrapperDecorator,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';

import { SidebarNavComponent } from '../../../projects/extra-clarity/sidebar-nav';
import { hideAllControlRows } from '../../helpers';

type Story = StoryObj<SidebarNavComponent>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const MetaStory = {
  title: 'Components/Sidebar Navigation',
  component: SidebarNavComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        provideRouter([
          { path: '**', children: [], canActivate: [() => false] },
        ]),
      ],
    }),
  ],
  parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    // INPUTS:
    customLabelTpl: {
      control: { type: null },
    },
    navList: {
      type: {
        required: true,
        name: 'other',
        value: '[]',
      },
      table: {
        type: { summary: '(NavItemLink | NavItemGroup | NavItemDivider)[]' },
      },
    },
    rootLevelBold: {
      control: { type: 'radio' },
      options: ['none', 'all', 'groups', 'items'],
    }
  },
  args: {
    customLabelTpl: undefined,
    navList: [],
  },
} as Meta<SidebarNavComponent>;

export default MetaStory;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ComponentItselfStory: Story = {
  name: 'Story: Component itself',
  decorators: [
    moduleMetadata({
      imports: [
        ClrVerticalNavModule,
        SidebarNavComponent,
      ],
    }),
    componentWrapperDecorator(ClrVerticalNav),
  ],
  render: (args) => ({
    props: args,
    template: `
      <ec-sidebar-nav
        [navList]="navList"
        [customLabelTpl]="customLabelTpl"
        [rootLevelBold]="rootLevelBold"
      />
    `,
    styles: [
      `.clr-vertical-nav { padding-bottom: .9rem }`,
    ],
  }),
  args: {
    rootLevelBold: 'groups',
    navList: [
      {
        type: 'router-link',
        label: 'Router Link',
        link: '/router-link',
      },
      {
        type: 'group',
        label: 'Expandable Group',
        children: [
          {
            type: 'router-link',
            label: 'Nested Link #1',
            link: '/router-link-1',
          },
          {
            type: 'router-link',
            label: 'Nested Link #2',
            link: '/router-link-2',
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        type: 'href',
        label: 'Send Email',
        link: 'mailto:user@example.com',
      },
    ],
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DocsExampleStory: Story = {
  name: 'Story: Example for docs',
  decorators: ComponentItselfStory.decorators,
  render: (args) => ({
    props: args,
    template: `
  <ec-sidebar-nav
    [navList]="[
      { type: 'router-link', label: 'Nav Item #1', link: '/nav-link-1' },
      { type: 'router-link', label: 'Nav Item #2', link: '/nav-link-2' },
      { type: 'group', label: 'Nav Group', expanded: false, children: [
        { type: 'router-link', label: 'Nested Item #1', link: '/nested-link-1' },
        { type: 'router-link', label: 'Nested Item #2', link: '/nested-link-2' },
        { type: 'router-link', label: 'Nested Item #3', link: '/nested-link-3' }
      ]},
      { type: 'divider' },
      { type: 'href', label: 'Send Email', link: 'mailto:user@example.com' },
    ]"
    [rootLevelBold]="'groups'"
  />`,
    styles: [
      `.clr-vertical-nav { padding-bottom: .9rem }`,
    ],
  }),
  // hide all controls since the purpose of this story is a hard-coded demo in the docs page
  argTypes: {
    ...hideAllControlRows(MetaStory.argTypes),
  },
  args: {
    rootLevelBold: 'groups',
  },
};
