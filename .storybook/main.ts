import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: { name: '@storybook/react-vite', options: {} },
  stories: ['../components/**/*.stories.tsx'],
  addons: ['@storybook/addon-a11y'],
  // Components reference images as "assets/..." relative to the served page.
  staticDirs: [{ from: '../assets', to: '/assets' }],
};

export default config;
