module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/component-name-in-template-casing': 'off',
    'comma-dangle': ['error', 'never'],
    'semi': ['error', 'never'],
    'quote-props': ['error', 'consistent-as-needed'],
    'import/no-unresolved': 'off',
    'space-before-function-paren': 'off',
    'object-curly-newline': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'acc', // for reduce accumulators
        'state',
        'el',
        'Vue'
      ]
    }]
  }
}
