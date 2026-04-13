import * as pluginAstro from "prettier-plugin-astro";

export default function () {
  return {
    plugins: [pluginAstro],
    astroAllowShorthand: false,
    astroSkipFrontmatter: false,
    overrides: [
      {
        files: "*.astro",
        options: {
          parser: "astro",
        },
      },
    ],
  };
}
