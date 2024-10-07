import js from '@eslint/js'
import markdown from '@eslint/markdown'
import prettier from 'eslint-config-prettier'
import ts from 'typescript-eslint'

const files = {
  js: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
  ts: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
  react: ['**/*.jsx', '**/*.tsx'],
}

/** @type {import('eslint').Linter.Config[]} */
export default [
  /**
   * Ignore some files. Alternative to .eslintignore
   */
  {
    ignores: ['**/build/**', '**/dist/**', '**/out/**', '**/storybook-static/**'],
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
    plugins: { '@typescript-eslint': ts.plugin },
    languageOptions: {
      sourceType: 'module',
      parser: ts.parser,
    },
  },
  {
    files: [...files.ts],
    rules: {
      ...ts.configs.strict.reduce((a, b) => ({ ...a, ...b.rules }), {}),
      ...ts.configs.stylistic.reduce((a, b) => ({ ...a, ...b.rules }), {}),
    },
  },

  /**
   * Markdown
   */
  ...markdown.configs.recommended,

  /**
   * Prettier
   * Turns off all rules that are unnecessary or might conflict with Prettier.
   * Config must be after other configs that you want to override.
   */
  prettier,
]
