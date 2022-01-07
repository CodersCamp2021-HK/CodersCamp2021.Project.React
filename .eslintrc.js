/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-restricted-syntax': 0,
    'import/prefer-default-export': 0,
    'import/no-default-export': 2,
  },
  overrides: [
    {
      files: ['*.jsx'],
      rules: {
        'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
      },
    },
    {
      files: ['*.config.js'],
      rules: { 'import/no-default-export': 0, 'import/no-extraneous-dependencies': 0 },
    },
  ],
};
