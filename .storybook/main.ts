import type { StorybookConfig } from '@storybook/nextjs';
import KumaUIWebpackPlugin from '@kuma-ui/webpack-plugin';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    'storybook-addon-module-mock',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      fastRefresh: true,
      strictMode: true,
    },
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: (config) => {
    config.plugins = [...(config.plugins ?? []), new KumaUIWebpackPlugin()];
    if (config.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        ...{
          '@': path.resolve(__dirname, '../src'),
        },
      };
    }
    return config;
  },
};
export default config;
