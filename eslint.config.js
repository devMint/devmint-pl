import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import astro from 'eslint-plugin-astro'
import perfectionist from 'eslint-plugin-perfectionist'
import ts from 'typescript-eslint'

const files = {
  astro: ['**/*.astro'],
  js: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
  ts: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
}

/** @type {import('eslint').Linter.Config[]} */
export default [
  /**
   * Ignore some files. Alternative to .eslintignore
   */
  {
    ignores: ['**/.astro/**', '**/dist/**'],
  },

  /**
   * Javascript
   */
  {
    files: [...files.js, ...files.ts, ...files.astro],
    rules: {
      ...js.configs.recommended.rules,
      'no-restricted-syntax': ['error', 'ExportAllDeclaration'],
    },
  },

  /**
   * Typescript
   */
  {
    languageOptions: {
      parser: ts.parser,
      sourceType: 'module',
    },
    plugins: { '@typescript-eslint': ts.plugin },
  },
  {
    files: [...files.ts, ...files.astro],
    rules: {
      ...ts.configs.recommended.reduce((a, b) => ({ ...a, ...b.rules }), {}),
    },
  },

  /**
   * Astro
   */
  ...astro.configs.recommended,

  /**
   * Perfectionist
   * Defines rules for sorting various data, such as objects, imports, TypeScript types, enums,
   * JSX props, etc. alphabeticall, naturally or by line length.
   */
  {
    ...perfectionist.configs['recommended-natural'],
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          newlinesBetween: 'never',
          groups: [
            ['builtin', 'builtin-type'],
            'react',
            'storybook',
            'connect',
            'devmint',
            'external-type',
            'internal-type',
            'parent-type',
            'sibling-type',
            'external',
            'internal',
            'parent',
            'sibling',
            ['index', 'index-type'],
            'object',
            'style',
          ],
          customGroups: {
            value: {
              devmint: '^@devmint.+',
              react: ['^react$', '^react-.+'],
              connect: '^@connectrpc/(.+)$',
              storybook: ['^storybook.+$', '^@storybook/(.+)$'],
            },
            type: {
              react: ['^react$', '^react-.+'],
            },
          },
        },
      ],
      'perfectionist/sort-named-imports': [
        'error',
        {
          groupKind: 'values-first',
          partitionByComment: true,
        },
      ],
      'perfectionist/sort-exports': [
        'error',
        {
          groupKind: 'values-first',
          partitionByComment: true,
        },
      ],
      'perfectionist/sort-named-exports': [
        'error',
        {
          groupKind: 'values-first',
          partitionByComment: true,
        },
      ],
      'perfectionist/sort-union-types': [
        'error',
        {
          type: 'line-length',
        },
      ],
      'perfectionist/sort-variable-declarations': [
        'error',
        {
          type: 'line-length',
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'alphabetical',
          groups: ['key', 'className', 'shorthand', 'condition', 'aria', 'unknown', 'multiline', 'callback', 'render'],
          customGroups: {
            key: '^key$',
            aria: '^aria.+',
            className: '^className$',
            condition: '^is.+',
            callback: '^on.+',
            render: '^render.+',
          },
        },
      ],
    },
  },

  /**
   * Prettier
   * Turns off all rules that are unnecessary or might conflict with Prettier.
   * Config must be after other configs that you want to override.
   */
  prettier,
]
