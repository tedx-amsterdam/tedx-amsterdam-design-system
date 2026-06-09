import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormField } from '../components/core/FormField.jsx';

describe('FormField', () => {
  it('renders label text', () => {
    render(<FormField label="Email" htmlFor="email"><input id="email" /></FormField>);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders hint text when provided', () => {
    render(<FormField label="Name" hint="Full name as on ID"><input /></FormField>);
    expect(screen.getByText('Full name as on ID')).toBeInTheDocument();
  });

  it('renders error message when error prop is provided', () => {
    render(<FormField label="Email" htmlFor="email" error="Required"><input id="email" /></FormField>);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('error span does NOT use role="alert"', () => {
    render(<FormField label="Email" htmlFor="email" error="Required field"><input id="email" /></FormField>);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('error span uses aria-live="polite"', () => {
    const { container } = render(
      <FormField label="Email" htmlFor="email" error="Invalid email"><input id="email" /></FormField>
    );
    const errorSpan = container.querySelector('[aria-live]');
    expect(errorSpan).not.toBeNull();
    expect(errorSpan).toHaveAttribute('aria-live', 'polite');
  });

  it('error span id is set for aria-describedby use', () => {
    render(
      <FormField label="Email" htmlFor="email" error="Bad input">
        <input id="email" />
      </FormField>
    );
    const errorSpan = document.getElementById('email-formfield-error');
    expect(errorSpan).not.toBeNull();
  });

  it('required asterisk shown when required=true', () => {
    render(<FormField label="Name" required><input /></FormField>);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('no error span when error prop is absent', () => {
    const { container } = render(<FormField label="Name"><input /></FormField>);
    expect(container.querySelector('[aria-live]')).toBeNull();
  });
});
