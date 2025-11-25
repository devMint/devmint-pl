export default function () {
  return {
    plugins: ['prettier-plugin-astro'],
    astroAllowShorthand: false,
    astroSkipFrontmatter: false,
    overrides: [
      {
        files: '*.astro',
        options: {
          parser: 'astro',
        },
      },
    ],
  }
}
