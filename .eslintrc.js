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
    'plugin:storybook/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-restricted-syntax': 0,
    'import/prefer-default-export': 0,
    'import/no-default-export': 2,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
  },
  overrides: [
    {
      files: ['*.config.js', '*.stories.jsx'],
      rules: { 'import/no-default-export': 0, 'import/no-extraneous-dependencies': 0 },
    },
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      env: {
        jest: true,
      },
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:jest-formatting/recommended',
        'plugin:testing-library/react',
      ],
      rules: {},
    },
  ],
};
