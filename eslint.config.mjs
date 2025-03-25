// @ts-check
import eslint from '@eslint/js';
import angular from 'angular-eslint';
import { globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import * as importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  globalIgnores(['dist/']),
  {
    ignores: ['.angular/*'],
    settings: {
      // This is needed for 'eslint-plugin-import' working properly with imports in .ts files
      'import/resolver': {
        typescript: {},
      },
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      importPlugin.flatConfigs?.recommended,
      importPlugin.flatConfigs?.typescript,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'ec',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'ec',
          style: 'kebab-case',
        },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-param-reassign': ['error'],
      '@typescript-eslint/no-inferrable-types': [
        'error',
        {
          ignoreParameters: true,
          ignoreProperties: true,
        },
      ],

      // Using only the typescript-related version of 'no-unused-vars':
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',

      // 'import/namespace' is disabled as extremely slow (adding 20+ seconds on the whole project),
      //     run to check: TIMING=1 npx eslint .
      'import/namespace': 'off',

      // Ordering imports:
      'import/first': ['error'],
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-extraneous-dependencies': ['error'],
      'no-duplicate-imports': ['error', { includeExports: true }],
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
          groups: ['external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: '@angular/**',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: [],
          distinctGroup: true,
          warnOnUnassignedImports: true,
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          allowSeparatedGroups: true,
        },
      ],

      // TODO: revise the following bunch of rules inherited from the previous versions of the app
      '@angular-eslint/component-max-inline-declarations': ['error', { template: 10 }],
      '@angular-eslint/component-class-suffix': ['error', { suffixes: ['Component', 'Container'] }],
      '@angular-eslint/directive-class-suffix': ['error', { suffixes: ['Directive'] }],
      '@angular-eslint/no-queries-metadata-property': 'error',
      '@angular-eslint/use-component-view-encapsulation': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': ['warn'],
      // this rule is disabled since it supports autofix and just removes 'standalone: false' where it's really needed
      '@angular-eslint/prefer-standalone': ['off'],

      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'off',
        {
          accessibility: 'explicit',
          overrides: {
            accessors: 'explicit',
          },
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variableLike',
          format: ['camelCase'],
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['UPPER_CASE', 'camelCase'],
          leadingUnderscore: 'allowSingleOrDouble',
        },
        {
          selector: 'parameter',
          format: ['camelCase', 'PascalCase', 'snake_case'],
          leadingUnderscore: 'allowSingleOrDouble',
        },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'public-static-field',
            'public-instance-field',
            'private-static-field',
            'private-instance-field',
            'constructor',
            'static-method',
            'instance-method',
            'private-static-method',
            'private-instance-method',
          ],
        },
      ],

      // Ignoring some unresolvable import paths to silent errors not solvable by any other method:
      // 'import/no-unresolved': [
      //   'error',
      //   {
      //     ignore: ['@clr/angular/forms/combobox/model/single-select-combobox.model'],
      //   },
      // ],

      // Preventing circular dependencies for top-level variables (esbuild), see:
      //     https://esbuild.github.io/faq/#top-level-var
      //     https://github.com/evanw/esbuild/issues/3808
      // "import/no-cycle": ["warn"]
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      // TODO: maybe disable templateAccessibility as it was before the migration to ESLint v9
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      '@angular-eslint/template/conditional-complexity': 'error',
      '@angular-eslint/template/eqeqeq': ['error', { allowNullOrUndefined: true }],
      '@angular-eslint/template/label-has-associated-control': ['off'],
      '@angular-eslint/template/no-duplicate-attributes': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': ['warn'],
      // Another template-related rules which might be useful for later migrations to Angular 18+:
      //   "@angular-eslint/template/prefer-control-flow": ["warn"]
      //   "@angular-eslint/template/prefer-ngsrc": ["warn"]
    },
  },
  eslintConfigPrettier,
);
