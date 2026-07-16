import React from 'react';
import { render, screen } from '@testing-library/react';
import { CASES } from './fixtures';

// Convention: every component merges `className` and forwards `...rest`
// (rest goes to the native control for Input/Select/Textarea, root otherwise).
describe('prop surface', () => {
  it.each(CASES)('%s merges a consumer className', (_name, element) => {
    render(React.cloneElement(element, { className: 'consumer-marker' }));
    // document-level query: Modal renders through a portal
    expect(document.querySelector('.consumer-marker')).not.toBeNull();
  });

  it.each(CASES)('%s forwards rest props (data-testid)', (_name, element) => {
    render(React.cloneElement(element, { 'data-testid': 'surface-probe' }));
    expect(screen.getByTestId('surface-probe')).toBeInTheDocument();
  });
});
