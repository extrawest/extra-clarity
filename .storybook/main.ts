import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    // put 'overview.mdx' to the top of this list to open it by default on opening the site without any url parameters
    './stories/overview.mdx',
    './stories/**/*.mdx',
    './stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Docs',
  },
  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },
  // add an attribute to the preview's body to allow Clarity work properly
  previewBody: (body) => `
    ${body}
    <script>
      document.body.onload = () => document.body.setAttribute("cds-theme", "light");
    </script>
  `,
};
export default config;
