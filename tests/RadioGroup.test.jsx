import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RadioGroup } from '../components/core/RadioGroup.jsx';

describe('RadioGroup', () => {
  it('renders a fieldset with a legend', () => {
    render(
      <RadioGroup name="size" legend="Choose size" value="md" onChange={() => {}}>
        <RadioGroup.Option value="sm" label="Small" />
        <RadioGroup.Option value="md" label="Medium" />
      </RadioGroup>
    );
    expect(screen.getByRole('group', { name: 'Choose size' })).toBeInTheDocument();
    expect(screen.getByText('Choose size').tagName).toBe('LEGEND');
  });

  it('marks the matching option as checked', () => {
    render(
      <RadioGroup name="size" legend="Size" value="lg" onChange={() => {}}>
        <RadioGroup.Option value="sm" label="Small" />
        <RadioGroup.Option value="lg" label="Large" />
      </RadioGroup>
    );
    expect(screen.getByRole('radio', { name: 'Large' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Small' })).not.toBeChecked();
  });

  it('calls onChange with the option value on click', () => {
    const onChange = vi.fn();
    render(
      <RadioGroup name="size" legend="Size" value="sm" onChange={onChange}>
        <RadioGroup.Option value="sm" label="Small" />
        <RadioGroup.Option value="lg" label="Large" />
      </RadioGroup>
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Large' }));
    expect(onChange).toHaveBeenCalledWith('lg');
  });
});
