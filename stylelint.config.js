import defineConfig from 'stylelint-define-config'

export default defineConfig({
  extends: ['stylelint-config-standard', 'stylelint-config-idiomatic-order'],
  plugins: ['stylelint-order'],
  rules: {
    'color-named': 'never',
    'selector-class-pattern': [
      '^[A-Z][a-z]+(?:[A-Z][a-z]+)*$',
      {
        message: 'Expected class selector to be pascal-case',
      },
    ],
  },
})
