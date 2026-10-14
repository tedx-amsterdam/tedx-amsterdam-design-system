// The /vitest entry registers the matchers and adds their types to Vitest's expect.
import '@testing-library/jest-dom/vitest';
// @ts-expect-error - jest-axe has no type definitions
import { configureAxe, toHaveNoViolations } from 'jest-axe';
import { expect } from 'vitest';
import type { AxeResults, RunOptions } from 'axe-core';

expect.extend(toHaveNoViolations);

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
  var axe: (element: Element | Node | Document | Window | null, options?: RunOptions) => Promise<AxeResults>;
}

// Vitest 5 merges custom matchers into Matchers<R, T>; the type parameters
// must match its declaration exactly, so T stays although it is unused.
declare module 'vitest' {
  // oxlint-disable-next-line no-unused-vars
  interface Matchers<R, T> {
    toHaveNoViolations(): R;
  }
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

globalThis.axe = configureAxe({
  rules: {
    // Disable colour-contrast in jsdom — CSS vars don't resolve
    'color-contrast': { enabled: false },
  },
});
