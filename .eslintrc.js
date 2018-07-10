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
  plugins: ['promise'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'no-undef': 'off',
    'consistent-return': 1,
    'array-callback-return': 1,
    'promise/no-nesting': 1,
    'promise/always-return': 2,
    'promise/catch-or-return': 2
  }
};