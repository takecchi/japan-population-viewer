import type { StorybookConfig } from '@storybook/nextjs';
import KumaUIWebpackPlugin from '@kuma-ui/webpack-plugin';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
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
    return config;
  },
};
export default config;
