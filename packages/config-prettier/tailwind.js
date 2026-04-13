import * as pluginTailwind from "prettier-plugin-tailwindcss";

/**
 * @param {String} tailwindStylesheet
 * @returns {import('prettier-plugin-tailwindcss').PluginOptions}
 */
export default function (tailwindStylesheet) {
  return {
    plugins: [pluginTailwind],
    tailwindStylesheet,
    tailwindFunctions: ["twMerge"],
    tailwindPreserveDuplicates: true,
  };
}
