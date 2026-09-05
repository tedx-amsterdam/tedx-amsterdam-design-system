import '@testing-library/jest-dom';
// @ts-expect-error - jest-axe has no type definitions
import { configureAxe, toHaveNoViolations } from 'jest-axe';
import { expect } from 'vitest';
import type { AxeResults, RunOptions } from 'axe-core';

expect.extend(toHaveNoViolations);

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
  var axe: (element: Element | Node | Document | Window | null, options?: RunOptions) => Promise<AxeResults>;
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

globalThis.axe = configureAxe({
  rules: {
    // Disable colour-contrast in jsdom — CSS vars don't resolve
    'color-contrast': { enabled: false },
  },
});
