import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormField } from '../components/core/FormField';
import { Input } from '../components/core/Input';
import { Select } from '../components/core/Select';
import { Textarea } from '../components/core/Textarea';

describe('FormField auto-wiring', () => {
  it('wires a child Input: id, label association, aria-describedby, aria-invalid, required', () => {
    render(
      <FormField label="Your email" htmlFor="signup-email" error="Required field" required>
        <Input label="Email" />
      </FormField>
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'signup-email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toBeRequired();
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toContain('signup-email-formfield-error');
    expect(document.getElementById('signup-email-formfield-error')).toHaveTextContent('Required field');
    const label = screen.getByText('Your email').closest('label');
    expect(label).toHaveAttribute('for', 'signup-email');
  });

  it('generates a stable field id when htmlFor is omitted', () => {
    render(
      <FormField label="Your email">
        <Input label="Email" />
      </FormField>
    );
    const input = screen.getByRole('textbox');
    expect(input.id).toBeTruthy();
    const label = screen.getByText('Your email').closest('label');
    expect(label).toHaveAttribute('for', input.id);
  });

  it('wires a child Select', () => {
    render(
      <FormField label="Your city" htmlFor="city" error="Pick one" required>
        <Select options={[{ value: 'ams', label: 'Amsterdam' }]} />
      </FormField>
    );
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('id', 'city');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toBeRequired();
    expect(select.getAttribute('aria-describedby')).toContain('city-formfield-error');
  });

  it('wires a child Textarea', () => {
    render(
      <FormField label="Your message" htmlFor="msg" error="Too short" required>
        <Textarea />
      </FormField>
    );
    const ta = screen.getByRole('textbox');
    expect(ta).toHaveAttribute('id', 'msg');
    expect(ta).toHaveAttribute('aria-invalid', 'true');
    expect(ta).toBeRequired();
    expect(ta.getAttribute('aria-describedby')).toContain('msg-formfield-error');
  });

  it('an explicit id prop on the child wins over the context id', () => {
    render(
      <FormField label="L" htmlFor="outer">
        <Input label="Email" id="inner" />
      </FormField>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'inner');
  });

  it('controls used outside a FormField are unaffected', () => {
    render(<Input label="Email" />);
    const input = screen.getByRole('textbox');
    expect(input).not.toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });
});
