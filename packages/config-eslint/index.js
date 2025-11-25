import { defineConfig as defineConfigHelper } from 'eslint/config'
import prettier from 'eslint-config-prettier'

/**
 * Typed declaration for ESLint config.
 * @param  {import('eslint').Linter.Config[]} configs 
 * @returns {import('eslint').Linter.Config[]}
 */
export function defineConfig(...configs) {
  /**
   * Prettier
   * Turns off all rules that are unnecessary or might conflict with Prettier.
   * Config must be after other configs that you want to override.
   */
  return defineConfigHelper(...configs, prettier);
}