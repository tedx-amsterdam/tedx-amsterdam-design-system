import '@testing-library/jest-dom';
import { configureAxe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

global.axe = configureAxe({
  rules: {
    // Disable colour-contrast in jsdom — CSS vars don't resolve
    'color-contrast': { enabled: false },
  },
});
