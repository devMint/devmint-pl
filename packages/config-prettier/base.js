import * as pluginOxc from "@prettier/plugin-oxc";

/** @type {import('prettier').Config} */
export default {
  plugins: [pluginOxc],
  printWidth: 130,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "all",
};
