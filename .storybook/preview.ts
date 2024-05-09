import { enableProdMode } from '@angular/core';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import type { Preview } from '@storybook/angular';

import docJson from '../documentation.json';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        includeNames: true,
        order: [
          '*',
          [
            '*',
            [
              'String Filter',
              'Enum Single-Value Filter',
              'Enum Multi-Value Filter',
              'Enum Grouped-Value Filter',
              'Time Range Filter',
              'Time Range Filter (External)',
            ],
          ],
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
    },
  },
};

// Uncomment to test the production mode on a local dev machine
// enableProdMode();

export default preview;
