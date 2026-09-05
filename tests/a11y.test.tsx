import { render } from '@testing-library/react';
import { CASES } from './fixtures';

// Library-wide axe scan of every component's default render.
// 'region' is disabled: fragments rendered outside landmarks are expected in tests.
// 'color-contrast' is disabled globally in tests/setup.ts (CSS vars don't resolve in jsdom).
describe('axe sweep', () => {
  it.each(CASES)('%s has no WCAG violations', async (_name, element) => {
    const { container, baseElement } = render(element);
    const target = container.firstElementChild ? container : baseElement; // Modal portals to body
    const results = await globalThis.axe(target, {
      rules: { region: { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
