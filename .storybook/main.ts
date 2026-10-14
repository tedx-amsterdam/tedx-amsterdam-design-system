import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: { name: '@storybook/react-vite', options: {} },
  stories: ['../components/**/*.stories.tsx'],
  // addon-mcp serves an MCP endpoint at /mcp on the dev server, so coding
  // agents can list the components, their props and stories (see CLAUDE.md).
  addons: ['@storybook/addon-a11y', '@storybook/addon-mcp'],
  // Components reference images as "assets/..." relative to the served page.
  staticDirs: [{ from: '../assets', to: '/assets' }],
};

export default config;
