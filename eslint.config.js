import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import perfectionist from 'eslint-plugin-perfectionist'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import ts from 'typescript-eslint'

const files = {
  js: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
  react: ['**/*.jsx', '**/*.tsx'],
  ts: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
}

/** @type {import('eslint').Linter.Config[]} */
export default [
  /**
   * Ignore some files. Alternative to .eslintignore
   */
  {
    ignores: ['**/.react-router/**', '**/build/**', '**/node_modules/**'],
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
   * React
   */
  {
    plugins: { react },
    settings: {
      react: { version: '19' },
    },
  },
  {
    files: [...files.react],
    languageOptions: {
      parserOptions: {
        ...react.configs.recommended.parserOptions,
        ...react.configs['jsx-runtime'].parserOptions,
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
    },
  },

  /**
   * React Hooks
   */
  { plugins: { 'react-hooks': reactHooks } },
  {
    files: [...files.react],
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },

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
              react: ['^react$', '^react-.+'],
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
