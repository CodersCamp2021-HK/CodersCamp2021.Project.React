module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  babel: async (options) => ({
    ...options,
    presets: [
      ...options.presets,
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
        'preset-react-jsx-transform',
      ],
    ],
  }),
};
