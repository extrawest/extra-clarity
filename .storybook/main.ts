import type { StorybookConfig } from '@storybook/angular-vite';

const config: StorybookConfig = {
  stories: [
    // put 'overview.mdx' to the top of this list to open it by default on opening the site without any url parameters
    './stories/overview.mdx',
    './stories/**/*.mdx',
    './stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/angular-vite',
    options: {},
  },
  docs: {
    defaultName: 'Docs',
  },
  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(viteConfig, {
      resolve: {
        // Vite 8 leaves tsconfig paths off by default; the Storybook dev server
        // needs them to resolve @extrawest/extra-clarity/* to source.
        tsconfigPaths: true,
      },
    });
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
