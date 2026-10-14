import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../components/core/Checkbox';

describe('Checkbox', () => {
  it('takes a label with a link, as in a consent line', () => {
    const onChange = vi.fn();
    render(
      <Checkbox
        checked={false}
        onChange={onChange}
        label={<>I agree to the <a href="/privacy">Privacy Policy</a>.</>}
      />,
    );
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy');
    const box = screen.getByRole('checkbox', { name: /I agree to the Privacy Policy/ });
    expect(box.id).not.toBe('');
    fireEvent.click(box);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('keeps the readable id for a text label', () => {
    render(<Checkbox checked={false} label="Email me updates" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'checkbox-email-me-updates');
  });
});
