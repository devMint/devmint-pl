/** @type {import('prettier').Config} */
const prettierConfig = {
  plugins: ['prettier-plugin-tailwindcss', '@prettier/plugin-oxc', 'prettier-plugin-astro'],
  printWidth: 130,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
}

/** @type {import('prettier-plugin-tailwindcss').PluginOptions} */
const tailwindConfig = {
  tailwindStylesheet: './packages/devmint-pl/src/root.css',
  tailwindFunctions: ['twMerge'],
  tailwindPreserveDuplicates: true,
}

export default {
  ...prettierConfig,
  ...tailwindConfig,
}
