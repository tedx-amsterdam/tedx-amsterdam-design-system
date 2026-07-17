import '../styles.css'; // tokens + global focus ring + reduced-motion
import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#000000' },
        light: { name: 'Light', value: '#ffffff' },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'dark' }, // brand is dark-first
  },
};

export default preview;
