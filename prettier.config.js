/** @type {import('prettier').Config} */
const prettierConfig = {
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 130,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
}

/** @type {import('prettier-plugin-tailwindcss').PluginOptions} */
const tailwindConfig = {
  tailwindStylesheet: './app/app.css',
  tailwindFunctions: ['twMerge'],
  tailwindPreserveDuplicates: true,
}

export default {
  ...prettierConfig,
  ...tailwindConfig,
}
