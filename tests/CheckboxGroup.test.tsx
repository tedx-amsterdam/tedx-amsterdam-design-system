import React from 'react';
import { render, screen } from '@testing-library/react';
import { CheckboxGroup } from '../components/core/CheckboxGroup';
import { Checkbox } from '../components/core/Checkbox';

describe('CheckboxGroup', () => {
  it('renders a fieldset with a legend', () => {
    render(
      <CheckboxGroup legend="Select interests">
        <Checkbox label="Tech" checked={false} onChange={() => {}} id="tech" />
      </CheckboxGroup>
    );
    expect(screen.getByRole('group', { name: 'Select interests' })).toBeInTheDocument();
    expect(screen.getByText('Select interests').tagName).toBe('LEGEND');
  });

  it('renders children inside the fieldset', () => {
    render(
      <CheckboxGroup legend="Options">
        <Checkbox label="Option A" checked={false} onChange={() => {}} id="a" />
        <Checkbox label="Option B" checked={true} onChange={() => {}} id="b" />
      </CheckboxGroup>
    );
    expect(screen.getByRole('checkbox', { name: 'Option A' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Option B' })).toBeInTheDocument();
  });

  it('renders without a legend when omitted', () => {
    const { container } = render(
      <CheckboxGroup>
        <Checkbox label="Solo" checked={false} onChange={() => {}} id="solo" />
      </CheckboxGroup>
    );
    expect(container.querySelector('legend')).toBeNull();
  });
});
