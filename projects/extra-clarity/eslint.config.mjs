// @ts-check
import tseslint from 'typescript-eslint';
import rootConfig from '../../eslint.config.mjs';

export default tseslint.config(
  ...rootConfig,
  {
    settings: {
      // This is needed for 'eslint-plugin-import' working properly with imports in .ts files
      'import/resolver': {
        typescript: {
          project: './tsconfig.lib.json',
        },
      },
    },
  },
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    files: ['**/*.html'],
    rules: {},
  },
);
