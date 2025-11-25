import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import perfectionist from 'eslint-plugin-perfectionist'
import markdown from '@eslint/markdown'
import ts from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import { files } from './files.js'
import { defineConfig } from 'eslint/config'

export default defineConfig([
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
          groups: [
            'key',
            'className',
            'shorthand',
            'condition',
            'unknown',
            'multiline',
            'callback',
            'render',
          ],
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
   * A11y
   */
  {
    files: [...files.js, ...files.ts],
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...jsxA11y.flatConfigs['recommended'].rules,
    },
    languageOptions: {
      ...jsxA11y.flatConfigs['recommended'].languageOptions,
    }
   },

  /**
   * Markdown
   */
  {
		files: [...files.markdown],
		plugins: {
			markdown,
    },
    language: 'markdown/gfm',
		languageOptions: {
			frontmatter: "yaml", // Or pass `"toml"` or `"json"` to enable TOML or JSON front matter parsing.
		},
	}
])
