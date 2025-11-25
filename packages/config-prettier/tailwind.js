/**
 * @param {String} tailwindStylesheet 
 * @returns {import('prettier-plugin-tailwindcss').PluginOptions}
 */
export default function (tailwindStylesheet) {
  return {
    plugins: ['prettier-plugin-tailwindcss'],
    tailwindStylesheet,
    tailwindFunctions: ['twMerge'],
    tailwindPreserveDuplicates: true,
  }
}