import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import prettier from 'eslint-config-prettier'
import astro from 'eslint-plugin-astro'
import perfectionist from 'eslint-plugin-perfectionist'
import ts from 'typescript-eslint'

const files = {
  js: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs', '**/*.astro'],
  ts: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts', '**/*.astro'],
}

/** @type {import('eslint').Linter.Config[]} */
export default [
  /**
   * Ignore some files. Alternative to .eslintignore
   */
  {
    ignores: [
      '**/.astro/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/worker-configuration.d.ts',
      './packages/devmint-pl/app/assets/**/*',
      './packages/devmint-pl/public/assets/**/*',
    ],
  },

  /**
   * Javascript
   */
  {
    files: [...files.js, ...files.ts],
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
    files: [...files.ts],
    rules: {
      ...ts.configs.recommended.reduce((a, b) => ({ ...a, ...b.rules }), {}),
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },

  /**
   * Astro Config
   */
  ...astro.configs['jsx-a11y-strict'],

  /**
   * Stylistic
   */
  stylistic.configs.recommended,

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
          groups: ['key', 'className', 'shorthand', 'condition', 'unknown', 'multiline', 'callback', 'render'],
          customGroups: {
            key: '^key$',
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
