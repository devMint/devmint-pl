/** @type {import('prettier').Config} */
const prettierConfig = {
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  printWidth: 160,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
  ],
}

/** @type {import('prettier-plugin-tailwindcss').PluginOptions} */
const tailwindConfig = {
  tailwindStylesheet: './src/index.css',
}

export default {
  ...prettierConfig,
  ...tailwindConfig,
}
