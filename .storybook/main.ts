import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  core: { disableTelemetry: true },
  async viteFinal(config) {
    // Type generation is only needed for the library build, not for Storybook.
    config.plugins = (config.plugins ?? [])
      .flat()
      .filter((plugin) => !(plugin && typeof plugin === 'object' && 'name' in plugin && plugin.name === 'vite:dts'));
    return config;
  },
};

export default config;
