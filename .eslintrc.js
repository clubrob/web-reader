module.exports = {
  root: true,
  globals: {'app': true},
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:prettier/recommended', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': 'off',
    'no-unused-vars': 'warn'
  }
};