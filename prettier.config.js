/** @type {import('prettier').Config} */
const prettierConfig = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 160,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
}

/** @type {import('@trivago/prettier-plugin-sort-imports').PluginConfig} */
const sortImportsConfig = {
  importOrder: [],
  importOrderSeparation: false,
  importOrderSortSpecifiers: false,
}

export default {
  ...prettierConfig,
  ...sortImportsConfig,
}
