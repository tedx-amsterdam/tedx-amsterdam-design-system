import '@testing-library/jest-dom';
import { configureAxe } from 'jest-axe';

// Make axe available globally in tests
global.axe = configureAxe({
  rules: {
    // Disable colour-contrast in jsdom — CSS vars don't resolve
    'color-contrast': { enabled: false },
  },
});
